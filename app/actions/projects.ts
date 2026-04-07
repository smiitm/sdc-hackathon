"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createProject(data: {
  title: string;
  description: string;
  techStack: string[];
}) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found in DB");

  const project = await prisma.project.create({
    data: {
      ...data,
      ownerId: user.id,
      members: {
        create: {
          userId: user.id,
          role: "OWNER"
        }
      }
    }
  });

  revalidatePath("/projects");
  return project;
}

export async function joinProject(projectId: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found in DB");

  const membership = await prisma.projectMember.create({
    data: {
      projectId,
      userId: user.id,
      role: "COLLABORATOR"
    }
  });

  revalidatePath(`/projects/${projectId}`);
  return membership;
}

export async function getProjects() {
  return await prisma.project.findMany({
    include: {
      owner: true,
      members: {
        include: { user: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function getProjectDetail(id: string) {
  return await prisma.project.findUnique({
    where: { id },
    include: {
      owner: true,
      members: {
        include: { user: true }
      }
    }
  });
}
