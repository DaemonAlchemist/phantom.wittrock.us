import { ClearOutlined, DeploymentUnitOutlined, SendOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input, Spin } from "antd";
import clsx from "clsx";
import { onInputChange } from "../../lib/onInputChange";
import { ConversationProps } from "./Conversation.d";
import styles from './Conversation.module.scss';

export const ConversationComponent = ({
    prompt, setPrompt, conversation, run, clearConversation, isRunning
}:ConversationProps) =>
    <div className={styles.conversation}>
        {conversation.map((message, i) =>
            <div key={i} className={clsx([styles.message, styles[message.role]])}>
                {message.role === "user"      && <UserOutlined           />}
                {message.role === "assistant" && <DeploymentUnitOutlined />}
                {message.content}
            </div>
        )}
        <Spin spinning={isRunning}>
            <Input
                value={prompt}
                onChange={onInputChange(setPrompt)}
                placeholder="Prompt goes here."
                onPressEnter={run}
                addonAfter={<SendOutlined onClick={run}/>}
            />
            <div className={styles.clearBtn}>
                <Button onClick={clearConversation}>
                    <ClearOutlined/> Clear conversation
                </Button>
            </div>
        </Spin>
    </div>;
