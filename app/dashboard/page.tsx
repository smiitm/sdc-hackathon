import { getDashboardFeed } from "@/app/actions/dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Briefcase, FolderKanban, ArrowRight, PlusCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { latestProjects, latestOpportunities, recentUsers } = await getDashboardFeed();

  return (
    <div className="container mx-auto py-10 px-4 sm:px-8 space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* LATEST PROJECTS FEED */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FolderKanban className="h-5 w-5 text-primary" /> Recent Projects
            </h2>
            <Link href="/projects" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid gap-4">
            {latestProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base font-semibold">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-[10px]">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* OPPORTUNITIES BOARD */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" /> Opportunities
            </h2>
            <Link href="/opportunities" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              Browse <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid gap-4">
            {latestOpportunities.map((opp) => (
              <Card key={opp.id}>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start mb-1">
                     <Badge className="text-[9px]" variant={opp.type === 'HACKATHON' ? 'default' : 'outline'}>{opp.type}</Badge>
                  </div>
                  <CardTitle className="text-base font-semibold">{opp.title}</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground line-clamp-2 mt-1">{opp.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* COMMUNITY UPDATES */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" /> New Members
            </h2>
            <Link href="/users" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
              Find teammates <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl || ''} />
                      <AvatarFallback className="text-[10px]">
                        {user.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-medium truncate">{user.name || 'Anonymous User'}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{user.skills.slice(0, 2).join(", ") || 'Explorer'}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                       <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
