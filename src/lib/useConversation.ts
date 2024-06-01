import { last } from "ts-functional";
import { Func } from "ts-functional/dist/types";
import { useLocalStorage } from 'unstateless';
import { Conversation, IChatResponse, IMessage } from "./conversation";
import { processStream } from './processStream';
import { useLoader } from "./useLoader";

export const useConversation = (id:string, initialMessages:Conversation = []):[Conversation, Func<string, Promise<any>>, () => void, boolean] => {
    const [conversation, setConversation] = useLocalStorage.object<Conversation>(id, initialMessages)();
    const loader = useLoader();
    const addMessage = (message:IMessage) => {
        setConversation(old => [...old, message]);
    }

    const updateLastMessage = (msg:IChatResponse) => {
        if(msg.done) { loader.done();}
        setConversation(old => [
            ...old.slice(0, -1),
            {
                role: last(old)?.role || "assistant",
                content: (last(old)?.content || "") + msg.message.content
            }
        ])
    }

    const clear = () => {setConversation([]);}

    const prompt = (content:string) => {
        loader.start();
        const message:IMessage = {role: "user", content};
        addMessage(message);
        addMessage({role: "assistant", content: ""});
        return processStream(
            "http://localhost:11434/api/chat",
            {
                model: "llama2",
                messages: [...conversation, message],
            },
            updateLastMessage
        ).finally(loader.done);
    }

    return [conversation, prompt, clear, loader.isLoading];
}