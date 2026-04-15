import React, { Suspense, ErrorInfo } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// font awesome 6
import "public/icons/font-awesome/css/all.css";

// custom icons
import "public/icons/glyphter/css/xpovio.css";

// main scss
import "@/styles/main.scss";

type ErrorBoundaryState = { hasError: boolean };

class AppErrorBoundary extends React.Component<
  React.PropsWithChildren<object>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
          <h1 style={{ fontSize: "1.25rem" }}>Something went wrong</h1>
          <p style={{ marginTop: 8, color: "#444" }}>
            Refresh the page. On the dev server, a restart can clear a stuck
            client bundle after hot reload.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppWithRouterKey({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AppErrorBoundary key={router.asPath}>
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...pageProps} />
      </Suspense>
    </AppErrorBoundary>
  );
}

export default function App(props: AppProps) {
  return <AppWithRouterKey {...props} />;
}
