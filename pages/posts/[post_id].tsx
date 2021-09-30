import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetStaticProps } from "next";

import { useTexts } from "@/lib/hooks";
import { serverTexts } from "@/lib/texts_utils";
import posts from "@/public/posts";

import Layout from "@/components/layout";
import PostView from "@/components/post_view/post_view";

interface PostProps {
    posts: { [key: string]: any };
    mdxSource: MDXRemoteSerializeResult | null;
}

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { getPostText } from "@/lib/posts";

const Post: React.FC<PostProps> = ({ posts, mdxSource }) => {
    const router = useRouter();
    const { post_id } = router.query;
    const { t } = useTexts();

    const text_prefix = `posts.${post_id}`;
    const post = useMemo(
        () => (posts && typeof post_id === "string" ? posts[post_id] : {}),
        [post_id, posts]
    );

    useEffect(() => {
        if (typeof post == "undefined") {
            router.push("/posts/not_found");
        }
    }, [post, router]);

    const getNextPost = () => {
        if (typeof post_id != "string") return "";

        const keys = Object.keys(posts);
        const prev_index = keys.findIndex((elem) => elem == post_id);
        const next_index = (prev_index + 1) % keys.length;

        return keys[next_index];
    };

    return (
        <>
            <Head>
                <title>
                    {t("posts.title_prefix") + t(`${text_prefix}.title`)}
                </title>
            </Head>
            <Layout t={t} next_post={getNextPost()}>
                {mdxSource && (
                    <PostView
                        t={t}
                        post_id={typeof post_id === "string" ? post_id : ""}
                        post_object={post}
                        mdxSource={mdxSource}
                    />
                )}
            </Layout>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
    const post_id = params && params.post_id?.toString();

    const translations = await serverTexts(locale);
    const postText = post_id
        ? await getPostText(require("fs").promises, post_id, locale)
        : null;

    const mdxSource = postText ? await serialize(postText) : null;

    return {
        props: {
            ...translations,
            posts,
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
