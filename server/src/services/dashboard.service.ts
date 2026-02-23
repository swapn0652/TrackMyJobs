import { prisma } from "../prisma";

export const dashboardService = {
  getSummary: async (userId: string) => {
    const [total, offers, rejected, interviewing] = await Promise.all([
      prisma.job.count({ where: { userId } }),
      prisma.job.count({ where: { userId, status: "OFFER" } }),
      prisma.job.count({ where: { userId, status: "REJECTED" } }),
      prisma.job.count({ where: { userId, status: "INTERVIEWING" } }),
    ]);

    const offerRate = total ? Number(((offers / total) * 100).toFixed(1)) : 0;
    const interviewRate = total ? Number(((interviewing / total) * 100).toFixed(1)) : 0;
    const rejectionRate = total ? Number(((rejected / total) * 100).toFixed(1)) : 0;

    return {
      totalApplications: total,
      offers,
      rejected,
      interviewing,
      offerRate,
      interviewRate,
      rejectionRate,
    };
  },

  getBySource: async (userId: string) => {
    const data = await prisma.job.groupBy({
      by: ['source'],
      where: { userId },
      _count: { source: true },
    });
    return data;
  },

  getByStatus: async (userId: string) => {
    const data = await prisma.job.groupBy({
      by: ['status'],
      where: { userId },
      _count: { status: true },
    });
    return data;
  },

  getMonthly: async (userId: string) => {
    const jobs = await prisma.job.findMany({
      where: { userId },
      select: { appliedDate: true },
    });

    const monthlyMap: Record<string, number> = {};

    jobs.forEach((job) => {
      if (!job.appliedDate) return;

      const date = new Date(job.appliedDate);
      const month = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;

      monthlyMap[month] = (monthlyMap[month] || 0) + 1;
    });

    return Object.entries(monthlyMap)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month));
  },

  getFunnel: async (userId: string) => {
    const [applied, interviewing, offer, rejected] = await Promise.all([
      prisma.job.count({ where: { userId, status: 'APPLIED' } }),
      prisma.job.count({ where: { userId, status: 'INTERVIEWING' } }),
      prisma.job.count({ where: { userId, status: 'OFFER' } }),
      prisma.job.count({ where: { userId, status: 'REJECTED' } }),
    ]);

    return [
      { stage: 'Applied', count: applied },
      { stage: 'Interviewing', count: interviewing },
      { stage: 'Offer', count: offer },
      { stage: 'Rejected', count: rejected },
    ];
  },

  getRecentActivity: async (userId: string) => {
    const recentJobs = await prisma.job.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, companyName: true, jobRole: true, createdAt: true },
    });

    const recentRounds = await prisma.interviewRound.findMany({
      where: { job: { userId } },
      orderBy: { roundDate: 'desc' },
      take: 5,
      include: { job: { select: { companyName: true } } },
    });

    return { recentJobs, recentRounds };
  },
};
