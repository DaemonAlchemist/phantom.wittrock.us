import { prop } from "ts-functional";
import { Index } from "ts-functional/dist/types";
import { useLocalStorage } from "unstateless";
import { IStoryOutline } from "./story";

export const useIdea = useLocalStorage.string("storyIdea", "");

const botId = "You are an expert fiction ghost writer.";

const json = "Return the information in JSON with the format";

const characterInterface = `{id: string, name: string, role: "main" | "supporting", physicalDescription: string, personality: string, backstory: string, storyArc: string, goals: string, motivations: string}`;
const charIdNotes = "The character's id should be a camel-cased id related to their name.";

export const systemPrompts:Index<string> = {
    outline: `${botId}  Your job is to help the user flesh out their story idea into a short story or novella.  When the user gives you a story idea, flesh it out into an more complete idea for a short story.  Do NOT include character details, or specific scene details.  The outline should focus more on a high level overview of the story as well as its themes rather than specific story and scene details.  ${json} {title: string, genre: string, themes: string[], plot: {outline: string}, setting: {timePeriod: string}}`,

    locations: `${botId}  Your job is to help the user flesh out the locations for their story.  When the user gives you the details for their story and some optional existing locations, create some additional locations that would be relevant to the story. Include a name, description, and unique camel-cased id for each location.  ${json} {locations: Array<{id: string, name: string, description: string;}>}`,

    mainCharacter: `${botId}  Your job is to help the user develop the main character for their story.  When the user gives you an outline for their story and optionally a basic description of the main character, flesh out the character's attributes, backstory, and story arc. ${json} ${characterInterface}. ${charIdNotes}`,

    supportingCharacters: `${botId}  Your job is to help the user develop some supporting characters for their story.  When the user gives you a story outline, and description of the main character, create a list of supporting characters for the story.  Include information on how the characters relate to each other and the main character and how they help drive the main character's story arc.  ${json} {characters: Array<${characterInterface}>}. ${charIdNotes}`,

    acts: `${botId}  Your job is to help the user flesh out their story idea into a full story.  When the user gives you a story outline, locations, and character descriptions, create a list of acts for the story.  Do not include the act number in the outline text. ${json} {acts: Array<{title: string, outline: string}>}`,

    chapters: `${botId}  Your job is to help the user flesh out their story's acts into chapters.  When the user gives you a story outline, locations, character descriptions, summaries of previous acts and chapters, and outlines for subsequent acts and chapters, create a list of chapters for the current act.  Do not include the chapter number in the outline text.  ${json} {chapters: Array<{title: string, outline: string}>}`,

    scenes: `${botId}  Your job is to help the user flesh out their story's chapters into scenes.  When the user gives you a story outline, locations, character descriptions, summaries of previous acts, chapters, and scenes, and outlines for subsequent acts, chapters, and scenes, create a list of scenes for the current chapter.  Do not include the scene number in the outline text.  ${json} {scenes: Array<{title: string, outline: string}>}`,

    beats: `${botId}  Your job is to help the user flesh out their story's scenes into beats.  When the user gives you a story outline, locations, character descriptions, summaries of previous acts, chapters, scenes, and beats, and outlines for subsequent acts, chapters, scenes and beats, create a list of beats for the current scene.  Do not include the beat number in the outline text.  ${json} {beats: Array<{title: string, outline: string}>}`,

    text: `${botId}  Your job is to help the user flesh out their story's beats into the story's final text.  When the user gives you a story outline, locations, character descriptions, summaries of previous acts, chapters, scenes, and beats, and outlines for subsequent acts, chapters, scenes and beats, create the final text for the current beat.  Write in the past tense.  Include new lines between paragraphs. Avoid purple prose. ${json} {text: string}`,

    sceneSummary: `${botId}  When the user gives you the text for a scene, create a detailed summary of the scene.`,
    chapterSummary: `${botId}  When the user gives you the summaries for scenes in a chapter, create a detailed summary of the chapter.`,
    actSummary: `${botId}  When the user gives you the summaries for chapters in an act, create a detailed summary of the act.`,
}

