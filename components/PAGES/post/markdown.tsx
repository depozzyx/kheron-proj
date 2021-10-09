import { motion } from "framer-motion";
import Image from "next/dist/client/image";

import { getIconFromTag, getImage, Tag } from "@/lib/posts";
import styles from "./post_view.module.scss";

const CustomPic = ({ image_file, image_link, alt }: any) => {
    return (
        <motion.div
            whileHover={{ scale: 1.1, cursor: "nesw-resize" }}
            whileTap={{ scale: 2 }}
        >
            <Image
                src={image_link || getImage(image_file)}
                key={image_file}
                alt={alt}
                objectFit="scale-down"
            />
        </motion.div>
    );
};
const CustomImg = (props: any) => {
    return (
        <motion.div
            whileHover={{ scale: 1.1, cursor: "nesw-resize" }}
            whileTap={{ scale: 2 }}
        >
            <img {...props} />
        </motion.div>
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
        pic: CustomPic,
        img: CustomImg,
        imgrow: CustomImgRow,
        title: CustomTitle,
        subtitle: CustomSubtitle,
    };
};

export { getPostComponents };
