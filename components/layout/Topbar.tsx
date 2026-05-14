"use client";

import { Bell, Search, User, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useAppSelector } from "@/hooks/redux";
import { signOutUser } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const Topbar = () => {
  const user = useAppSelector(state => state.auth.user);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.push("/login");
      toast.success("Signed out successfully");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <header className="flex h-16 items-center gap-4 border-b border-border bg-card px-6">
      <div className="flex-1">
        <form className="relative w-full max-w-md" role="search">
          <label htmlFor="global-search" className="sr-only">Search</label>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <input
            id="global-search"
            type="search"
            placeholder="Search employees, departments..."
            className="w-full rounded-md border border-input bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </form>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button aria-label="Notifications" className="relative rounded-full p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Bell className="h-5 w-5" aria-hidden="true" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" aria-label="Unread notifications"></span>
        </button>
        <div aria-label="User profile" className="h-8 w-8 ml-2 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring overflow-hidden" tabIndex={0} role="button">
          {user?.photoURL ? (
            <img src={user.photoURL} alt={user.displayName || "User"} className="h-full w-full object-cover" />
          ) : (
            <User className="h-5 w-5" aria-hidden="true" />
          )}
        </div>
        <button 
          onClick={handleSignOut}
          aria-label="Sign out"
          className="ml-2 rounded-full p-2 hover:bg-muted text-muted-foreground hover:text-destructive transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <LogOut className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
