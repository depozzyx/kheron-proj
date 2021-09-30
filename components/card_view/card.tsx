import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import styles from "./card_view.module.scss";
import { getIconFromTag, Tag } from "@/lib/posts";

interface CardProps {
    title: string;
    subtitle: string;
    tag: Tag;
    href?: string;
    image?: { data: StaticImageData | null; alt: string };
}

const Card: React.FC<CardProps> = ({ image, title, subtitle, href, tag }) => {
    return (
        <Link href={href || ""} passHref>
            <motion.article
                className={styles.card}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {image && image.data ? (
                    <div className={styles.card__image}>
                        <Image src={image?.data} alt={image?.alt} />
                    </div>
                ) : (
                    <span />
                )}
                <div className={styles.card__text}>
                    <h5>
                        {title}
                        {getIconFromTag(tag)}
                    </h5>
                    <p>{subtitle}</p>
                </div>
            </motion.article>
        </Link>
    );
};

export default Card;
