import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

import { LayoutTheme, LayoutThemes, rgb } from "@/lib/theming";
import milkPicture from "@/public/media/milk.png";
import LayoutButton from "./LayoutButton";
import LayoutLanguageButton from "./LayoutLanguageButton";
import LayoutOldButton from "./LayoutOldButton";

interface props {
    children: JSX.Element | JSX.Element[] | string;
    t: (key: string) => string;
    theme?: LayoutTheme;
    picture?: StaticImageData;
    title?: string;
    subtitle?: string;
}

export default function Home({
    children,
    t,
    theme,
    picture,
    title,
    subtitle,
}: props) {
    theme ||= LayoutThemes.blue_violet;
    picture ||= milkPicture;
    title ||= "Картошка";
    subtitle ||= "Дети, база";

    const router = useRouter();

    return (
        <Layout ltheme={theme}>
            <Header className="header" ltheme={theme}>
                <div className="header_image">
                    <Image src={picture} alt="Помидор" layout="responsive" />
                </div>
                <div className="header_text">
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </div>
                <div className="header_nav">
                    <LayoutOldButton />

                    <LayoutButton
                        currentPath={router.pathname}
                        label={t("layout.navbarButtons.bag")}
                        path="/bag"
                    />
                    <LayoutButton
                        currentPath={router.pathname}
                        label={t("layout.navbarButtons.milk")}
                        path="/"
                    />
                    <LayoutButton
                        currentPath={router.pathname}
                        label={t("layout.navbarButtons.dirt")}
                        path="/dirt"
                    />

                    <LayoutLanguageButton />
                </div>
            </Header>

            <main>{children}</main>

            <Footer ltheme={theme}></Footer>

            <style jsx global>{`
                #nprogress .bar {
                    background: ${theme.color_accent} !important;
                }
                #nprogress .peg {
                    box-shadow: 0 0 10px ${theme.color_accent},
                        0 0 5px ${theme.color_accent};
                }
                body,
                html {
                    background-color: ${theme.color_body || "inherit"};
                }
            `}</style>
        </Layout>
    );
}

interface ElementsProps {
    ltheme: LayoutTheme;
}

const Footer = styled.div<ElementsProps>`
    --bg-col: ${(p) => p.ltheme.color_bg};
    --accent-col: ${(p) => p.ltheme.color_accent};
`;

const Layout = styled.div<ElementsProps>`
    --bg-col: ${(p) => p.ltheme.color_bg};
    --bg-col-rgb: ${(p) => rgb(p.ltheme.color_bg)};
    --accent-col: ${(p) => rgb(p.ltheme.color_accent)};

    header {
    }

    main {
        width: 100%;
        padding: 2rem 25%;

        @media screen and (min-width: 1200px) and (max-width: 1500px) {
            padding: 2rem 20%;
        }
        @media screen and (min-width: 900px) and (max-width: 1200px) {
            padding: 2rem 15%;
        }
        @media screen and (min-width: 600px) and (max-width: 900px) {
            padding: 2rem 10%;
        }
        @media screen and (min-width: 0px) and (max-width: 600px) {
            padding: 2rem 5%;
        }

        h1 {
            color: var(--bg-col);
            font-weight: 800;
            font-size: 2.3rem;
        }

        p {
            font-weight: 400;
        }

        section {
            display: block;
            padding: 1rem;
            margin: 2rem -1rem;
            border-radius: 1rem;

            /* box-shadow: 0px 10px 30px rgba(var(--accent-col), 0.5) inset; */

            background: radial-gradient(
                circle at 13% 50%,
                rgba(var(--accent-col), 0.3) 0%,
                rgba(var(--accent-col), 0) 100%
            );
            background-color: var(--bg-col);
            transition: 0.3s ease;

            h1,
            p {
                color: #fff;
            }

            &:hover:not(.no-wobble) {
                transform: scale(1.03);
            }

            &:active:not(.no-wobble) {
                transform: scale(0.97);
            }
        }
    }
`;

const Header = styled.header<ElementsProps>`
    --bg-col: ${(p) => p.ltheme.color_bg};
    --accent-col: ${(p) => rgb(p.ltheme.color_accent)};

    overflow-x: auto;
    height: 20rem;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 3rem;
    grid-template-areas:
        "a1 a2"
        "nav nav";

    --circle-pos: 43%;
    --circle-size: 1;

    @media screen and (min-width: 2700px) {
        --circle-pos: 46%;
    }
    @media screen and (min-width: 2000px) and (max-width: 2700px) {
        --circle-pos: 45%;
    }
    @media screen and (min-width: 1700px) and (max-width: 2000px) {
        --circle-pos: 44%;
    }
    @media screen and (min-width: 1350px) and (max-width: 1500px) {
        --circle-pos: 42%;
    }
    @media screen and (min-width: 1150px) and (max-width: 1350px) {
        --circle-pos: 41%;
    }
    @media screen and (min-width: 950px) and (max-width: 1150px) {
        --circle-pos: 40%;
        --circle-size: 1.1;
    }
    @media screen and (min-width: 800px) and (max-width: 950px) {
        --circle-pos: 38%;
        --circle-size: 1.3;
    }
    @media screen and (min-width: 700px) and (max-width: 800px) {
        --circle-pos: 36%;
        --circle-size: 1.4;
    }
    @media screen and (min-width: 650px) and (max-width: 700px) {
        --circle-pos: 34%;
        --circle-size: 1.4;
    }
    @media screen and (min-width: 570px) and (max-width: 650px) {
        --circle-pos: 32%;
        --circle-size: 1.5;
    }
    @media screen and (min-width: 500px) and (max-width: 570px) {
        --circle-pos: 30%;
        --circle-size: 1.5;
    }
    @media screen and (min-width: 400px) and (max-width: 500px) {
        --circle-pos: 33%;
        --circle-size: 1.5;
    }
    @media screen and (min-width: 0px) and (max-width: 400px) {
        --circle-pos: 30%;
        --circle-size: 1.7;
    }

    background: radial-gradient(
        circle at var(--circle-pos) 50%,
        rgba(var(--accent-col), 1) 0%,
        rgba(var(--accent-col), 0.7) calc(5% * var(--circle-size)),
        rgba(var(--accent-col), 0.5) calc(10% * var(--circle-size)),
        rgba(var(--accent-col), 0) calc(20% * var(--circle-size)),
        rgba(var(--accent-col), 0) 100%
    );
    background-color: var(--bg-col);
    border-radius: 0 0 1rem 1rem;

    .header_text {
        color: #fff;

        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;

        * {
            font-weight: 800;
            margin: 0;
            padding: 0;

            transition: 0.3s ease;
            &:hover {
                margin-left: 1rem;
                cursor: default;
            }
        }
        h1 {
            font-size: 2rem;
        }
        p {
            font-size: 1rem;
        }
    }

    .header_nav {
        grid-area: nav;

        border-radius: 1rem;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header_image {
        display: flex;
        justify-content: right;
        align-items: center;

        & > * {
            width: 15rem;
            @media screen and (max-width: 500px) {
                width: 10rem !important;
            }

            transition: 1s ease;
            &:hover {
                transform: scale(1.01) rotate(-89deg);
            }
            &:active {
                transform: scale(0.8) rotate(-98deg);
            }
        }
    }
`;
