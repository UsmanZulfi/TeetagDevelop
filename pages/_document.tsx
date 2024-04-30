import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/assets/favicon.png" />
      </Head>

      <body>
        <Script
          src="https://static-na.payments-amazon.com/checkout.js"
          strategy="beforeInteractive"
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
