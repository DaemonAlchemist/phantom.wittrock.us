
export const saveData = (fields:string[]) => (fileName:string):Promise<void> => new Promise((resolve, _reject) => {
    const data: Record<string, string> = {};
    
    // Extract specified fields from localStorage
    fields.forEach(field => {
        const value = localStorage.getItem(field);
        if (value !== null) {
            data[field] = value;
        }
    });

    // Convert the data object to a JSON string
    const jsonData = JSON.stringify(data);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a download link and trigger a download
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${fileName}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    
    // Cleanup
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);

    resolve();
});

export const loadData = ():Promise<Record<string, any>> => new Promise((resolve, _reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const text = ev.target?.result;
                let data: Record<string, any> = {};
                if (typeof text === 'string') {
                    data = JSON.parse(text);
                    
                    // Store each value back to localStorage
                    Object.keys(data).forEach(key => {
                        localStorage.setItem(key, data[key]);
                    });
                }

                resolve(data);
            };
            reader.readAsText(file);
        }
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
});
