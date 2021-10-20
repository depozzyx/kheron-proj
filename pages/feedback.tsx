import { useRef } from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt } from "@fortawesome/free-solid-svg-icons";

import { getStaticPropsOnlyTexts } from "@/lib/texts_utils";
import { useTexts } from "@/lib/hooks";
import Layout, { TopButton } from "@/components/layout";
import { FeedbacksFunctions } from "@/components/PAGES/feedback/feedbacks";
import { Feedbacks, AddFeedback, styles } from "@/components/PAGES/feedback";

export default function Feed() {
    const { t } = useTexts();
    const feedbacksRef = useRef<FeedbacksFunctions>();

    return (
        <>
            <Head>
                <title>{t("feedback.title")}</title>
            </Head>
            <Layout
                t={t}
                className={styles.feedback_layout}
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
                <AddFeedback
                    updateFeedbacks={feedbacksRef.current?.updateFeedbacks}
                    t={t}
                />
            </Layout>
            <TopButton t={t} />
        </>
    );
}

export const getStaticProps = getStaticPropsOnlyTexts;
