import axios from "axios";
import { FormEvent, useState } from "react";

import AddFeedbackButton from "./add_feedback_button";
import AddFeedbackError from "./add_feedback_error";
import styles from "./add_feedback.module.scss";

interface AddFeedbackProps {
    t: (s: string) => string;
    updateFeedbacks: undefined | (() => void);
}

const AddFeedback: React.FC<AddFeedbackProps> = ({ t, updateFeedbacks }) => {
    const [text, setText] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [error, setError] = useState<string | null>("");

    // submitFeedbacks makes all required checks
    // and updatesFeedbacks afterwards
    const submitFeedback = async (e: FormEvent) => {
        e.preventDefault();
        await addFeedback();

        if (!updateFeedbacks) {
            throw new Error("updateFeedbacks is undefined!");
        }
        await updateFeedbacks();
    };

    // addFeedback makes api request
    // and handles errors from this request
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
            setError(err.response.data ? err.response.data.error : err.message);
            console.error(error);
        }
    };

    return (
        <form
            className={styles.add_feedback}
            onSubmit={(e) => submitFeedback(e)}
        >
            <h2 className={styles.add_feedback__title}>
                {t("feedback.send_title")}
            </h2>
            <input
                className={styles.add_feedback__author}
                placeholder={t("feedback.send_author")}
                value={author}
                type="text"
                onChange={(e) => {
                    setAuthor(e.target.value);
                }}
            />
            <textarea
                className={styles.add_feedback__text}
                name={t("feedback.send_text")}
                placeholder={t("feedback.send_text")}
                cols={30}
                rows={10}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <AddFeedbackError
                className={styles.add_feedback__error}
                t={t}
                error={error}
            />
            <AddFeedbackButton
                className={styles.add_feedback__button}
                t={t}
                submitFunction={submitFeedback}
            />
        </form>
    );
};

export default AddFeedback;
