import { Col, Row } from "antd";
import {OverviewProps} from "./Overview.d";
import styles from './Overview.module.scss';

export const OverviewComponent = ({}:OverviewProps) =>
    <Row>
        <Col xs={4}></Col>
        <Col xs={4}>
            <img className={styles.logo} src="/PotA-icon.webp" />
        </Col>
        <Col xs={8}>
            <h1>
                Phantom of the Author-a<br/>
                <small>AI-Powered Ghost Writer</small>
            </h1>

            <p>Unleash your creative spirit with "Phantom of the Author-a," the revolutionary AI-powered ghostwriting app designed to transform your thoughts into literary masterpieces. Whether you're crafting your first novel, spinning a short story, or penning a powerful speech, Phantom of the Author-a is your silent partner in the writing process. With cutting-edge AI technology, this app understands your voice and style, helping to articulate your ideas with clarity and flair. Embrace the freedom to create with an intuitive interface and personalized suggestions that ensure your writing is always authentic and engaging. Turn the whisper of inspiration into the roar of published work with Phantom of the Author-a—where your ideas come to life.</p>
        </Col>
    </Row>;
