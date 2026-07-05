import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.message ?? "Login failed.");
      return;
    }
    const next =
      typeof router.query.next === "string" ? router.query.next : "/admin";
    router.push(next);
  }

  return (
    <>
      <Head>
        <title>Blog admin · Sign in</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="admin-auth">
        <form onSubmit={handleSubmit} className="admin-auth__card">
          <div className="admin-auth__intro">
            <p className="admin-eyebrow">Quantel CMS</p>
            <h1 className="admin-auth__title">Sign in</h1>
            <p className="admin-auth__sub">
              Blog management for authorized staff only.
            </p>
          </div>
          {error ? <p className="admin-alert admin-alert--error">{error}</p> : null}
          <label className="admin-field">
            <span className="admin-field__label">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="admin-btn admin-btn--primary admin-btn--block"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </>
  );
}