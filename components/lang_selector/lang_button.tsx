import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import { Button } from "@/components/UI";

interface LangButtonProps {
    t: (key: string) => string;
    to_locale: string;
}

const LangButton: React.FC<LangButtonProps> = ({ t, to_locale }) => {
    const router = useRouter();
    // const { i18n } = useTranslation();

    const changeLang = (locale: string) => {
        // i18n.changeLanguage(locale);
        document.cookie = `NEXT_LOCALE=${locale}; path=/`;
        router.push(router.pathname, "", { locale: locale });
    };

    return (
        <Button
            onClick={() => changeLang(to_locale)}
            button_type={
                router.locale == to_locale ? "default" : "not_selected"
            }
        >
            {t(`lang.${to_locale}`)}
        </Button>
    );
};

export default LangButton;
