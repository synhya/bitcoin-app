import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import GlobalNav from "@/components/global-nav";
import ThemeProvider from "@/components/theme-provider";
import { Inter } from "next/font/google";
import { useInView } from "react-intersection-observer";

export const metadata: Metadata = {
  title: "crypto app",
  description: "crypto app",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalNav />
          {/*<SidebarDesktop />*/}
          <div className="px-2 min-[400px]:px-6 md:px-12 pb-12 pt-16 transition-all duration-500">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
