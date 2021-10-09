import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

interface AddFeedbackErrorProps {
    t: (s: string) => string;
    error: null | string;
    className: string;
}

const AddFeedbackError: React.FC<AddFeedbackErrorProps> = ({
    t,
    error,
    className,
}) => {
    const errorVariants = {
        start: { y: -100 },
        end: { y: 0 },
    };
    const transitionConfig = {
        type: "spring",
        damping: 10,
        mass: 0.7,
        stiffness: 300,
    };

    return error ? (
        <motion.p
            initial="start"
            animate="end"
            variants={errorVariants}
            transition={transitionConfig}
            className={className}
        >
            <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
            {t(`errors.${error}`)}
        </motion.p>
    ) : (
        <></>
    );
};

export default AddFeedbackError;
