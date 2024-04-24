import request from "superagent";
import { map, memoizePromise, partition, prop } from "ts-functional";
import { Index } from "ts-functional/dist/types";

export declare interface IOpenRouterModel {
    id: string;
    name: string;
    description: string;
    pricing: {
        prompt: string;
        completion: string;
        request: string;
        image: string;
    };
    context_length: number;
    architecture: {
        modality: string;
        tokenizer: string;
        instruct_type: string | null;
    };
    top_provider: {
        max_completion_tokens: number | null;
        is_moderated: boolean;
    };
    per_request_limits: {
        prompt_tokens: string;
        completion_tokens: string;
    } | null;
}

export declare interface IOpenRouterModelResponse {
    data: IOpenRouterModel[];
}

export declare interface IOllamaModelRaw {
    name: string;
    modified_at: string;
    size: number;
    digest: string;
    details: {
        format: string;
        family: string;
        families: string[] | null;
        parameter_size: string;
        quantization_level: string;
    }
}

export declare interface IOllamaModelResponse {
    models: IOllamaModelRaw[];
}

export declare  interface IOllamaModel extends IOllamaModelRaw {
    id: string;
}

export type Model = IOpenRouterModel | IOllamaModel;

export const availableModels:Index<() => Promise<Index<IOpenRouterModel[] | IOllamaModel[]>>> = {
    Ollama: memoizePromise(() => request.get("http://localhost:11434/api/tags")
        .then(prop("body"))
        .then(prop("models"))
        .then(map((m:IOllamaModelRaw):IOllamaModel => ({...m, id: m.name})))
        .then(models => partition<IOllamaModel>(
            m => m.details.family
        )(models)), {}),
    OpenRouter: memoizePromise(() => request.get("https://openrouter.ai/api/v1/models")
        .then(prop("body"))
        .then(prop("data"))
        .then(models => partition<IOpenRouterModel>(
            m => m.id.split("/")[0]
        )(models)), {}),
}

export const engines:string[] = Object.keys(availableModels);
