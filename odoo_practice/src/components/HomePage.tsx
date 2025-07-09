import React from "react";
import { Link } from "react-router-dom";
import { BackgroundLines } from "./BackgroundLines";
import { WorldMap } from "./ui/world-map";
import { TextGenerateEffect } from "./ui/text-generate-effect";


const HomePage: React.FC = () => {
  return (
    <div className="relative">
      {/* Navbar with Login / Sign-up */}
      <nav className="fixed top-4 right-4 z-20 flex gap-4">
        <Link
          to="/login"
          className="px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary/10 transition-colors"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Sign&nbsp;Up
        </Link>
      </nav>

      <BackgroundLines className="text-center py-20 md:py-32 z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight pt-24">
        SafePoint
        </h1>
        
        <TextGenerateEffect
           words="SafePoint lets you report crimes quickly, securely, and anonymously. Your reports provide real-time locations to help law enforcement respond faster and make your community safer."
            className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground"
        />
        
        <Link 
          to="/login" 
          className="inline-block mt-24 px-8 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Report a Crime
        </Link>

        
      </BackgroundLines>

      {/* World map section */}
      <section className="bg-background py-4 z-0">
        <div className="w-full max-w-5xl mx-auto">
          <WorldMap />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
