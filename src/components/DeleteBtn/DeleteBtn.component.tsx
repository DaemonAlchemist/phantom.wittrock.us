import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, Typography } from "antd";
import clsx from "clsx";
import { DeleteBtnProps } from "./DeleteBtn.d";
import styles from './DeleteBtn.module.scss';

export const DeleteBtnComponent = ({onClick, entityType}:DeleteBtnProps) => 
    <Popconfirm onConfirm={onClick} title={`Are you sure you want to delete this ${entityType}`}>
        <Typography.Text className={clsx([styles.deleteBtn, "deleteBtn"])} type="danger">
            <DeleteOutlined/>
        </Typography.Text>
    </Popconfirm>;
