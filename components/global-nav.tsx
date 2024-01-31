"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ThemeDropdown from "@/components/theme-dropdown";
import NavLinkItem from "@/components/nav-link-item";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

const GlobalNav = () => {
  const [scrollY, setScrollY] = useState(0);
  const onScroll = useCallback(() => {
    const { scrollY } = window;
    setScrollY(scrollY);
  }, []);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <div
      className={cn(
        "backdrop-blur-sm fixed z-10 h-12 w-screen bg-background/70 transition-colors duration-700",
        {
          "bg-primary/50": scrollY > 0,
        },
      )}
    >
      <div className={"flex h-full justify-center"}>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem></NavigationMenuItem>
            <NavigationMenuItem>
              <p className="text-foreground cursor-default font-semibold text-lg">
                Bitcoin Demo App
              </p>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className={"absolute top-1 right-3.5 hidden min-[450px]:flex"}>
        <ThemeDropdown />
      </div>
    </div>
  );
};

export default GlobalNav;
