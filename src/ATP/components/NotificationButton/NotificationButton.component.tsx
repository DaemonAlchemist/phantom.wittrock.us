import { NotificationOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { notify, useNotificationPermission } from "@ATP/lib/notifications";
import { NotificationButtonProps } from "./NotificationButton";
import styles from './NotificationButton.module.scss';

export const NotificationButtonComponent = ({}:NotificationButtonProps) => {
    const [canNotify, setCanNotify] = useNotificationPermission();

    const onClick = () => {
        Notification.requestPermission().then(permission => {
            setCanNotify(permission === "granted");
            notify("can now send you notifications");
        })
    }

    return canNotify ? null : <Button className={styles.notifyBtn} type="primary" onClick={onClick}>
        <NotificationOutlined /> Enable notifications
    </Button>;
};
