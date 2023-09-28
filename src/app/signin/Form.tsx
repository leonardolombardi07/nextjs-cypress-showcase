"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { useAuth } from "../AuthContext";

export default function Form() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function onSubmit() {
    if (!email || !password) {
      return alert("Email and password are required");
    }

    setIsLoading(true);

    try {
      await signIn({ email, password });
      router.push("/");
    } catch (error: any) {
      alert(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        backgroundColor: "wheat",
        padding: "5em 1em",
        minWidth: 500,
      }}
    >
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={isLoading} onClick={onSubmit}>
        {isLoading ? "Loading..." : "Sign In"}
      </button>
    </div>
  );
}
