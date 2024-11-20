import { Func } from "ts-functional/dist/types";

export declare interface IPartsDoneProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IPartsDoneInputProps {
    entities: any[];
    filter: Func<any, boolean>;
}

export type PartsDoneProps = IPartsDoneInputProps & IPartsDoneProps;