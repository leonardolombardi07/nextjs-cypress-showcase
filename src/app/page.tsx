"use client";

import React from "react";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isAuthenticated, signOut } = useAuth();
  const router = useRouter();

  React.useEffect(
    function navigateIfNotAuthenticated() {
      if (!isAuthenticated) {
        router.push("/signin");
      }
    },
    [router, isAuthenticated]
  );

  return (
    <main
      style={{
        padding: "1em",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
        {isAuthenticated ? <h3>Logged in!</h3> : <h3>Not logged in!</h3>}

        {user && (
          <div>
            <h1>Email: {user?.email}</h1>
            <button onClick={signOut} style={{ marginTop: "1em", width: 150 }}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
