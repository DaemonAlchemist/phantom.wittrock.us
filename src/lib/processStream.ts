import { Func } from "ts-functional/dist/types";

export const processStream = async <P, T>(url:string, data:P, callback:Func<T, void>) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    const reader = response.body?.getReader();
    let { value: chunk, done: readerDone } = await reader?.read() || {value: "", done: false};
    chunk = chunk ? new TextDecoder("utf-8").decode(chunk as Uint8Array) : '';
  
    let jsonStr = '';
    
    while (!readerDone) {
      const reassembled = jsonStr + chunk;
      try {
        let json = JSON.parse(reassembled);
        callback(json); // Process your JSON object here
        jsonStr = ''; // Reset the JSON string accumulator if parsing was successful
      } catch (err) {
        jsonStr = reassembled; // If parsing failed, it's likely due to an incomplete JSON structure, so save it to be reassembled
      }
  
      const result = await reader?.read() || {value: "", done: false};
      chunk = result.value ? new TextDecoder("utf-8").decode(result.value as Uint8Array) : '';
      readerDone = result.done;
    }
  
    if (jsonStr) {
      // Process any remaining JSON string that wasn't completed in the loop
        jsonStr.trim().split('\n').forEach(obj => {
            try {
                let json = JSON.parse(obj);
                callback(json); // Process the final JSON object    
            } catch (err) {
                console.error('Error parsing final JSON chunk', err);
                console.log(jsonStr);
            }
        });
    }
  }