"use client";

import Link from "next/link";
import {
    UserButton,
    SignInButton,
    SignUpButton,
    useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    Briefcase,
    PlusCircle,
} from "lucide-react";

import { useEffect } from "react";
import { syncUser } from "@/app/actions/auth";

export function Navbar() {
    const { isSignedIn, user } = useUser();

    useEffect(() => {
        const triggerSync = async () => {
            if (isSignedIn && user) {
                try {
                    await syncUser();
                } catch (err) {
                    console.error("Failed to sync user:", err);
                }
            }
        };
        triggerSync();
    }, [isSignedIn, user]);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center justify-between px-4 sm:px-8">

                {/* Left */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-2xl font-bold">
                        BuildSpace
                    </Link>

                    <div className="hidden md:flex gap-6">
                        <Link href="/dashboard">Dashboard</Link>
                        <Link href="/projects">Projects</Link>
                        <Link href="/opportunities">Opportunities</Link>
                        <Link href="/users">Community</Link>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">
                    {isSignedIn ? (
                        <>
                            <Link href="/projects/new">
                                <Button size="sm">Post Project</Button>
                            </Link>
                            <UserButton afterSignOutUrl="/" />
                        </>
                    ) : (
                        <>
                            <SignInButton mode="modal">
                                <Button variant="ghost" size="sm">
                                    Log In
                                </Button>
                            </SignInButton>

                            <SignUpButton mode="modal">
                                <Button size="sm">Join</Button>
                            </SignUpButton>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}