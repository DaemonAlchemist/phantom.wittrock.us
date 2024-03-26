import { Index } from "ts-functional/dist/types";
import { useLocalStorage } from "unstateless";
import { ICharacter, ISceneOutline } from "./StoryGen";
import { IStoryOutline } from "./story";

export const useIdea                 = useLocalStorage.string("storyIdea", "");
export const useOutline              = useLocalStorage.string("storyOutline", "");
export const useMainCharacter        = useLocalStorage.string("mainCharacter", "");
export const useSupportingCharacters = useLocalStorage.object<ICharacter[]>("supportingCharacters", []);
export const useSceneOutlines        = useLocalStorage.object<ISceneOutline[]>("sceneOutlines", []);
export const useSceneSummaries       = useLocalStorage.object<string[]>("sceneSummaries", []);
export const useSceneBeats           = useLocalStorage.object<string[][]>("sceneBeats", []);
export const useSceneText            = useLocalStorage.object<string[]>("sceneText", []);

const botId = "You are an expert short story ghost writer.";

const json = "Return the information in JSON with the format";

const characterInterface = `{id: string, name: string, role: "main" | "supporting", physicalDescription: string, personality: string, backstory: string, storyArc: string, goals: string, motivations: string}`;
const charIdNotes = "The character's id should be a camel-cased id related to their name.";

export const systemPrompts:Index<string> = {
    outline: `${botId}  Your job is to help the user flesh out their story idea into a short story or novella.  When the user gives you a story idea, flesh it out into an more complete idea for a short story.  Do NOT include character details, or specific scene details.  The outline should focus more on a high level overview of the story as well as its themes rather than specific story and scene details.  ${json} {title: string, genre: string, themes: string[], plot: {outline: string}, setting: {timePeriod: string}}`,

    locations: `${botId}  Your job is to help the user flesh out the locations for their story.  When the user gives you the details for their story and some optional existing locations, create some additional locations that would be relevant to the story. Include a name, description, and unique camel-cased id for each location.  ${json} {locations: Array<{id: string, name: string, description: string;}>}`,

    mainCharacter: `${botId}  Your job is to help the user develop the main character for their story.  When the user gives you an outline for their story and optionally a basic description of the main character, flesh out the character's attributes, backstory, and story arc. ${json} ${characterInterface}. ${charIdNotes}`,

    supportingCharacters: `${botId}  Your job is to help the user develop some supporting characters for their story.  When the user gives you a story outline, and description of the main character, create a list of supporting characters for the story.  Include information on how the characters relate to each other and the main character and how they help drive the main character's story arc.  ${json} {characters: Array<${characterInterface}>}. ${charIdNotes}`,

    // Notes:  Consider adding additional fields:  conflict, emotional  journey, goals, motivations, etc.
    sceneOutline: `${botId}  Your job is to help the user flesh out a story outline into scene descriptions.  When the user gives you a story outline, and character descriptions, create a scene list for the short story.  The list should include a brief description of the scene, which characters are involved, and what needs to be accomplished in the scene in order to advance the main character's story arc.  Generate outlines for every scene in the story, from the beginning until the end.  ${json} {scenes: Array<{outline: string, characters: string[]}>}`,

    sceneSummary: `${botId}  When the user gives you the text for a scene, create a detailed summary of the scene.`,

    // Note: llama2 does note seem to understand this prompt.  Keeps returning scene outlines for the entire story.  Perhaps context is too short?
    sceneBeats: `${botId}  Your job is to help the user generate the beats for a scene in the user's story.  When the user gives you an outline for the story, character descriptions, summaries of previous scenes, a short outline of the current scene, and short outlines for the following scenes, create a list of beats for the current scene.  Make sure the beats are ONLY for the current scene, and fully expand the short summary for the current scene into a complete list of beats.  Do not generate beats for previous or subsequent scenes.  ${json} {beats: string[]}`,

    sceneText: `${botId}  Your job is to help the user flesh out the beats of a scene into final paragraphs of text.  When the user gives you an outline for the story, charater descriptions, summaries of previous scene, an outline for the current scene, the current text of the scene, the current beat, the subsequent beats of the scene, and the outlines of the subsequent scenes, write the final text of the story.`,
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
}
