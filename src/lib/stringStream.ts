import { Func } from "ts-functional/dist/types";
export declare type Func<A, B> = (obj:A) => B;
export const stringStream = (process:Func<string, string>):Func<string, string> =>
    (str:string) => 
        str.split("").reduce((combined, char) => 
            `${combined}${process(char)}`
    , "");

type StringDelim = '"' | "'" | null;
export const encodeControlCharactersInJsonStringLiterals = (json:string) => {
    let inString:'"' | "'" | null = null;
    let escaped = false;
    return stringStream((char:string) => {
        if(!escaped && !inString && ['"', "'"].includes(char)) {inString = char as StringDelim;}
        if(!escaped &&  inString && ['"', "'"].includes(char)) {inString = null;}

        if(!!inString && char === "\n") {char = "\\n";}
        if(!!inString && char === "\r") {char = "\\r";}
        if(!!inString && char === "\t") {char = "\\t";}

        escaped = char === "\\" && !escaped;

        return char;
    })(json);
}