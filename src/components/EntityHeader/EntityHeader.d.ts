import { Func } from "ts-functional/dist/types";

export declare interface IEntityHeaderProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IEntityHeaderInputProps {
    type: string;
    index: number;
    title: string;
    subEntities?: any[];
    subEntityFilter?: Func<any, boolean>;
    isFinished: string;
    onDelete: () => void;
    move?: {
        up: Func<number, () => void>,
        down: Func<number, () => void>,
    }
}

export type EntityHeaderProps = IEntityHeaderInputProps & IEntityHeaderProps;