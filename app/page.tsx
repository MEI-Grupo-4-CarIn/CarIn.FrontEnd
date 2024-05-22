"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import DashboardPage from "@/app/dashboard/page";
import LoginPage from "@/app/login/page";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <DashboardPage /> : <LoginPage />;
};

export default HomePage;
