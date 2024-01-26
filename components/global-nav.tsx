"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import ThemeDropdown from "@/components/theme-dropdown";
import Link from "next/link";
import { ListItem } from "@/components/nav-list-item";
import { Toggle } from "@/components/ui/toggle";
import { FlaskConical, Music2 } from "lucide-react";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import NavLinkItem from "@/components/nav-link-item";

const GlobalNav = () => {
  return (
    <div className="fixed z-10 h-12 w-screen bg-background/70">
      <div className={"flex h-full justify-center"}>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                About me
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid grid-cols-1 w-[112px] gap-3 p-4">
                  <ListItem href={"/"}>Intro</ListItem>
                  <ListItem>Item1</ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLinkItem path={"/anime"} title={"Anime"} />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavLinkItem path={"/coin"} title={"Bitcoin"} />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ThemeDropdown />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className={"absolute top-1 right-3.5 hidden min-[450px]:flex"}>
        <Toggle>
          <Music2 size={17} />
        </Toggle>
      </div>
    </div>
  );
};

export default GlobalNav;
