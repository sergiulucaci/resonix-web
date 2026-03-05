"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");

    const res = await fetch("/api/app-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/app");
      router.refresh();
    } else {
      setError("Wrong password.");
      setPending(false);
    }
  }

  return (
    <div className="login-gate">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">resonix</h1>
        <p className="login-sub">This area is password-protected.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
          autoFocus
          disabled={pending}
        />
        <button type="submit" className="login-btn" disabled={pending}>
          {pending ? "..." : "Enter"}
        </button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
}
