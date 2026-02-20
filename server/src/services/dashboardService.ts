import { prisma } from "../prisma";

export const dashboardService = {
  getSummary: async (userId: string) => {
    const total = await prisma.job.count({ where: { userId } });
    const offers = await prisma.job.count({ where: { userId, status: 'OFFER' } });
    const rejected = await prisma.job.count({ where: { userId, status: 'REJECTED' } });
    const interviewing = await prisma.job.count({ where: { userId, status: 'INTERVIEWING' } });

    return { totalApplications: total, offers, rejected, interviewing };
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

    jobs.forEach(job => {
      if (!job.appliedDate) return;
      const month = job.appliedDate.toISOString().slice(0, 7); // YYYY-MM
      monthlyMap[month] = (monthlyMap[month] || 0) + 1;
    });

    return Object.entries(monthlyMap).map(([month, count]) => ({ month, count }));
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
