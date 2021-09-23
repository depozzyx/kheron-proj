import { useTranslation } from "next-i18next";

export const useTexts = () => {
    const i18 = useTranslation();

    const t = (key: string) => {
        const value = i18.t(key);
        return value == key ? `[${key}]` : value;
    };
    const { i18n, ready } = i18;

    return { t, i18n, ready };
};
