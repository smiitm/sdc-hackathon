"use client"

import { seedDummyData } from "@/app/actions/seed";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Database, Sparkles, Rocket } from "lucide-react";
import { useState } from "react";

export default function SeedPage() {
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    const result = await seedDummyData();
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error("Failed: " + result.error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-32 px-4 flex flex-col items-center justify-center space-y-8 min-h-[80vh]">
      <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary shadow-inner mb-4">
         <Database className="h-10 w-10 animate-pulse" />
      </div>
      
      <div className="text-center space-y-4 max-w-lg">
        <h1 className="text-4xl font-black italic tracking-tighter">Showcase Mode</h1>
        <p className="text-muted-foreground font-medium text-lg leading-relaxed italic">
          Populate your database with a curated set of projects, opportunities, and users to demonstrate the BuildSpace experience.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
         <Button 
            onClick={handleSeed} 
            disabled={loading}
            className="rounded-2xl px-10 py-8 h-auto text-lg font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 bg-gradient-to-r from-primary to-primary/80"
         >
            {loading ? "Igniting..." : <><Sparkles className="h-5 w-5" /> Seed Database</>}
         </Button>
         <Button 
            variant="outline" 
            className="rounded-2xl px-10 py-8 h-auto text-lg font-black uppercase tracking-widest border-border/40 bg-white/40 hover:bg-white hover:shadow-xl transition-all"
            asChild
         >
            <a href="/dashboard"><Rocket className="h-5 w-5" /> Back to App</a>
         </Button>
      </div>

      <p className="text-[10px] text-muted-foreground/40 font-black uppercase tracking-[0.3em] font-mono">
         Warning: This adds dummy data with 'system_seeder' as owner.
      </p>
    </div>
  );
}
