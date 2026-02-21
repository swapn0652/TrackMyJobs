import { Job } from "@/types/jobs.types";
import { axiosClient } from "@/utils/axiosClient";

export const createJob = async (jobData: Partial<Job>) => {
  const res = await axiosClient.post("/api/jobs", jobData);
  return res.data;
};

export const fetchJobs = async (params: Record<string, any>) => {
  const res = await axiosClient.get("/api/jobs", { params });
  return res.data.data;
};

export const fetchJob = async (id: string) => {
  const res = await axiosClient.get(`/api/jobs/${id}`);
  return res.data.data;
}

export const updateJob = async (jobId: string, jobData: Partial<Job>) => {
  const res = await axiosClient.put(`/api/jobs/${jobId}`, jobData);
  return res.data;
};

export const deleteJob = async (jobId: string) => {
  const res = await axiosClient.delete(`/api/jobs/${jobId}`);
  return res.data;
};

