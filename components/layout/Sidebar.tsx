"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  DollarSign, 
  Target, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/employees", label: "Employees", icon: Users },
  { href: "/attendance", label: "Attendance", icon: Calendar },
  { href: "/payroll", label: "Payroll", icon: DollarSign },
  { href: "/performance", label: "Performance", icon: Target },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside aria-label="Sidebar navigation" className="fixed inset-y-0 left-0 w-64 border-r border-border bg-card text-card-foreground">
      <div className="flex h-16 items-center px-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">HR Dashboard</h1>
      </div>
      <nav aria-label="Main navigation" className="p-4 space-y-1">
        {routes.map((route) => {
          const isActive = pathname === route.href || (route.href !== '/' && pathname.startsWith(route.href));
          return (
            <Link
              key={route.href}
              href={route.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <route.icon className="h-5 w-5" aria-hidden="true" />
              {route.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
