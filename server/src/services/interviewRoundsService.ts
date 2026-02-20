import { prisma } from "../prisma";

export const interviewRoundsService = {
  addRound: async (userId: string, data: any) => {
    const { jobId, roundType, roundDate, notes, result } = data;

    const job = await prisma.job.findFirst({ where: { id: jobId, userId } });
    if (!job) throw { status: 404, code: "JOB_NOT_FOUND", message: "Job not found" };

    const round = await prisma.interviewRound.create({
      data: {
        jobId,
        roundType,
        roundDate: roundDate ? new Date(roundDate) : null,
        notes,
        result,
      },
    });

    return round;
  },

  updateRound: async (userId: string, roundId: string, data: any) => {
    const round = await prisma.interviewRound.findUnique({ where: { id: roundId } });
    if (!round) throw { status: 404, code: "ROUND_NOT_FOUND", message: "Round not found" };

    const job = await prisma.job.findFirst({ where: { id: round.jobId, userId } });
    if (!job) throw { status: 403, code: "FORBIDDEN", message: "Forbidden" };

    return prisma.interviewRound.update({ where: { id: round.id }, data });
  },

  deleteRound: async (userId: string, roundId: string) => {
    const round = await prisma.interviewRound.findUnique({ where: { id: roundId } });
    if (!round) throw { status: 404, code: "ROUND_NOT_FOUND", message: "Round not found" };

    const job = await prisma.job.findFirst({ where: { id: round.jobId, userId } });
    if (!job) throw { status: 403, code: "FORBIDDEN", message: "Forbidden" };

    await prisma.interviewRound.delete({ where: { id: round.id } });
    return { id: round.id };
  },
};
