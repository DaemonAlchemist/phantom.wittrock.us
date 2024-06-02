import { useLocalStorage } from "unstateless";
import { IAct, IBeat, IChapter, ICharacter, ILocation, IRelation, IScene, IStoryOutline } from "../../components/StoryGen/story";

export const emptyStory:IStoryOutline = {
    title: "",
    genre: "",
    audience: "",
    length: "Short Story",
    ending: "",
    setting: {
        timePeriod: "",
        locations: [],
    },
    themes: [],
    characters: [],
    plot: {
        outline: '',
        summary: '',
        acts: [],
    }
}

export const emptyLocation:ILocation = {
    id: "",
    name: "",
    description: "",
}

const summarizable = {
    title: "",
    outline: "",
    summary: "",
}

export const emptyAct:IAct = {
    ...summarizable,
    chapters: [],
}

export const emptyChapter:IChapter = {
    ...summarizable,
    scenes: [],
}

export const emptyScene:IScene = {
    ...summarizable,
    beats: [],
    locationId: "",
    characterIds: [],
}

export const emptyBeat:IBeat = {
    ...summarizable,
    text: "",
}

export const emptyCharacter:ICharacter = {
    id: "",
    name: "",
    role: "main",
    physicalDescription: "",
    personality: "",
    genderIdentity: "Male",
    ethnicity: "",
    identifyingMarks: "",
    quirks: "",
    backstory: "",
    storyArc: "",
    goals: "",
    motivations: "",
    relationships: [],
}

