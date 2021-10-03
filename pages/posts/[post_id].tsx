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
    post: PostData;
    nextPostId: string;
    mdxSource: MDXRemoteSerializeResult | null;
}

import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { getPostData, getPostText, PostData } from "@/lib/posts";

const Post: React.FC<PostProps> = ({ post, nextPostId, mdxSource }) => {
    const router = useRouter();
    const { post_id } = router.query;
    const { t } = useTexts();

    const text_prefix = `posts.${post_id}`;

    useEffect(() => {
        if (typeof post == "undefined") {
            router.push("/posts/not_found");
        }
    }, [post, router]);

    return (
        <>
            <Head>
                <title>{t("posts.page_title_prefix") + post.title}</title>
            </Head>
            <Layout t={t} next_post={nextPostId} layoutType="posts">
                {mdxSource && post && (
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

    // Getting translations for i18n
    const translations = await serverTexts(locale);

    // Getting mdxSource
    const postText = post_id
        ? await getPostText(require("fs").promises, post_id, locale)
        : null;
    const mdxSource = postText ? await serialize(postText) : null;

    // Getting postData object
    // @ts-ignore
    const post = post_id && (await getPostData(postText, posts[post_id]));

    // Getting nextPostId
    const postIds = Object.keys(posts);
    const postIndex = postIds.findIndex((elem) => elem == post_id);
    const nextPostIndex = (postIndex + 1) % postIds.length;
    const nextPostId = postIds[nextPostIndex];

    return {
        props: {
            ...translations,
            post,
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
