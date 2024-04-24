import { useEffect, useState } from "react";
import { Func } from "ts-functional/dist/types";
import { Conversation } from "./conversation";
import { prompt } from "./proxy";
import { useLoader } from "./userLoader";
import { encodeControlCharactersInJsonStringLiterals } from "./stringStream";
import { notification } from "antd";

export const usePrompt = <T>(systemMessage: string, onUpdate:Func<T, void>, jsonOnly?: boolean) => {
    const loader = useLoader();
    const [message, setMessage] = useState("");

    const run = (message:string, instructions?: string, starter:string = "") => () => {
        const messages:Conversation = [{
            role: "system",
            content: systemMessage,
        },{
            role: "user",
            content: !!instructions
                ? `${message}\n\nExtra instructions:  ${instructions}`
                : message,
        }, {
            role: "assistant",
            content: starter,
        }]
        loader.start();
        setMessage("");
        prompt(messages, jsonOnly)
            .then(m => setMessage(starter + m))
            .finally(loader.done);
    }

    useEffect(() => {
        if(!!message) {
            const fixedMessage = encodeControlCharactersInJsonStringLiterals(message);
            // console.log("Final message");
            // console.log(message);
            // console.log(fixedMessage);
            try {
                console.log(fixedMessage);
                onUpdate(JSON.parse(fixedMessage));
            } catch(e) {
                console.log(e);
                notification.error({message: `${e}`});
            }
            setMessage("");
        }
    }, [message]);

    return {message, run, isRunning: loader.isLoading};
}
