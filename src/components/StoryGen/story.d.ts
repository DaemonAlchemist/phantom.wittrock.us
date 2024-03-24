export declare interface IStoryOutline {
    title: string;
    genre: string;
    setting: ISetting;
    themes: string[];
    characters: ICharacter[];
    plot: IPlot;
}

export declare interface ISetting {
    timePeriod: string;
    locations: ILocation[];
}

export declare interface ILocation {
    name: string;
    description: string;
}

export declare interface ICharacter {
    name: string;
    role: "main" | "supporting";
    physicalDescription: string;
    personality: string;
    backstory: string;
    storyArc: string;
    goals: string;
    motivations: string;
    relationships: IRelation[];
}

export declare interface IRelation {
    otherCharacterName: string;
    description: string;
}

export declare interface ISummarizable {
    outline: string;
    summary: string;
}

export declare interface IPlot extends ISummarizable {
    acts: IAct[];
}

export declare interface IAct extends ISummarizable {
    chapters: IChapter[];
};

export declare interface IChapter extends ISummarizable {
    scenes: IScene[];
}

export declare interface IScene extends ISummarizable {
    beats: IBeat[];
}

export declare interface IBeat extends ISummarizable {
    text: string;
}
