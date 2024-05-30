import { DeleteBtn } from "../DeleteBtn";
import { IsFinished } from "../IsFinished";
import { PartsDone } from "../PartsDone";
import { EntityHeaderProps } from "./EntityHeader.d";
import styles from './EntityHeader.module.scss';

export const EntityHeaderComponent = ({
    type, index, title, isFinished,
    subEntities, subEntityFilter,
    onDelete,
}:EntityHeaderProps) =>
    <div className={styles.entityHeader}>
        {type} {index + 1}: {title}&nbsp;&nbsp;
        {!!subEntities && !!subEntityFilter && <PartsDone entities={subEntities} filter={subEntityFilter} />}
        <IsFinished value={isFinished} />
        <DeleteBtn onClick={onDelete} entityType={type.toLocaleLowerCase()} />
    </div>;
