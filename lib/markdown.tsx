import Image from "next/dist/client/image";

import { getIconFromTag, getImage, Tag } from "@/lib/posts";
import styles from "@/components/post_view/post_view.module.scss";

const CustomImg = ({ image_file, image_link, alt }: any) => {
    return (
        <Image
            src={image_link || getImage(image_file)}
            key={image_file}
            alt={alt}
            objectFit="scale-down"
        />
    );
};
const CustomImgRow = (props: any) => (
    <div className={styles.post_view__imgrow} {...props} />
);
const CustomSubtitle = ({ ...props }: any) => <h6 {...props} />;

const getPostComponents = (postTag: Tag) => {
    const CustomTitle = ({ children, ...props }: any) => (
        <h1 {...props}>
            {children} {getIconFromTag(postTag)}
        </h1>
    );

    return {
        pic: CustomImg,
        imgrow: CustomImgRow,
        title: CustomTitle,
        subtitle: CustomSubtitle,
    };
};

export { getPostComponents };
