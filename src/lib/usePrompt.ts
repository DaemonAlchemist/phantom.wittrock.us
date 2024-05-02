import { notification } from "antd";
import { useEffect, useState } from "react";
import { Func, Index } from "ts-functional/dist/types";
import { useLocalStorage } from "unstateless";
import { characterInfo, currentActDetails, currentActOutline, currentBeatOutline, currentChapterDetails, currentChapterOutline, currentSceneDetails, currentSceneOutline, locationInfo, nextActsOutline, nextBeatsOutline, nextChaptersOutline, nextScenesOutline, previousActsSummary, previousBeatsSummary, previousChaptersSummary, previousScenesSummary, storyInfo } from "../components/StoryGen/Storygen.helpers";
import { IStoryOutline } from "../components/StoryGen/story";
import { Conversation } from "./conversation";
import { notify } from "./notifications";
import { prompt } from "./proxy";
import { useLoader } from "./userLoader";

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

export const defaultPrompts:Index<string> = {
    // System prompt fragments
    "idea": "",

    "botId": "You are an expert fiction ghost writer.",

    "json": "Return the information in JSON.  Do NOT include any text other than the JSON response.  Do not include unneccessary whitespace.  Make sure that any control characters in string literals are properly encoded.  Return the JSON with the format ",

    "styleGuide": "Write in the past tense. Show, don't tell. Use dialog whenever possible.  Do not summarize or talk about what a character is saying.  Have them actually say it directly. Avoid overly flowery prose. Avoid purple prose. Avoid overuse of adjectives and adverbs. Provide depth to all characters, not just the main character(s). All acts, chapters, scenes, and beats should have a purpose, whether it's advancing the plot, developing characters, or enriching the setting. Use realistic dialog. Include new lines between paragraphs.",

    // Outline prompt fragments
    "outline.interface": `{title: string, genre: string, audience: string, length: "Short Story" | "Novella" | "Novel", ending: string, themes: string[], plot: {outline: string}, setting: {timePeriod: string}}`,

    "outline.system": `{{botId}}  Your job is to help the user flesh out their story idea into a short story, novella, or novel.  When the user gives you a story idea, flesh it out into an more complete idea for a story.  Do NOT include character details, or specific scene details.  The outline should focus more on a high level overview of the story as well as its themes. Be specific about what happens during the story and ending.  {{json}} {{outline.interface}}`,

    "outline.user": `{{idea}}`,

    "story.details.full": "Here are the details for my story:\n{{story.info}}\nHere are the locations for my story:\n{{story.locations}}\nHere are the characters for my story:\n{{story.characters}}\n",

    // Location prompt fragments
    "locations.interface": "{locations: Array<{id: string, name: string, description: string;}>}",

    "locations.system": "{{botId}}  Your job is to help the user flesh out the locations for their story.  When the user gives you the details for their story and some optional existing locations, create some additional locations that would be relevant to the story. Include a name, description, and unique camel-cased id for each location.  {{json}} {{locations.interface}}",

    "locations.user": "Here are the details for my story:\n{{story.info}}",

    // Character prompt fragments
    "characters.interface": `{characters: Array<{id: string, name: string, role: "main" | "supporting" | "minor", physicalDescription: string, personality: string, genderIdentity: "Male" | "Female" | "Non-binary" | "Gender fluid", ethnicity: string, identifying marks: string, quirks: string, backstory: string, storyArc: string, goals: string, motivations: string}>`,

    "character.gen.notes": "The character's id should be a camel-cased id related to their name.  If characters have been defined in the story outline but do not exist yet, generate them first.  Generate full names for the characters.",

    "characters.main.system": "{botId}}  Your job is to help the user develop the main character for their story.  When the user gives you an outline for their story and optionally a basic description of the main character, flesh out the character's attributes, backstory, and story arc. {{json}} {{characters.interface}} {{character.gen.notes}}",

    "characters.main.user": "Here are the details for my story:\n{{story.info}}\n\nHere are the existing characters for my story:\n{{story.characters}}\n",

    "characters.supporting.system": `{{botId}}  Your job is to help the user develop some supporting characters for their story.  When the user gives you a story outline, and list of existing characters, create a list of supporting characters for the story.  Include information on how the characters relate to each other and the main character and how they help drive the main character's story arc. {{json}} {{characters.interface}} {{character.gen.notes}}`,

    "characters.supporting.user": "Here are the details for my story:\n{{story.info}}\n\nHere are the existing characters for my story:\n{{story.characters}}\n",

    "characters.minor.system": `{{botId}}  Your job is to help the user develop some minor characters for their story.  When the user gives you a story outline, and list of existing characters, create a list of minor characters for the story.  These are characters that will only appear in a scene or two.  Include information on how the characters relate to each other and the main character and how they help drive the main character's story arc. {{json}} {{characters.interface}} {{character.gen.notes}}`,

    "characters.minor.user": "Here are the details for my story:\n{{story.info}}\n\nHere are the existing characters for my story:\n{{story.characters}}\n",

    // Act prompt fragments
    "acts.interface": "{acts: Array<{title: string, outline: string, chapters: Array<{title: string, outline: string}>}>}",

    "acts.system": "{{botId}}  Your job is to help the user flesh out their story idea into a full story.  When the user gives you a high level story outline, locations, and character descriptions, create a detailed outline of acts and chapters for the story.  Use an appropriate number of acts for the length of the story.  The acts and chapters should all have a purpose and should move the story along.  Acts and chapters should not be repetitive and should NOT rehash the same points.  The outlines should be factual.  Include what happens and explain how it moves the story and character arcs along.  Do not include the act number or chapter number in the outline texts. {{json}} {{acts.interface}}",

    "acts.user": "{{story.details.full}}\nPlease outline the acts and chapters for my story.  Return the JSON with this format: {{acts.interface}}",

    // Chapter prompt fragments
    "chapters.interface": "{chapters: Array<{title: string, outline: string}>}",

    "chapters.system": "{{botId}}  Your job is to help the user flesh out their story's acts into chapters.  When the user gives you a story outline, locations, character descriptions, summaries of previous acts and chapters, and outlines for subsequent acts and chapters, create a list of chapters for the current act.  Use an appropriate number of chapters for the story length.  A novel should have several chapters per act, while a short story may only have a few or even one.  The chapter outlines should fully develop the act's outline, and transition well from previous chapters and into subsequent chapters.  Do not include the chapter number in the outline text. {{json}} {{chapters.interface}}",

    "chapters.user": "{{story.details.full}}\nSummaries of previous acts: {{previousActs}}\nOutline of the current act (Create chapters for this act): {{currentAct}}\nOutlines of subsequent acts: {{nextActs}}",

    // Scene prompt fragments
    "scenes.interface": "{scenes: Array<{title: string, outline: string, locationId: string, characterIds: string[]}>}",

    "scenes.system": "{{botId}}  Your job is to help the user flesh out their story's chapters into scenes.  When the user gives you a story outline, locations, character descriptions, summaries of previous acts, chapters, and scenes, and outlines for subsequent acts, chapters, and scenes, create a list of scenes for the current chapter.  Use an appropriate number of scenes for the story length.  A novel may have several scenes per chapter, while a short story may only have a few or even one.  The scenes should include all of the elements of the chapter, but should NOT include elements or previous or subsequent chapters.  The scenes should all have a purpose and should move the story along.  Scenes should not be repetitive and should NOT rehash the same points.  The outlines should be factual.  Include what happens and explain how it moves the story and character arcs along.  Do not include the scene number in the outline text. {{json}} {{scenes.interface}}",

    "scenes.user": "{{story.details.full}}\nSummaries of previous acts: {{previousActs}}\nOutline of the current act: {{currentAct}}\nSummaries of previous chapters in this act: {{previousChapters}}\nOutline of the current chapter (Create scenes for this chapter): {{currentChapter}}\nOutlines of subsequent chapters in this act: {{nextChapters}}\nOutlines of subsequent acts: {{nextActs}}\nCreate scenes for the specified chapter.  If this is the first chapter of the story, be sure the scenes setup the story and main character(s).  Return the JSON with the format {{scenes.interface}}",

    // Beat prompt fragments
    "beats.interface": "{beats: Array<{title: string, outline: string}>}",

    "beats.system": "{{botId}}  Your job is to help the user flesh out their story's scenes into beats.  When the user gives you a story outline, locations, character descriptions, summaries of previous acts, chapters, scenes, and beats, and outlines for subsequent acts, chapters, scenes and beats, create a list of beats for the current scene.  The beats should all have a purpose and should move the scene along.  Beats should not be repetitive and should NOT rehash the same points.  The beats should include all of the elements of the scene, but should NOT include elements of previous or subsequent scenes.  Make sure the beats of a scene flow into each other without abrupt transitions.  Beats should be short, and consist of a single thought.  The first beats should setup the scene and/or transition smoothly from the previous scene.  The last beats should wrap up the current scene and/or provide a transition into the next scene.  Do not include the beat number in the outline text. {{json}} {{beats.interface}}",

    "beats.user": "{{story.details.full}}\nSummaries of previous acts: {{previousActs}}\nOutline of the current act: {{currentAct}}\nSummaries of previous chapters in this act: {{previousChapters}}\nOutline of the current chapter: {{currentChapter}}\nSummaries of previous scenes in this chapter: {{previousScenes}}\nOutline of the current scene (Create beats for this scene): {{currentScene}}\nOutlines of subsequent scenes in this chapter:{{nextScenes}}\nOutlines of subsequent chapters in this act: {{nextChapters}}\nOutlines of subsequent acts: {{nextActs}}\nCreate beats for the specified scene. If this is the first scene in the story, be sure the beats setup the story and main character(s). If this is the first scene in the chapter, be sure the beats do a good job setting up the chapter. Return the JSON with the format {{beats.interface}}",

    // Prose prompt fragments
    "prose.interface": " {text: string}",

    "prose.system": "{{botId}}  Your job is to help the user flesh out their story's beats into the story's final text.  When the user gives you a story outline, locations, character descriptions, summaries of previous acts, chapters, scenes, and beats, and outlines for subsequent acts, chapters, scenes and beats, create the final text for the current beat. Include text ONLY for the current beat, and not any previous or subsequent beats.  Make sure the text for the beat flows naturally from the previous beat and into the next beat without abrupt transitions. {{json}} {{prose.interface}}",

    "prose.user": "{{story.details.full}}\nSummaries of previous acts: {{previousActs}}\nOutline of the current act: {{currentAct}}\nSummaries of previous chapters in this act: {{previousChapters}}\nOutline of the current chapter: {{currentChapter}}\nSummaries of previous scenes in this chapter: {{previousScenes}}\nOutline of the current scene: {{currentScene}}\nText of the previous beats in this scene: {{previousBeats}}\nOutline of the current beat in this scene (Write text for this beat): {{currentBeat}}\nOutlines of the subsequent beats in this scene: {{nextBeats}}\nOutlines of subsequent scenes in this chapter:{{nextScenes}}\nOutlines of subsequent chapters in this act: {{nextChapters}}\nOutlines of subsequent acts: {{nextActs}}\nWrite the prose for the specified beat.\nStyle guide: {{styleGuide}}\nIf this is the first beat in the scene, so be sure it properly sets up the scene and/or provides a proper transition from the previous scene. If this is the last beat in the scnee, so be sure it provides a proper transition into the next scene. Return the JSON with the format {{prose.interface}}",

    // Summarize prompt fragments
    "summary.interface": "{summary: string}",

    "scene.summary.system": "{{botId}}  When the user gives you the text for a scene, create a detailed summary of the scene. {{json}} {{summary.interface}}",
    "scene.summary.user": "Please summarize this scene: {{currentSceneDetails}}",

    "chapter.summary.system": "{{botId}}  When the user gives you the summaries for scenes in a chapter, create a detailed summary of the chapter. {{json}} {{summary.interface}}",
    "chapter.summary.user": "Please summarize this chapter based on the scene summaries: {{currentChapterDetails}}",

    "act.summary.system": "{{botId}}  When the user gives you the summaries for chapters in an act, create a detailed summary of the act. {{json}} {{summary.interface}}",
    "act.summary.user": "Please summarize this act based on the chapter summaries: {{currentActDetails}}",
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

export const finalPrompt = (fullId:string, story:IStoryOutline, params:IPromptParams) => {
    const {actIndex, chapterIndex, sceneIndex, beatIndex} = params;

    let curPrompt = useRawPrompts.getValue()[fullId] || defaultPrompts[fullId];
    let oldPrompt = "";

    do {
        // Do prompt fragment replacements
        oldPrompt = curPrompt;
        curPrompt = Object.keys(defaultPrompts).reduce(
            (curStr, id) => curStr.replace(`{{${id}}}`, useRawPrompts.getValue()[id] || defaultPrompts[id]),
            curPrompt
        )

        // Do story data replacements
        curPrompt = curPrompt.replace("{{story.info}}", storyInfo(story));
        curPrompt = curPrompt.replace("{{story.locations}}", locationInfo(story))
        curPrompt = curPrompt.replace("{{story.characters}}", characterInfo(story));
        if(typeof actIndex !== "undefined") {
            curPrompt = curPrompt.replace("{{previousActs}}", previousActsSummary(story, actIndex));
            curPrompt = curPrompt.replace("{{currentAct}}", currentActOutline(story, actIndex));
            curPrompt = curPrompt.replace("{{currentActDetails}}", currentActDetails(story, actIndex));
            curPrompt = curPrompt.replace("{{nextActs}}", nextActsOutline(story, actIndex));
            if(typeof chapterIndex !== "undefined") {
                curPrompt = curPrompt.replace("{{previousChapters}}", previousChaptersSummary(story, actIndex, chapterIndex));
                curPrompt = curPrompt.replace("{{currentChapter}}", currentChapterOutline(story, actIndex, chapterIndex));
                curPrompt = curPrompt.replace("{{currentChapterDetails}}", currentChapterDetails(story, actIndex, chapterIndex));
                curPrompt = curPrompt.replace("{{nextChapters}}", nextChaptersOutline(story, actIndex, chapterIndex));
                if(typeof sceneIndex !== "undefined") {
                    curPrompt = curPrompt.replace("{{previousScenes}}", previousScenesSummary(story, actIndex, chapterIndex, sceneIndex));
                    curPrompt = curPrompt.replace("{{currentScene}}", currentSceneOutline(story, actIndex, chapterIndex, sceneIndex));
                    curPrompt = curPrompt.replace("{{currentSceneDetails}}", currentSceneDetails(story, actIndex, chapterIndex, sceneIndex));
                    curPrompt = curPrompt.replace("{{nextScenes}}", nextScenesOutline(story, actIndex, chapterIndex, sceneIndex));
                    if(typeof beatIndex !== "undefined") {
                        curPrompt = curPrompt.replace("{{previousBeats}}", previousBeatsSummary(story, actIndex, chapterIndex, sceneIndex, beatIndex));
                        curPrompt = curPrompt.replace("{{currentBeat}}", currentBeatOutline(story, actIndex, chapterIndex, sceneIndex, beatIndex));
                        curPrompt = curPrompt.replace("{{nextBeats}}", nextBeatsOutline(story, actIndex, chapterIndex, sceneIndex, beatIndex));
                    }
                }
            }
        }
    } while(curPrompt !== oldPrompt);

    return curPrompt;
}