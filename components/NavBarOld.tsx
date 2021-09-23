import styles from "@/styles/NavBarOld.module.scss";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

import { Nav, NavbarBrand, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface props {
    t: (key: string) => string;
}

export default function NavBar({ t }: props) {
    const router = useRouter();
    const [_, i18n] = useTranslation();
    const [selected, setSelected] = useState<string | undefined>(router.asPath);

    const getOtherLanguage = (language: string) => {
        return language == "ru" ? "en" : "ru";
    };

    const handleSelect = (eventKey: string | null) => {
        if (!eventKey) return;
        if (eventKey == "changeLanguage") {
            const new_language = getOtherLanguage(i18n.language);
            i18n.changeLanguage(new_language);
            router.push(router.pathname, "", { locale: new_language });

            return;
        }

        setSelected(eventKey);
        router.push(eventKey);
    };

    return (
        <Nav
            variant="pills"
            defaultActiveKey="/"
            onSelect={handleSelect}
            activeKey={selected}
            className={styles.nav}
        >
            <Nav.Item className={styles.logo}>
                <Nav.Link className={styles.logo_link} eventKey="/old">
                    {t("navbar.index")}
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/old/tests">{t("navbar.tests")}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="/">Огурцы</Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles.last}>
                <Nav.Link eventKey="changeLanguage">
                    {getOtherLanguage(i18n.language).toUpperCase()}
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}
