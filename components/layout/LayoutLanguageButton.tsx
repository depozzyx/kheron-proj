import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import { StyledButton } from "./styles";

const otherLanguages: { [key: string]: string } = {
    ru: "en",
    en: "ru",
};

export default function LayoutLanguageButton() {
    const router = useRouter();
    const otherLanguage = otherLanguages[router.locale || ""];

    return (
        <StyledButton
            whenVisible="> 600px"
            marginAuto={"toLeft"}
            isHalfTransparent={true}
        >
            <Link href={router.pathname} locale={otherLanguage} passHref>
                <div>
                    <FontAwesomeIcon icon={faGlobe} />
                    {otherLanguage}
                </div>
            </Link>
        </StyledButton>
    );
}
