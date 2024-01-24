'use client';
import React, { useEffect, useLayoutEffect } from 'react'
import { useThemeStore } from '@/lib/hooks/useTheme'
import { cn } from '@/lib/utils'
import { Inter } from "next/font/google";
import { Theme } from '@/lib/types'

const inter = Inter({ subsets: ["latin"] });

const ThemeBody = ({children} : {children:React.ReactNode}) => {

  const theme = useThemeStore<Theme>((state) => state.theme);

  // useLayoutEffect(() => {
  //   const root = window.document.documentElement;
  //   const oppositeTheme: Theme = theme === "dark" ? "light" : "dark";
  //   root.classList.add(theme);
  //   root.classList.remove(oppositeTheme);
  // }, [theme]);

  return (
    <body
      className={cn(
      theme === "dark" ? "dark" : "",
      inter.className,
      )}
    >
      {children}
    </body>
  )
}

export default ThemeBody
