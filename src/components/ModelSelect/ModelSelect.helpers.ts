import { useLocalStorage } from "unstateless";

export const useModelId = useLocalStorage.string("openRouterModelId", "");
