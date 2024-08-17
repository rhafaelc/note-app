"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "~/components/ui/switch";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { Label } from "~/components/ui/label";

export function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [check, setCheck] = useState(theme === "dark");

  return (
    <div
      className="flex w-full items-center gap-2"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Switch
        id="theme-switch"
        checked={check}
        onCheckedChange={(e) => {
          setCheck((prev) => !prev);
          if (e) setTheme("dark");
          if (!e) setTheme("light");
        }}
        className="relative transition-transform duration-300 ease-in-out"
      />
      <div className="pointer-events-none absolute ml-1 grid w-9">
        <Sun
          size={16}
          className={cn("place-self-start", theme !== "light" && "hidden")}
        />
        <Moon
          size={16}
          className={cn("place-self-end", theme !== "dark" && "hidden")}
        />
      </div>
      <Label htmlFor="theme-switch" className="w-full py-1">
        {theme === "dark" && "Dark"}
        {theme === "light" && "Light"}
      </Label>
    </div>
  );
}
