"use client";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to main screen after successful login
      navigate("/main");
    } catch (error: any) {
      setError(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-background text-foreground">
        {/* Back to home */}
        <Link to="/" className="fixed top-4 left-4 text-primary flex items-center gap-1">
          <ArrowLeft size={20} />
          Home
        </Link>
      <div className="w-full max-w-md space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Login to SafePoint</h1>
          <p className="text-muted-foreground text-sm">
            Welcome back! Enter your credentials to continue.
          </p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="********" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          <button
            type="submit"
            className={cn(
              "w-full py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            )}
          >
            {loading ? 'Signing In...' : 'Login'}
          </button>
          {error && (
            <p className="text-destructive text-sm text-center">
              {error}
            </p>
          )}
        </form>

        <p className="text-center text-sm">
          Don&apos;t have an account? <Link to="/signup" className="text-primary underline underline-offset-2">Sign&nbsp;Up</Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
