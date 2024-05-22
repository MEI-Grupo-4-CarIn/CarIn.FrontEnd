"use client";

import { useState, useEffect } from "react";

interface AuthContext {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export function useAuth(): AuthContext {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    localStorage.setItem("user", JSON.stringify({ email }));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}
