import styles from "./footer.module.scss";

interface FooterProps {
    t: (s: string) => string;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
    return <footer className={styles.footer}></footer>;
};

export default Footer;
