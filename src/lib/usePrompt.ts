import { useEffect, useState } from "react";
import { Func } from "ts-functional/dist/types";
import { Conversation } from "./conversation";
import { prompt } from "./proxy";
import { useLoader } from "./userLoader";

export const usePrompt = <T>(systemMessage: string, onUpdate:Func<T, void>, jsonOnly?: boolean) => {
    const loader = useLoader();
    const [message, setMessage] = useState("");

    const run = (message:string) => () => {
        const messages:Conversation = [{
            role: "system",
            content: systemMessage,
        },{
            role: "user",
            content: message,
        }]
        loader.start();
        setMessage("");
        prompt(messages, jsonOnly)
            .then(setMessage)
            .finally(loader.done);
    }

    useEffect(() => {
        if(!!message) {
            onUpdate(JSON.parse(message));
            setMessage("");
        }
    }, [message]);

    return {message, run, isRunning: loader.isLoading};
}