import { DeleteOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { DeleteBtnProps } from "./DeleteBtn.d";
import styles from './DeleteBtn.module.scss';
import clsx from "clsx";
import { MouseEvent } from "react";

export const DeleteBtnComponent = ({onClick}:DeleteBtnProps) => {
    const onDelete = (e:MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        onClick();
    }
    return <Typography.Text className={clsx([styles.deleteBtn, "deleteBtn"])} type="danger">
        <DeleteOutlined onClick={onDelete}/>
    </Typography.Text>;
}
