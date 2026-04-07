import { getProjectDetail, joinProject } from "@/app/actions/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FolderKanban, Users, Code2, Globe, MessageSquare, UserPlus, Sparkles, Zap, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const project = await getProjectDetail(id);
  const { userId: clerkId } = await auth();

  if (!project) return notFound();

  const isMember = project.members.some(m => m.user.clerkId === clerkId);
  const isOwner = project.owner.clerkId === clerkId;

  async function handleJoin() {
    "use server";
    try {
      await joinProject(id);
    } catch (e) {
      console.error("Failed to join project", e);
    }
    revalidatePath(`/projects/${id}`);
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-8 max-w-6xl space-y-12 animate-in fade-in duration-700">
      
      {/* HEADER SECTION - SIMPLISTIC & BOLD */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10 border-b border-border/40 pb-12">
        <div className="space-y-6 flex-1">
          <div className="flex flex-wrap items-center gap-3">
             <div className="p-3 bg-primary/5 rounded-2xl text-primary border border-primary/10 shadow-inner">
                <FolderKanban className="h-7 w-7" />
             </div>
             <Badge variant="outline" className="rounded-xl px-4 py-1 text-[10px] font-black uppercase tracking-widest border-border/60 bg-white">
                v1.0.0-beta
             </Badge>
             <Badge variant="secondary" className="rounded-xl px-4 py-1 text-[10px] font-black uppercase tracking-widest bg-green-500/10 text-green-600 border-none">
                Active Nexus
             </Badge>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-foreground italic leading-none">
               {project.title}
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-3xl italic font-medium">
               "{project.description}"
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.techStack.map(tech => (
              <Badge key={tech} variant="outline" className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-muted/20 border-border/40 hover:border-primary/20 hover:text-primary transition-all cursor-default">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-4 w-full lg:w-64 pt-4 lg:pt-0">
           {isMember || isOwner ? (
                <Button disabled className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] gap-2 bg-muted text-muted-foreground border-border/40">
                    <ShieldCheck className="h-4 w-4" /> Already in Squad
                </Button>
           ) : (
              <form action={handleJoin}>
                <Button type="submit" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                   <UserPlus className="h-4 w-4" /> Join the Squad
                </Button>
              </form>
           )}
           <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[11px] gap-2 border-border/40 bg-white/50 hover:bg-white shadow-sm">
              <MessageSquare className="h-4 w-4" /> Message Founder
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* LEFT COLUMN: CONTEXT & VISION */}
        <div className="lg:col-span-8 space-y-12">
           <section className="space-y-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 flex items-center gap-2 italic">
                 <Sparkles className="h-4 w-4 text-primary" /> The Genesis Vision
              </h2>
              <Card className="rounded-[40px] border-none bg-muted/5 p-2 shadow-inner">
                 <CardContent className="p-10 space-y-6">
                    <p className="text-lg text-muted-foreground leading-loose italic font-medium">
                       "Every great advancement starts with a single builder's spark. <span className="text-foreground font-black">{project.title}</span> was born from the need to revolutionize how we interact with <span className="text-primary font-black uppercase tracking-widest text-sm">{project.techStack[0]}</span>. We are constructing a foundation where innovation meets execution."
                    </p>
                    <div className="flex items-center gap-6 pt-4">
                       <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Rapid Proto</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-primary" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Gated Alpha</span>
                       </div>
                    </div>
                 </CardContent>
              </Card>
           </section>

           <section className="space-y-6">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 flex items-center gap-2 italic">
                 <Globe className="h-4 w-4 text-primary" /> Resources & Transmissions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <Card className="rounded-3xl border border-border/40 hover:bg-white hover:shadow-xl hover:border-primary/20 transition-all duration-500 cursor-pointer group bg-white/40 backdrop-blur-sm">
                    <CardContent className="p-6 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="p-3 rounded-2xl bg-black text-white group-hover:scale-110 transition-transform">
                             {/* <Github className="h-5 w-5" /> */}
                          </div>
                          <div>
                             <p className="text-sm font-black italic tracking-tight">Source Code</p>
                             <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Public Archive</p>
                          </div>
                       </div>
                       <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </CardContent>
                 </Card>
                 
                 <Card className="rounded-3xl border border-border/40 hover:bg-white hover:shadow-xl hover:border-primary/20 transition-all duration-500 cursor-pointer group bg-white/40 backdrop-blur-sm">
                    <CardContent className="p-6 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="p-3 rounded-2xl bg-primary text-white group-hover:scale-110 transition-transform">
                             <Globe className="h-5 w-5" />
                          </div>
                          <div>
                             <p className="text-sm font-black italic tracking-tight">Deployment</p>
                             <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Live Preview</p>
                          </div>
                       </div>
                       <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </CardContent>
                 </Card>
              </div>
           </section>
        </div>

        {/* RIGHT COLUMN: REPUTATION & TEAM */}
        <div className="lg:col-span-4 space-y-12">
           <section className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 italic">
                 The Architect
              </h3>
              <Card className="rounded-[35px] border border-border/10 bg-white shadow-sm overflow-hidden group">
                 <div className="h-2 bg-primary w-full group-hover:h-3 transition-all" />
                 <CardContent className="p-8 space-y-6">
                    <div className="flex items-center gap-4">
                       <Avatar className="h-16 w-16 border-4 border-muted/50 shadow-md">
                          <AvatarImage src={project.owner.avatarUrl || ""} />
                          <AvatarFallback className="font-black italic text-xl bg-muted text-foreground">{project.owner.name?.charAt(0)}</AvatarFallback>
                       </Avatar>
                       <div>
                          <p className="text-xl font-black italic tracking-tighter">{project.owner.name}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.1em] flex items-center gap-1.5">
                             <ShieldCheck className="h-3 w-3 text-primary" /> Verified Founder
                          </p>
                       </div>
                    </div>
                    <Link href={`/profile/${project.owner.id}`}>
                      <Button variant="ghost" className="w-full rounded-2xl border border-border/40 h-12 text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 hover:text-primary">
                         View Dossier
                      </Button>
                    </Link>
                 </CardContent>
              </Card>
           </section>

           <section className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 italic flex justify-between items-center">
                 Collective Team <span className="text-primary">{project.members.length}</span>
              </h3>
              <div className="grid gap-4">
                 {project.members.slice(0, 5).map(member => (
                    <Card key={member.id} className="rounded-2xl border-none bg-muted/20 hover:bg-white hover:shadow-lg hover:ring-1 hover:ring-primary/10 transition-all group overflow-hidden">
                       <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                                <AvatarImage src={member.user.avatarUrl || ""} />
                                <AvatarFallback className="text-[10px] font-black italic">{member.user.name?.charAt(0)}</AvatarFallback>
                             </Avatar>
                             <div>
                                <p className="text-xs font-black italic">{member.user.name}</p>
                                <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">{member.role}</p>
                             </div>
                          </div>
                          <Link href={`/profile/${member.user.id}`}>
                             <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full group-hover:bg-primary/5 group-hover:text-primary">
                                <ArrowRight className="h-3.5 w-3.5" />
                             </Button>
                          </Link>
                       </CardContent>
                    </Card>
                 ))}
                 {project.members.length > 5 && (
                    <p className="text-[10px] text-center font-black text-muted-foreground italic uppercase tracking-widest pt-2">
                       + {project.members.length - 5} more builders in Nexus
                    </p>
                 )}
              </div>
           </section>

           <Card className="rounded-[40px] border-none bg-primary/5 p-8 text-center space-y-4">
              <Heart className="h-8 w-8 text-primary/40 mx-auto fill-primary/10" />
              <div className="space-y-1">
                 <p className="text-xs font-black uppercase tracking-widest">Reputation</p>
                 <p className="text-xl font-black italic">Building Excellence</p>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
