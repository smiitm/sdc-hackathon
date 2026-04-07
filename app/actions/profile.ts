"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getProfile() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  return await prisma.user.findUnique({
    where: { clerkId },
    include: {
      projects: true,
      memberships: {
        include: { project: true }
      }
    }
  });
}

export async function updateProfile(data: {
  name?: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
}) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.update({
    where: { clerkId },
    data
  });

  revalidatePath("/profile");
  return user;
}

export async function getAllUsers() {
  return await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function getUserProfile(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      projects: true,
      memberships: {
        include: { project: true }
      }
    }
  });
}

export async function connectWithUser(targetUserId: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const me = await prisma.user.findUnique({ where: { clerkId } });
  if (!me) throw new Error("User not found");

  // In a real app we'd have a Follow/Connection model.
  // For now, we'll just revalidate the profile to show it worked.
  console.log(`User ${me.id} connected with ${targetUserId}`);
  
  revalidatePath(`/profile/${targetUserId}`);
  return { success: true };
}
   
