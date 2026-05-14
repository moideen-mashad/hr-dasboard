"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const user = await signInWithGoogle();
      const token = await user.getIdToken();
      document.cookie = `firebase-auth-token=${token}; path=/; max-age=3600; SameSite=Lax`;
      
      toast.success("Successfully logged in!");
      router.push("/");
    } catch (error) {
      toast.error("Failed to sign in. Please check your config.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 p-8 border border-border bg-card rounded-2xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary">HR Dashboard</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Sign in to access your dashboard.
        </p>
      </div>

      <div className="space-y-4 mt-8">
        <Button 
          className="w-full h-12 text-base font-medium" 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Continue with Google"}
        </Button>
      </div>
      
      <p className="text-xs text-center text-muted-foreground mt-8">
        By clicking continue, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
