import Link from "next/link";
import { StyledButton } from "./styles";

interface props {
    label: string;
    path: string;
    currentPath: string;
}

export default function LayoutButton({ label, path, currentPath }: props) {
    return (
        <StyledButton className={path == currentPath ? "active" : ""}>
            <Link href={path}>{label}</Link>
        </StyledButton>
    );
}
