import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';
import { prisma } from '../prisma';
import { AuthRequest } from '../types/auth';

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: 'Invalid token' });

  // Check user exists
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) return res.status(401).json({ error: 'User not found' });

  req.userId = payload.userId;
  next();
};
