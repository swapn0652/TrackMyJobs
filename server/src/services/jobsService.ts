import { Job } from "../../generated/prisma/client";
import { prisma } from "../prisma";

export const jobsService = {
  getAllJobs: async (userId: string) => {
    return prisma.job.findMany({
      where: { userId },
      include: { interviewRounds: true },
      orderBy: { appliedDate: "desc" },
    });
  },

  getJobById: async (userId: string, jobId: string) => {
    return prisma.job.findFirst({
      where: { id: jobId, userId },
      include: { interviewRounds: true },
    });
  },

  createJob: async (userId: string, jobData: Partial<Job>) => {
    return prisma.job.create({
      data: {
        userId,
        companyName: jobData.companyName!,
        jobRole: jobData.jobRole!,
        location: jobData.location!, 
        source: jobData.source!,   
        appliedDate: new Date(jobData.appliedDate!), 
        jobDescription: jobData.jobDescription,
        ctcRange: jobData.ctcRange,
        resumePath: jobData.resumePath,
        jobLink: jobData.jobLink,
      },
    });
  },


  updateJob: async (userId: string, jobId: string, jobData: Partial<Job>) => {
    const job = await prisma.job.findFirst({ where: { id: jobId, userId } });
    if (!job) return null;

    return prisma.job.update({
      where: { id: jobId },
      data: jobData,
    });
  },

  deleteJob: async (userId: string, jobId: string) => {
    const job = await prisma.job.findFirst({ where: { id: jobId, userId } });
    if (!job) return null;

    await prisma.job.delete({ where: { id: jobId } });
    return true;
  },
};
