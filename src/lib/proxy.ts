import Anthropic from '@anthropic-ai/sdk';
import { MessageParam } from "@anthropic-ai/sdk/resources/messages.mjs";
import { notification } from 'antd';
import request from 'superagent';
import { prop, switchOn } from "ts-functional";
import { Func, Index } from 'ts-functional/dist/types';
import { Setter, useLocalStorage } from "unstateless";
import { IOllamaModel, IOpenRouterModel, availableModels, engines } from "../config";
import { Conversation, IChatResponse } from "./conversation";

export const useOllamaHost = useLocalStorage.string("ollamaHost", "localhost");
export const useOllamaPort = useLocalStorage.string("ollamaPort", "11434");

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
    Ollama: () => request.post(`http://${useOllamaHost.getValue()}:${useOllamaPort.getValue()}/api/chat`)
        .send({
            model: useLLMModelId.getValue(),
            messages,
            format: jsonOnly ? "json" : undefined,
            stream: false,
            options: {
                num_ctx: 16000,
            }
        })
        .set('accept', 'application/json')
        .then(prop("body"))
        .then((msg:IChatResponse):string => {
            return msg.message.content;
        }),
    OpenRouter: () => request.post("https://openrouter.ai/api/v1/chat/completions")
        .set('Authorization', `Bearer ${useApiKey("OpenRouter").getValue()}`)
        .send({
            model: useLLMModelId.getValue(),
            messages,
            ...(jsonOnly ? {response_format: {type: "json_object"}} : {})
        }).then((response:any) => {
            if(!!response.body.error) {
                const message = JSON.parse(response.body.error.message).error.message;
                console.log(`LLM Error: ${message}`);
                notification.error({message});
                return  "";
            }
            return (response.body.choices[0].message.content || "")
                .replace("```json", "")
                .replace("```", "");
        }).catch(e => {
            console.log("Error");
            const message = JSON.parse(JSON.stringify(e)).response.body.error.message;
            notification.error({message});
            return "";
        }),
    default: () => Promise.resolve(`Invalid LLM engine: ${useLLMEngine.getValue()}`),
}) || Promise.resolve("");
