"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/app/actions/projects";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Sparkles, Send, ArrowLeft, Terminal, Rocket, Shapes } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tech, setTech] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const addTech = () => {
    if (tech.trim() && !techStack.includes(tech.trim())) {
      setTechStack([...techStack, tech.trim()]);
      setTech("");
    }
  };

  const removeTech = (item: string) => {
    setTechStack(techStack.filter((t) => t !== item));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (techStack.length === 0) {
      toast.error("Please add at least one technology to your stack.");
      return;
    }
    setLoading(true);
    try {
      await createProject({ ...formData, techStack });
      toast.success("Mission Launch: Project created successfully!");
      router.push("/projects");
    } catch (error) {
      toast.error("Critical Failure: Could not launch project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      <div className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-3xl px-6 py-5 shadow-sm">
        <div className="container mx-auto flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-6">
            <Link href="/projects">
              <Button variant="ghost" size="icon" className="group rounded-2xl hover:bg-primary/5 transition-all">
                <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Button>
            </Link>
            <div className="h-6 w-[1.5px] bg-border/40" />
            <h1 className="text-2xl font-black italic tracking-tighter">Launch Project</h1>
          </div>
          <Button 
             disabled={loading} 
             onClick={handleSubmit}
             className="rounded-2xl px-8 h-12 gap-3 font-black uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {loading ? "Igniting..." : <><Send className="h-4 w-4" /> Deploy</>}
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">
          
          {/* MAIN FORM AREA */}
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-6">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10 shadow-inner">
                     <Terminal className="h-5 w-5 text-primary/60" />
                  </div>
                  <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">The Concept</Label>
               </div>
               <Input 
                  placeholder="The Future of decentralized compute..." 
                  className="h-20 text-4xl sm:text-5xl font-black tracking-tighter border-none bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground/20 italic"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
               />
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10 shadow-inner">
                     <Shapes className="h-5 w-5 text-primary/60" />
                  </div>
                  <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">The Blueprint</Label>
               </div>
               <Textarea 
                  placeholder="Share the mission, the architecture, and the impact..." 
                  className="min-h-[400px] text-xl font-medium leading-relaxed border-none bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground/20 resize-none italic"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
               />
            </div>
          </form>

          {/* SIDEBAR: STACK & ASSETS */}
          <aside className="space-y-10">
            <Card className="rounded-[40px] border-none bg-white/60 backdrop-blur-3xl shadow-2xl p-8 space-y-8">
               <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-primary" /> Arsenal / Stack
                  </h3>
                  
                  <div className="flex flex-wrap gap-2.5">
                    <AnimatePresence>
                      {techStack.map((t) => (
                        <motion.div 
                          key={t}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                        >
                          <Badge className="bg-white border border-border/40 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:border-destructive/40 hover:text-destructive group transition-all">
                             {t}
                             <X className="h-3 w-3 cursor-pointer group-hover:scale-125 transition-transform" onClick={() => removeTech(t)} />
                          </Badge>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="flex gap-2 p-1 pl-4 bg-muted/20 rounded-2xl border border-border/40 transition-all focus-within:border-primary/20">
                     <Input 
                        placeholder="Add tech..." 
                        className="border-none bg-transparent shadow-none focus-visible:ring-0 h-10 text-[11px] font-bold uppercase tracking-widest placeholder:text-muted-foreground/40"
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                        value={tech}
                        onChange={(e) => setTech(e.target.value)}
                     />
                     <Button onClick={addTech} variant="ghost" size="icon" className="h-10 w-10 text-primary hover:bg-primary/5 rounded-xl">
                        <Plus className="h-5 w-5" />
                     </Button>
                  </div>
               </div>

               <div className="h-px w-full bg-gradient-to-r from-transparent via-border/40 to-transparent" />

               <div className="space-y-4">
                  <div className="h-52 w-full rounded-[30px] border-2 border-dashed border-border/60 bg-muted/10 flex flex-col items-center justify-center gap-4 transition-all hover:bg-muted/20 cursor-pointer group">
                     <div className="h-14 w-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-500">
                        <Rocket className="h-7 w-7" />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 leading-none">Drop Banner / Logo</p>
                  </div>
               </div>
            </Card>

            <div className="px-6 space-y-4">
               <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 text-center leading-loose">
                  Your project will be visible to the entire BuildSpace network upon deployment.
               </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
