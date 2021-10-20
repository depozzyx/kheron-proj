import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

import { useTexts } from "@/lib/hooks";
import { serverTexts } from "@/lib/texts_utils";
import posts from "@/public/posts";
import styles from "@/components/layout/layout.module.scss";
import { getPostData, getPostText, PostData } from "@/lib/posts";
import Layout, { TopButton } from "@/components/layout";
import { PostView } from "@/components/PAGES/post";

interface PostProps {
    post: PostData | undefined;
    nextPostId: string;
    mdxSource: MDXRemoteSerializeResult | null;
}

const Post: React.FC<PostProps> = ({
    post,
    nextPostId,
    mdxSource,
    ...props
}) => {
    const router = useRouter();
    const { t } = useTexts();

    console.log({ post, props });

    useEffect(() => {
        if (post === null) {
            router.push("/posts/not_found");
        }
    }, [post, router, props]);

    return post ? (
        <>
            <Head>
                <title>
                    {t("posts.page_title_prefix") + (post ? post.title : "")}
                </title>
            </Head>
            <Layout t={t} next_post={nextPostId} layoutType="posts">
                {mdxSource && post && (
                    <PostView t={t} post_object={post} mdxSource={mdxSource} />
                )}
            </Layout>
            <TopButton t={t} />
        </>
    ) : (
        <>
            <nav className={styles["nav--fake"]}>
                <span>-=-</span>
            </nav>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    const post_id = params && params.post_id?.toString();

    // Getting translations for i18n
    const translations = await serverTexts(locale);

    // Getting mdxSource
    const postText = post_id
        ? await getPostText(require("fs").promises, post_id, locale)
        : null;
    const mdxSource = postText ? await serialize(postText) : null;

    // Getting postData object
    const post =
        // @ts-ignore
        post_id && postText && (await getPostData(postText, posts[post_id]));

    // Getting nextPostId
    const postIds = Object.keys(posts);
    const postIndex = postIds.findIndex((elem) => elem == post_id);
    const nextPostIndex = (postIndex + 1) % postIds.length;
    const nextPostId = postIds[nextPostIndex];

    return {
        props: {
            ...translations,
            post: post || null,
            nextPostId,
            mdxSource,
        },
    };
};
export async function getStaticPaths() {
    return {
        paths: Object.keys(posts).map((key) => `/posts/${key}`),
        fallback: true,
    };
}
export default Post;
