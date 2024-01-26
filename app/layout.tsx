import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import GlobalNav from "@/components/global-nav";
import ThemeProvider from '@/components/theme-provider'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: "anime hook test",
  description: "anime hook test app",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir='ltr'>
      <body className={inter.className} >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <GlobalNav/>
          {/*<SidebarDesktop />*/}
          <div className="px-12 pb-12 pt-16">{children}</div>
        </ThemeProvider>
      </body>
    </html>
);
}
