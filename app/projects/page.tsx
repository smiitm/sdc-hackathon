import { getProjects } from "@/app/actions/projects";
import { PlusCircle, Search, Filter, ArrowRight, FolderKanban, Sparkles, Zap, Layers, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto py-12 px-4 sm:px-8 space-y-12 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/40 pb-10">
        <div className="space-y-4 text-center md:text-left w-full md:w-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-[0.2em] text-primary italic mx-auto md:mx-0">
             <Layers className="h-3.5 w-3.5" /> Project Nexus
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-foreground italic leading-none">
            Builders Hub
          </h1>
          <p className="text-muted-foreground font-medium text-lg italic max-w-xl mx-auto md:mx-0">
            Discover and collaborate on the next generation of student-led innovation.
          </p>
        </div>
        <Link href="/projects/new" className="w-full md:w-auto">
          <Button className="w-full h-14 rounded-2xl px-10 font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-3 active:scale-95 bg-primary text-white">
            <PlusCircle className="h-5 w-5" /> Start Building
          </Button>
        </Link>
      </div>

      {/* SEARCH AND FILTER */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search projects, tech stacks, or builders..." 
            className="pl-12 h-14 rounded-2xl border-border/40 bg-white/50 backdrop-blur-sm focus-visible:ring-primary/20 focus-visible:border-primary/30 transition-all font-medium italic shadow-sm" 
          />
        </div>
        <Button variant="outline" className="h-14 px-6 rounded-2xl border-border/40 bg-white/50 hover:bg-white font-black uppercase tracking-widest text-[10px] flex items-center gap-2 shadow-sm">
          <Filter className="h-4 w-4" /> Filter Stack
        </Button>
      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id} className="group">
            <div className="h-full flex flex-col border border-border/40 bg-white/40 hover:bg-white hover:shadow-sm transition-all duration-300 rounded-2xl overflow-hidden p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                    <FolderKanban className="h-5 w-5 text-primary/60" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                      {project.members.length} {project.members.length === 1 ? 'Builder' : 'Builders'}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm line-clamp-2 font-medium italic text-muted-foreground leading-relaxed">
                "{project.description}"
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-muted/40 text-[9px] font-bold uppercase px-2 py-0.5 rounded-md border-none">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={project.owner.avatarUrl || ""} />
                    <AvatarFallback className="text-[8px] font-bold">
                      {project.owner.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-[10px] font-bold text-muted-foreground">{project.owner.name}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* EMPTY STATE */}
      {projects.length === 0 && (
        <div className="py-32 text-center space-y-6 border-2 border-dashed rounded-[45px] border-border/20 bg-muted/5 animate-pulse">
           <FolderKanban className="h-20 w-20 text-muted-foreground/10 mx-auto" />
           <div className="space-y-2">
              <h3 className="text-xl font-black italic text-muted-foreground/40 uppercase tracking-widest">Awaiting Innovation</h3>
              <p className="text-muted-foreground font-medium text-sm italic">The Nexus is silent. Be the one to break it.</p>
           </div>
           <Link href="/projects/new">
             <Button variant="link" className="font-black text-primary uppercase tracking-[0.2em] text-[10px] hover:no-underline hover:scale-110 transition-transform">
               Inaugurate the Nexus
             </Button>
           </Link>
        </div>
      )}
    </div>
  );
}
