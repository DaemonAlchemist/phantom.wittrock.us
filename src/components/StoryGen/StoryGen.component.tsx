import { Tabs } from "antd";
import { Outline } from "./Outline";
import { StoryGenProps } from "./StoryGen.d";
import { Characters } from "./Characters";

export const StoryGenComponent = ({}:StoryGenProps) => 
    <div>
        <Tabs tabPosition="left">
            <Tabs.TabPane key="outline" tabKey="outline" tab="Outline">
                <Outline />
            </Tabs.TabPane>
            <Tabs.TabPane key="characters" tabKey="characters" tab="Characters">
                <Characters />
            </Tabs.TabPane>
        </Tabs>
    </div>;
