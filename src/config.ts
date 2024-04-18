import { Index } from "ts-functional/dist/types";

export const models:Index<string[]> = {
    anthropic: ["claude-3-opus-20240229", "claude-3-sonnet-20240229", "claude-3-haiku-20240307"],
    ollama:    ["gemma",                  "llama2", "llama3",         "mistral", "mixtral"     ],
    openai:    ["gpt-4-0125-preview",     "gpt-4-1106-preview",       "gpt-3.5-turbo-0125"     ],
}

export const engines:string[] = Object.keys(models);
