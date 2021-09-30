import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import i18n_config from "@/next-i18next.config";

export const serverTexts = async (locale: string | undefined) => {
    return await serverSideTranslations(
        locale || i18n_config.i18n.defaultLocale
    );
};

export const getStaticPropsOnlyTexts: GetStaticProps = async ({ locale }) => {
    const translations = await serverTexts(locale);
    return {
        props: {
            ...translations,
        },
    };
};
