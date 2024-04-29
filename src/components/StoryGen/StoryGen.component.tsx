import { BankOutlined, BookOutlined, InfoCircleOutlined, QuestionCircleOutlined, ReadOutlined, TeamOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { Overview } from "../Overview";
import { StoryMenu } from "../StoryMenu";
import { Acts } from "./Acts";
import { Characters } from "./Characters";
import { Locations } from "./Locations";
import { Outline } from "./Outline";
import { Read } from "./Read";
import { StoryGenProps } from "./StoryGen.d";
import styles from "./StoryGen.module.scss";

export const StoryGenComponent = ({}:StoryGenProps) => <div className={styles.content}>
    <Tabs tabBarExtraContent={<div className={styles.controls}>
        <StoryMenu />
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
</div>;