export const useStory = () => {
    const [storyRaw, setStory] = useLocalStorage.object<IStoryOutline>("storyDetails", emptyStory)();

    // Hacky patch.  Not sure why loading a story saves it to localStorage as an escaped string rather than JSON string.
    const story:IStoryOutline = typeof storyRaw === 'string' ? JSON.parse(storyRaw as unknown as string) :storyRaw;
    if(typeof storyRaw === 'string') {
        setStory(story);
    }

    // Basic information
    const setAttribute = (field:string) => (value:string) => {setStory(old => ({...old, [field]: value}));}
    const setTitle = setAttribute("title");
    const setGenre = setAttribute("genre");
    const setAudience = setAttribute("audience");
    const setLength = setAttribute("length");
    const setEnding = setAttribute("ending");
    const setTimePeriod = (timePeriod:string) => {setStory(old => ({...old, setting: {...old.setting, timePeriod}}));}

    // Locations
    const addLocation = (location:ILocation)  => () => {setStory(old => ({
        ...old,
        setting: {
            ...old.setting,
            locations: [...old.setting.locations.filter(l => l.id !== location.id), location]
        }
    }));}
    const removeLocation = (index: number) => () => { setStory(old => ({ ...old, setting: { ...old.setting, locations: old.setting.locations.filter((_, i) => i !== index) } })); }
    const updateLocationAttribute = (field:string) => (index: number) => (value: string) => { setStory(old => ({
        ...old, setting: {
            ...old.setting,
            locations: old.setting.locations.map((location, i) => i === index ? { ...location, [field]: value } : location)
        }
    })); }
    const updateLocationId = updateLocationAttribute("id");
    const updateLocationName = updateLocationAttribute("name");
    const updateLocationDescription = updateLocationAttribute("description");

    // Themes
    const addTheme = (theme: string) => () => { setStory(old => ({ ...old, themes: [...old.themes, theme] })); }
    const removeTheme = (index: number) => () => { setStory(old => ({ ...old, themes: old.themes.filter((_, i) => i !== index) })); }
    const updateTheme = (index: number) => (theme: string) => { setStory(old => ({ ...old, themes: old.themes.map((t, i) => i === index ? theme : t) })); }

    // Characters
    const addCharacter = (character: ICharacter) => () => { setStory(old => ({
        ...old,
        characters: [
            ...old.characters.filter(c => c.id !== character.id),
            character
        ]
    })); }
    const removeCharacter = (index: number) => () => { setStory(old => ({ ...old, characters: old.characters.filter((_, i) => i !== index) })); }
    const updateCharacterAttribute = (field:string) => (index: number) => (value: string) => { setStory(old => ({
        ...old, characters: old.characters.map((character, i) => i === index ? { ...character, [field]: value } : character)
    })); }
    const updateCharacterId          = updateCharacterAttribute("id");
    const updateCharacterName        = updateCharacterAttribute("name");
    const updateCharacterRole        = updateCharacterAttribute("role");
    const updateCharacterDescription = updateCharacterAttribute("description");
    const updateCharacterPersonality = updateCharacterAttribute("personality");
    const updateCharacterGender      = updateCharacterAttribute("genderIdentity");
    const updateCharacterEthnicity   = updateCharacterAttribute("ethnicity");
    const updateCharacterMarks       = updateCharacterAttribute("identifyingMarks");
    const updateCharacterQuirks      = updateCharacterAttribute("quirks");
    const updateCharacterBackstory   = updateCharacterAttribute("backstory");
    const updateCharacterArc         = updateCharacterAttribute("storyArc");
    const updateCharacterGoals       = updateCharacterAttribute("goals");
    const updateCharacterMotivations = updateCharacterAttribute("motivations");

    // Character relationships
    const addRelationship = (characterIndex: number, relation: IRelation) => () => { setStory(old => ({
        ...old, characters: old.characters.map((character, i) => i === characterIndex ? { ...character, relationships: [...character.relationships, relation] } : character)
    })); }
    const removeRelationship = (characterIndex: number, relationIndex: number) => () => { setStory(old => ({
        ...old, characters: old.characters.map((character, i) => i === characterIndex ? { ...character, relationships: character.relationships.filter((_, ri) => ri !== relationIndex) } : character)
    })); }
    const updateRelationshipAttribute = (field:string) => (characterIndex: number, relationIndex: number) => (value: string) => { setStory(old => ({
        ...old, characters: old.characters.map((character, i) => i === characterIndex ? {
            ...character,
            relationships: character.relationships.map((relation, ri) => ri === relationIndex ? { ...relation, [field]: value } : relation)
        } : character)
    })); }
    const updateRelationshipName        = updateRelationshipAttribute("otherCharacterName");
    const updateRelationshipDescription = updateRelationshipAttribute("description");

    // Plot info
    const updatePlotOutline = (outline: string) => { setStory(old => ({ ...old, plot: { ...old.plot, outline } })); }
    const updatePlotSummary = (summary: string) => { setStory(old => ({ ...old, plot: { ...old.plot, summary } })); }

    // Entity moving helpers
    const moveUp = (entities:any[], index:number) => [
        ...entities.filter((_, i) => i < index - 1),
        entities[index],
        ...entities.filter((_, i) => i >= index - 1 && i !== index),
    ];
    const moveDown = (entities:any[], index:number) => [
        ...entities.filter((_, i) => i <= index + 1 && i !== index),
        entities[index],
        ...entities.filter((_, i) => i > index + 1),
    ];

    // Acts
    const setActs = (acts: IAct[]) => {setStory(old => ({...old, plot: {...old.plot, acts}}));}
    const addAct = (act: IAct) => () => { setStory(old => ({ ...old, plot: { ...old.plot, acts: [...old.plot.acts, act] } })); }
    const removeAct = (index: number) => () => { setStory(old => ({ ...old, plot: { ...old.plot, acts: old.plot.acts.filter((_, i) => i !== index) } })); }
    const updateActAttribute = (field:string) => (index: number) => (value: string) => { setStory(old => ({
        ...old, plot: {
            ...old.plot,
            acts: old.plot.acts.map((act, i) => i === index ? { ...act, [field]: value } : act)
        }
    })); }
    const moveActUp = (index:number) => () => { setStory(old => ({
        ...old, plot: {
            ...old.plot,
            acts: moveUp(old.plot.acts, index),
        }
    })); }
    const moveActDown = (index:number) => () => { setStory(old => ({
        ...old, plot: {
            ...old.plot,
            acts: moveDown(old.plot.acts, index),
        }
    })); }
    const updateActTitle   = updateActAttribute("title");
    const updateActOutline = updateActAttribute("outline");
    const updateActSummary = updateActAttribute("summary");

    // Chapters
    const addChapter = (actIndex: number, chapter: IChapter) => () => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, i) => i === actIndex ? { ...act, chapters: [...act.chapters || [], chapter] } : act)
        }
    })); }
    const removeChapter = (actIndex: number, chapterIndex: number) => () => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, i) => i === actIndex ? { ...act, chapters: act.chapters.filter((_, ci) => ci !== chapterIndex) } : act)
        }
    })); }
    const updateChapterAttribute = (field:string) => (actIndex: number, chapterIndex: number) => (value: string) => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, i) => i === actIndex ? {
                ...act, chapters: act.chapters.map((chapter, ci) => ci === chapterIndex ? { ...chapter, [field]: value } : chapter)
            } : act)
        }
    })); }
    const moveChapterUp = (actIndex: number) => (chapterIndex: number) => () => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, i) => i === actIndex ? {
                ...act, chapters: moveUp(act.chapters, chapterIndex),
            } : act)
        }
    })); }
    const moveChapterDown = (actIndex: number) => (chapterIndex: number) => () => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, i) => i === actIndex ? {
                ...act, chapters: moveDown(act.chapters, chapterIndex),
            } : act)
        }
    })); }
    const updateChapterTitle    = updateChapterAttribute("title");
    const updateChapterOutline = updateChapterAttribute("outline");
    const updateChapterSummary = updateChapterAttribute("summary");

    // Scenes
    const addScene = (actIndex: number, chapterIndex: number, scene: IScene) => () => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, ai) => ai === actIndex ? {
                ...act, chapters: act.chapters.map((chapter, ci) => ci === chapterIndex ? { ...chapter, scenes: [...chapter.scenes || [], scene] } : chapter)
            } : act)
        }
    })); }

    const removeScene = (actIndex: number, chapterIndex: number, sceneIndex: number) => () => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, ai) => ai === actIndex ? {
                ...act, chapters: act.chapters.map((chapter, ci) => ci === chapterIndex ? {
                    ...chapter, scenes: chapter.scenes.filter((_, si) => si !== sceneIndex)
                } : chapter)
            } : act)
        }
    })); }
    const updateSceneAttribute = <T>(field:string) => (actIndex: number, chapterIndex: number, sceneIndex: number) => (value: T) => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, ai) => ai === actIndex ? {
               ...act, chapters: act.chapters.map((chapter, ci) => ci === chapterIndex ? {
                    ...chapter, scenes: chapter.scenes.map((scene, si) => si === sceneIndex ? { ...scene, [field]: value } : scene)
                } : chapter)
            } : act)
        }
    })); }
    const moveSceneUp = (actIndex: number, chapterIndex: number) => (sceneIndex: number) => () => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, ai) => ai === actIndex ? {
               ...act, chapters: act.chapters.map((chapter, ci) => ci === chapterIndex ? {
                    ...chapter, scenes: moveUp(chapter.scenes, sceneIndex),
                } : chapter)
            } : act)
        }
    })); }
    const moveSceneDown = (actIndex: number, chapterIndex: number) => (sceneIndex: number) => () => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, ai) => ai === actIndex ? {
               ...act, chapters: act.chapters.map((chapter, ci) => ci === chapterIndex ? {
                    ...chapter, scenes: moveDown(chapter.scenes, sceneIndex),
                } : chapter)
            } : act)
        }
    })); }

    const updateSceneTitle      = updateSceneAttribute<string  >("title");
    const updateSceneOutline    = updateSceneAttribute<string  >("outline");
    const updateSceneSummary    = updateSceneAttribute<string  >("summary");
    const updateSceneLocation   = updateSceneAttribute<string  >("locationId");
    const updateSceneCharacters = updateSceneAttribute<string[]>("characterIds");

    const sceneToChapter = (actIndex: number, chapterIndex: number, sceneIndex:number) => () => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, ai) => ai === actIndex ? {
                ...act, chapters: [
                    ...act.chapters.slice(0, chapterIndex),
                    {
                        ...act.chapters[chapterIndex],
                        scenes: act.chapters[chapterIndex].scenes.filter((_, si) => si !== sceneIndex),
                    },
                    ((scene:IScene):IChapter => ({
                        title: scene.title,
                        outline: scene.outline,
                        summary: scene.summary,
                        scenes: scene.beats.map((b:IBeat):IScene => ({
                            title: b.title,
                            outline: b.outline,
                            summary: "",
                            locationId: scene.locationId,
                            characterIds: scene.characterIds,
                            beats: [],
                        })),
                    }))(act.chapters[chapterIndex].scenes[sceneIndex]),
                    ...act.chapters.slice(chapterIndex+1)
                ]
            } : act)
        }
    }))
    }

    // Beats
    const addBeat = (actIndex: number, chapterIndex: number, sceneIndex: number, beat: IBeat) => () => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, ai) => ai === actIndex ? {
                ...act, chapters: act.chapters.map((chapter, ci) => ci === chapterIndex ? {
                    ...chapter, scenes: chapter.scenes.map((scene, si) => si === sceneIndex ? { ...scene, beats: [...scene.beats || [], beat] } : scene)
                } : chapter)
            } : act)
        }
    })); }
    const removeBeat = (actIndex: number, chapterIndex: number, sceneIndex: number, beatIndex: number) => () => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, ai) => ai === actIndex ? {
                ...act, chapters: act.chapters.map((chapter, ci) => ci === chapterIndex ? {
                    ...chapter, scenes: chapter.scenes.map((scene, si) => si === sceneIndex ? {
                        ...scene, beats: scene.beats.filter((_, bi) => bi !== beatIndex)
                    } : scene)
                } : chapter)
            } : act)
        }
    }));}
    const updateBeatAttribute = (field:string) => (actIndex: number, chapterIndex: number, sceneIndex: number, beatIndex: number) => (value: string) => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, ai) => ai === actIndex ? {
                ...act, chapters: act.chapters.map((chapter, ci) => ci === chapterIndex ? {
                    ...chapter, scenes: chapter.scenes.map((scene, si) => si === sceneIndex ? {
                        ...scene, beats: scene.beats.map((beat, bi) => bi === beatIndex ? { ...beat, [field]: value } : beat)
                    } : scene)
                } : chapter)
            } : act)
        }
    })); }        
    const moveBeatUp = (actIndex: number, chapterIndex: number, sceneIndex: number) => (beatIndex: number) => () => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, ai) => ai === actIndex ? {
                ...act, chapters: act.chapters.map((chapter, ci) => ci === chapterIndex ? {
                    ...chapter, scenes: chapter.scenes.map((scene, si) => si === sceneIndex ? {
                        ...scene, beats: moveUp(scene.beats, beatIndex),
                    } : scene)
                } : chapter)
            } : act)
        }
    })); }        
    const moveBeatDown = (actIndex: number, chapterIndex: number, sceneIndex: number) => (beatIndex: number) => () => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, ai) => ai === actIndex ? {
                ...act, chapters: act.chapters.map((chapter, ci) => ci === chapterIndex ? {
                    ...chapter, scenes: chapter.scenes.map((scene, si) => si === sceneIndex ? {
                        ...scene, beats: moveDown(scene.beats, beatIndex),
                    } : scene)
                } : chapter)
            } : act)
        }
    })); }        

    const updateBeatOutline = updateBeatAttribute("outline");
    const updateBeatSummary = updateBeatAttribute("summary");
    const updateBeatText    = updateBeatAttribute("text");
    const updateBeatTitle   = updateBeatAttribute("title");

    const updateStory = {
        story: setStory,
        title: setTitle,
        genre: setGenre,
        audience: setAudience,
        length: setLength,
        ending: setEnding,
        timePeriod: setTimePeriod,
        location: {
            add: addLocation,
            remove: removeLocation,
            id: updateLocationId,
            name: updateLocationName,
            description: updateLocationDescription,
        },
        theme: {
            add: addTheme,
            remove: removeTheme,
            update: updateTheme,
        },
        character: {
            add: addCharacter,
            remove: removeCharacter,
            id: updateCharacterId,
            name: updateCharacterName,
            role: updateCharacterRole,
            description: updateCharacterDescription,
            gender: updateCharacterGender,
            ethnicity: updateCharacterEthnicity,
            marks: updateCharacterMarks,
            quirks: updateCharacterQuirks,
            personality: updateCharacterPersonality,
            backstory: updateCharacterBackstory,
            arc: updateCharacterArc,
            goals: updateCharacterGoals,
            motivations: updateCharacterMotivations,
            relationship: {
                add: addRelationship,
                remove: removeRelationship,
                name: updateRelationshipName,
                description: updateRelationshipDescription,
            }
        },
        plot: {
            outline: updatePlotOutline,
            summary: updatePlotSummary,
        },
        act: {
            set: setActs,
            add: addAct,
            remove: removeAct,
            move: {
                up: moveActUp,
                down: moveActDown,
            },
            title: updateActTitle,
            outline: updateActOutline,
            summary: updateActSummary,
        },
        chapter: {
            add: addChapter,
            remove: removeChapter,
            move: (actIndex:number) => ({
                up: moveChapterUp(actIndex),
                down: moveChapterDown(actIndex),
            }),
            title: updateChapterTitle,
            outline: updateChapterOutline,
            summary: updateChapterSummary,
        },
        scene: {
            add: addScene,
            remove: removeScene,
            move: (actIndex:number, chapterIndex:number) => ({
                up: moveSceneUp(actIndex, chapterIndex),
                down: moveSceneDown(actIndex, chapterIndex),
            }),
            title: updateSceneTitle,
            outline: updateSceneOutline,
            summary: updateSceneSummary,
            location: updateSceneLocation,
            characters: updateSceneCharacters,
            toChapter: sceneToChapter,
        },
        beat: {
            add: addBeat,
            remove: removeBeat,
            move: (actIndex:number, chapterIndex: number, sceneIndex: number) => ({
                up: moveBeatUp(actIndex, chapterIndex, sceneIndex),
                down: moveBeatDown(actIndex, chapterIndex, sceneIndex),
            }),
            outline: updateBeatOutline,
            summary: updateBeatSummary,
            text: updateBeatText,
            title: updateBeatTitle,
        }
    }

    return {story, update: updateStory};
}
