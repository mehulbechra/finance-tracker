import Link from "next/link";
import DarkModeToggle from "./dark-mode-toggle";
import ServerDarkMode from "@/lib/server-dark-mode";
import React from "react";

export default function PageHeader({ className }) {
  const theme = React.use(ServerDarkMode());
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link
        href="/dashboard"
        className="text-xl hover:underline underline-offset-8 decoration-2"
      >
        Finance App
      </Link>
      <div className="flex items-center space-x-4">
        <DarkModeToggle defaultMode={theme} />
        <div>User Dropdown</div>
      </div>
    </header>
  );
}
