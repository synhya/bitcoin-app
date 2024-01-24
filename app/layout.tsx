import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import GlobalNav from "@/components/global-nav";
import ThemeBody from '@/components/theme-body'

export const metadata: Metadata = {
  title: "anime hook test",
  description: "anime hook test app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('Server')
  return (
    <html lang="en" dir='ltr'>
      <ThemeBody>
        <GlobalNav/>
        {/*<SidebarDesktop />*/}
        <div className="px-12 pb-12 pt-16">{children}</div>
      </ThemeBody>
    </html>
  );
}
