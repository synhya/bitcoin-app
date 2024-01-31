"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Theme } from "@/lib/types";
import { Moon, MoonIcon, Sun, SunIcon } from "lucide-react";

export default function ThemeDropdown() {
  const { theme, setTheme, systemTheme } = useTheme();
  const activeTheme = theme !== Theme.system ? theme : systemTheme;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-2">
          <MoonIcon />
          {/*{theme === "dark" ? <Moon /> : <Sun />}*/}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-fit rounded-xl">
        <DropdownMenuItem
          className="rounded-xl"
          onClick={() => setTheme(Theme.dark)}
        >
          다크
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-xl"
          onClick={() => setTheme(Theme.light)}
        >
          라이트
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
