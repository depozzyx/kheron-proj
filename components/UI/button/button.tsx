import { motion } from "framer-motion";
import styles from "./button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    button_type?: "default" | "not_selected";
}

const Button: React.FC<ButtonProps> = ({ button_type, children, ...props }) => {
    button_type ||= "default";

    const className = [
        styles.button,
        styles[button_type],
        props.className,
    ].join(" ");

    return (
        // @ts-ignore
        <motion.button
            {...props}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={className}
        >
            {children}
        </motion.button>
    );
};

export default Button;
