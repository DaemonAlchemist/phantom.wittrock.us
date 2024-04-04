import { Tag } from "antd";
import { PartsDoneProps } from "./PartsDone.d";

export const PartsDoneComponent = ({entities, filter}:PartsDoneProps) => {
    const filteredCount = entities.filter(filter).length;
    const entityCount = entities.length;

    return <Tag
        color={filteredCount === 0 ? "red" : filteredCount < entityCount ? "gold" : "green"}
    >
        {filteredCount}/{entityCount}
    </Tag>;
}
