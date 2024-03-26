import { DeleteOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { DeleteBtnProps } from "./DeleteBtn.d";
import styles from './DeleteBtn.module.scss';
import clsx from "clsx";

export const DeleteBtnComponent = ({onClick}:DeleteBtnProps) =>
    <Typography.Text className={clsx([styles.deleteBtn, "deleteBtn"])} type="danger">
        <DeleteOutlined onClick={onClick}/>
    </Typography.Text>;
