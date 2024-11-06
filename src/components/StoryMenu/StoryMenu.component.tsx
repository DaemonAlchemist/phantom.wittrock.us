import { BookOutlined, DeleteOutlined, EditOutlined, FolderOpenOutlined, FormOutlined, SaveOutlined } from "@ant-design/icons";
import { Input, Menu, MenuProps, Modal, Table, Tabs, Tag } from "antd";
import { loadData, saveData } from "../../lib/save";
import { emptyStory, useStory } from "../../lib/storyGen/useStory";
import { StoryMenuProps } from "./StoryMenu.d";
import { useRawPrompts } from "../../lib/usePrompt";
import { useModal } from "../../lib/useModal";
import { onInputChange } from "../../lib/onInputChange";
import styles from "./StoryMenu.module.scss";
import { defaultPrompts } from "../../config/defaultPrompts";

export const StoryMenuComponent = ({}:StoryMenuProps) => {
    const {story, update} = useStory();
    const [templates, setTemplates] = useRawPrompts();
    const modal = useModal();

    const clearStory = () => {
        update.story(emptyStory);
    }

    const saveStory = () => {
        saveData(["storyDetails", "storyIdea", "llmEngine", "llmModel"])(story.title);
    }

    const loadStory = () => {
        loadData().then((data:Record<string, any>) => {
            update.story(data.storyDetails);
        });
    }

    const saveTemplates = () => {
        saveData(["userDefinedPrompts"])("Prompt Templates");
    }

    const loadTemplates = () => {
        loadData().then((data:Record<string, any>) => {
            setTemplates(data.userDefinedPrompts);
        })
    }

    const updateTemplate = (id:string) => (value:string) => {
        setTemplates(old => ({
            ...old,
            [id]: value,
        }))
    }

    type MenuItem = Required<MenuProps>['items'][number];
    const menu:MenuItem[] = [{
        label: "Story",
        key: "story",
        icon: <BookOutlined />,
        children: [{
            label: "Save Story",
            key: "save",
            icon: <SaveOutlined />,
            onClick: saveStory,
        },{
            label: "Load Story",
            key: "load",
            icon: <FolderOpenOutlined />,
            onClick: loadStory,
        },{
            type: "divider",
        },{
            label: "Clear Story",
            key: "clearStory",
            icon: <DeleteOutlined />,
            danger: true,
            onClick: clearStory,
        }]
    },{
        label: "Prompt Templates",
        key: "prompts",
        icon: <FormOutlined />,
        children: [{
            label: "Common Templates",
            key: "editTemplates",
            icon: <EditOutlined />,
            onClick: modal.open,
        },{
            label: "Save Templates",
            key: "saveTemplates",
            icon: <SaveOutlined />,
            onClick: saveTemplates,
        },{
            label: "Load Templates",
            key: "loadTemplates",
            icon: <FolderOpenOutlined />,
            onClick: loadTemplates,
        }]
    }]

    const prompts = [
        {id: "idea", description: "Your story idea from the overview page"},
        {id: "botId", description: "The personality of your ghost writer."},
        {id: "json", description: "Instructions for the bot to output everything in JSON.  This should be included in every system prompt along with the appropriate interface."},
        {id: "styleGuide", description: "Instructions for the bot on how to write its prose."},
        {id: "outline.interface", description: "How the bot should structure its outline data.  DO NOT ALTER THIS, and make sure it is included in the outline prompt templates."},
        {id: "story.details.full", description: "Full details for the story.  By default, includes everything on the overview, locations, and characters page."},
        {id: "locations.interface", description: "How the bot should structure its location data.  DO NOT ALTER THIS, and make sure it is included in the locations prompt templates."},
        {id: "characters.interface", description: "How the bot should structure its character data.  DO NOT ALTER THIS, and make sure it is included in the characters prompt templates."},
        {id: "character.gen.notes", description: "Notes on how to generate characters"},
        {id: "acts.interface", description: "How the bot should structure its acts data.  DO NOT ALTER THIS, and make sure it is included in the acts prompt templates."},
        {id: "chapters.interface", description: "How the bot should structure its chapter data.  DO NOT ALTER THIS, and make sure it is included in the chapters prompt templates."},
        {id: "scenes.interface", description: "How the bot should structure its scenes data.  DO NOT ALTER THIS, and make sure it is included in the scenes prompt templates."},
        {id: "beats.interface", description: "How the bot should structure its beats data.  DO NOT ALTER THIS, and make sure it is included in the beats prompt templates."},
        {id: "prose.interface", description: "How the bot should structure its prose data.  DO NOT ALTER THIS, and make sure it is included in the prose prompt templates."},
        {id: "story.info", description: "The information shown on the overview page."},
        {id: "story.locations", description: "Information about all of the locations"},
        {id: "story.characters", description: "Informaton about all of the characters"},
        {id: "previousActs", description: "Summary of all previous acts.  Can only be used in chapter, scene, beat, and prose user prompts."},
        {id: "previousChapters", description: "Summary of all previous chapters in the current act.  Can only be used in scene, beat, and prose user prompts."},
        {id: "previousScenes", description: "Summary of all previous scenes in the current chapter.  Can only be used in beat, and prose user prompts."},
        {id: "previousBeats", description: "Text of all previous beats in the current scene.  Can only be used in prose user prompts."},
        {id: "currentAct", description: "Outline of the current act.  Can only be use in chapter, scene, beat, and prose user prompts."},
        {id: "currentChapter", description: "Outline of the current chapter.  Can only be use in scene, beat, and prose user prompts."},
        {id: "currentScene", description: "Outline of the current scene.  Can only be use in beat, and prose user prompts."},
        {id: "currentBeat", description: "Outline of the current beat.  Can only be use in prose user prompts."},
        {id: "nextActs", description: "Outlines of the subsequent acts.  Can only be used in chapter, scene, beat, and prose user prompts."},
        {id: "nextChapters", description: "Outlines of the subsequent chapters in the current act.  Can only be used in scene, beat, and prose user prompts."},
        {id: "nextScenes", description: "Outlines of the subsequent scenes in the current chapter.  Can only be used in beat, and prose user prompts."},
        {id: "nextBeats", description: "Outlines of the subsequent beats in the current scene.  Can only be used in prose user prompts."},
        {id: "summary.interface", description: "How the bot should structure its summary data.  DO NOT ALTER THIS, and make sure it is included in the summary prompt templates."}
    ]

    return <>
        <Modal className={styles.templateModal} title="Common Prompt Templates" open={modal.isOpen} footer={null} onCancel={modal.close}>
            <Tabs>
                <Tabs.TabPane key="editable" tabKey="editable" tab="Editable Templates">
                    <label>Bot Identity <Tag>botId</Tag></label>
                    <Input.TextArea value={templates.botId || defaultPrompts.botId} onChange={onInputChange(updateTemplate("botId"))} autoSize />

                    <label>JSON Instructions <Tag>json</Tag></label>
                    <Input.TextArea value={templates.json || defaultPrompts.json} onChange={onInputChange(updateTemplate("json"))} autoSize />

                    <label>Style Guide <Tag>styleGuide</Tag></label>
                    <Input.TextArea value={templates.styleGuide || defaultPrompts.styleGuide} onChange={onInputChange(updateTemplate("styleGuide"))} autoSize />

                    <label>Full Story Details <Tag>story.details.full</Tag></label>
                    <Input.TextArea value={templates["story.details.full"] || defaultPrompts["story.details.full"]} onChange={onInputChange(updateTemplate("story.details.full"))} autoSize />

                    <label>Character Notes <Tag>character.gen.notes</Tag></label>
                    <Input.TextArea value={templates["character.gen.notes"] || defaultPrompts["character.gen.notes"]} onChange={onInputChange(updateTemplate("character.gen.notes"))} autoSize />
                </Tabs.TabPane>
                <Tabs.TabPane key="available" tabKey="available" tab="Available Templates">
                    <Table dataSource={prompts}>
                        <Table.Column title="Tag Id" dataIndex="id" />
                        <Table.Column title="Description" dataIndex="description" />
                    </Table>
                </Tabs.TabPane>
            </Tabs>
        </Modal>
        <Menu items={menu} mode="horizontal" />
    </>;
}
