import { getAllUsers } from "@/app/actions/profile";
import { Search, Filter, Sparkles, MessageCircle, ArrowRight, Users, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default async function CommunityPage() {
  const users = await getAllUsers();

  return (
    <div className="container mx-auto py-10 px-4 sm:px-8 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground font-medium">Connect with student builders and visionary developers.</p>
        </div>
        <Button className="flex items-center gap-2 font-bold">
           <Sparkles className="h-4 w-4" /> Recommended Matches
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
          <Input placeholder="Search builders by skills, info or interests..." className="pl-10 h-10 border-border/60" />
        </div>
        <Button variant="outline" className="h-10 px-4 flex items-center gap-2 font-bold">
           <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="relative flex flex-col items-center text-center p-6 border-border/60 hover:shadow-sm transition-all shadow-none">
            <Link href={`/profile/${user.id}`} className="absolute top-4 right-4 text-muted-foreground hover:text-primary">
               <ArrowRight className="h-4 w-4" />
            </Link>
            
            <Link href={`/profile/${user.id}`}>
              <Avatar className="h-20 w-20 ring-4 ring-muted shadow-sm hover:ring-primary/10 transition-all">
                <AvatarImage src={user.avatarUrl || ""} className="object-cover" />
                <AvatarFallback className="bg-muted text-foreground text-xl font-black italic">
                  {user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>

            <div className="mt-4 space-y-1">
              <Link href={`/profile/${user.id}`}>
                <CardTitle className="text-lg font-bold hover:text-primary transition-colors cursor-pointer">{user.name || "Explorer"}</CardTitle>
              </Link>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">{user.email.split('@')[0]}</p>
            </div>

            <CardDescription className="mt-3 text-xs line-clamp-2 italic font-medium">
               "{user.bio || "Crafting experiences and building the next big thing."}"
            </CardDescription>

            <div className="flex flex-wrap justify-center gap-1.5 mt-5">
              {user.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-[9px] font-bold px-2 py-0.5 rounded-md">
                   {skill}
                </Badge>
              ))}
              {user.skills.length > 3 && (
                <span className="text-[9px] font-bold text-muted-foreground/60 self-center">+{user.skills.length - 3}</span>
              )}
            </div>

            <div className="mt-auto pt-6 flex items-center justify-center gap-4 w-full">
               <Button variant="ghost" size="sm" className="h-8 w-full text-[10px] font-bold uppercase tracking-wider hover:bg-primary/5 hover:text-primary border border-border/40">
                  <MessageCircle className="h-3.5 w-3.5 mr-2" /> Message
               </Button>
            </div>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <div className="py-24 text-center rounded-xl border border-dashed border-border/60 bg-muted/5 opacity-50 space-y-4">
           <Users className="h-10 w-10 text-muted-foreground/30 mx-auto" />
           <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">No visionaries joined yet.</p>
        </div>
      )}
    </div>
  );
}

function SocialIcon({ icon }: any) {
  return (
     <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-primary/5 hover:text-primary hover:border hover:border-primary/10 transition-all opacity-40 hover:opacity-100">
        {icon}
     </Button>
  );
}
