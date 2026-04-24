import { Html, Head, Main, NextScript } from "next/document";

// GTM container ID. Kept here so the <noscript> fallback iframe can reference
// it without re-importing constants. The actual gtm.js loader has been
// moved out of <Head> entirely — see `_app.tsx`, where it now ships through
// `next/script` with `strategy="lazyOnload"` so it never blocks LCP/TBT.
//
// Lighthouse / PageSpeed flagged the previous inline GTM bootstrap (~450 KB
// of cascading JS) as the dominant render-blocking + main-thread-work
// source. Loading via lazyOnload defers it until the browser is idle AFTER
// `load`, which keeps GTM on the page (tracking still works) without the
// performance penalty.
const GTM_ID = "GTM-546P2F53";

export default function Document() {
  return (
    <Html lang="en-MY">
      <Head />
      <body>
        {/* Crawler / no-JS fallback only. Kept identical to GTM's recommended
            snippet; the `display:none` iframe imposes no layout cost and
            does not run on JS-enabled clients (the script in _app.tsx
            handles those). */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
