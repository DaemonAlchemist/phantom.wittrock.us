import { Func } from "ts-functional/dist/types";

export declare interface ILocationSelectProps {

}

// What gets passed into the component from the parent as attributes
export declare interface ILocationSelectInputProps {
    locationId: string;
    onChange: Func<string, void>;
}

export type LocationSelectProps = ILocationSelectInputProps & ILocationSelectProps;