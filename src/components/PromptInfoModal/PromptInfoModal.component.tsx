import { Modal, Tooltip } from "antd";
import {PromptInfoModalProps} from "./PromptInfoModal.d";
import styles from './PromptInfoModal.module.scss';
import { InfoOutlined } from "@ant-design/icons";
import { useModal } from "../../lib/useModal";

export const PromptInfoModalComponent = ({lastPrompt, systemPrompt}:PromptInfoModalProps) => {
    const modal = useModal();

    return <>
        <Modal className={styles.lastPromptModal} open={modal.isOpen} onCancel={modal.close} footer={null}>
            <h2>What just ran?</h2>
            <hr/>

            <label><b>System Prompt</b></label>
            <pre>{systemPrompt}</pre>

            <label><b>User Prompt</b></label>
            <pre>{lastPrompt}</pre>
        </Modal>
        {!!lastPrompt && <Tooltip title="What prompt was just run?"><InfoOutlined onClick={modal.open}/></Tooltip>}
    </>;
}