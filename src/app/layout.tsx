import type { Metadata } from "next";
import "./globals.css";

import { Noto_Sans } from "next/font/google";
import NextAuthSessionProvider from "@/providers/SessionProvider";
import { Toaster } from "react-hot-toast";
const NotoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${NotoSans.className} min-h-screen`}>
        <NextAuthSessionProvider>
          <Toaster toastOptions={{ duration: 5000 }} />
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
