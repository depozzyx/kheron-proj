import { motion } from "framer-motion";
import React from "react";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import buttonStyle from "@/components/UI/button/button.module.scss";

interface AddFeedbackButtonProps {
    t: (s: string) => string;
    submitFunction: (e: any) => void;
    className?: string;
}

const AddFeedbackButton: React.FC<AddFeedbackButtonProps> = ({
    t,
    submitFunction,
    className,
}) => {
    const classNames = [
        buttonStyle.button,
        buttonStyle.default,
        className || "",
    ].join(" ");

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => submitFunction(e)}
            className={classNames}
        >
            <FontAwesomeIcon icon={faPen} /> {t("feedback.send_button")}
        </motion.button>
    );
};

export default AddFeedbackButton;
