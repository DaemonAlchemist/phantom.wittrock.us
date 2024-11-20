import { customPromptButton } from "@ATP/components/PromptButton/PromptButton.container";
import { IPromptParams, compilePrompt as baseCompile } from "@ATP/lib/usePrompt";
import {
    characterInfo, currentActDetails, currentActOutline, currentBeatOutline, currentChapterDetails, currentChapterOutline,
    currentSceneDetails, currentSceneOutline, locationInfo, nextActsOutline, nextBeatsOutline, nextChaptersOutline,
    nextScenesOutline, previousActsSummary, previousBeatsSummary, previousChaptersSummary, previousScenesSummary, storyInfo
} from "../components/StoryGen/Storygen.helpers";
import { useStoryRaw } from "./useStory";
import { customSummarizeButton } from "@ATP/components/SummarizeBtn/SummarizeBtn.container";

export const compilePrompt = (id:string, params:IPromptParams):string => {
    const {actIndex, chapterIndex, sceneIndex, beatIndex} = params;

    const story = useStoryRaw.getValue();

    const templates= {
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
    };

    return baseCompile(id, templates);
}

export const PromptButton = customPromptButton(compilePrompt);
export const SummarizeButton = customSummarizeButton(compilePrompt);