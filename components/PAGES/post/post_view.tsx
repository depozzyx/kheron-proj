import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

import { getPostComponents } from "@/components/PAGES/post/markdown";
import { PostData } from "@/lib/posts";
import styles from "./post_view.module.scss";

interface PostViewProps {
    t: (key: string) => string;
    post_object: PostData;
    mdxSource: MDXRemoteSerializeResult;
}

const PostView: React.FC<PostViewProps> = ({ t, post_object, mdxSource }) => {
    const components = getPostComponents(post_object.tag);

    return (
        <article className={styles.post_view}>
            <MDXRemote {...mdxSource} components={components} />
        </article>
    );
};

export default PostView;
