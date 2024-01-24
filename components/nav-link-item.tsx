"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

// FIXME: 나중에 nav-link-item 처럼 prop 바꿔주고 둘이 합치자.
const NavLinkItem = ({ path, title }: { path: string; title: string }) => {
  const segment = useSelectedLayoutSegment();
  const isActive = path.split("/").pop() === segment;

  return (
    <Link href={path} legacyBehavior passHref>
      <NavigationMenuLink
        className={cn(navigationMenuTriggerStyle(), "bg-transparent", {
          "bg-accent": isActive,
        })}
      >
        {title}
      </NavigationMenuLink>
    </Link>
  );
};

export default NavLinkItem;
