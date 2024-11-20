import { Setter } from "unstateless";
import { Conversation } from "@ATP/lib/conversation";

export declare interface IConversationProps {
    prompt: string;
    setPrompt: Setter<string>;
    conversation: Conversation;
    run: () => void;
    isRunning: boolean;
    clearConversation: () => void;
}

// What gets passed into the component from the parent as attributes
export declare interface IConversationInputProps {
    id: string;
    initialConversation: Conversation;
}

export type ConversationProps = IConversationInputProps & IConversationProps;