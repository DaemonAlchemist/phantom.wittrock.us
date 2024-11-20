import { Func } from "ts-functional/dist/types";

export const stringStream = (process:Func<string, string>):Func<string, string> =>
    (str:string) => 
        str.split("").reduce((combined, char) => 
            `${combined}${process(char)}`
    , "");

type StringDelim = '"' | "'" | null;
const processChar = (char: string): string => {
    let inString: StringDelim = null;
    let result = '';

    if (!!inString && ['"', "'"].includes(char)) {
        inString = null;
    } else if (!inString && ['"', "'"].includes(char)) {
        inString = char as StringDelim;
    }

    if (!!inString && char === "\n") {
        result += "\\n";
    } else if (!!inString && char === "\r") {
        result += "\\r";
    } else if (!!inString && char === "\t") {
        result += "\\t";
    } else if (char === "\\") {
        result += "\\\\";
    } else {
        result += char;
    }

    return result;
};

export const encodeControlCharactersInJsonStringLiterals = stringStream(processChar);
