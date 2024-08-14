"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "~/components/ui/switch";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

export function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [check, setCheck] = useState(theme === "dark");

  return (
    <div
      className="flex items-center gap-2"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Switch
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
      <div className="flex items-center gap-2">
        {theme === "dark" && (
          <>
            <span>Dark</span>
          </>
        )}
        {theme === "light" && (
          <>
            <span>Light</span>
          </>
        )}
      </div>
    </div>
  );
}
