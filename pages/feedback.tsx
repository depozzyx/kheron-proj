import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getStaticPropsOnlyTexts } from "@/lib/texts_utils";
import { useTexts } from "@/lib/hooks";
import Layout from "@/components/layout";
import styles from "@/styles/feedback.module.scss";
import uiButtonStyles from "@/components/UI/button/button.module.scss";
import {
    faExclamationTriangle,
    faPen,
    faPenAlt,
} from "@fortawesome/free-solid-svg-icons";

class CustomDate extends Date {
    yyyymmdd = function () {
        // @ts-ignore
        const self = this;

        const mm = self.getMonth() + 1; // getMonth() is zero-based
        const dd = self.getDate();
        return [
            (dd > 9 ? "" : "0") + dd,
            (mm > 9 ? "" : "0") + mm,
            self.getFullYear(),
        ].join(".");
    };
}

const errorVariants = {
    start: { y: -100 },
    end: { y: 0 },
};

const transitionConfig = {
    type: "spring",
    damping: 10,
    mass: 0.7,
    stiffness: 300,
};

interface Feedback {
    author: string;
    text: string;
    date: CustomDate;
}

export default function Feed() {
    const { t } = useTexts();

    const [text, setText] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [error, setError] = useState<any>("");
    const submitFeedback = async (e: FormEvent) => {
        e.preventDefault();
        console.log(text);
        await addFeedback();
        await updateFeedbacks();
    };

    const addFeedback = async () => {
        try {
            await axios.get("/api/feedback/add/", {
                params: {
                    author,
                    text,
                    date: new Date(),
                },
            });

            setError("");
            setText("");
        } catch (err: any) {
            console.log(err.response.data);
            if (err.response.data) {
                setError(err.response.data.error);
            } else {
                setError(err.message);
            }
            console.log(error);
        }
    };

    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const updateFeedbacks = async () => {
        const res = await axios.get("/api/feedback/get");
        const rawFeedbacks: any = res.data;
        const feedbacks = rawFeedbacks.map((feedback: Feedback) => {
            feedback.date = new CustomDate(feedback.date);
            return feedback;
        });
        setFeedbacks(feedbacks);
    };

    useEffect(() => {
        updateFeedbacks();
    }, []);

    return (
        <Layout
            t={t}
            next_post={null}
            className={styles.feedback}
            layoutType="feedback"
        >
            <section>
                <h1>
                    feedback
                    <FontAwesomeIcon icon={faPenAlt} size={"xs"} />
                </h1>
                <h6>Nen nfnf fff nnfn</h6>
            </section>
            <section className={styles.feedback__items}>
                {feedbacks.map((feedback, i) => (
                    <div className={styles.feedback__item} key={i}>
                        <div className={styles.item__head}>
                            <p className={styles.item__author}>
                                {feedback.author}
                            </p>
                            <p className={styles.item__date}>
                                {feedback.date.yyyymmdd()}
                            </p>
                        </div>
                        <p className={styles.item__text}>{feedback.text}</p>
                    </div>
                ))}
            </section>
            <form onSubmit={(e) => submitFeedback(e)}>
                <h2>Send_feedback</h2>
                <input
                    placeholder={"Author"}
                    value={author}
                    type="text"
                    onChange={(e) => {
                        setAuthor(e.target.value);
                    }}
                />
                <textarea
                    name="Feedback text"
                    cols={30}
                    rows={10}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {error && (
                    <motion.p
                        initial="start"
                        animate="end"
                        variants={errorVariants}
                        transition={transitionConfig}
                        className={styles.feedback__error}
                    >
                        <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                        {t(`errors.${error}`)}
                    </motion.p>
                )}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => submitFeedback(e)}
                    className={[
                        uiButtonStyles.button,
                        uiButtonStyles.default,
                    ].join(" ")}
                >
                    <FontAwesomeIcon icon={faPen} /> Submit
                </motion.button>
            </form>
        </Layout>
    );
}

export const getStaticProps = getStaticPropsOnlyTexts;
