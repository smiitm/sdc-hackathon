"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOpportunity } from "@/app/actions/opportunities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Briefcase, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewOpportunityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "TEAM_UP" as "TEAM_UP" | "HIRING" | "HACKATHON",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await createOpportunity(formData);
      toast.success("Opportunity posted successfully!");
      router.push("/opportunities");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to post opportunity. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href="/opportunities" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to Board
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Post an Opportunity</h1>
        <p className="text-muted-foreground mt-1">Share a hackathon, job opening, or looking-for-teammates post.</p>
      </div>

      <Card className="border-border/60 shadow-sm">
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" /> Details
            </CardTitle>
            <CardDescription>
              Provide clear details to help others find your opportunity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="e.g. Seeking React Developer for Fintech Hackathon"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-11 border-border/60"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Category</Label>
              <Select
                value={formData.type}
                onValueChange={(val: any) => setFormData({ ...formData, type: val })}
              >
                <SelectTrigger className="h-11 border-border/60">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TEAM_UP">Team Up (Find collaborators)</SelectItem>
                  <SelectItem value="HIRING">Hiring (Job/Internship)</SelectItem>
                  <SelectItem value="HACKATHON">Hackathon (Event info)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the opportunity, requirements, and how to apply..."
                required
                className="min-h-[150px] border-border/60 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-4 pt-6 border-t font-semibold">
            <Button variant="ghost" type="button" onClick={() => router.back()} disabled={loading} className="px-8">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="px-8">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting...
                </>
              ) : (
                "Post Opportunity"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
