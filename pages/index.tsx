import { GetStaticProps } from "next";
import Head from "next/head";

import { useTexts } from "@/lib/hooks";
import { serverTexts } from "@/lib/texts_utils";
import posts from "@/public/posts";

import Header from "@/components/header";
import LangSelector from "@/components/lang_selector";
import CardView from "@/components/card_view/card_view";
import Footer from "@/components/footer";
import { getImage, getPostData, getPostText, PostData } from "@/lib/posts";
import { TopButton } from "@/components/layout";

interface IndexProps {
    posts: { [key: string]: PostData };
}

const Index: React.FC<IndexProps> = ({ posts }) => {
    const { t } = useTexts();

    console.log({ posts });

    for (const [key, value] of Object.entries(posts)) {
        console.log("p", value.image.path, value);

        try {
            posts[key].image.data = getImage(value.image.path);
        } catch {
            posts[key].image.data = null;
        }
    }

    return (
        <>
            <Head>
                <title>{t("index.title")}</title>
            </Head>

            <Header t={t} header_type="index" />
            <main>
                <LangSelector t={t} />
                <CardView t={t} posts={posts} />
            </main>
            <Footer t={t} />

            <TopButton t={t} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const translations = await serverTexts(locale);
    const fs = require("fs").promises;

    let postDatas: { [key: string]: PostData } = {};
    for (const [key, _] of Object.entries(posts)) {
        postDatas[key] = await getPostData(
            await getPostText(fs, key, locale),
            //@ts-ignore
            posts[key]
        );
    }

    // const postDatasPromises = Object.keys(posts).map(async (key) =>
    // );
    // const postDatas = await Promise.all(postDatasPromises);

    return {
        props: {
            ...translations,
            posts: postDatas,
        },
    };
};

export default Index;
