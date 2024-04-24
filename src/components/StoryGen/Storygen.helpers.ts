import { prop } from "ts-functional";
import { Func, Index } from "ts-functional/dist/types";
import { useLocalStorage } from "unstateless";
import { IStoryOutline, StoryType } from "./story";

export const useIdea = useLocalStorage.string("storyIdea", "");

const botId = "You are an expert fiction ghost writer.";

const json = "Return the information in JSON.  Do NOT include any text other than the JSON response.  Do not include unneccessary whitespace.  Make sure that any control characters in string literals are properly encoded.  Return the JSON with the format";

const characterInterface = `{id: string, name: string, role: "main" | "supporting" | "minor", physicalDescription: string, personality: string, genderIdentity: "Male" | "Female" | "Non-binary" | "Gender fluid", ethnicity: string, identifying marks: string, quirks: string, backstory: string, storyArc: string, goals: string, motivations: string}`;

const characterGenNotes = "The character's id should be a camel-cased id related to their name.  If characters have been defined in the story outline but do not exist yet, generate them first.  Generate full names for the characters.";

const styleGuide = `
 - Write in the past tense.
 - Show, don't tell.
 - Use dialog whenever possible.  Do not summarize or talk about what a character is saying.  Have them actually say it directly.
 - Avoid overly flowery prose.
 - Avoid purple prose.
 - Avoid overuse of adjectives and adverbs.
 - Provide depth to all characters, not just the main character(s).
 - All acts, chapters, scenes, and beats should have a purpose, whether it's advancing the plot, developing characters, or enriching the setting.
 - Use realistic dialog.
 - Include new lines between paragraphs.
`;

// const styleGuide = `
// 1. Show, Don’t Tell:
// Emphasize showing over telling. Convey emotions, settings, and character traits through actions, dialogue, and sensory details rather than direct statements. This method allows readers to infer and feel the story deeply.

// 2. Sensory Details:
// Utilize all five senses to bring scenes to life. Beyond visual descriptions, include sounds, textures, smells, and tastes to create a rich atmosphere that readers can fully immerse themselves in.

// 3. Character Depth and Diversity:
// Provide depth to all characters, not just the protagonists. Even brief appearances can hint at larger stories, adding to the world's believability and richness.
// Reflect the character’s development through their reactions to their environment and interactions, showing how their experiences shape their perspectives and decisions.

// 4. Dynamic Descriptions:
// Ensure descriptions are active and dynamic. Describe environments as they change, noting how characters and their surroundings interact and affect each other. Use metaphor and simile effectively, choosing comparisons that enhance the reader's understanding and engagement.

// 5. Pacing and Structure:
// Balance descriptive writing with narrative progression. Every segment should serve a purpose, whether it’s advancing the plot, deepening character understanding, or enriching the setting.
// Vary sentence and paragraph length to control the story’s rhythm. Use this variation to evoke different emotions and to maintain reader interest throughout.

// 6. Dialogue and Interaction:
// Craft dialogue that reflects the diversity of characters and their backgrounds. Pay attention to linguistic nuances and non-verbal cues to make conversations more realistic and engaging.
// Use character interactions to reveal social norms, personal values, and conflicts, providing insight without relying on direct exposition.

// 7. Theme and Symbolism:
// Weave themes and symbolism organically into the narrative. Let these elements emerge through the storyline, character development, and setting, adding depth and layers of meaning to the story.
// Choose symbols that resonate with the themes and motifs of your story, using them to subtly reinforce the narrative’s underlying messages.

// 8. Reflective Moments:
// Include reflective moments that allow characters to ponder their experiences, relationships, and personal growth. These introspections should deepen the reader's connection to the characters and enhance the thematic depth of the narrative.
// `;

