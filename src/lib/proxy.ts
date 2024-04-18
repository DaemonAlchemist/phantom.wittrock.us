import Anthropic from '@anthropic-ai/sdk';
import { MessageParam } from "@anthropic-ai/sdk/resources/messages.mjs";
import OpenAI from 'openai';
import { useEffect } from "react";
import request from 'superagent';
import { prop, switchOn } from "ts-functional";
import { Setter, useLocalStorage } from "unstateless";
import { engines, models } from "../config";
import { Conversation, IChatResponse } from "./conversation";

// LLM Engine hook
const useLLMEngine = useLocalStorage.string("llmEngine", Object.keys(models)[0]);
export const useEngine = ():[string, Setter<string>, string[]] => {
    const [engine, setEngine] = useLLMEngine();
    const options:string[] = engines;

    return [engine, setEngine, options];
}

export const needsApiKey = (engine:string) => engine !== "ollama";

export const useApiKey = (engine:string) => useLocalStorage.string(`apiKey-${engine}`, '');

const useLLMModel = useLocalStorage.string("llmModel", models[Object.keys(models)[0]][0]);
export const useModel = ():[string, Setter<string>, string[]] => {
    const [engine] = useLLMEngine();
    const [model, setModel] = useLLMModel();

    useEffect(() => {
        setModel(models[engine][0]);
    }, [engine]);

    return [model, setModel, models[engine]];
}

// Setup Anthropic API
const anthropic = () => {
    const { protocol, hostname, port } = window.location;
    const baseURL = `${protocol}//${hostname}${port ? `:${port}` : ''}/claude/`;
  
    return new Anthropic({
      apiKey: useApiKey("anthropic").getValue(),
      baseURL: baseURL,
    });
  };
  
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
