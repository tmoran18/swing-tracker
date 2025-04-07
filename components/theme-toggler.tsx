"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-end">
        <Button size="icon" className="m-4 p-6 bg-neutral-800" aria-label="Toggle theme">
          <Sun size={24} className="text-white !w-6 !h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-end">
      <Button
        size="icon"
        className="m-4 p-6 bg-neutral-800"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun size={24} className="text-white !w-6 !h-6" /> // Override icon sizing with !important
        ) : (
          <Moon size={24} className="text-white !w-6 !h-6" /> // Override icon sizing with !important
        )}
      </Button>
    </div>
  );
};
