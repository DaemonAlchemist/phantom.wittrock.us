import { EngineSelect } from "@ATP/components/EngineSelect";
import { NotificationButton } from "@ATP/components/NotificationButton";
import { Tag, Typography } from "antd";
import { StoryGen } from "../StoryGen";
import { AppProps } from "./App";
import styles from "./App.module.scss";

export const AppComponent = ({}:AppProps) => <div className={styles.app}>
    <div className={styles.header}>
        <Typography.Text><h1 className={styles.mainHeader}>
            <img src="/PotA-icon.webp" width={64}/>
            Phantom of the Author-a&nbsp;
            <Tag>AI-powered Ghost Writer</Tag>
        </h1></Typography.Text>
        <EngineSelect />
    </div>
    <StoryGen />
    <NotificationButton />
</div>;
