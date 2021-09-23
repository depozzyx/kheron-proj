import styles from "@/styles/NavBar.module.scss";
import { Nav } from "react-bootstrap";

interface props {
    label: string;
    path: string;
    currentPath: string;
}

export default function NavBarButton({ label, path, currentPath }: props) {
    console.log("a", path, currentPath);
    return (
        <Nav.Item className={styles.navbar_item}>
            <Nav.Link
                eventKey={path}
                className={currentPath === path ? styles.active : ""}
            >
                {label}
            </Nav.Link>
        </Nav.Item>
    );
}