export const systemPrompts:Index<Func<StoryType, string>> = {
    outline: (_type:StoryType) => `${botId}  Your job is to help the user flesh out their story idea into a short story, novella, or novel.  When the user gives you a story idea, flesh it out into an more complete idea for a story.  Do NOT include character details, or specific scene details.  The outline should focus more on a high level overview of the story as well as its themes. Be specific about what happens during the story and ending.  ${json} {title: string, genre: string, audience: string, length: "Short Story" | "Novella" | "Novel", ending: string, themes: string[], plot: {outline: string}, setting: {timePeriod: string}}`,

    locations: (_type:StoryType) => `${botId}  Your job is to help the user flesh out the locations for their story.  When the user gives you the details for their story and some optional existing locations, create some additional locations that would be relevant to the story. Include a name, description, and unique camel-cased id for each location.  ${json} {locations: Array<{id: string, name: string, description: string;}>}`,

    mainCharacter: (_type:StoryType) => `${botId}  Your job is to help the user develop the main character for their story.  When the user gives you an outline for their story and optionally a basic description of the main character, flesh out the character's attributes, backstory, and story arc. ${json}  {characters: Array<${characterInterface}>}. ${characterGenNotes}`,

    supportingCharacters: (_type:StoryType) => `${botId}  Your job is to help the user develop some supporting characters for their story.  When the user gives you a story outline, and list of existing characters, create a list of supporting characters for the story.  Include information on how the characters relate to each other and the main character and how they help drive the main character's story arc. ${json} {characters: Array<${characterInterface}>}. ${characterGenNotes}`,

    minorCharacters: (_type:StoryType) => `${botId}  Your job is to help the user develop some minor characters for their story.  When the user gives you a story outline, and list of existing characters, create a list of minor characters for the story.  These are characters that will only appear in a scene or two.  Include information on how the characters relate to each other and the main character and how they help drive the main character's story arc. ${json} {characters: Array<${characterInterface}>}. ${characterGenNotes}`,

    acts: (_type:StoryType) => `${botId}  Your job is to help the user flesh out their story idea into a full story.  When the user gives you a high level story outline, locations, and character descriptions, create a detailed outline of acts and chapters for the story.  Use an appropriate number of acts for the length of the story.  The acts and chapters should all have a purpose and should move the story along.  Acts and chapters should not be repetitive and should NOT rehash the same points.  The outlines should be factual.  Include what happens and explain how it moves the story and character arcs along.  Do not include the act number or chapter number in the outline texts. ${json} {acts: Array<{title: string, outline: string, chapters: Array<{title: string, outline: string}>}>}`,

    chapters: (_type:StoryType) => `${botId}  Your job is to help the user flesh out their story's acts into chapters.  When the user gives you a story outline, locations, character descriptions, summaries of previous acts and chapters, and outlines for subsequent acts and chapters, create a list of chapters for the current act.  Use an appropriate number of chapters for the story length.  A novel should have several chapters per act, while a short story may only have a few or even one.  The chapter outlines should fully develop the act's outline, and transition well from previous chapters and into subsequent chapters.  Do not include the chapter number in the outline text. ${json} {chapters: Array<{title: string, outline: string}>}`,

    scenes: (_type:StoryType) => `${botId}  Your job is to help the user flesh out their story's chapters into scenes.  When the user gives you a story outline, locations, character descriptions, summaries of previous acts, chapters, and scenes, and outlines for subsequent acts, chapters, and scenes, create a list of scenes for the current chapter.  Use an appropriate number of scenes for the story length.  A novel may have several scenes per chapter, while a short story may only have a few or even one.  The scenes should include all of the elements of the chapter, but should NOT include elements or previous or subsequent chapters.  The scenes should all have a purpose and should move the story along.  Scenes should not be repetitive and should NOT rehash the same points.  The outlines should be factual.  Include what happens and explain how it moves the story and character arcs along.  Do not include the scene number in the outline text. ${json} {scenes: Array<{title: string, outline: string, locationId: string, characterIds: string[]}>}`,

    beats: (_type:StoryType) => `${botId}  Your job is to help the user flesh out their story's scenes into beats.  When the user gives you a story outline, locations, character descriptions, summaries of previous acts, chapters, scenes, and beats, and outlines for subsequent acts, chapters, scenes and beats, create a list of beats for the current scene.  The beats should all have a purpose and should move the scene along.  Beats should not be repetitive and should NOT rehash the same points.  The beats should include all of the elements of the scene, but should NOT include elements of previous or subsequent scenes.  Make sure the beats of a scene flow into each other without abrupt transitions.  Beats should be short, and consist of a single thought.  The first beats should setup the scene and/or transition smoothly from the previous scene.  The last beats should wrap up the current scene and/or provide a transition into the next scene.  Do not include the beat number in the outline text. ${json} {beats: Array<{title: string, outline: string}>}`,

    text: (_type:StoryType) => `${botId}  Your job is to help the user flesh out their story's beats into the story's final text.  When the user gives you a story outline, locations, character descriptions, summaries of previous acts, chapters, scenes, and beats, and outlines for subsequent acts, chapters, scenes and beats, create the final text for the current beat. Include text ONLY for the current beat, and not any previous or subsequent beats.  Make sure the text for the beat flows naturally from the previous beat and into the next beat without abrupt transitions.  ${styleGuide} ${json} {text: string}`,

    sceneSummary: (_type:StoryType) => `${botId}  When the user gives you the text for a scene, create a detailed summary of the scene. ${json} {summary: string}`,
    chapterSummary: (_type:StoryType) => `${botId}  When the user gives you the summaries for scenes in a chapter, create a detailed summary of the chapter. ${json} {summary: string}`,
    actSummary: (_type:StoryType) => `${botId}  When the user gives you the summaries for chapters in an act, create a detailed summary of the act. ${json} {summary: string}`,
}

