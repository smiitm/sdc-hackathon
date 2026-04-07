"use server"

import prisma from "@/lib/prisma";

export async function seedDummyData() {
  try {
    // 1. Create a System User for seeding
    const systemUser = await prisma.user.upsert({
      where: { clerkId: "system_seeder" },
      update: {},
      create: {
        clerkId: "system_seeder",
        email: "system@buildspace.dev",
        name: "BuildSpace Concierge",
        bio: "I'm here to help you get started with the community!",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=system",
        skills: ["Community Management", "Vibe Curation"],
        interests: ["Engagement", "Seeding"],
      },
    });

    // 2. Create Dummy Projects
    const projectsData = [
      {
        title: "EchoVault",
        description: "A decentralized storage solution for encrypted voice memos using IPFS and Filecoin.",
        techStack: ["Next.js", "IPFS", "Solidity", "Tailwind"],
      },
      {
        title: "Lumina UI",
        description: "A comprehensive design system and component library focused on high-performance animations and glassmorphism.",
        techStack: ["React", "Framer Motion", "Shadcn UI", "TypeScript"],
      },
      {
        title: "GreenTrack AI",
        description: "An AI-powered application that tracks and predicts supply chain sustainability metrics.",
        techStack: ["Python", "TensorFlow", "PostgreSQL", "Next.js"],
      },
      {
        title: "QuestLink",
        description: "A gamified platform for matching student developers with open-source bug bounties.",
        techStack: ["Node.js", "GraphQL", "Prisma", "React"],
      },
    ];

    for (const project of projectsData) {
      await prisma.project.create({
        data: {
          ...project,
          ownerId: systemUser.id,
          members: {
            create: {
              userId: systemUser.id,
              role: "OWNER",
            },
          },
        },
      });
    }

    // 3. Create Dummy Opportunities
    const opportunitiesData = [
      {
        title: "Frontend Lead for EchoVault",
        description: "Looking for a React wizard to help us build the most beautiful decentralized storage UI ever.",
        type: "TEAM_UP",
      },
      {
        title: "SDC Hackathon 2026 Team Openings",
        description: "We are forming a team of 4 for the upcoming hackathon. Need 1 Backend (Go/Rust) and 1 UI/UX designer.",
        type: "HACKATHON",
      },
      {
        title: "Junior Data Scientist (Internship)",
        description: "BuildSpace Partners are looking for interns to work on GreenTech datasets. 3-month remote role.",
        type: "HIRING",
      },
      {
        title: "Rust Core Developer",
        description: "Helping an open-source project rewrite their networking stack in Rust. High impact, great for portfolio.",
        type: "TEAM_UP",
      },
    ];

    for (const opp of opportunitiesData) {
      await prisma.opportunity.create({
        data: {
          ...opp,
          authorId: systemUser.id,
        },
      });
    }

    // 4. Create some "Active Members" for the community view
    const membersData = [
      {
        clerkId: "dummy_1",
        email: "alice@example.com",
        name: "Alice Chen",
        bio: "ML Researcher and Coffee Enthusiast.",
        skills: ["PyTorch", "Rust", "C++"],
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      },
      {
        clerkId: "dummy_2",
        email: "bob@example.com",
        name: "Bob Dev",
        bio: "Building distributed systems by day, indie hacking by night.",
        skills: ["Go", "Kubernetes", "Redis"],
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
      },
      {
        clerkId: "dummy_3",
        email: "charlie@example.com",
        name: "Charlie S.",
        bio: "Product Designer focused on accessibility and motion.",
        skills: ["Figma", "Three.js", "React"],
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
      },
    ];

    for (const member of membersData) {
      await prisma.user.upsert({
        where: { clerkId: member.clerkId },
        update: {},
        create: {
          ...member,
          interests: ["UI", "Open Source"],
        },
      });
    }

    return { success: true, message: "BuildSpace Seeded successfully!" };
  } catch (error) {
    console.error("Seeding error:", error);
    return { success: false, error: String(error) };
  }
}
