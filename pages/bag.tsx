import Layout from "@/components/layout/Layout";
import { StyledButton } from "@/components/layout/styles";
import { useTexts } from "@/lib/hooks";
import { getStaticPropsOnlyTexts } from "@/lib/texts_utils";

import { LayoutThemes } from "@/lib/theming";
import bagPicture from "@/public/media/bag.png";

function BagLink({ href, title }: { href: string; title: string }) {
    return (
        <a href={href}>
            <StyledButton style={{ padding: 10, display: "inline" }}>
                {title}
            </StyledButton>
            ;
        </a>
    );
}

export default function New() {
    const { t } = useTexts();

    return (
        <Layout
            t={t}
            theme={LayoutThemes.confident}
            title={t("bag.title")}
            subtitle={t("bag.subtitle")}
            picture={bagPicture}
        >
            <section className="no-wobble">
                <h1>Services</h1>
                <BagLink
                    href="https://cloud.digitalocean.com/projects/"
                    title="Digital Ocean"
                />
                <BagLink href="https://github.com/" title="Github" />

                <h1 style={{ marginTop: 30 }}>Cooolors</h1>
                <BagLink href="https://emojipedia.org/objects/" title="Emoji" />
                <BagLink href="https://coolors.co/generate" title="Coolors" />
                <BagLink
                    href="https://imagecolorpicker.com/"
                    title="Color picker"
                />
                <BagLink href="" title="" />

                <h1 style={{ marginTop: 30 }}>DNS</h1>
                <BagLink href="https://intodns.com/" title="Dns checker" />
                <BagLink href="https://www.reg.ru/whois/" title="Whois" />
                <BagLink
                    href="https://tuthost.ua/faq/kakie-byvayut-statusy-u-mezhdunarodnyh-domenov/"
                    title="Domain statuses"
                />

                <h1 style={{ marginTop: 30 }}>Tutorials</h1>
                <BagLink
                    href="https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04"
                    title="Nginx do"
                />
                <BagLink
                    href="https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04-ru"
                    title="Https do"
                />
                <BagLink
                    href="https://hakibenita.com/how-to-turn-django-admin-into-a-lightweight-dashboard"
                    title="Django advances"
                />
            </section>
        </Layout>
    );
}

export const getStaticProps = getStaticPropsOnlyTexts;
