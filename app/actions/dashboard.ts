"use server"

import prisma from "@/lib/prisma";

export async function getDashboardFeed() {
  const [latestProjects, latestOpportunities, recentUsers] = await Promise.all([
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { owner: true }
    }),
    prisma.opportunity.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { author: true }
    }),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" }
    })
  ]);

  return {
    latestProjects,
    latestOpportunities,
    recentUsers
  };
}
