"use server"

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createOpportunity(data: {
  title: string;
  description: string;
  type: "TEAM_UP" | "HIRING" | "HACKATHON";
}) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found in DB");

  const opportunity = await prisma.opportunity.create({
    data: {
      ...data,
      authorId: user.id
    }
  });

  revalidatePath("/opportunities");
  return opportunity;
}

export async function getOpportunities() {
  return await prisma.opportunity.findMany({
    include: {
      author: true
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function getOpportunityDetail(id: string) {
  return await prisma.opportunity.findUnique({
    where: { id },
    include: {
      author: true
    }
  });
}

export async function deleteOpportunity(id: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found in DB");

  const opp = await prisma.opportunity.findUnique({ where: { id } });
  if (!opp || opp.authorId !== user.id) throw new Error("Not authorized to delete");

  await prisma.opportunity.delete({ where: { id } });
  revalidatePath("/opportunities");
}
