import { getOpportunityDetail } from "@/app/actions/opportunities";
import { auth } from "@clerk/nextjs/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, Clock, Calendar, MapPin, Tag, Mail, UserPlus, Info, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function OpportunityDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const opp = await getOpportunityDetail(id);

  if (!opp) return notFound();

  return (
    <div className="container mx-auto py-10 px-4 sm:px-8 max-w-4xl space-y-10 animate-in fade-in duration-500">
      <Link href="/opportunities" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors italic">
        <ArrowLeft className="h-4 w-4" /> Back to board
      </Link>

      {/* Hero Section */}
      <div className="flex flex-col gap-6 items-start border-b pb-10 border-border/60">
        <div className="flex items-center gap-3">
           <div className="h-10 w-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary border border-primary/10">
              <Briefcase className="h-5 w-5" />
           </div>
           <Badge variant="secondary" className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-secondary/60">
              {opp.type}
           </Badge>
        </div>
        
        <div className="space-y-4 w-full">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-foreground italic">{opp.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
             <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest italic">
                <Clock className="h-3.5 w-3.5" /> Posted {new Date(opp.createdAt).toLocaleDateString()}
             </div>
             <div className="h-1 w-1 rounded-full bg-border" />
             <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest italic">
                <MapPin className="h-3.5 w-3.5" /> Remote / Global
             </div>
             <div className="h-1 w-1 rounded-full bg-border" />
             <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest italic">
                <Calendar className="h-3.5 w-3.5" /> Fast-track
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-10">
           <section className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground italic">
                 <Info className="h-4 w-4 text-primary" /> Manifest
              </h2>
              <div className="text-base text-foreground/80 leading-relaxed italic whitespace-pre-wrap">
                 {opp.description}
              </div>
           </section>

           <section className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground italic">
                 <CheckCircle2 className="h-4 w-4 text-primary" /> Prerequisites
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {["High Momentum", "Proof of Work", "Vibe Pass", "Full Dedication"].map(req => (
                    <div key={req} className="flex items-center gap-3 p-3 rounded-xl border border-border/40 bg-muted/5">
                       <CheckCircle2 className="h-3.5 w-3.5 text-primary opacity-60" />
                       <span className="text-[10px] font-black tracking-widest uppercase leading-none opacity-80">{req}</span>
                    </div>
                 ))}
              </div>
           </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <Card className="rounded-2xl border-border/60 bg-white shadow-sm overflow-hidden">
              <CardContent className="p-6 space-y-6">
                 <div className="flex flex-col items-center text-center gap-4 py-2">
                    <Link href={`/profile/${opp.author.id}`}>
                      <Avatar className="h-20 w-20 ring-4 ring-muted shadow-sm hover:ring-primary/10 transition-all cursor-pointer">
                        <AvatarImage src={opp.author.avatarUrl || ""} />
                        <AvatarFallback className="text-lg font-black italic">{opp.author.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="space-y-1">
                       <Link href={`/profile/${opp.author.id}`}>
                         <h3 className="text-lg font-black italic hover:text-primary transition-colors cursor-pointer">{opp.author.name || "Explorer"}</h3>
                       </Link>
                       <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] opacity-60">{opp.author.email.split('@')[0]}</p>
                    </div>
                 </div>

                 <div className="space-y-3 pt-4 border-t border-border/40">
                    <Button className="w-full h-11 rounded-xl font-bold uppercase tracking-widest gap-2 shadow-sm text-xs">
                       Interested
                    </Button>
                    <Button variant="outline" className="w-full h-11 rounded-xl font-bold uppercase tracking-widest gap-2 border-border/60 text-xs">
                       <Mail className="h-4 w-4" /> Message
                    </Button>
                 </div>
              </CardContent>
           </Card>

           <Card className="rounded-2xl border-border/60 border-dashed bg-muted/5">
              <CardContent className="p-5 flex items-center gap-3 text-muted-foreground/60">
                 <Tag className="h-4 w-4" />
                 <span className="text-[9px] font-black uppercase tracking-widest leading-none">Curated Opportunity</span>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
