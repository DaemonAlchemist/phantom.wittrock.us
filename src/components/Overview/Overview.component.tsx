import {OverviewProps} from "./Overview.d";
import styles from './Overview.module.scss';

export const OverviewComponent = ({}:OverviewProps) =>
    <div>
        <img className={styles.logo} src="/PotA-icon.webp" />
        <h1>
            Phantom of the Author-a<br/>
            <small>AI-Powered Ghost Writer</small>
        </h1>
    </div>;
