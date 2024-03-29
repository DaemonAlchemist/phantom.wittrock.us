import { Alert } from "antd";
import { useStory } from "../../../lib/storyGen/useStory";
import { ReadProps } from "./Read";
import styles from './Read.module.scss';

export const ReadComponent = ({}:ReadProps) => {
    const {story} = useStory();
    return <div className={styles.read}>
        <h1>{story.title}</h1>
        <hr />
        {story.plot.acts.map((act, a) => <div className={styles.act} key={a}>
            <h2>Act {a+1}: {act.title}</h2>

            {(act.chapters || []).length > 0 && <div className={styles.chapters}>
                {act.chapters.map((chapter, c) => <div className={styles.chapter} key={c}>
                    <h3>Chapter {c+1}: {chapter.title}</h3>

                    {(chapter.scenes || []).length > 0 && <div className={styles.scenes}>
                        {chapter.scenes.map((scene, s) => <div className={styles.scene} key={s}>
                            {(scene.beats || []).length > 0 && <div className={styles.beats}>
                                {scene.beats.map((beat, b) => <div className={styles.beat} key={b}>
                                    {!!beat.text && beat.text.split("\n").map((paragraph, p) => <p key={p}>
                                        {paragraph}
                                    </p>)}
                                    {!beat.text && <Alert type="info" message={beat.outline} />}
                                </div>)}
                            </div>
                            }
                            {(scene.beats || []).length === 0 && <div className={styles.beats}>
                                <Alert type="info" message={scene.outline} />
                            </div>}

                            <hr />
                        </div>)}
                    </div>}

                    {(chapter.scenes || []).length === 0 && <div className={styles.chapterOutline}>
                        <Alert type="info" message={chapter.outline} />
                    </div>}
                </div>)}
            </div>}

            {(act.chapters || []).length === 0 && <div className={styles.actOutline}>
                <Alert type="info" message={act.outline} />
            </div>}
        </div>)}
    </div>;
}
