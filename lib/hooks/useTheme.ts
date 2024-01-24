"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Theme } from "@/lib/types";

type ThemeState = {
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
};

export const useThemeStore = create(
  persist<ThemeState>(
    (set) => ({
      theme: "dark",
      toggleTheme: (newTheme) =>
        set(() => ({
          theme: newTheme, //state.theme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: "theme",
    },
  ),
);
