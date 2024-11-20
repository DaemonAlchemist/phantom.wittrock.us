import { emptyStory, useStory } from "@APP/lib/useStory";
import { onInputChange } from "@ATP/lib/onInputChange";
import { loadData, saveData } from "@ATP/lib/save";
import { useModal } from "@ATP/lib/useModal";
import { useRawPrompts } from "@ATP/lib/usePrompt";
import { BookOutlined, DeleteOutlined, EditOutlined, FolderOpenOutlined, FormOutlined, SaveOutlined } from "@ant-design/icons";
import { availablePromptTemplates } from "@config/availablePromptTemplates";
import { defaultPrompts } from "@config/defaultPrompts";
import { Input, Menu, MenuProps, Modal, Table, Tabs, Tag } from "antd";
import { StoryMenuProps } from "./StoryMenu";
import styles from "./StoryMenu.module.scss";

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
                    <Table dataSource={availablePromptTemplates}>
                        <Table.Column title="Tag Id" dataIndex="id" />
                        <Table.Column title="Description" dataIndex="description" />
                    </Table>
                </Tabs.TabPane>
            </Tabs>
        </Modal>
        <Menu items={menu} mode="horizontal" />
    </>;
}
