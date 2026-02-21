import { Job } from "../../generated/prisma/client";
import { prisma } from "../prisma";

export const jobsService = {
  getAllJobs: async (userId: string, filters: any) => {
    const {
      search,
      source,
      location,
      jobRole,
      minCtc,
      maxCtc,
      fromDate,
      toDate,
      sortBy,
      order,
    } = filters;

    const where: any = {
      userId,
      AND: [],
    };

    if (search) {
      where.AND.push({
        OR: [
          { companyName: { contains: search, mode: "insensitive" } },
          { jobRole: { contains: search, mode: "insensitive" } },
          { location: { contains: search, mode: "insensitive" } },
        ],
      });
    }

    if (source) {
      where.AND.push({
        source: { contains: source, mode: "insensitive" },
      });
    }

    if (location) {
      where.AND.push({
        location: { contains: location, mode: "insensitive" },
      });
    }

    if(jobRole) {
      where.AND.push({
        jobRole: {contains: jobRole, mode: "insensitive" },
      });
    }

    if (minCtc) {
      where.AND.push({
        minCtc: { gte: Number(minCtc) },
      });
    }

    if (maxCtc) {
      where.AND.push({
        maxCtc: { lte: Number(maxCtc) },
      });
    }

    if (fromDate || toDate) {
      const dateFilter: any = {};

      if (fromDate) {
        dateFilter.gte = new Date(fromDate);
      }

      if (toDate) {
        dateFilter.lte = new Date(toDate);
      }

      where.AND.push({
        appliedDate: dateFilter,
      });
    }

    if (!where.AND.length) {
      delete where.AND;
    }

    // 🧠 Safe Sorting
    const allowedSortFields = [
      "appliedDate",
      "companyName",
      "minCtc",
      "createdAt",
    ];

    const finalSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : "appliedDate";

    const finalOrder = order === "asc" ? "asc" : "desc";

    return prisma.job.findMany({
      where,
      include: { interviewRounds: true },
      orderBy: {
        [finalSortBy]: finalOrder,
      },
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
        // ctcRange: jobData.ctcRange,
        minCtc: jobData.minCtc,
        maxCtc: jobData.maxCtc,
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
