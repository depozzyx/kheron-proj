import styles from "./header.module.scss";

interface props {
    t: (key: string) => string;
}

export default function Header({ t }: props) {
    const text = (str: string) => {
        return t(`header.${str}`);
    };

    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.header__title}>{text("title")}</h1>
                <p className={styles.header__subtitle}>{text("subtitle")}</p>
            </header>

            <header
                className={styles.header}
                style={{ "--col-bg": "#FFFFFF", "--col-text": "#4E598C" }}
            >
                <h1 className={styles.header__title}>{text("title")}</h1>
                <p
                    style={{ color: "#FF8C42", fontSize: "130%" }}
                    className={styles.header__subtitle}
                >
                    {text("subtitle")}
                </p>
            </header>
        </>
    );
}
