import "normalize.css";
import "../styles/globals.scss";
import Head from "next/head";
import type { AppProps } from "next/app";
import { withPasswordProtect } from "@storyofams/next-password-protect";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

console.log("PASSWORD_PROTECT", process.env.PASSWORD_PROTECT);

export default process.env.PASSWORD_PROTECT
  ? withPasswordProtect(MyApp, {
      loginApiUrl: "/api/login",
    })
  : MyApp;
