import Header from "@/components/header";
import { getStaticPropsOnlyTexts } from "@/lib/texts_utils";
import { useTexts } from "@/lib/hooks";

export default function NotFound() {
    const { t } = useTexts();

    return <Header t={t} header_type="404" />;
}

export const getStaticProps = getStaticPropsOnlyTexts;