export const userPrompts = {
    locations: (story:IStoryOutline) => `
        Title: ${story.title}
        Genre: ${story.genre}
        Time Period: ${story.setting.timePeriod}
        Themes: ${story.themes.join(", ")}
        Plot Outline: ${story.plot.outline}
    `,
    mainCharacter: (story:IStoryOutline) => `
        Title: ${story.title}
        Genre: ${story.genre}
        Time Period: ${story.setting.timePeriod}
        Themes: ${story.themes.join(", ")},
    `,
    supportingCharacters: (story:IStoryOutline) => `
        Title: ${story.title}
        Genre: ${story.genre}
        Time Period: ${story.setting.timePeriod}
        Themes: ${story.themes.join(", ")},
        Main Character(s): ${JSON.stringify(story.characters.filter(c => c.role === "main"))},
    `,
    acts: (story:IStoryOutline) => `
        Title: ${story.title}
        Genre: ${story.genre}
        Time Period: ${story.setting.timePeriod}
        Themes: ${story.themes.join(", ")},
        Locations: ${JSON.stringify(story.setting.locations)},
        Character(s): ${JSON.stringify(story.characters)},
    `,
    chapters: (story:IStoryOutline, actIndex: number) => `
        Title: ${story.title}
        Genre: ${story.genre}
        Time Period: ${story.setting.timePeriod}
        Themes: ${story.themes.join(", ")},
        Locations: ${JSON.stringify(story.setting.locations)},
        Character(s): ${JSON.stringify(story.characters)},
        Summaries of previous acts: ${JSON.stringify(story.plot.acts.slice(0, actIndex).map(prop("summary")))},
        Outline of the current act (Create chapters for this act): ${story.plot.acts[actIndex].outline},
        Outlines of subsequent acts: ${JSON.stringify(story.plot.acts.slice(actIndex + 1).map(prop("outline")))}
    `,
    scenes: (story:IStoryOutline, actIndex: number, chapterIndex:number) => `
        Title: ${story.title}
        Genre: ${story.genre}
        Time Period: ${story.setting.timePeriod}
        Themes: ${story.themes.join(", ")},
        Locations: ${JSON.stringify(story.setting.locations)},
        Character(s): ${JSON.stringify(story.characters)},
        Summaries of previous acts: ${JSON.stringify(story.plot.acts.slice(0, actIndex).map(prop("summary")))},
        Outline of the current act: ${story.plot.acts[actIndex].outline},
        Summaries of previous chapters in this act: ${JSON.stringify(story.plot.acts[actIndex].chapters.slice(0, chapterIndex).map(prop("summary")))},
        Outline of the current chapter (Create scenes for this chapter): ${story.plot.acts[actIndex].chapters[chapterIndex].outline},
        Outlines of subsequent chapters in this act: ${JSON.stringify(story.plot.acts[actIndex].chapters.slice(chapterIndex + 1).map(prop("outline")))}
        Outlines of subsequent acts: ${JSON.stringify(story.plot.acts.slice(actIndex + 1).map(prop("outline")))}
    `,
    beats: (story:IStoryOutline, actIndex: number, chapterIndex:number, sceneIndex:number) => `
        Title: ${story.title}
        Genre: ${story.genre}
        Time Period: ${story.setting.timePeriod}
        Themes: ${story.themes.join(", ")},
        Locations: ${JSON.stringify(story.setting.locations)},
        Character(s): ${JSON.stringify(story.characters)},
        Summaries of previous acts: ${JSON.stringify(story.plot.acts.slice(0, actIndex).map(prop("summary")))},
        Outline of the current act: ${story.plot.acts[actIndex].outline},
        Summaries of previous chapters in this act: ${JSON.stringify(story.plot.acts[actIndex].chapters.slice(0, chapterIndex).map(prop("summary")))},
        Outline of the current chapter: ${story.plot.acts[actIndex].chapters[chapterIndex].outline},
        Summaries of previous scenes in this chapter: ${JSON.stringify(story.plot.acts[actIndex].chapters[chapterIndex].scenes.slice(0, sceneIndex).map(prop("summary")))},
        Outline of the current scene (Create beats for this scene): ${story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].outline},
        Outlines of subsequent scenes in this chapter: ${JSON.stringify(story.plot.acts[actIndex].chapters[chapterIndex].scenes.slice(sceneIndex + 1).map(prop("outline")))}
        Outlines of subsequent chapters in this act: ${JSON.stringify(story.plot.acts[actIndex].chapters.slice(chapterIndex + 1).map(prop("outline")))}
        Outlines of subsequent acts: ${JSON.stringify(story.plot.acts.slice(actIndex + 1).map(prop("outline")))}
    `,
    text: (story:IStoryOutline, actIndex: number, chapterIndex:number, sceneIndex:number, beatIndex: number) => `
        Title: ${story.title}
        Genre: ${story.genre}
        Time Period: ${story.setting.timePeriod}
        Themes: ${story.themes.join(", ")},
        Locations: ${JSON.stringify(story.setting.locations)},
        Character(s): ${JSON.stringify(story.characters)},
        Summaries of previous acts: ${JSON.stringify(story.plot.acts.slice(0, actIndex).map(prop("summary")))},
        Outline of the current act: ${story.plot.acts[actIndex].outline},
        Summaries of previous chapters in this act: ${JSON.stringify(story.plot.acts[actIndex].chapters.slice(0, chapterIndex).map(prop("summary")))},
        Outline of the current chapter: ${story.plot.acts[actIndex].chapters[chapterIndex].outline},
        Summaries of previous scenes in this chapter: ${JSON.stringify(story.plot.acts[actIndex].chapters[chapterIndex].scenes.slice(0, sceneIndex).map(prop("summary")))},
        Outline of the current scene: ${story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].outline},
        Text of the previous beats in this scene: ${JSON.stringify(story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats.slice(0, beatIndex).map(prop("text")).join("\n"))},
        Outline of the current beat in this scene (Write text for this beat): ${story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats[beatIndex].outline},
        Outlines of the subsequent beats in this scene: ${JSON.stringify(story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats.slice(beatIndex + 1).map(prop("outline")))},
        Outlines of subsequent scenes in this chapter: ${JSON.stringify(story.plot.acts[actIndex].chapters[chapterIndex].scenes.slice(sceneIndex + 1).map(prop("outline")))}
        Outlines of subsequent chapters in this act: ${JSON.stringify(story.plot.acts[actIndex].chapters.slice(chapterIndex + 1).map(prop("outline")))}
        Outlines of subsequent acts: ${JSON.stringify(story.plot.acts.slice(actIndex + 1).map(prop("outline")))}
    `,
}
