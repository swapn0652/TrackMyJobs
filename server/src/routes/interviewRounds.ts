import { Router } from 'express';
import { prisma } from '../prisma';
import { authenticate } from '../middleware/auth';
import { AuthRequest } from '../types/auth';

const router = Router();
router.use(authenticate);

// ADD a round
router.post('/', async (req: AuthRequest, res) => {
  const { jobId, roundType, roundDate, notes, result } = req.body;

  // Ensure job belongs to user
  const job = await prisma.job.findFirst({ where: { id: jobId, userId: req.userId } });
  if (!job) return res.status(404).json({ error: 'Job not found' });

  const round = await prisma.interviewRound.create({
    data: { jobId, roundType, roundDate: roundDate ? new Date(roundDate) : null, notes, result },
  });

  res.status(201).json(round);
});

// UPDATE a round
router.put('/:id', async (req: AuthRequest, res) => {
  const round = await prisma.interviewRound.findUnique({ where: { id: req.params.id as string } });
  if (!round) return res.status(404).json({ error: 'Round not found' });

  // Ensure user owns the job
  const job = await prisma.job.findFirst({ where: { id: round.jobId, userId: req.userId } });
  if (!job) return res.status(403).json({ error: 'Forbidden' });

  const updated = await prisma.interviewRound.update({ where: { id: round.id }, data: req.body });
  res.json(updated);
});

// DELETE a round
router.delete('/:id', async (req: AuthRequest, res) => {
  const round = await prisma.interviewRound.findUnique({ where: { id: req.params.id as string } });
  if (!round) return res.status(404).json({ error: 'Round not found' });

  // Ensure user owns the job
  const job = await prisma.job.findFirst({ where: { id: round.jobId, userId: req.userId } });
  if (!job) return res.status(403).json({ error: 'Forbidden' });

  await prisma.interviewRound.delete({ where: { id: round.id } });
  res.json({ message: 'Interview round deleted' });
});

export default router;
