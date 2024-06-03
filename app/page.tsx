"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const HomePage: React.FC = () => {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = true;
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/company/dashboard");
    } else {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  return null;
};

export default HomePage;
