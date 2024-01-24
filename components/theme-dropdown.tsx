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
import { useThemeStore } from "@/lib/hooks/useTheme";
type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function DropdownMenuCheckboxes() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Theme</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-32 rounded-xl"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {/*<DropdownMenuLabel>Appearance</DropdownMenuLabel>*/}
        {/*<DropdownMenuSeparator />*/}
        <DropdownMenuItem
          className="rounded-xl"
          onClick={() => toggleTheme("dark")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className="rounded-xl"
          onClick={() => toggleTheme("light")}
        >
          Light
        </DropdownMenuItem>
        {/*<DropdownMenuCheckboxItem*/}
        {/*  checked={showStatusBar}*/}
        {/*  onCheckedChange={setShowStatusBar}*/}
        {/*>*/}
        {/*  Status Bar*/}
        {/*</DropdownMenuCheckboxItem>*/}
        {/*<DropdownMenuCheckboxItem*/}
        {/*  checked={showActivityBar}*/}
        {/*  onCheckedChange={setShowActivityBar}*/}
        {/*  disabled*/}
        {/*>*/}
        {/*  Activity Bar*/}
        {/*</DropdownMenuCheckboxItem>*/}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
