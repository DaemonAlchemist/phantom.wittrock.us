import { BankOutlined, BookOutlined, InfoCircleOutlined, QuestionCircleOutlined, ReadOutlined, TeamOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { Tab } from "rc-tabs/es/interface";
import { Overview } from "../Overview";
import { StoryMenu } from "../StoryMenu";
import { Acts } from "../Acts";
import { Characters } from "../Characters";
import { Locations } from "../Locations";
import { Outline } from "../Outline";
import { Read } from "../Read";
import { StoryGenProps } from "./StoryGen";
import styles from "./StoryGen.module.scss";

const tabs:Tab[] = [{
    key: "overview",
    label: "What is this?",
    icon: <QuestionCircleOutlined />,
    children: <Overview />,
},{
    key: "outline",
    label: "Story Overview",
    icon: <InfoCircleOutlined />,
    children: <Outline />,
},{
    key: "locations",
    label: "Locations",
    icon: <BankOutlined />,
    children: <Locations />,
},{
    key: "characters",
    label: "Characters",
    icon: <TeamOutlined />,
    children: <Characters />,
},{
    key: "acts",
    label: "Write",
    icon: <BookOutlined />,
    children: <Acts />,
},{
    key: "read",
    label: "Read",
    icon: <ReadOutlined />,
    children: <Read />
}];

export const StoryGenComponent = ({}:StoryGenProps) => <div className={styles.content}>
    <Tabs items={tabs} tabBarExtraContent={<div className={styles.controls}>
        <StoryMenu />
    </div>} />
</div>;
