"use client";

import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import { siteConfig } from "@/config/site";

export default function NavigationBar() {
  return (
    <header className={`p-4 border-b bg-white dark:bg-black`}>
      <nav className={`flex justify-center`}>
        {/* Logo */}
        <Button variant="ghost" className={`uppercase`}>
          {siteConfig.name}
        </Button>

        {/* Mode Toggle */}
        <ModeToggle variant="ghost" />
      </nav>
    </header>
  );
}
