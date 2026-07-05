import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

type AdminShellProps = {
  children: ReactNode;
  title?: string;
};

export default function AdminShell({ children, title }: AdminShellProps) {
  const router = useRouter();
  const pathname = router.pathname;

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const navLink = (href: string, label: string, active: boolean) => (
    <Link
      href={href}
      className={`admin-nav__link${active ? " admin-nav__link--active" : ""}`}
    >
      {label}
    </Link>
  );

  return (
    <>
      <Head>
        <title>{title ? `${title} · Blog admin` : "Blog admin"}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="admin-shell">
        <header className="admin-shell__header">
          <div className="admin-shell__bar">
            <div>
              <p className="admin-eyebrow">Quantel CMS</p>
              <h1 className="admin-shell__title">{title ?? "Blog admin"}</h1>
            </div>
            <nav className="admin-nav">
              {navLink("/admin", "Posts", pathname === "/admin")}
              {navLink(
                "/admin/posts/new",
                "New post",
                pathname === "/admin/posts/new",
              )}
              <Link href="/blog" className="admin-nav__link" target="_blank">
                View blog
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="admin-btn admin-btn--ghost admin-btn--sm"
              >
                Log out
              </button>
            </nav>
          </div>
        </header>
        <main className="admin-shell__main">{children}</main>
      </div>
    </>
  );
}