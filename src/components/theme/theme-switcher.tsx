"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { LucideMoon, LucideSun } from "lucide-react";

const  ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      className="theme-switcher"
      variant={"outline"}
      size={"icon"}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
        <LucideSun className="h-4 w-4 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
        <LucideMoon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:-rotate-0 dark:scale-100"/>
        <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
export default ThemeSwitcher;