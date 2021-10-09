import "@/styles/_app.scss";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import Router from "next/router";
import NProgress from "nprogress";
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
