import { prop, switchOn } from "ts-functional";
import { Conversation, IChatResponse } from "./conversation";
import request from 'superagent';
import OpenAI from 'openai';
import { Setter, useLocalStorage } from "unstateless";
import Anthropic from '@anthropic-ai/sdk';
import { MessageParam } from "@anthropic-ai/sdk/resources/messages.mjs";
import { Index } from "ts-functional/dist/types";
import { useEffect } from "react";

// LLM Engine hook
const useLLMEngine = useLocalStorage.string("llmEngine", "anthropic");
export const useEngine = ():[string, Setter<string>, string[]] => {
    const [engine, setEngine] = useLLMEngine();
    const options:string[] = ["ollama", "openai", "anthropic"];

    return [engine, setEngine, options];
}

export const needsApiKey = (engine:string) => engine !== "ollama";

export const useApiKey = (engine:string) => useLocalStorage.string(`apiKey-${engine}`, '');

const useLLMModel = useLocalStorage.string("llmModel", "llama2");
export const useModel = ():[string, Setter<string>, string[]] => {
    const [engine] = useLLMEngine();
    const [model, setModel] = useLLMModel();
    const options:Index<string[]> = {
        ollama:    ["gemma",                  "llama2", "mistral",        "mixtral"                ],
        openai:    ["gpt-4-0125-preview",     "gpt-4-1106-preview",       "gpt-3.5-turbo-0125"     ],
        anthropic: ["claude-3-opus-20240229", "claude-3-sonnet-20240229", "claude-3-haiku-20240307"],
    }

    useEffect(() => {
        setModel(options[engine][0]);
    }, [engine]);

    return [model, setModel, options[engine]];
}

// Setup Anthropic API
const anthropic = () => new Anthropic({
  apiKey: useApiKey("anthropic").getValue(),
  baseURL: "http://localhost:5173/claude/",
});

// Setup OpenAI API
const openai = () => new OpenAI({
    apiKey: useApiKey("openai").getValue(),
    dangerouslyAllowBrowser: true,
});

const callAnthropic = (messages:Conversation, prefixMsg: string):Promise<string> => anthropic().messages.create({
    model: useLLMModel.getValue(),
    max_tokens: 4096,
    system: messages.filter(m => m.role === "system").map(prop("content")).join(" "),
    messages: [
        ...messages.filter(m => m.role !== "system") as MessageParam[],
        {role: "assistant", content: prefixMsg}
    ],
  }).then(response => {
    console.log(response);
    const newMessage = prefixMsg + (response.content[0].text || "}");
    if(response.stop_reason === "max_tokens") {
        return callAnthropic(messages, newMessage)
            .then(msg => {
                return newMessage + msg;
            });
    } else {
        return newMessage;
    }
  })

export const prompt = (messages:Conversation, jsonOnly?:boolean):Promise<string> => switchOn(useLLMEngine.getValue(), {
    anthropic: () => callAnthropic(messages, "{"),
    ollama: () => request.post("http://localhost:11434/api/chat")
        .send({
            model: useLLMModel.getValue(),
            messages,
            format: jsonOnly ? "json" : undefined,
            stream: false,
        })
        .set('accept', 'application/json')
        .then(prop("body"))
        .then((msg:IChatResponse):string => {
            return msg.message.content;
        }),
    openai: () => openai().chat.completions.create({
        messages,
        model: useLLMModel.getValue(),
        response_format: { type: "json_object" },
      }).then(response => {
        console.log(response);
        return response.choices[0].message.content || "";
      }),
    default: () => Promise.resolve(`Invalid LLM engine: ${useLLMEngine.getValue()}`),
}) || Promise.resolve("");
