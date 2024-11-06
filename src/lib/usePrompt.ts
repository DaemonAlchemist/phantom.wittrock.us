import { notification } from "antd";
import { useEffect, useState } from "react";
import { Func, Index } from "ts-functional/dist/types";
import { useLocalStorage } from "unstateless";
import { characterInfo, currentActDetails, currentActOutline, currentBeatOutline, currentChapterDetails, currentChapterOutline, currentSceneDetails, currentSceneOutline, locationInfo, nextActsOutline, nextBeatsOutline, nextChaptersOutline, nextScenesOutline, previousActsSummary, previousBeatsSummary, previousChaptersSummary, previousScenesSummary, storyInfo } from "../components/StoryGen/Storygen.helpers";
import { IStoryOutline } from "../components/StoryGen/story";
import { Conversation } from "./conversation";
import { notify } from "./notifications";
import { prompt } from "./proxy";
import { useLoader } from "./useLoader";
import { defaultPrompts } from "../config/defaultPrompts";

export const usePrompt = <T>(systemMessage: string, onUpdate:Func<T, void>, jsonOnly?: boolean, finishMsg?: string) => {
    const loader = useLoader();
    const [message, setMessage] = useState("");

    const run = (message:string, instructions?: string, starter:string = "") => () => {
        const messages:Conversation = [{
            role: "system",
            content: systemMessage,
        },{
            role: "user",
            content: !!instructions
                ? `${message}\n\nExtra instructions:  ${instructions}`
                : message,
        }, {
            role: "assistant",
            content: starter,
        }]
        loader.start();
        setMessage("");
        prompt(messages, jsonOnly)
            .then(m => setMessage(starter + m))
            .finally(loader.done);
    }

    useEffect(() => {
        if(!!message) {
            let fixedMessage:string = "";
            // Remove text before the start of the JSON
            const index = message.indexOf('{');
            fixedMessage = index !== -1 ? message.substring(index) : message;

            // Encode control characters in string literals
            const regex = /("[^"\\]*(\\.[^"\\]*)*"|'[^'\\]*(\\.[^'\\]*)*')/g;
            fixedMessage = fixedMessage.replace(regex, (match) => {
                return match.replace(/\n/g, "\\n");
            });

            try {
                notify(finishMsg || 'has completed its task.')
                onUpdate(JSON.parse(fixedMessage.trim()));
            } catch(e) {
                notification.error({message: `${e}`});
                console.log(e);
                console.log(fixedMessage);
            }
            setMessage("");
        }
    }, [message]);

    return {message, run, isRunning: loader.isLoading};
}

export const useRawPrompts = useLocalStorage.object<Index<string>>("userDefinedPrompts", defaultPrompts);
export const usePrompts = (id?:string) => {
    const [rawPrompts, setRawPrompts] = useRawPrompts();

    const updatePrompt = (fullId:string) => (prompt:string) => {
        setRawPrompts(old => ({
            ...old,
            [fullId]: prompt,
        }))
    }

    const prompts = {
        system: rawPrompts[`${id}.system`] || defaultPrompts[`${id}.system`],
        user:  rawPrompts[`${id}.user`] || defaultPrompts[`${id}.user`],
        raw: rawPrompts[id || ""],
    };

    const update = {
        system: updatePrompt(`${id}.system`),
        user: updatePrompt(`${id}.user`),
        raw: updatePrompt(id || ""),
    }

    return {prompts, update};
}

export declare interface IPromptParams {
    actIndex?:number;
    chapterIndex?:number;
    sceneIndex?:number;
    beatIndex?:number;
}

const _compilePrompt = (prompt:string, templates:Index<string | (() => string)>) =>
    Object.keys(templates).reduce(
        (curPrompt, id) => curPrompt.replace(
            `{{${id}}}`,
            typeof templates[id] === "string"
                ? templates[id]
                : (templates[id] as any)()
        ),
        prompt
    );

export const compilePrompt = (fullId:string, story:IStoryOutline, params:IPromptParams) => {
    const {actIndex, chapterIndex, sceneIndex, beatIndex} = params;

    let curPrompt = `{{${fullId}}}`;
    let oldPrompt = "";

    do {
        oldPrompt = curPrompt;

        curPrompt = _compilePrompt(curPrompt, {
            // Do prompt fragment replacements
            ...defaultPrompts,
            ...useRawPrompts.getValue(),

            // Do story data replacements
            "story.info":            storyInfo(              story),
            "story.locations":       locationInfo(           story),
            "story.characters":      characterInfo(          story),
            "previousActs":          previousActsSummary(    story, actIndex),
            "currentAct":            currentActOutline(      story, actIndex),
            "currentActDetails":     currentActDetails(      story, actIndex),
            "nextActs":              nextActsOutline(        story, actIndex),
            "previousChapters":      previousChaptersSummary(story, actIndex, chapterIndex),
            "currentChapter":        currentChapterOutline(  story, actIndex, chapterIndex),
            "currentChapterDetails": currentChapterDetails(  story, actIndex, chapterIndex),
            "nextChapters":          nextChaptersOutline(    story, actIndex, chapterIndex),
            "previousScenes":        previousScenesSummary(  story, actIndex, chapterIndex, sceneIndex),
            "currentScene":          currentSceneOutline(    story, actIndex, chapterIndex, sceneIndex),
            "currentSceneDetails":   currentSceneDetails(    story, actIndex, chapterIndex, sceneIndex),
            "nextScenes":            nextScenesOutline(      story, actIndex, chapterIndex, sceneIndex),
            "previousBeats":         previousBeatsSummary(   story, actIndex, chapterIndex, sceneIndex, beatIndex),
            "currentBeat":           currentBeatOutline(     story, actIndex, chapterIndex, sceneIndex, beatIndex),
            "nextBeats":             nextBeatsOutline(       story, actIndex, chapterIndex, sceneIndex, beatIndex),
        });
    } while(curPrompt !== oldPrompt);
 
    return curPrompt;
}