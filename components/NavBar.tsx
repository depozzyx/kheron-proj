// import styles from "@/styles/NavBar.module.scss";
const styles = require("../styles/NavBar.module.scss");
import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";

import { Nav, Navbar } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import NavBarButton from "@/components/NavBarButton";

interface props {
    t: (key: string) => string;
}

export default function CustomNavBar({ t }: props) {
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
        <Navbar expand="lg" className={styles.navbar}>
            <Navbar.Brand href="#home" className={styles.navbar_brand}>
                depozzyx.com
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav
                    variant="pills"
                    defaultActiveKey="/"
                    onSelect={handleSelect}
                    activeKey={selected}
                    className="mr-auto"
                >
                    <NavBarButton
                        path="/old/"
                        label={t("navbar.index")}
                        currentPath={router.pathname}
                    />
                    <Nav.Item className={styles.navbar_item}>
                        <Nav.Link eventKey="/old/tests">
                            {t("navbar.tests")}
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className={styles.navbar_item}>
                        <Nav.Link eventKey="" className={styles.a}>
                            Option 2
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className={styles.navbar_item}>
                        <Nav.Link eventKey="changeLanguage">
                            {getOtherLanguage(i18n.language).toUpperCase()}
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
