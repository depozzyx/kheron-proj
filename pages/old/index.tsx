import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { serverTexts } from "@/lib/texts_utils";
import { useTexts } from "@/lib/hooks";
import styles from "@/styles/Home.module.scss";
import NavBar from "@/components/NavBarOld";

import arbPic from "@/public/media/arbuz.jpg";

export default function Home() {
    const { t } = useTexts();
    const router = useRouter();

    return (
        <div className="m-100">
            <Head>
                <title>depozzyx.com</title>
                <meta name="description" content="сайт деппоззуха" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar t={t} />
            <main className={styles.page}>
                <h2>
                    <Link href="/" passHref>
                        <a>{t("index.website")}</a>
                    </Link>
                </h2>
                <p>{t("index.website_description")}</p>
                <h2>{t("index.about")}</h2>
                <p>{t("index.about_description")}</p>
                <div className={styles.image_container}>
                    <Image src={arbPic} alt="Арбуз)))" layout="responsive" />
                </div>
            </main>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const translations = await serverTexts(locale);
    return {
        props: {
            ...translations,
        },
    };
};
