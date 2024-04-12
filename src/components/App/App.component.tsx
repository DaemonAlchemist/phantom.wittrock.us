import { Tag } from "antd";
import { EngineSelect } from "../EngineSelect";
import { StoryGen } from "../StoryGen";
import { AppProps } from "./App.d";
import styles from "./App.module.scss";

export const AppComponent = ({}:AppProps) => <div className={styles.app}>
    <h1>Phantom of the Author-a&nbsp; <Tag>AI-powered Ghost Writer</Tag></h1>
    <EngineSelect />
    <hr/>
    <StoryGen />
</div>;
