import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";

import { StyledButton } from "./styles";

export default function LayoutLanguageButton() {
    return (
        <StyledButton
            whenVisible="> 600px"
            marginAuto="toRight"
            isHalfTransparent={true}
        >
            <Link href="/old/" passHref>
                <div>
                    <FontAwesomeIcon icon={faCodeBranch} />
                    old
                </div>
            </Link>
        </StyledButton>
    );
}
