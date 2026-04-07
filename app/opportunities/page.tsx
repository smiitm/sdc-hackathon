import { getOpportunities } from "@/app/actions/opportunities";
import { PlusCircle, Search, Filter, Briefcase, Clock, ArrowRight, Sparkles, Zap, Flame, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default async function OpportunitiesPage() {
  const opportunities = await getOpportunities();

  return (
    <div className="container mx-auto py-12 px-4 sm:px-8 space-y-12 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/40 pb-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-[0.2em] text-primary italic">
             <Target className="h-3 w-3" /> Mission Board
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-foreground italic leading-none">
            Opportunities
          </h1>
          <p className="text-muted-foreground font-medium text-lg italic max-w-xl">
            Find hackathons, squad roles, and developer fellowships to accelerate your journey.
          </p>
        </div>
        <Link href="/opportunities/new">
          <Button className="h-14 rounded-2xl px-8 font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-3 active:scale-95">
            <PlusCircle className="h-5 w-5" /> Post Opportunity
          </Button>
        </Link>
      </div>

      {/* SEARCH AND FILTER */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search missions, roles, or stacks..." 
            className="pl-12 h-14 rounded-2xl border-border/40 bg-white/50 backdrop-blur-sm focus-visible:ring-primary/20 focus-visible:border-primary/30 transition-all font-medium italic" 
          />
        </div>
        <Button variant="outline" className="h-14 px-6 rounded-2xl border-border/40 bg-white/50 hover:bg-white font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filter Board
        </Button>
      </div>

      {/* OPPORTUNITIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {opportunities.map((opp) => (
          <Link href={`/opportunities/${opp.id}`} key={opp.id} className="group">
            <div className="h-full flex flex-col border border-border/40 bg-white/40 hover:bg-white hover:shadow-sm transition-all duration-300 rounded-2xl overflow-hidden p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                    {opp.type === 'HACKATHON' ? <Flame className="h-5 w-5 text-primary/60" /> : <Zap className="h-5 w-5 text-primary/60" />}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {opp.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="px-2 py-0 rounded-md text-[8px] font-bold uppercase tracking-wider border-border/60 bg-white">
                        {opp.type}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground font-medium italic">
                        {new Date(opp.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm line-clamp-3 font-medium italic text-muted-foreground leading-relaxed">
                "{opp.description}"
              </p>

              <div className="pt-4 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={opp.author.avatarUrl || ""} />
                    <AvatarFallback className="text-[8px] font-bold">
                      {opp.author.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-[10px] font-bold text-muted-foreground">{opp.author.name}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* EMPTY STATE */}
      {opportunities.length === 0 && (
        <div className="py-32 text-center space-y-6 border-2 border-dashed rounded-[40px] border-border/20 bg-muted/5">
           <div className="h-20 w-20 rounded-full bg-muted/10 flex items-center justify-center mx-auto border border-border/5 mb-2">
              <Briefcase className="h-10 w-10 text-muted-foreground/20" />
           </div>
           <div className="space-y-2">
              <h3 className="text-xl font-black italic text-muted-foreground/50">THE BOARD IS CLEAR</h3>
              <p className="text-muted-foreground font-medium text-sm italic">New missions appear regularly. Stay tuned.</p>
           </div>
           <Link href="/opportunities/new">
             <Button variant="link" className="font-black text-primary uppercase tracking-[0.2em] text-[10px] hover:no-underline hover:opacity-70 transition-opacity">
               Ignite the first spark
             </Button>
           </Link>
        </div>
      )}
    </div>
  );
}
