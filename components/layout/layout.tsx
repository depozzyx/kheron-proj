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
    layoutType: "posts" | "feedback";
    next_post?: string | null | undefined;
    className?: string;
}

const navVariants = {
    start: { minHeight: "0vh" },
    end: { minHeight: "10vh" },
};

const h2Variants = {
    start: { y: 100 },
    end: { y: 0 },
};

const transitionConfig = {
    type: "spring",
    damping: 10,
    mass: 0.7,
    stiffness: 300,
};

const Layout: React.FC<LayoutProps> = ({
    t,
    children,
    next_post,
    className,
    layoutType,
}) => {
    return (
        <>
            <motion.nav
                className={styles.nav}
                initial="start"
                animate="end"
                variants={navVariants}
                transition={transitionConfig}
            >
                {layoutType !== "feedback" && (
                    <LayoutButton
                        icon={faChevronLeft}
                        text={t("layout.back_button")}
                        href="/"
                    />
                )}
                <motion.h2
                    initial="start"
                    animate="end"
                    variants={h2Variants}
                    transition={transitionConfig}
                    drag={"x"}
                    dragConstraints={{
                        top: -10,
                        left: -10,
                        right: 10,
                        bottom: 10,
                    }}
                    className={styles.nav__title}
                    style={{ margin: "0 auto" }}
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
                    />
                )}
            </motion.nav>
            <main className={className}>{children}</main>
            <Footer
                t={t}
                color={"blue"}
                footerType={layoutType === "feedback" ? "feedback" : "default"}
            />
        </>
    );
};
export default Layout;
