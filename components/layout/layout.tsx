import { motion } from "framer-motion";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./layout.module.scss";
import Footer from "@/components/footer";
import LayoutButton from "./layout_button";

interface LayoutProps {
    t: (s: string) => string;
    children: React.ReactNode | string;
    next_post: string;
}

const Layout: React.FC<LayoutProps> = ({ t, children, next_post }) => {
    console.log({ next_post });

    return (
        <>
            <nav className={styles.nav}>
                <LayoutButton
                    icon={faChevronLeft}
                    text={t("layout.back_button")}
                    href="/"
                />
                <motion.h2
                    drag={"x"}
                    dragConstraints={{
                        top: -10,
                        left: -10,
                        right: 10,
                        bottom: 10,
                    }}
                    className={styles.nav__title}
                >
                    {t("layout.title")}
                </motion.h2>
                {next_post && (
                    <LayoutButton
                        icon={faChevronRight}
                        icon_postion="right"
                        // text={t(`posts.${next_post}.title`)}
                        text={t(`layout.next_button`)}
                        href={`/posts/${next_post}`}
                        style={{ marginLeft: "auto" }}
                    />
                )}
            </nav>
            <main>{children}</main>
            <Footer t={t} />
        </>
    );
};
export default Layout;
