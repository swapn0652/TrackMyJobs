import { Router } from "express";
import { AuthRequest } from "../types/auth";
import { prisma } from '../prisma';

const router = Router();

router.get('/summary', async (req: AuthRequest, res) => {
  const userId = req.userId!;

  const total = await prisma.job.count({ where: { userId } });
  const offers = await prisma.job.count({ where: { userId, status: 'OFFER' } });
  const rejected = await prisma.job.count({ where: { userId, status: 'REJECTED' } });
  const interviewing = await prisma.job.count({ where: { userId, status: 'INTERVIEWING' } });

  res.json({
    totalApplications: total,
    offers,
    rejected,
    interviewing,
  });
});

router.get('/by-source', async (req: AuthRequest, res) => {
  const userId = req.userId!;

  const data = await prisma.job.groupBy({
    by: ['source'],
    where: { userId },
    _count: { source: true },
  });

  res.json(data);
});

router.get('/by-status', async (req: AuthRequest, res) => {
  const userId = req.userId!;

  const data = await prisma.job.groupBy({
    by: ['status'],
    where: { userId },
    _count: { status: true },
  });

  res.json(data);
});

router.get('/monthly', async (req: AuthRequest, res) => {
  const userId = req.userId!;

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

  const result = Object.entries(monthlyMap).map(([month, count]) => ({
    month,
    count,
  }));

  res.json(result);
});

router.get('/funnel', async (req: AuthRequest, res) => {
  const userId = req.userId!;

  const [applied, interviewing, offer, rejected] = await Promise.all([
    prisma.job.count({ where: { userId, status: 'APPLIED' } }),
    prisma.job.count({ where: { userId, status: 'INTERVIEWING' } }),
    prisma.job.count({ where: { userId, status: 'OFFER' } }),
    prisma.job.count({ where: { userId, status: 'REJECTED' } }),
  ]);

  res.json([
    { stage: 'Applied', count: applied },
    { stage: 'Interviewing', count: interviewing },
    { stage: 'Offer', count: offer },
    { stage: 'Rejected', count: rejected },
  ]);
});

router.get('/recent-activity', async (req: AuthRequest, res) => {
  const userId = req.userId!;

  const jobs = await prisma.job.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      companyName: true,
      jobRole: true,
      createdAt: true,
    },
  });

  const rounds = await prisma.interviewRound.findMany({
    where: {
      job: { userId },
    },
    orderBy: { roundDate: 'desc' },
    take: 5,
    include: {
      job: { select: { companyName: true } },
    },
  });

  res.json({ recentJobs: jobs, recentRounds: rounds });
});


export default router;