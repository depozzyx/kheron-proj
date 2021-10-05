import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import axios from "axios";

import styles from "./feedbacks.module.scss";
import { CustomDate } from "./_custom_date";

interface Feedback {
    author: string;
    text: string;
    date: CustomDate;
}

interface FeedbacksProps {}

export type FeedbacksFunctions =
    | undefined
    | {
          updateFeedbacks: () => void;
      };

const Feedbacks = forwardRef<FeedbacksFunctions, FeedbacksProps>(({}, ref) => {
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

    useImperativeHandle(ref, () => ({
        updateFeedbacks,
    }));

    useEffect(() => {
        updateFeedbacks();
    }, []);

    return (
        <section className={styles.feedbacks}>
            {feedbacks.map((feedback, i) => (
                <div className={styles.feedback} key={i}>
                    <div className={styles.feedback__head}>
                        <p className={styles.feedback__author}>
                            {feedback.author}
                        </p>
                        <p className={styles.feedback__date}>
                            {feedback.date.yyyymmdd()}
                        </p>
                    </div>
                    <p className={styles.feedback__text}>{feedback.text}</p>
                </div>
            ))}
        </section>
    );
});

Feedbacks.displayName = "Feedbacks";

export { Feedbacks };
