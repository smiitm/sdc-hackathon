import { getProfile } from "@/app/actions/profile";
import { auth } from "@clerk/nextjs/server";
import { User, Mail, Calendar, Settings, Edit3, Globe, Sparkles, FolderDot, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/");

  const profile = await getProfile();
  if (!profile) return (
    <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
       <h1 className="text-2xl font-black italic">Profile not found.</h1>
       <p className="text-muted-foreground font-medium">Please ensure your account is correctly set up.</p>
    </div>
  );

  return (
    <div className="container mx-auto py-10 px-4 sm:px-8 space-y-10 animate-in fade-in duration-500">
      
      {/* PROFILE HEADER */}
      <Card className="rounded-3xl border-border/60 bg-white shadow-sm p-8 sm:p-12 relative overflow-hidden">
        <div className="absolute top-6 right-6 flex gap-3 z-10">
           <Link href="/profile/edit">
             <Button variant="outline" className="h-10 rounded-xl px-4 font-bold uppercase tracking-wider text-[11px] border-border/60 flex items-center gap-2">
                <Edit3 className="h-4 w-4" /> Edit Profile
             </Button>
           </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <div className="relative">
             <Avatar className="h-32 w-32 sm:h-40 sm:w-40 ring-4 ring-muted shadow-sm hover:ring-primary/10 transition-all">
                <AvatarImage src={profile.avatarUrl || ""} className="object-cover" />
                <AvatarFallback className="bg-muted text-foreground text-3xl font-black italic">
                  {profile.name?.charAt(0) || "U"}
                </AvatarFallback>
             </Avatar>
             <div className="absolute -bottom-1 -right-1 bg-primary h-8 w-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                <Sparkles className="h-4 w-4 text-white" />
             </div>
          </div>

          <div className="flex-1 space-y-5 text-center md:text-left">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tighter text-foreground italic leading-tight">
                {profile.name || "Explorer"}
              </h1>
              <p className="text-muted-foreground font-medium text-base md:text-lg italic leading-relaxed max-w-xl">
                 "{profile.bio || "Sharing innovations and building the future of decentralized collaboration."}"
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
               <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-muted/50 border border-border/40 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" /> {profile.email}
               </div>
               <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-muted/50 border border-border/40 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" /> Established {new Date(profile.createdAt).toLocaleDateString()}
               </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* MAIN USER CONTENT */}
        <div className="lg:col-span-2 space-y-10">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="h-11 bg-muted/30 rounded-xl p-1 mb-8 border border-border/40">
              <TabsTrigger value="projects" className="flex items-center gap-2 rounded-lg text-[10px] font-black uppercase tracking-widest px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
                 <FolderDot className="h-3.5 w-3.5" /> My Builds
              </TabsTrigger>
              <TabsTrigger value="collaborations" className="flex items-center gap-2 rounded-lg text-[10px] font-black uppercase tracking-widest px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">
                 <Users className="h-3.5 w-3.5" /> Contributions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="grid gap-4">
               {profile.projects.length > 0 ? profile.projects.map(p => (
                 <ProjectCard key={p.id} project={p} />
               )) : <EmptyState text="No projects created yet." />}
            </TabsContent>

            <TabsContent value="collaborations" className="grid gap-4">
                {profile.memberships.length > 0 ? profile.memberships.map(m => (
                  <ProjectCard key={m.projectId} project={m.project} status="MEMBER" />
                )) : <EmptyState text="Not a member of any teams yet." />}
            </TabsContent>
          </Tabs>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-8">
          <Card className="rounded-2xl border-border/60 bg-white shadow-sm p-6 space-y-6">
             <div className="space-y-4">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic border-b pb-3 border-border/40 flex items-center gap-2">
                 <Sparkles className="h-3 w-3 text-primary" /> Skill Log
               </h3>
               <div className="flex flex-wrap gap-2">
                  {profile.skills.length > 0 ? profile.skills.map(s => (
                    <Badge key={s} variant="outline" className="bg-white border-border/60 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-all cursor-default shadow-none">
                       {s}
                    </Badge>
                  )) : <p className="text-[10px] font-bold text-muted-foreground italic px-1">Arsenal empty.</p>}
               </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic border-b pb-3 border-border/40 flex items-center gap-2">
                   <Globe className="h-3 w-3 text-primary" /> Profiles
                </h3>
                <div className="grid grid-cols-2 gap-2">
                   {/* <SocialLink icon={<Github className="h-3 w-3" />} label="GitHub" /> */}
                   {/* <SocialLink icon={<Twitter className="h-3 w-3" />} label="Twitter" /> */}
                </div>
             </div>
          </Card>

          <Card className="rounded-2xl border-border/60 bg-muted/5 p-6 text-center space-y-2">
             <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Reputation</h4>
             <p className="text-xl font-black italic tracking-tighter">Verified Builder</p>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function ProjectCard({ project, status = "OWNER" }: any) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="rounded-2xl border border-border/40 bg-white/40 hover:bg-white/90 hover:shadow-sm hover:border-primary/20 transition-all duration-500 group overflow-hidden">
        <div className="flex p-6 gap-6 items-start">
          <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10 shadow-inner group-hover:scale-105 transition-transform duration-500">
              <FolderDot className="h-6 w-6 text-primary/60" />
          </div>
          <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-black italic tracking-tight">{project.title}</h4>
                <Badge variant={status === 'OWNER' ? 'default' : 'secondary'} className="text-[8px] font-bold uppercase py-0.5 rounded-lg">
                    {status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed italic line-clamp-2">"{project.description}"</p>
              <div className="flex gap-1.5 mt-2">
                {project.techStack?.slice(0, 4).map((t: string) => (
                  <Badge key={t} variant="outline" className="text-[8px] border-border/40 font-bold uppercase">{t}</Badge>
                ))}
              </div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors self-center" />
        </div>
      </Card>
    </Link>
  );
}

function SocialLink({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <Button variant="ghost" size="sm" className="h-8 justify-start gap-2 px-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-primary/5 hover:text-primary border border-border/20 rounded-lg">
      {icon} {label}
    </Button>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="py-20 text-center rounded-[35px] border-2 border-dashed border-border/20 bg-muted/5">
       <Sparkles className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
       <p className="text-muted-foreground font-black uppercase tracking-widest text-[11px]">{text}</p>
    </div>
  );
}
