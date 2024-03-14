import { ChangeEvent } from "react";
import { Func } from "ts-functional/dist/types";

export const onInputChange =
    (onChange:Func<string, void>) => 
    (e:ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value);
    };
