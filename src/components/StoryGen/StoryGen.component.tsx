import { BankOutlined, BookOutlined, DeleteOutlined, FolderOpenOutlined, InfoCircleOutlined, QuestionCircleOutlined, ReadOutlined, SaveOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tabs, Typography } from "antd";
import { loadStory, saveStory } from "../../lib/save";
import { emptyStory, useStory } from "../../lib/storyGen/useStory";
import { Overview } from "../Overview";
import { Acts } from "./Acts";
import { Characters } from "./Characters";
import { Locations } from "./Locations";
import { Outline } from "./Outline";
import { Read } from "./Read";
import { StoryGenProps } from "./StoryGen.d";
import styles from "./StoryGen.module.scss";

export const StoryGenComponent = ({}:StoryGenProps) => {
    const {story, update} = useStory();

    const clear = () => {
        update.story(emptyStory);
    }

    const save = () => {
        saveStory(story.title);
    }

    const load = () => {
        loadStory().then(() => window.location.reload());
    }

    return <div>
        <div className={styles.content}>
            <Tabs tabBarExtraContent={<div className={styles.controls}>
                <Popconfirm title="This will delete the entire story.  Are you sure you want to continue?" onConfirm={clear}>
                    <Button type="link" className={styles.clearBtn}>
                        <Typography.Text type="danger"><DeleteOutlined /> Clear story</Typography.Text>
                    </Button>
                </Popconfirm>
                <Button type="link" onClick={save}><SaveOutlined /> Save story</Button>
                {!!story.title && <Popconfirm title={`This will overwrite ${story.title}.  Are you sure you want to continue?`} onConfirm={load}>
                    <Button type="link"><FolderOpenOutlined /> Load story</Button>
                </Popconfirm>}
                {!story.title && <Button type="link" onClick={load}><FolderOpenOutlined /> Load story</Button>}
            </div>}>
                <Tabs.TabPane key="overview" tabKey="overview" tab={<><QuestionCircleOutlined /> What is this?</>}>
                    <Overview />
                </Tabs.TabPane>
                <Tabs.TabPane key="outline" tabKey="outline" tab={<><InfoCircleOutlined /> Story Overview</>}>
                    <Outline />
                </Tabs.TabPane>
                <Tabs.TabPane key="locations" tabKey="locations" tab={<><BankOutlined /> Locations</>}>
                    <Locations />
                </Tabs.TabPane>
                <Tabs.TabPane key="characters" tabKey="characters" tab={<><TeamOutlined /> Characters</>}>
                    <Characters />
                </Tabs.TabPane>
                <Tabs.TabPane key="acts" tabKey="acts" tab={<><BookOutlined /> Write</>}>
                    <Acts />
                </Tabs.TabPane>
                <Tabs.TabPane key="read" tabKey="read" tab={<><ReadOutlined /> Read</>}>
                    <Read />
                </Tabs.TabPane>
            </Tabs>
        </div>
    </div>;
}