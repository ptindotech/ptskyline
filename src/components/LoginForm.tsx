"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") ?? "");
    const password = String(form.get("password") ?? "");

    setLoading(true);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus(result.message || "Login failed.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form className="admin-login-form" onSubmit={handleSubmit}>
      <label className="admin-field">
        <span className="admin-field__label">Username</span>
        <input autoComplete="username" className="admin-input" name="username" placeholder="admin" type="text" />
      </label>

      <label className="admin-field">
        <span className="admin-field__label">Password</span>
        <input autoComplete="current-password" className="admin-input" name="password" placeholder="••••••••" type="password" />
      </label>

      <button className="button button--primary admin-login-button" disabled={loading} type="submit">
        {loading ? "Signing in…" : "Sign in to dashboard"}
      </button>

      {status ? <p className="admin-login-form__status">{status}</p> : null}
    </form>
  );
}
