import { useEffect, useState } from "react";
import request from 'superagent';
import { prop } from "ts-functional";
import { Conversation, IChatResponse } from "./conversation";
import { useLoader } from "./userLoader";
import { Func } from "ts-functional/dist/types";

export const usePrompt = (systemMessage: string, onUpdate:Func<string, void>, jsonOnly?: boolean) => {
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
        request.post("http://localhost:11434/api/chat")
            .send({
                model: "llama2",
                messages,
                format: jsonOnly ? "json" : undefined,
                stream: false,
            })
            .set('accept', 'application/json')
            .then(prop("body"))
            .then((msg:IChatResponse) => {
                setMessage(msg.message.content);
            })
            .finally(loader.done);
    }

    useEffect(() => {
        if(!!message) {
            onUpdate(message);
        }
    }, [message]);

    return {message, run, isRunning: loader.isLoading};
}