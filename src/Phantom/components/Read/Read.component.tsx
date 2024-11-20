import { useStory } from "@APP/lib/useStory";
import { Alert, Col, Row } from "antd";
import clsx from "clsx";
import { useRef, useState } from "react";
import { InView } from "react-intersection-observer";
import { ReadProps } from "./Read";
import styles from './Read.module.scss';

const useVisibleSet = () => {
    const [active, setActive] = useState<string[]>([]);
    const update = (id:string) => ((inView:boolean) => {setActive(old => inView
        ? [...old.filter(v => v !== id), id]
        : old.filter(v => v !== id)
    )});
    const has = (id:string) => active.includes(id);

    return {active, update, has};
}

export const ReadComponent = ({}:ReadProps) => {
    const {story} = useStory();

    const activeActs = useVisibleSet();
    const activeChapters = useVisibleSet();
    const activeScenes = useVisibleSet();

    const scrollRef = useRef<HTMLDivElement>(null);
    const scroll = (id:string) => () => {
        if(scrollRef.current) {
            const element = scrollRef.current.querySelector(`#${id}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    return <Row>
        <Col className={styles.ToC} xs={8}>
            <h1>{story.title}</h1>
            <h2>Table of Contents</h2>
            <ul>
                {(story.plot.acts || []).map((act, a) => <li key={a} className={clsx([activeActs.has(`${a}`) && styles.highlighted])}>
                    <span onClick={scroll(`act${a}`)}>
                        Act {a + 1}: {act.title}
                    </span>
                    <ul>
                        {(act.chapters || []).map((chapter, c) => <li key={c} className={clsx([activeChapters.has(`${a}:${c}`) && styles.highlighted])}>
                            <span onClick={scroll(`act${a}-chapter${c}`)}>
                                Chapter {c + 1}: {chapter.title}
                            </span>
                            <ul>
                                {(chapter.scenes || []).map((scene, s) => <li key={s} className={clsx([activeScenes.has(`${a}:${c}:${s}`) && styles.highlighted])}>
                                    <span onClick={scroll(`act${a}-chapter${c}-scene${s}`)}>
                                        Scene {s + 1}: {scene.title}
                                    </span>
                                </li>)}
                            </ul>
                        </li>)}
                    </ul>
                </li>)}
            </ul>
        </Col>
        <Col className={styles.read} xs={8} ref={scrollRef}>
            {story.plot.acts.map((act, a) => <InView onChange={activeActs.update(`${a}`)}>
                <div className={styles.act} key={a}>
                    <h2 id={`act${a}`}>
                        Act {a+1}: {act.title}
                    </h2>

                    {(act.chapters || []).length > 0 && <div className={styles.chapters}>
                        {act.chapters.map((chapter, c) => <InView onChange={activeChapters.update(`${a}:${c}`)}>
                            <div className={styles.chapter} key={c}>
                                <h3 id={`act${a}-chapter${c}`}>Chapter {c+1}: {chapter.title}</h3>

                                {(chapter.scenes || []).length > 0 && <div className={styles.scenes}>
                                    {chapter.scenes.map((scene, s) => <InView onChange={activeScenes.update(`${a}:${c}:${s}`)}>
                                        <div className={styles.scene} key={s} id={`act${a}-chapter${c}-scene${s}`}>
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
                                        </div>
                                    </InView>)}
                                </div>}

                                {(chapter.scenes || []).length === 0 && <div className={styles.chapterOutline}>
                                    <Alert type="info" message={chapter.outline} />
                                </div>}
                            </div>
                        </InView>)}
                    </div>}

                    {(act.chapters || []).length === 0 && <div className={styles.actOutline}>
                        <Alert type="info" message={act.outline} />
                    </div>}
                </div>
            </InView>)}
        </Col>
    </Row>;
}
