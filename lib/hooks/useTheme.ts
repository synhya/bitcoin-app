"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  theme: string;
  toggleTheme: (theme: string) => void;
};

const useThemeStore = create(
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
