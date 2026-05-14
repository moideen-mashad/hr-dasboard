"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/redux";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector((state) => state.theme.value);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme, mounted]);

  // To avoid hydration mismatch, we don't render until mounted
  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
