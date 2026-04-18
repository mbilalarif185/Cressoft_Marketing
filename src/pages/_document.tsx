import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en-MY">
      <Head>
        {/* Performance hints for third-party origins used across the site.
            Inter is self-hosted via next/font, so the Google Fonts origins
            no longer need preconnects. */}
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://wa.me" />

        {/* Favicons — brand logo used everywhere. /favicon.ico exists at the
            root so legacy browser auto-requests resolve without a 404 (a
            missing favicon would otherwise force the dev server to compile
            the /404 page on every navigation). */}
        <link rel="icon" type="image/png" href="/images/digital-marketing-agency.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          href="/images/digital-marketing-agency.png"
        />

        {/* Theme color matches brand UI background — avoids flash on Android Chrome. */}
        <meta name="theme-color" content="#0b0b0b" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
