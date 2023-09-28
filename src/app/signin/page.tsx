"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../AuthContext";
import Form from "./Form";
import React from "react";

export default function Page() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  React.useEffect(
    function navigateHomeIfAuthenticated() {
      if (isAuthenticated) {
        router.push("/");
      }
    },
    [router, isAuthenticated]
  );

  return (
    <main
      style={{
        padding: "1em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Form />
    </main>
  );
}