const storyInfo = (story:IStoryOutline) => `Here is my story outline:
Title: ${story.title}
Genre: ${story.genre}
Time Period: ${story.setting.timePeriod}
Themes: ${story.themes.join(", ")}
Plot Outline: ${story.plot.outline}
`;

const locationInfo = (story:IStoryOutline) => `Here are the locations for my story:
${story.setting.locations.map(location => `${location.name}: ${location.description}
`).join("")}
`;

const characterInfo = (story:IStoryOutline) => `Here are the existing characters for my story:
${story.characters.map(char => `${Object.keys(char).map(att => `${att}: ${(char as any)[att]}`).join("\n")}
`).join("\n\n")}`;

const fullStoryInfo = (story:IStoryOutline) => `${storyInfo(story)}

${locationInfo(story)}

${characterInfo(story)}`;

export const userPrompts = {
    locations: (story:IStoryOutline) => `${storyInfo(story)}`,
    characters: (story:IStoryOutline) => `${storyInfo(story)}

        ${characterInfo(story)}`,
    acts: (story:IStoryOutline) => `${fullStoryInfo(story)}
    
Please outline the acts and chapters for my story.  Return the JSON with this format:  {acts: Array<{title: string, outline: string, chapters: Array<{title: string, outline: string}>}>}`,
    chapters: (story:IStoryOutline, actIndex: number) => `${fullStoryInfo(story)}

Summaries of previous acts: ${story.plot.acts.slice(0, actIndex).map(prop("summary")).join(" ")}

Outline of the current act (Create chapters for this act): ${story.plot.acts[actIndex].outline}

Outlines of subsequent acts: ${story.plot.acts.slice(actIndex + 1).map(prop("outline")).join(" ")}
 `,
    scenes: (story:IStoryOutline, actIndex: number, chapterIndex:number) => `${fullStoryInfo(story)}

Summaries of previous acts: ${story.plot.acts.slice(0, actIndex).map(prop("summary")).join(" ")}

Outline of the current act: ${story.plot.acts[actIndex].outline}

Summaries of previous chapters in this act: ${story.plot.acts[actIndex].chapters.slice(0, chapterIndex).map(prop("summary")).join(" ")}

Outline of the current chapter (Create scenes for this chapter): ${story.plot.acts[actIndex].chapters[chapterIndex].outline}

Outlines of subsequent chapters in this act: ${story.plot.acts[actIndex].chapters.slice(chapterIndex + 1).map(prop("outline")).join(" ")}

Outlines of subsequent acts: ${story.plot.acts.slice(actIndex + 1).map(prop("outline")).join(" ")}

Create scenes for the specified chapter.  Return the JSON with the format {scenes: Array<{title: string, outline: string, locationId: string, characterIds: string[]}>}
`,
    beats: (story:IStoryOutline, actIndex: number, chapterIndex:number, sceneIndex:number) => `${fullStoryInfo(story)}

Summaries of previous acts: ${story.plot.acts.slice(0, actIndex).map(prop("summary")).join(" ")}

Outline of the current act: ${story.plot.acts[actIndex].outline}

Summaries of previous chapters in this act: ${story.plot.acts[actIndex].chapters.slice(0, chapterIndex).map(prop("summary")).join(" ")}

Outline of the current chapter: ${story.plot.acts[actIndex].chapters[chapterIndex].outline}

Summaries of previous scenes in this chapter: ${story.plot.acts[actIndex].chapters[chapterIndex].scenes.slice(0, sceneIndex).map(prop("summary")).join(" ")}

Outline of the current scene (Create beats for this scene): ${story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].outline}

Outlines of subsequent scenes in this chapter: ${story.plot.acts[actIndex].chapters[chapterIndex].scenes.slice(sceneIndex + 1).map(prop("outline")).join(" ")}

Outlines of subsequent chapters in this act: ${story.plot.acts[actIndex].chapters.slice(chapterIndex + 1).map(prop("outline")).join(" ")}

Outlines of subsequent acts: ${story.plot.acts.slice(actIndex + 1).map(prop("outline")).join(" ")}

Create beats for the specified scene.  Return the JSON with the format {beats: Array<{title: string, outline: string}>}
    `,
    text: (story:IStoryOutline, actIndex: number, chapterIndex:number, sceneIndex:number, beatIndex: number) => `${fullStoryInfo(story)}

Summaries of previous acts: ${story.plot.acts.slice(0, actIndex).map(prop("summary")).join(" ")}

Outline of the current act: ${story.plot.acts[actIndex].outline}

Summaries of previous chapters in this act: ${story.plot.acts[actIndex].chapters.slice(0, chapterIndex).map(prop("summary")).join(" ")}

Outline of the current chapter: ${story.plot.acts[actIndex].chapters[chapterIndex].outline}

Summaries of previous scenes in this chapter: ${story.plot.acts[actIndex].chapters[chapterIndex].scenes.slice(0, sceneIndex).map(prop("summary")).join(" ")}

Outline of the current scene: ${story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].outline}

Text of the previous beats in this scene: ${story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats.slice(0, beatIndex).map(prop("text")).join(" ")}

Outline of the current beat in this scene (Write text for this beat): ${story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats[beatIndex].outline}

Outlines of the subsequent beats in this scene: ${story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats.slice(beatIndex + 1).map(prop("outline")).join(" ")}

Outlines of subsequent scenes in this chapter: ${story.plot.acts[actIndex].chapters[chapterIndex].scenes.slice(sceneIndex + 1).map(prop("outline")).join(" ")}

Outlines of subsequent chapters in this act: ${story.plot.acts[actIndex].chapters.slice(chapterIndex + 1).map(prop("outline")).join(" ")}

Outlines of subsequent acts: ${story.plot.acts.slice(actIndex + 1).map(prop("outline")).join(" ")}

Write the prose for the specified beat.  Return the JSON with the format {text: string}
    `,
    summary: {
        scene: (story:IStoryOutline, actIndex: number, chapterIndex: number, sceneIndex: number) => `
            Please summarize this scene:

            ${story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats.map(prop("text")).join("\n\n")}
        `,
        chapter: (story:IStoryOutline, actIndex: number, chapterIndex: number) => `
            Please summarize this chapter based on the scene outlines:

            ${(story.plot.acts[actIndex].chapters[chapterIndex].scenes || []).filter(s => !!s.summary).map(prop("summary")).join("\n\n")}
        `,
        act: (story:IStoryOutline, actIndex: number) => `
            Please summarize this act based on the chapter outlines:

            ${(story.plot.acts[actIndex].chapters || []).map(prop("summary")).join("\n\n")}
        `,
    }
}

export const getLocation = (story:IStoryOutline, locationId:string) =>
    story.setting.locations.filter(l => l.id === locationId)[0]?.name || locationId;

export const getCharacter = (story:IStoryOutline, characterId:string) =>
    story.characters.filter(c => c.id === characterId)[0]?.name || characterId;
