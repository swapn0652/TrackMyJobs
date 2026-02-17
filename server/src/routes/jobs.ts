import { Router } from 'express';
import { prisma } from '../prisma';
import { authenticate } from '../middleware/auth';
import { AuthRequest } from '../types/auth';

const router = Router();

router.use(authenticate); // all routes below require login

// GET all jobs of logged-in user
router.get('/', async (req: AuthRequest, res) => {
  const jobs = await prisma.job.findMany({
    where: { userId: req.userId },
    include: { interviewRounds: true },
    orderBy: { appliedDate: 'desc' },
  });
  res.json(jobs);
});

// GET single job
router.get('/:id', async (req: AuthRequest, res) => {
  const job = await prisma.job.findFirst({
    where: { id: req.params.id as string, userId: req.userId },
    include: { interviewRounds: true },
  });
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
});

// CREATE new job
router.post('/', async (req: AuthRequest, res) => {
  const {
    companyName,
    jobRole,
    source,
    appliedDate,
    jobDescription,
    ctcRange,
    resumePath,
    coverLetterPath,
    jobLink,
  } = req.body;

  const job = await prisma.job.create({
    data: {
      userId: req.userId!,
      companyName,
      jobRole,
      source,
      appliedDate: appliedDate ? new Date(appliedDate) : null,
      jobDescription,
      ctcRange,
      resumePath,
      coverLetterPath,
      jobLink,
    },
  });

  res.status(201).json(job);
});

// UPDATE job
router.put('/:id', async (req: AuthRequest, res) => {
  const job = await prisma.job.findFirst({ where: { id: req.params.id as string, userId: req.userId } });
  if (!job) return res.status(404).json({ error: 'Job not found' });

  const updatedJob = await prisma.job.update({
    where: { id: req.params.id as string },
    data: req.body,
  });

  res.json(updatedJob);
});

// DELETE job
router.delete('/:id', async (req: AuthRequest, res) => {
  const job = await prisma.job.findFirst({ where: { id: req.params.id as string, userId: req.userId } });
  if (!job) return res.status(404).json({ error: 'Job not found' });

  await prisma.job.delete({ where: { id: req.params.id as string } });
  res.json({ message: 'Job deleted' });
});

export default router;
