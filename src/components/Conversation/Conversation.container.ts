import { useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { useConversation } from "../../lib/useConversation";
import { ConversationComponent } from "./Conversation.component";
import { ConversationProps, IConversationInputProps, IConversationProps } from "./Conversation.d";

const injectConversationProps = createInjector(({id, initialConversation}:IConversationInputProps):IConversationProps => {
    const [prompt, setPrompt] = useState("");
    const clear = () => {setPrompt("");}
    const [conversation, sendMessage, clearConversation, isRunning] = useConversation(id, initialConversation);

    const run = () => {
        sendMessage(prompt).then(clear);
    }
    return {prompt, setPrompt, conversation, run, isRunning, clearConversation};
});

const connect = inject<IConversationInputProps, ConversationProps>(mergeProps(
    injectConversationProps,
));

export const Conversation = connect(ConversationComponent);
