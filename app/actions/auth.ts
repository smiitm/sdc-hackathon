"use server"

import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

/**
 * Checks if the current Clerk user exists in the database.
 * If not, it creates them. This effectively replaces the need for a sign-up webhook.
 * Best used in a layout or a high-level wrapper that runs on auth state change.
 */
export async function syncUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const user = await currentUser();
  if (!user) return null;

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) return null;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (existingUser) return existingUser;

  try {
    // Use upsert to handle potential race conditions or existing emails from different authentication methods
    return await prisma.user.upsert({
      where: { email }, // Switch to email as primary identifier to prevent unique constraint errors
      update: {
        clerkId,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Explorer",
        avatarUrl: user.imageUrl,
      },
      create: {
        clerkId,
        email,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Explorer",
        avatarUrl: user.imageUrl,
        skills: [],
        interests: [],
      },
    });
  } catch (error) {
    console.error("Sync user error:", error);
    return null;
  }
}
