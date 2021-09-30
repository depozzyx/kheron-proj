import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCity } from "@fortawesome/free-solid-svg-icons";

import styles from "./header.module.scss";

interface HeaderProps {
    t: (key: string) => string;
    header_type: "index" | "404";
}

const Header: React.FC<HeaderProps> = ({ t, header_type }) => {
    const texts = {
        index: {
            title: t("header.title"),
            subtitle: (
                <>
                    <FontAwesomeIcon icon={faCity} /> {t("header.subtitle")}
                </>
            ),
        },
        "404": {
            title: t("404.title"),
            subtitle: (
                <>
                    <FontAwesomeIcon icon={faLink} />{" "}
                    <Link href="/">{t("404.go_to_index")}</Link>
                </>
            ),
        },
    };
    const text = texts[header_type];

    const h1_variants = {
        start: { y: -100 },
        end: { y: 0 },
    };

    return (
        <header className={styles.header}>
            <motion.h1
                initial="start"
                animate="end"
                variants={h1_variants}
                transition={{
                    type: "spring",
                    damping: 10,
                    mass: 0.7,
                    stiffness: 300,
                }}
                className={styles.header__title}
                drag
                dragConstraints={{
                    top: -50,
                    left: -50,
                    right: 50,
                    bottom: 50,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {text.title}
            </motion.h1>
            <motion.p
                animate={{ y: 100, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                style={{ opacity: 0, y: 90 }}
                className={styles.header__subtitle}
            >
                {text.subtitle}
            </motion.p>
        </header>
    );
};

export default Header;
