"use client";

import { useState, useEffect } from "react";
import {
  createJob,
  fetchJobs,
  updateJob,
  deleteJob,
} from "@/services/jobsService";
import type { Job } from "@/types/jobs.types";

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // FETCH ALL JOBS
  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await fetchJobs();
      setJobs(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  // CREATE JOB
  const addJob = async (jobData: Partial<Job>) => {
    try {
      setLoading(true);
      const newJob = await createJob(jobData);
      setJobs((prev) => [newJob, ...prev]); // optimistic update
      return newJob;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // UPDATE JOB
  const editJob = async (jobId: string, jobData: Partial<Job>) => {
    try {
      setLoading(true);
      const updated = await updateJob(jobId, jobData);
      setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? updated : j))
      );
      return updated;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // DELETE JOB
  const removeJob = async (jobId: string) => {
    try {
      setLoading(true);
      await deleteJob(jobId);
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete job");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    jobs,
    loading,
    error,
    loadJobs,
    addJob,
    editJob,
    removeJob,
  };
};
