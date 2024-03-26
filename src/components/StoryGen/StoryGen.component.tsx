import { Tabs } from "antd";
import { Outline } from "./Outline";
import { StoryGenProps } from "./StoryGen.d";
import { Characters } from "./Characters";
import { Scenes } from "./Scenes";
import { Locations } from "./Locations";

export const StoryGenComponent = ({}:StoryGenProps) => 
    <div>
        <Tabs tabPosition="left">
            <Tabs.TabPane key="outline" tabKey="outline" tab="Outline">
                <Outline />
            </Tabs.TabPane>
            <Tabs.TabPane key="locations" tabKey="locations" tab="Locations">
                <Locations />
            </Tabs.TabPane>
            <Tabs.TabPane key="characters" tabKey="characters" tab="Characters">
                <Characters />
            </Tabs.TabPane>
            <Tabs.TabPane key="scenes" tabKey="scenes" tab="Scenes">
                <Scenes />
            </Tabs.TabPane>
        </Tabs>
    </div>;
