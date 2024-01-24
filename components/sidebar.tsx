"use client";

import * as React from "react";
import { useSidebar } from "@/lib/hooks/useSidebar";
import { cn } from "@/lib/utils";

export interface SidebarProps extends React.ComponentProps<"div"> {}

const Sidebar = ({ className, children }: SidebarProps) => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div
      data-state={isSidebarOpen ? "open" : "closed"}
      className={cn(className, "h-full, flex-col, dark:bg-zinc-950")}
    >
      {children}
    </div>
  );
};

export default Sidebar;
