import { Tabs } from "antd";
import { Editable } from "../Editable";
import { SummarizableProps } from "./Summarizable";
import styles from "./Summarizable.module.scss";

export const SummarizableComponent = ({entity, updateOutline, updateSummary, hideSummary}:SummarizableProps) =>
    <Tabs className={styles.summarizable}>
        <Tabs.TabPane key="outline" tabKey="outline" tab="Outline">
            <Editable value={entity.outline} onChange={updateOutline} placeholder="Outline goes here." textArea/>
        </Tabs.TabPane>
        {!hideSummary && <Tabs.TabPane key="summary" tabKey="summary" tab="Summary">
            <Editable value={entity.summary} onChange={updateSummary} placeholder="Summary goes here." textArea/>
        </Tabs.TabPane>}
    </Tabs>;
