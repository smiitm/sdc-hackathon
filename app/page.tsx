import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Zap, Target, Layers } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-white">
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 sm:py-32">
        <div className="container max-w-5xl mx-auto space-y-12 text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-[0.2em] text-primary italic animate-in fade-in slide-in-from-bottom-4 duration-500">
             <Sparkles className="h-3 w-3" /> THE BUILDER CENSUS
          </div>

          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            <h1 className="text-5xl sm:text-8xl font-black tracking-tighter text-foreground italic leading-[0.9] text-balance">
              Where Great Builders <br /> Find Their Squad.
            </h1>
            <p className="text-muted-foreground font-medium text-lg sm:text-xl italic max-w-2xl mx-auto leading-relaxed">
              BuildSpace is the home for student-led innovation. Post projects, find collaborators, and ignite the next generation of building.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button className="w-full h-14 rounded-2xl px-10 font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-3 active:scale-95 bg-primary text-white">
                Enter the Nexus <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/projects" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full h-14 px-10 rounded-2xl border-border/40 bg-white hover:bg-muted/10 font-black uppercase tracking-widest text-xs flex items-center gap-2 shadow-sm">
                Browse Builds
              </Button>
            </Link>
          </div>

          {/* Minimalist Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-20 animate-in fade-in duration-1000 delay-500">
            {[
              { icon: <Layers className="h-5 w-5" />, title: "Project Nexus", desc: "Showcase your builds to the network." },
              { icon: <Zap className="h-5 w-5" />, title: "Rapid Proto", desc: "Find a squad and launch in weeks." },
              { icon: <Target className="h-5 w-5" />, title: "Gated Mission", desc: "Join curated hackathons and cohorts." }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center gap-4 p-6 rounded-3xl border border-transparent hover:border-border/40 hover:bg-muted/5 transition-all">
                <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary/60 border border-primary/10">
                  {feature.icon}
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="font-black italic text-sm tracking-tight uppercase">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground font-medium italic">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-border/10 py-10">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6 opacity-40">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] italic">Built for the next generation</p>
           <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] italic">
              <span className="cursor-pointer hover:text-primary transition-colors">Manifesto</span>
              <span className="cursor-pointer hover:text-primary transition-colors">Network</span>
              <span className="cursor-pointer hover:text-primary transition-colors">Security</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
