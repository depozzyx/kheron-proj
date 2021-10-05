import { FormEvent, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faExclamationTriangle,
    faPen,
    faPenAlt,
} from "@fortawesome/free-solid-svg-icons";

import { getStaticPropsOnlyTexts } from "@/lib/texts_utils";
import { useTexts } from "@/lib/hooks";
import Layout from "@/components/layout";
import styles from "@/styles/feedback.module.scss";
import uiButtonStyles from "@/components/UI/button/button.module.scss";
import { Feedbacks } from "@/components/pages/feedback";
import { FeedbacksFunctions } from "@/components/pages/feedback/feedbacks";

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

export default function Feed() {
    const { t } = useTexts();

    const feedbacksRef = useRef<FeedbacksFunctions>();
    const [text, setText] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [error, setError] = useState<any>("");
    const submitFeedback = async (e: FormEvent) => {
        e.preventDefault();
        console.log(text);
        await addFeedback();
        await feedbacksRef.current?.updateFeedbacks();
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

    return (
        <Layout
            t={t}
            next_post={null}
            className={styles.feedback}
            layoutType="feedback"
        >
            <section>
                <h1>
                    {t("feedback.title")}
                    <FontAwesomeIcon icon={faPenAlt} size={"xs"} />
                </h1>
                <h6>{t("feedback.subtitle")}</h6>
            </section>
            <Feedbacks ref={feedbacksRef} />
            <form onSubmit={(e) => submitFeedback(e)}>
                <h2>{t("feedback.send_title")}</h2>
                <input
                    placeholder={t("feedback.send_author")}
                    value={author}
                    type="text"
                    onChange={(e) => {
                        setAuthor(e.target.value);
                    }}
                />
                <textarea
                    name={t("feedback.send_text")}
                    placeholder={t("feedback.send_text")}
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
                    <FontAwesomeIcon icon={faPen} /> {t("feedback.send_button")}
                </motion.button>
            </form>
        </Layout>
    );
}

export const getStaticProps = getStaticPropsOnlyTexts;
