import { motion } from "framer-motion";

import styles from "./lang_selector.module.scss";
import LangButton from "./lang_button";

interface props {
    t: (key: string) => string;
}

export default function LangSelector({ t }: props) {
    const locales = ["ua", "en", "ru"];

    return (
        <motion.section className={styles.lang_selector}>
            <motion.h3
                drag={"x"}
                dragConstraints={{
                    top: -10,
                    left: -10,
                    right: 10,
                    bottom: 10,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {t("lang.select")}
            </motion.h3>
            <div>
                {locales.map((locale) => (
                    <LangButton key={locale} t={t} to_locale={locale} />
                ))}
            </div>
        </motion.section>
    );
}
