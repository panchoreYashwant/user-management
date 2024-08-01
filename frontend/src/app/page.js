"use client";

import React, { useEffect } from "react";
import "./globals.css";
import LoginPage from "./auth/login/page";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login");
  }, []);
  return <LoginPage />;
};

export default HomePage;
