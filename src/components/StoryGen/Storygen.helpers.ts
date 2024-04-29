import { prop } from "ts-functional";
import { Func, Index } from "ts-functional/dist/types";
import { useLocalStorage } from "unstateless";
import { IStoryOutline, StoryType } from "./story";

export const useIdea = useLocalStorage.string("storyIdea", "");

const botId = "You are an expert fiction ghost writer.";

const json = "Return the information in JSON.  Do NOT include any text other than the JSON response.  Do not include unneccessary whitespace.  Make sure that any control characters in string literals are properly encoded.  Return the JSON with the format ";

export const systemPrompts:Index<Func<StoryType, string>> = {
    sceneSummary: (_type:StoryType) => `${botId}  When the user gives you the text for a scene, create a detailed summary of the scene. ${json} {summary: string}`,
    chapterSummary: (_type:StoryType) => `${botId}  When the user gives you the summaries for scenes in a chapter, create a detailed summary of the chapter. ${json} {summary: string}`,
    actSummary: (_type:StoryType) => `${botId}  When the user gives you the summaries for chapters in an act, create a detailed summary of the act. ${json} {summary: string}`,
}

// Story info
export const storyInfo = (story:IStoryOutline) =>
    `Title: ${story.title}\nGenre: ${story.genre}\nTime Period: ${story.setting.timePeriod}\nThemes: ${story.themes.join(", ")}\nPlot Outline: ${story.plot.outline}\n`;
export const locationInfo = (story:IStoryOutline) =>
    `${story.setting.locations.map(location => `${location.name}: ${location.description}\n`).join("")}\n`;
export const characterInfo = (story:IStoryOutline) =>
    `${story.characters.map(char => `${Object.keys(char).map(att => `${att}: ${(char as any)[att]}`).join("\n")}\n`).join("\n\n")}`;

// Act outlines and summaries
export const previousActsSummary = (story:IStoryOutline, actIndex:number) =>
    story.plot.acts.slice(0, actIndex).map(prop("summary")).join(" ");
export const currentActOutline = (story:IStoryOutline, actIndex:number) =>
    story.plot.acts[actIndex].outline;
export const currentActDetails = (story:IStoryOutline, actIndex:number) =>
    (story.plot.acts[actIndex].chapters || []).map(prop("summary")).join("\n\n");
export const nextActsOutline = (story:IStoryOutline, actIndex:number) =>
    story.plot.acts.slice(actIndex + 1).map(prop("outline")).join(" ");

// Chapter outlines and summaries
export const previousChaptersSummary = (story:IStoryOutline, actIndex: number, chapterIndex:number) =>
    story.plot.acts[actIndex].chapters.slice(0, chapterIndex).map(prop("summary")).join(" ");
export const currentChapterOutline = (story:IStoryOutline, actIndex: number, chapterIndex:number) =>
    story.plot.acts[actIndex].chapters[chapterIndex].outline;
export const currentChapterDetails = (story:IStoryOutline, actIndex: number, chapterIndex:number) =>
    (story.plot.acts[actIndex].chapters[chapterIndex].scenes || []).filter(s => !!s.summary).map(prop("summary")).join("\n\n");
export const nextChaptersOutline = (story:IStoryOutline, actIndex: number, chapterIndex:number) =>
    story.plot.acts[actIndex].chapters.slice(chapterIndex + 1).map(prop("outline")).join(" ");

// Scene outlines and summaries
export const previousScenesSummary = (story:IStoryOutline, actIndex: number, chapterIndex:number, sceneIndex:number) =>
    story.plot.acts[actIndex].chapters[chapterIndex].scenes.slice(0, sceneIndex).map(prop("summary")).join(" ");
export const currentSceneOutline = (story:IStoryOutline, actIndex: number, chapterIndex:number, sceneIndex:number) =>
    story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].outline;
export const currentSceneDetails = (story:IStoryOutline, actIndex: number, chapterIndex:number, sceneIndex:number) =>
    story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats.map(prop("text")).join("\n\n");
export const nextScenesOutline = (story:IStoryOutline, actIndex: number, chapterIndex:number, sceneIndex:number) =>
    story.plot.acts[actIndex].chapters[chapterIndex].scenes.slice(sceneIndex + 1).map(prop("outline")).join(" ");

// Beat outlines and summaries
export const previousBeatsSummary = (story:IStoryOutline, actIndex: number, chapterIndex: number, sceneIndex:number, beatIndex:number) =>
    story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats.slice(0, beatIndex).map(prop("text")).join(" ");
export const currentBeatOutline = (story:IStoryOutline, actIndex: number, chapterIndex: number, sceneIndex:number, beatIndex:number) =>
    story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats[beatIndex].outline;
export const nextBeatsOutline = (story:IStoryOutline, actIndex: number, chapterIndex: number, sceneIndex:number, beatIndex:number) =>
    story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats.slice(beatIndex + 1).map(prop("outline")).join(" ");

export const userPrompts = {
    summary: {
        scene: (story:IStoryOutline, actIndex: number, chapterIndex: number, sceneIndex: number) => `
            Please summarize this scene:

            ${currentSceneDetails(story, actIndex, chapterIndex, sceneIndex)}
        `,
        chapter: (story:IStoryOutline, actIndex: number, chapterIndex: number) => `
            Please summarize this chapter based on the scene summaries:

            ${currentChapterDetails(story, actIndex, chapterIndex)}
        `,
        act: (story:IStoryOutline, actIndex: number) => `
            Please summarize this act based on the chapter summaries:

            ${currentActDetails(story, actIndex)}
        `,
    }
}

export const getLocation = (story:IStoryOutline, locationId:string) =>
    story.setting.locations.filter(l => l.id === locationId)[0]?.name || locationId;

export const getCharacter = (story:IStoryOutline, characterId:string) =>
    story.characters.filter(c => c.id === characterId)[0]?.name || characterId;
