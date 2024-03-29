import { Tabs } from "antd";
import { Acts } from "./Acts";
import { Characters } from "./Characters";
import { Locations } from "./Locations";
import { Outline } from "./Outline";
import { StoryGenProps } from "./StoryGen.d";
import { Read } from "./Read";

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
            <Tabs.TabPane key="acts" tabKey="acts" tab="Acts">
                <Acts />
            </Tabs.TabPane>
            <Tabs.TabPane key="read" tabKey="read" tab="Read">
                <Read />
            </Tabs.TabPane>
        </Tabs>
    </div>;
