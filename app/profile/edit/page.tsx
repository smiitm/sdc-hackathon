"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getProfile, updateProfile } from "@/app/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { User, Loader2, X, Plus, Sparkles } from "lucide-react";

export default function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    skills: [] as string[],
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await getProfile();
        if (profile) {
          setFormData({
            name: profile.name || "",
            bio: profile.bio || "",
            skills: profile.skills || [],
          });
        }
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      await updateProfile(formData);
      toast.success("Profile updated!");
      router.refresh();
      router.push(`/profile`);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill] });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skillToRemove),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-12 px-4 animate-in fade-in duration-500">
      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-black tracking-tighter italic">Edit Manifest</h1>
        <p className="text-muted-foreground font-medium">Update your digital identity in the BuildSpace network.</p>
      </div>

      <Card className="border-border/60 shadow-sm overflow-hidden">
        <form onSubmit={onSubmit}>
          <CardHeader className="bg-muted/5 border-b border-border/40">
            <CardTitle className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 italic">
               <User className="h-4 w-4 text-primary" /> Profile Identity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest opacity-60">Full Name</Label>
              <Input
                id="name"
                placeholder="How should we call you?"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-11 border-border/60 font-bold italic"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-[10px] font-black uppercase tracking-widest opacity-60">Bio / Mission</Label>
              <Textarea
                id="bio"
                placeholder="What are you building? What is your mission?"
                className="min-h-[120px] border-border/60 resize-none italic font-medium"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Skill Log</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill (e.g. Next.js, AI, Design)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  className="h-11 border-border/60 font-bold italic"
                />
                <Button type="button" onClick={addSkill} variant="secondary" className="h-11 px-4">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="h-8 gap-2 pl-3 pr-2 border-border/60 bg-white font-bold uppercase text-[9px] tracking-widest group">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {formData.skills.length === 0 && (
                   <p className="text-[10px] text-muted-foreground italic font-medium pl-1">No skills documented yet.</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-4 pt-6 border-t border-border/40 bg-muted/5">
            <Button variant="ghost" type="button" onClick={() => router.back()} disabled={saving} className="font-bold text-xs uppercase tracking-widest">
              Discard
            </Button>
            <Button type="submit" disabled={saving} className="px-8 font-bold text-xs uppercase tracking-[0.2em] shadow-md shadow-primary/20">
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
