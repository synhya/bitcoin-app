"use client";

import React from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SidebarState {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const store = (set: any) => ({
  isSidebarOpen: false,
  openSidebar: () => set(() => ({ isSidebarOpen: true })),
  closeSidebar: () => set(() => ({ isSidebarOpen: false })),
});

export const useSidebar = create<SidebarState>()(
  process.env.NODE_ENV !== "production" ? devtools(store) : store,
);
