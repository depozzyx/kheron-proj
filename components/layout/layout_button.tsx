import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import styles from "./layout.module.scss";
import { Button } from "@/components/UI";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface LayoutButtonProps {
    text: string;
    icon: IconDefinition;
    href: string;
    icon_postion?: "left" | "right";
    style?: React.CSSProperties;
}

const LayoutButton: React.FC<LayoutButtonProps> = ({
    text,
    icon,
    href,
    style,
    icon_postion,
}) => {
    const flexDirection = icon_postion === "right" ? "row-reverse" : "inherit";

    return (
        <Link href={href} passHref>
            <Button
                style={{
                    ...style,
                    ...{ flexDirection },
                }}
                className={styles.nav__back_button}
            >
                <span>
                    <FontAwesomeIcon icon={icon} size={"lg"} />
                </span>

                {text}
            </Button>
        </Link>
    );
};

export default LayoutButton;
