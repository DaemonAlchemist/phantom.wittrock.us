import { Alert, Col, Row, Typography } from "antd";
import {OverviewProps} from "./Overview";
import styles from './Overview.module.scss';
import { AlertOutlined, SettingOutlined } from "@ant-design/icons";

export const OverviewComponent = ({}:OverviewProps) =>
    <Row className={styles.overview}>
        <Col xs={4}></Col>
        <Col xs={4}>
            <img className={styles.logo} src="/PotA-icon.webp" />
        </Col>
        <Col xs={8}>
            <h1>
                Phantom of the Author-a<br/>
                <small>AI-Powered Ghost Writer</small>
            </h1>

            <Alert type="info" message={<>
                <Typography.Text type="danger"><AlertOutlined /></Typography.Text>
                &nbsp;Note:  This is a WIP PoC, so it will probably have bugs. You have been warned. :)
            </>} />

            <h2>What is this?</h2>

            <p><b>Phantom of the Author-a</b> is an AI-powered ghost writing app.  It maintains information about your story outline, themes, locations, and characters, and uses that information to flesh out your story.  You can use as much or as little AI help as you want.</p>

            <h2>Getting Started</h2>

            <p><b>Phantom of the Author-a</b> supports <a href="https://ollama.com/">Ollama</a> and <a href="https://openrouter.ai">OpenRouter</a> as sources for language models.  To use PotA, you will need a locally running instance of Ollama and/or an account at OpenRouter.  If you are using OpenRouter, select it as the engine and then click on the key icon to enter your API key.  If you are using Ollama, install the Ollama server and then follow the instructions <a href="https://medium.com/dcoderai/how-to-handle-cors-settings-in-ollama-a-comprehensive-guide-ee2a5a1beef0">here</a> to update Ollama's CORS settings.</p>

            <h2>Process</h2>

            <p><b>Phantom of the Author-a</b> is designed as a top-down, start to finish app.  Using it in a manner other than specified below may cause unexpected behavior or errors, because PotA makes assumptions about what tasks have already been completed. The supported process is:</p>

            <ol>
                <li>Enter a seed idea for your story along with any other instructions.  PotA will generate a basic story outline along with themes, genre(s), and target audience(s).</li>
                <li>Validate and edit the story information to your liking.</li>
                <li>Generate some locations for your story.  You can generate as many as you like, and you can also include custom instructions each time you create more.</li>
                <li>Validate and edit the location information to your liking.</li>
                <li>Generate some characters for your story.  You can generate as many as you like, and you can also include custom instructions each time you create more.</li>
                <li>Validate and edit the character information to your liking.</li>
                <li>Generate the overall structure for your story.  This will create a hierarchy of acts and chapters, each with an associated outline.  Note:  This prompt may take a while.</li>
                <li>Validate and edit the act and chapter outlines to your liking.</li>
                <li>
                    Create your story in a top-down, start-to-finish manner:
                    <ol>
                        <li>
                            For each act:
                            <ol>
                                <li>
                                    For each chapter:
                                    <ol>
                                        <li>Create a list of scenes for the chapter.  Include custom instructions if desired.</li>
                                        <li>Validate and edit the scene outlines to your liking.</li>
                                        <li>PotA may generate new minor characters for the scenes.  Validate and edit their information to your liking.</li>
                                        <li>
                                            For each scene:
                                            <ol>
                                                <li>Create a list of beats for the scene.</li>
                                                <li>Validate and edit the beat outlines to your liking.</li>
                                                <li>
                                                    For each beat:
                                                    <ol>
                                                        <li>Create the prose for the beat.  Include custom instructions if desired.</li>
                                                        <li>Validate and edit the prose to your liking.</li>
                                                    </ol>
                                                </li>
                                                <li>Summarize the scene.</li>
                                                <li>Validate and edit the scene summary to your liking.</li>
                                            </ol>
                                        </li>
                                        <li>Summarize the chapter.</li>
                                        <li>Validate and edit the chapter summary to your liking.</li>
                                    </ol>
                                </li>
                                <li>Summarize the act.</li>
                                <li>Validate and edit the act summary to your liking.</li>
                            </ol>
                        </li>
                    </ol>
                </li>
            </ol>

            <h2>Prompt Editing</h2>
            <p>The <b>Prompt Editor</b> allows you to customize the prompts used by the AI to generate content. This feature is crucial for tailoring the AI's output to better fit your story's needs. Here's how you can use the Prompt Editor:</p>
            <ol>
                <li>Click on the <b>Settings</b> icon (<SettingOutlined />) next to any prompt in the app.</li>
                <li>In the modal that appears, you'll see two sections: <b>System</b> and <b>User</b>.</li>
                <li>The <b>System</b> section allows you to view and edit the prompt that the AI uses internally.</li>
                <li>The <b>User</b> section is where you can input your custom instructions or modifications to the prompt.</li>
                <li>After making your changes, simply close the modal. Your edits will be automatically saved and used for future AI generations.</li>
            </ol>
            <p>This feature empowers you to guide the AI in a direction that aligns with your creative vision, ensuring the generated content is as relevant and engaging as possible.</p>
            <Alert type="error" message={`Note:  Almost all prompts require the {{json}} and an interface template included as part of the prompt.  Removing or changing these will almost always result in the app breaking.`} />

            <h2>Common Prompt Templates</h2>

            <p>PotA also has several prompt templates that can be included in your system and/or user prompts.  Click on the <b>Prompt Templates</b> menu, and then the <b>Common Templates</b> menu item.  You can edit several of the commonly used templates.  The dialog also shows you what templates are available.  Include them in your prompts by enclosing the tag id inside double curly braces (ex. {'{{story.details.full}}'} ).</p>

            <h2>Saving and Loading</h2>

            <p>Under the <b>Story</b> menu, you have options for saving, loading, or clearing your current story.</p>

            <p>Under the <b>Prompt Templates</b> menu, you have options for saving and loading your user-defined prompt templates.  This can be useful if you want to define different styles for different stories and/or provide different prompt strategies for the various models.</p>

            <p>Both stories and prompt templates will be saved as JSON files.</p>

            <h2>Local Setup</h2>

            <ol>
                <li>Checkout the code:  <a href="https://github.com/daemonalchemist/phantom.wittrock.us/">https://github.com/daemonalchemist/phantom.wittrock.us/</a></li>
                <li>
                    Install dependencies:
                    <pre>&gt; yarn</pre>
                </li>
                <li>
                    Start the development server:
                    <pre>&gt; yarn dev</pre>
                </li>
            </ol>
        </Col>
    </Row>;
