import { Col, Row } from "antd";
import {OverviewProps} from "./Overview.d";
import styles from './Overview.module.scss';

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

            <p>Unleash your creative spirit with <b>Phantom of the Author-a</b>, an AI-powered ghostwriting app designed to transform your thoughts into literary masterpieces.  Whether you're crafting your first novel, spinning a short story, or penning a powerful speech, Phantom of the Author-a is your silent partner in the writing process.  With cutting-edge AI technology, this app understands your voice and style, helping to articulate your ideas with clarity and flair.  Embrace the freedom to create with an intuitive interface that ensure your writing is always authentic and engaging. Turn the whisper of inspiration into the roar of published work with <b>Phantom of the Author-a</b>, where your ideas come to life.</p>

            <h2>What is this?</h2>

            <p><b>Phantom of the Author-a</b> is an AI-powered ghost writing app.  It maintains information about your story outline, themes, locations, and characters, and uses that information to flesh out your story.  You can use as much or as little AI help as you want.  PotA currently has support for several engines and models:  Ollama (Llama2, Gemma, Mistral, Mixtral), Anthropic (Claude3), and OpenAI (GPT4, GPT3.5).</p>

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

            <h2>Known Bugs:</h2>

            <ul>
                <li>Deleting a beat does not refresh the beat list.  You need to close and re-open the scene.</li>
                <li>Loading a story does not refresh the interface.  You need to refresh the page.</li>
            </ul>

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
                <li>Enter your API key(s) for the Anthropic and OpenAI engines</li>
                <li>Download and install the <a href="https://ollama.com/">Ollama</a> server if you want to run local models.</li>
            </ol>
        </Col>
    </Row>;
