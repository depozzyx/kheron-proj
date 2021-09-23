import Layout from "@/components/layout/Layout";
import { useTexts } from "@/lib/hooks";
import { getStaticPropsOnlyTexts } from "@/lib/texts_utils";

export default function New() {
    const { t } = useTexts();

    return (
        <Layout t={t} title={t("index.title")} subtitle={t("index.subtitle")}>
            <h1>Hi bruuuh</h1>
            <p>nah</p>
            <section>
                <h1>bob</h1>
                <p>sssss</p>
            </section>
        </Layout>
    );
}
export const getStaticProps = getStaticPropsOnlyTexts;
