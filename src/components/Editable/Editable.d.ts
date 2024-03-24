import { Func } from "ts-functional/dist/types";

export declare interface IEditableProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IEditableInputProps {
    value: string;
    onChange: Func<string, void>;
    placeholder?: string;
    textArea?: boolean;
}

export type EditableProps = IEditableInputProps & IEditableProps;