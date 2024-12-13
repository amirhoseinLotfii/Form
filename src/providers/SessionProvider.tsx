"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

type sessionProps = {
  children: React.ReactNode;
};
function NextAuthSessionProvider({ children }: sessionProps) {
  return (
    <SessionProvider baseUrl="https://amirhoseinform23.netlify.app">
      {children}
    </SessionProvider>
  );
}

export default NextAuthSessionProvider;
