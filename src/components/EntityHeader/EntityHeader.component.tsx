import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { DeleteBtn } from "../DeleteBtn";
import { IsFinished } from "../IsFinished";
import { PartsDone } from "../PartsDone";
import { EntityHeaderProps } from "./EntityHeader.d";
import styles from './EntityHeader.module.scss';
import { stopPropagation } from "../../lib/stopPropagation";
import { Editable } from "../Editable";

export const EntityHeaderComponent = ({
    type, index, title, isFinished,
    subEntities, subEntityFilter,
    onDelete, move, onUpdateTitle,
}:EntityHeaderProps) =>
    <div className={styles.entityHeader}>
        {!!move && <span className={styles.moveBtns}>
            <ArrowUpOutlined onClick={stopPropagation(move.up(index))} /><br/>
            <ArrowDownOutlined onClick={stopPropagation(move.down(index))} />
        </span>}
        <span className={styles.details}>
            {type} {index + 1}: <Editable value={title} onChange={onUpdateTitle}/>&nbsp;&nbsp;
            {!!subEntities && !!subEntityFilter && <PartsDone entities={subEntities || []} filter={e => !!e && subEntityFilter(e)} />}
            <IsFinished value={isFinished} />
        </span>
        <DeleteBtn onClick={onDelete} entityType={type.toLocaleLowerCase()} />
    </div>;
