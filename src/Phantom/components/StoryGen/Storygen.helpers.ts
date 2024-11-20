import { prop } from "ts-functional";
import { useLocalStorage } from "unstateless";
import { IStoryOutline } from "./story";

export const useIdea = useLocalStorage.string("storyIdea", "");

// Story info
export const storyInfo = (story:IStoryOutline) =>
    `Title: ${story.title}\nGenre: ${story.genre}\nTime Period: ${story.setting.timePeriod}\nThemes: ${story.themes.join(", ")}\nPlot Outline: ${story.plot.outline}\n`;
export const locationInfo = (story:IStoryOutline) =>
    `${story.setting.locations.map(location => `${location.name}: ${location.description}\n`).join("")}\n`;
export const characterInfo = (story:IStoryOutline) =>
    `${story.characters.map(char => `${Object.keys(char).map(att => `${att}: ${(char as any)[att]}`).join("\n")}\n`).join("\n\n")}`;

// Act outlines and summaries
export const previousActsSummary = (story:IStoryOutline, actIndex?:number) => typeof actIndex !== "undefined"
    ? story.plot.acts.slice(0, actIndex).map(prop("summary")).join(" ")
    : "";
export const currentActOutline = (story:IStoryOutline, actIndex?:number) => typeof actIndex !== "undefined"
    ? story.plot.acts[actIndex].outline
    : "";
export const currentActDetails = (story:IStoryOutline, actIndex?:number) => typeof actIndex !== "undefined"
    ? (story.plot.acts[actIndex].chapters || []).map(prop("summary")).join("\n\n")
    : "";
export const nextActsOutline = (story:IStoryOutline, actIndex?:number) => typeof actIndex !== "undefined"
    ? story.plot.acts.slice(actIndex + 1).map(prop("outline")).join(" ")
    : "";

// Chapter outlines and summaries
export const previousChaptersSummary = (story:IStoryOutline, actIndex?: number, chapterIndex?:number) => typeof actIndex !== "undefined" && typeof chapterIndex !== "undefined"
    ? story.plot.acts[actIndex].chapters.slice(0, chapterIndex).map(prop("summary")).join(" ")
    : "";
export const currentChapterOutline = (story:IStoryOutline, actIndex?: number, chapterIndex?:number) =>  typeof actIndex !== "undefined" && typeof chapterIndex !== "undefined"
    ? story.plot.acts[actIndex].chapters[chapterIndex].outline
    : "";
export const currentChapterDetails = (story:IStoryOutline, actIndex?: number, chapterIndex?:number) =>  typeof actIndex !== "undefined" && typeof chapterIndex !== "undefined"
    ? (story.plot.acts[actIndex].chapters[chapterIndex].scenes || []).filter(s => !!s.summary).map(prop("summary")).join("\n\n")
    : "";
export const nextChaptersOutline = (story:IStoryOutline, actIndex?: number, chapterIndex?:number) =>  typeof actIndex !== "undefined" && typeof chapterIndex !== "undefined"
    ? story.plot.acts[actIndex].chapters.slice(chapterIndex + 1).map(prop("outline")).join(" ")
    : "";

// Scene outlines and summaries
export const previousScenesSummary = (story:IStoryOutline, actIndex?: number, chapterIndex?:number, sceneIndex?:number) => typeof actIndex !== "undefined" && typeof chapterIndex !== "undefined" && typeof sceneIndex !== "undefined"
    ? story.plot.acts[actIndex].chapters[chapterIndex].scenes.slice(0, sceneIndex).map(prop("summary")).join(" ")
    : "";
export const currentSceneOutline = (story:IStoryOutline, actIndex?: number, chapterIndex?:number, sceneIndex?:number) => typeof actIndex !== "undefined" && typeof chapterIndex !== "undefined" && typeof sceneIndex !== "undefined"
    ? story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].outline
    : "";
export const currentSceneDetails = (story:IStoryOutline, actIndex?: number, chapterIndex?:number, sceneIndex?:number) => typeof actIndex !== "undefined" && typeof chapterIndex !== "undefined" && typeof sceneIndex !== "undefined"
    ? story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats.map(prop("text")).join("\n\n")
    : "";
export const nextScenesOutline = (story:IStoryOutline, actIndex?: number, chapterIndex?:number, sceneIndex?:number) => typeof actIndex !== "undefined" && typeof chapterIndex !== "undefined" && typeof sceneIndex !== "undefined"
    ? story.plot.acts[actIndex].chapters[chapterIndex].scenes.slice(sceneIndex + 1).map(prop("outline")).join(" ")
    : "";

// Beat outlines and summaries
export const previousBeatsSummary = (story:IStoryOutline, actIndex?: number, chapterIndex?: number, sceneIndex?:number, beatIndex?:number) => typeof actIndex !== "undefined" && typeof chapterIndex !== "undefined" && typeof sceneIndex !== "undefined" && typeof beatIndex !== "undefined"
    ? story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats.slice(0, beatIndex).map(prop("text")).join(" ")
    : "";
export const currentBeatOutline = (story:IStoryOutline, actIndex?: number, chapterIndex?: number, sceneIndex?:number, beatIndex?:number) => typeof actIndex !== "undefined" && typeof chapterIndex !== "undefined" && typeof sceneIndex !== "undefined" && typeof beatIndex !== "undefined"
    ? story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats[beatIndex].outline
    : "";
export const nextBeatsOutline = (story:IStoryOutline, actIndex?: number, chapterIndex?: number, sceneIndex?:number, beatIndex?:number) => typeof actIndex !== "undefined" && typeof chapterIndex !== "undefined" && typeof sceneIndex !== "undefined" && typeof beatIndex !== "undefined"
    ? story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats.slice(beatIndex + 1).map(prop("outline")).join(" ")
    : "";

export const getLocation = (story:IStoryOutline, locationId:string) =>
    story.setting.locations.filter(l => l.id === locationId)[0]?.name || locationId;

export const getCharacter = (story:IStoryOutline, characterId:string) =>
    story.characters.filter(c => c.id === characterId)[0]?.name || characterId;
