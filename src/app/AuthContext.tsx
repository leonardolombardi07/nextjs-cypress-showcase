"use client";

import React from "react";

interface SignInDTO {
  email: string;
  password: string;
}

interface User {
  email: string;
}

interface AuthContextValue {
  user: null | { email: string };
  isAuthenticated: boolean;
  signIn: (dto: SignInDTO) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, _setUser] = React.useState<User | null>(UserCache.get());

  function setUser(user: User | null) {
    UserCache.set(user);
    _setUser(user);
  }

  async function signIn({ email }: SignInDTO) {
    // Fake validating user data...
    await new Promise((resolve) => setTimeout(resolve, 4000));
    setUser({ email });
  }

  async function signOut() {
    setUser(null);
  }

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
}

class UserCache {
  static get() {
    const user = localStorage.getItem("user");
    if (!user) return null;
    return JSON.parse(user);
  }

  static set(user: User | null) {
    if (!user) {
      localStorage.removeItem("user");
    }

    localStorage.setItem("user", JSON.stringify(user));
  }
}

export { AuthContextProvider, useAuth };
