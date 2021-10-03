import {
    faChevronLeft,
    faPen,
    faPenAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Link from "next/link";

import styles from "./footer.module.scss";

interface FooterProps {
    t: (s: string) => string;
    footerType?: "default" | "feedback";
    color?: "accent" | "blue";
}

const Footer: React.FC<FooterProps> = ({ t, color, footerType }) => {
    color ||= "accent";
    footerType ||= "default";

    const className = [styles.footer, styles["footer--" + color]].join(" ");

    return (
        <footer className={className}>
            <motion.h6
                drag
                dragConstraints={{
                    top: -50,
                    left: -50,
                    right: 50,
                    bottom: 50,
                }}
                className={styles.footer__title}
            >
                {t("footer.title")}
            </motion.h6>
            <Link href={footerType === "default" ? "/feedback/" : "/"} passHref>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    className={styles.footer__button}
                >
                    {footerType === "default" ? (
                        <>
                            <FontAwesomeIcon icon={faPenAlt} />{" "}
                            {t("footer.feedback")}
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faChevronLeft} />{" "}
                            {t("footer.back_button")}
                        </>
                    )}
                </motion.button>
            </Link>
        </footer>
    );
};

export default Footer;
