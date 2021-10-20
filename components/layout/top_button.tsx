import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import styles from "./top_button.module.scss";

interface TopButtonProps {
    t: (s: string) => string;
}

const TopButton: React.FC<TopButtonProps> = ({ t }) => {
    const variants = {
        start: { y: 100 },
        end: { y: 0 },
    };
    const [showButton, setShowButton] = useState<boolean>(false);

    const onScroll = () => {
        if (window.scrollY + 200 > window.screen.height) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const onClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
    }, []);

    return showButton ? (
        <motion.button
            initial="start"
            animate="end"
            variants={variants}
            transition={{
                type: "spring",
                damping: 10,
                mass: 0.7,
                stiffness: 300,
            }}
            whileHover={{ scale: 1.1, translateX: "-50%", opacity: 1 }}
            whileTap={{ scale: 0.9, translateX: "-50%", opacity: 1 }}
            style={{ translateX: "-50%", opacity: 0.7 }}
            onClick={onClick}
            className={styles.top_button}
        >
            <FontAwesomeIcon icon={faArrowAltCircleUp} /> {t("layout.to_top")}{" "}
            <FontAwesomeIcon icon={faArrowAltCircleUp} />
        </motion.button>
    ) : (
        <></>
    );
};

export default TopButton;
