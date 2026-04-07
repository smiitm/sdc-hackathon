import { auth } from "@clerk/nextjs/server";
import { getUserProfile, connectWithUser } from "@/app/actions/profile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, MessageSquare, UserPlus, Zap, Settings2, FolderKanban, Briefcase, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function UserProfilePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const user = await getUserProfile(id);
  const { userId: clerkId } = await auth();

  if (!user) return notFound();

  const isMe = user.clerkId === clerkId;

  async function handleConnect() {
    "use server";
    await connectWithUser(id);
    revalidatePath(`/profile/${id}`);
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-8 max-w-5xl space-y-10 animate-in fade-in duration-500">
      {/* Profile Header Block */}
      <Card className="rounded-3xl border-border/60 bg-white shadow-sm p-8 md:p-12 overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative">
            <Avatar className="h-32 w-32 md:h-40 md:w-40 ring-4 ring-muted shadow-sm hover:ring-primary/10 transition-all">
              <AvatarImage src={user.avatarUrl || ""} className="object-cover" />
              <AvatarFallback className="bg-muted text-foreground text-3xl font-black italic">
                 {user.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 space-y-5 text-center md:text-left">
            <div className="space-y-2">
               <div className="flex items-center justify-center md:justify-start gap-3">
                  <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground italic">
                    {user.name || "Explorer"}
                  </h1>
                  <Badge variant="secondary" className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-primary/10 text-primary border-none">
                    BUILDER
                  </Badge>
               </div>
               <p className="text-muted-foreground text-base md:text-lg font-medium italic max-w-2xl">
                 "{user.bio || "Crafting experiences and building the next big thing."}"
               </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
               {!isMe ? (
                 <form action={handleConnect}>
                    <Button type="submit" className="rounded-xl px-6 h-10 font-bold uppercase tracking-wider shadow-sm text-xs group">
                        <UserPlus className="h-4 w-4 mr-2 group-active:scale-125 transition-transform" /> Connect
                    </Button>
                 </form>
               ) : (
                 <Link href="/profile/edit">
                    <Button className="rounded-xl px-6 h-10 font-bold uppercase tracking-wider shadow-sm text-xs">
                        Edit Profile
                    </Button>
                 </Link>
               )}
               <Button variant="outline" className="rounded-xl px-6 h-10 font-bold uppercase tracking-wider text-xs border-border/60">
                  <MessageSquare className="h-4 w-4 mr-2" /> Message
               </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Skills & Projects */}
        <div className="lg:col-span-2 space-y-8">
           <section className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground italic">
                 <Zap className="h-4 w-4 text-primary" /> Skill Log
              </h2>
              <div className="flex flex-wrap gap-2">
                 {user.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="bg-white text-[11px] font-bold uppercase py-1.5 px-3 rounded-xl border-border/60 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all shadow-none">
                       {skill}
                    </Badge>
                 ))}
                 {user.skills.length === 0 && (
                    <p className="text-sm text-muted-foreground italic font-medium">No skills documented yet.</p>
                 )}
              </div>
           </section>

           <section className="space-y-4 pt-4 border-t border-border/40">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground italic">
                 <FolderKanban className="h-4 w-4 text-primary" /> Recent Builds
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {user.projects.length > 0 ? (
                   user.projects.map(project => (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                      <Card className="rounded-2xl border border-border/60 hover:border-primary/40 hover:shadow-sm transition-all p-5 h-full flex flex-col justify-between">
                         <div className="space-y-2">
                            <h3 className="font-bold italic text-foreground tracking-tight">{project.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed italic line-clamp-2">{project.description}</p>
                         </div>
                         <div className="mt-4 flex flex-wrap gap-1">
                            {project.techStack.slice(0, 3).map(tech => (
                              <Badge key={tech} variant="secondary" className="text-[9px] h-4">{tech}</Badge>
                            ))}
                         </div>
                      </Card>
                    </Link>
                   ))
                 ) : (
                    <div className="col-span-2 py-10 text-center border border-dashed rounded-2xl bg-muted/5">
                       <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest italic">No public builds yet.</p>
                    </div>
                 )}
              </div>
           </section>
        </div>

        {/* Right Column: Metadata & Activity */}
        <div className="space-y-6">
           <Card className="rounded-2xl border-border/60 bg-white p-6 shadow-sm space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] italic border-b pb-3 border-border/40 text-muted-foreground">Network</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-muted-foreground">Collaborations</span>
                  <span className="font-black italic text-primary">{user.memberships.length}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-muted-foreground">Join Date</span>
                  <span className="font-black italic text-foreground">{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
           </Card>

           <Card className="rounded-2xl border-border/60 bg-muted/5 p-6 text-center space-y-3">
              <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center mx-auto shadow-sm border border-border/40 text-primary">
                 <Settings2 className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.2em]">Platform Status</p>
                <h4 className="text-lg font-black italic tracking-tighter">Gold Builder</h4>
              </div>
           </Card>

           <div className="p-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] italic mb-4 text-muted-foreground flex items-center gap-2">
                <Briefcase className="h-3 w-3" /> Contributions
              </h3>
              <div className="space-y-3">
                {user.memberships.map(m => (
                  <Link key={m.id} href={`/projects/${m.project.id}`}>
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group">
                      <div className="h-10 w-10 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center font-black text-xs group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {m.project.title.charAt(0)}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-xs font-bold truncate">{m.project.title}</p>
                        <p className="text-[9px] text-muted-foreground font-black uppercase tracking-tighter opacity-70">{m.role}</p>
                      </div>
                    </div>
                  </Link>
                ))}
                {user.memberships.length === 0 && (
                   <p className="text-[10px] text-muted-foreground/60 italic font-medium px-2">No active contributions found.</p>
                )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
