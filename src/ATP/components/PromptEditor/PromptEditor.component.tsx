import { SettingOutlined } from "@ant-design/icons";
import { Input, Modal, Tag } from "antd";
import { onInputChange } from "@ATP/lib/onInputChange";
import { useModal } from "@ATP/lib/useModal";
import { usePrompts } from "@ATP/lib/usePrompt";
import { PromptEditorProps } from "./PromptEditor";
import styles from "./PromptEditor.module.scss";

export const PromptEditorComponent = ({promptId}:PromptEditorProps) => {
    const modal = useModal();
    const {prompts, update} = usePrompts(promptId);

    return <>
        <SettingOutlined onClick={modal.open} />
        <Modal className={styles.editor} title={<>Edit Prompts <Tag>{promptId}</Tag></>} open={modal.isOpen} onCancel={modal.close} footer={null}>
            
            <label>System <Tag>{promptId}.system</Tag></label>
            <Input.TextArea value={prompts.system} onChange={onInputChange(update.system)} autoSize />

            <label>User <Tag>{promptId}.user</Tag></label>
            <Input.TextArea value={prompts.user} onChange={onInputChange(update.user)} autoSize />
        </Modal>
    </>;
}
