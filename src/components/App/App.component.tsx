import { Tag, Typography } from "antd";
import { EngineSelect } from "../EngineSelect";
import { StoryGen } from "../StoryGen";
import { AppProps } from "./App.d";
import styles from "./App.module.scss";
import { ModelSelect } from "../ModelSelect";

export const AppComponent = ({}:AppProps) => <div className={styles.app}>
    <Typography.Text><h1 className={styles.mainHeader}>
        <img src="/PotA-icon.webp" width={64}/>
        Phantom of the Author-a&nbsp;
        <Tag>AI-powered Ghost Writer</Tag>
    </h1></Typography.Text>
    <EngineSelect />
    <ModelSelect label="Default Model"/>
    <hr/>
    <StoryGen />
</div>;
