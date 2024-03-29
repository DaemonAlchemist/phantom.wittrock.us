import { useLocalStorage } from "unstateless"
import { IAct, IBeat, IChapter, ICharacter, ILocation, IRelation, IScene, IStoryOutline } from "../../components/StoryGen/story"

const emptyStory:IStoryOutline = {
    title: "",
    genre: "",
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

export const useStory = () => {
    const [story, setStory] = useLocalStorage.object<IStoryOutline>("storyDetails", emptyStory)();

    // Basic information
    const setTitle = (title:string)           => {setStory(old => ({...old, title}));}
    const setGenre = (genre:string)           => {setStory(old => ({...old, genre}));}
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
    const updateCharacterRole        = (index:number) => (checked:boolean) => {
        updateCharacterAttribute("role")(index)(checked ? "main" : "supporting");
    };
    const updateCharacterDescription = updateCharacterAttribute("description");
    const updateCharacterPersonality = updateCharacterAttribute("personality");
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

    // Acts
    const addAct = (act: IAct) => () => { setStory(old => ({ ...old, plot: { ...old.plot, acts: [...old.plot.acts, act] } })); }
    const removeAct = (index: number) => () => { setStory(old => ({ ...old, plot: { ...old.plot, acts: old.plot.acts.filter((_, i) => i !== index) } })); }
    const updateActAttribute = (field:string) => (index: number) => (value: string) => { setStory(old => ({
        ...old, plot: {
        ...old.plot, acts: old.plot.acts.map((act, i) => i === index ? { ...act, [field]: value } : act)
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
                ...act, chapters: act.chapters.map((chapter, ci) => ci === chapterIndex ? { ...chapter, scenes: chapter.scenes.filter((_, si) => si !== sceneIndex) } : chapter)
            } : act)
        }
    })); }
    const updateSceneAttribute = (field:string) => (actIndex: number, chapterIndex: number, sceneIndex: number) => (value: string) => { setStory(old => ({
        ...old, plot: {
            ...old.plot, acts: old.plot.acts.map((act, ai) => ai === actIndex ? {
               ...act, chapters: act.chapters.map((chapter, ci) => ci === chapterIndex ? {
                    ...chapter, scenes: chapter.scenes.map((scene, si) => si === sceneIndex ? { ...scene, [field]: value } : scene)
                } : chapter)
            } : act)
        }
    })); }
    const updateSceneTitle   = updateSceneAttribute("title");
    const updateSceneOutline = updateSceneAttribute("outline");
    const updateSceneSummary = updateSceneAttribute("summary");

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
                    ...chapter, scenes: chapter.scenes.map((scene, si) => si === sceneIndex ? { ...scene, beats: scene.beats.filter((_, bi) => bi !== beatIndex) } : scene)
                } : chapter)
            } : act)
        }
    })); }
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
    const updateBeatOutline = updateBeatAttribute("outline");
    const updateBeatSummary = updateBeatAttribute("summary");
    const updateBeatText    = updateBeatAttribute("text");

    const updateStory = {
        story: setStory,
        title: setTitle,
        genre: setGenre,
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
            add: addAct,
            remove: removeAct,
            title: updateActTitle,
            outline: updateActOutline,
            summary: updateActSummary,
        },
        chapter: {
            add: addChapter,
            remove: removeChapter,
            title: updateChapterTitle,
            outline: updateChapterOutline,
            summary: updateChapterSummary,
        },
        scene: {
            add: addScene,
            remove: removeScene,
            title: updateSceneTitle,
            outline: updateSceneOutline,
            summary: updateSceneSummary,
        },
        beat: {
            add: addBeat,
            removeBeat,
            outline: updateBeatOutline,
            summary: updateBeatSummary,
            text: updateBeatText,
        }
    }

    return {story, update: updateStory};
}
