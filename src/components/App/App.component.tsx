import { Tabs } from "antd";
import { Conversation } from "../Conversation";
import { AppProps } from "./App.d";
import styles from "./App.module.scss";
import { CommentOutlined, FileTextOutlined } from "@ant-design/icons";
import { StoryGen } from "../StoryGen";
import { EngineSelect } from "../EngineSelect";

export const AppComponent = ({}:AppProps) => <div className={styles.app}>
    <h1>AI Generator Tools</h1>
    <EngineSelect />
    <Tabs>
        <Tabs.TabPane key="conversation" tabKey="conversation" tab={<><CommentOutlined /> Conversation</>}>
            <Conversation id="test" initialConversation={[]}/>; 
        </Tabs.TabPane>
        <Tabs.TabPane key="story" tabKey="story" tab={<><FileTextOutlined /> Ghost Writer</>}>
            <StoryGen />
        </Tabs.TabPane>
    </Tabs>
</div>;
