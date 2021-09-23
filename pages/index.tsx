import Header from "@/components/header";

import styles from "@/styles/Index.module.scss";
import { useTexts } from "@/lib/hooks";
import { getStaticPropsOnlyTexts } from "@/lib/texts_utils";

export default function Index() {
    const { t } = useTexts();

    return (
        <>
            <Header t={t}></Header>
            <main className={styles.main}>
                <div>hi bruuuh</div>
                <div>hi bruuuh</div>
                <div>hi bruuuh</div>
                <div>hi bruuuh</div>
                <div>hi bruuuh</div>
            </main>
        </>
    );
}

export const getStaticProps = getStaticPropsOnlyTexts;
