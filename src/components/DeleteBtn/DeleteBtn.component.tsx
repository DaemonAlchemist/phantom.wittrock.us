import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Typography } from "antd";
import clsx from "clsx";
import { DeleteBtnProps } from "./DeleteBtn.d";
import styles from './DeleteBtn.module.scss';

export const DeleteBtnComponent = ({onClick, entityType}:DeleteBtnProps) => 
    <Popconfirm onPopupClick={e => {e.stopPropagation();}} onConfirm={onClick} title={`Are you sure you want to delete this ${entityType}`}>
        <Button type="link" className={clsx([styles.deleteBtn, "deleteBtn"])} onClick={e => {e.stopPropagation();}}>
            <Typography.Text type="danger">
                <DeleteOutlined/>
            </Typography.Text>
        </Button>
    </Popconfirm>;
