import Anthropic from '@anthropic-ai/sdk';
import { MessageParam } from "@anthropic-ai/sdk/resources/messages.mjs";
import request from 'superagent';
import { prop, switchOn } from "ts-functional";
import { Func, Index } from 'ts-functional/dist/types';
import { Setter, useLocalStorage } from "unstateless";
import { IOllamaModel, IOpenRouterModel, availableModels, engines } from "../config";
import { Conversation, IChatResponse } from "./conversation";

// LLM Engine hook
const useLLMEngine = useLocalStorage.string("llmEngine", Object.keys(availableModels)[0]);
export const useEngine = ():[string, Setter<string>, string[]] => {
    const [engine, setEngine] = useLLMEngine();
    const [, setModel] = useLLMModelId();
    const options:string[] = engines;

    const updateEngine = (newEngine:string | Func<string, string>) => {
        setEngine(newEngine);
        setModel("");
    }

    return [engine, updateEngine, options];
}

export const needsApiKey = (engine:string) => engine !== "Ollama";

export const useApiKey = (engine:string) => useLocalStorage.string(`apiKey-${engine}`, '');

const useLLMModelId = useLocalStorage.object<string>("llmModel", "");
export const useModel = ():[string, Setter<string>, Promise<Index<IOllamaModel[] | IOpenRouterModel[]>>] => {
    const [engine] = useLLMEngine();
    const [modelId, setModelId] = useLLMModelId();

    return [modelId, setModelId, availableModels[engine]()];
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
  
const callAnthropic = (messages:Conversation, prefixMsg: string):Promise<string> => anthropic().messages.create({
    model: useLLMModelId.getValue(),
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
    Ollama: () => request.post("http://localhost:11434/api/chat")
        .send({
            model: useLLMModelId.getValue(),
            messages,
            format: jsonOnly ? "json" : undefined,
            stream: false,
        })
        .set('accept', 'application/json')
        .then(prop("body"))
        .then((msg:IChatResponse):string => {
            return msg.message.content;
        }),
    OpenRouter: () => request.post("https://openrouter.ai/api/v1/chat/completions")
        .set('Authorization', useApiKey("openRouter").getValue())
        .set('ContentType', 'application/json')
        .send({
            model: useLLMModelId.getValue(),
            messages,
            ...(jsonOnly ? {response_format: {type: "json_object"}} : {})
        }).then((response:any) => {
            const msg = response.choices[0].message.content || "";
            console.log("OpenRouter response");
            console.log(msg);
            return msg;
        }),
    default: () => Promise.resolve(`Invalid LLM engine: ${useLLMEngine.getValue()}`),
}) || Promise.resolve("");
