"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchJobs,
  createJob,
  updateJob,
  deleteJob,
  fetchJob,
} from "@/services/jobs.service";
import type { Job } from "@/types/jobs.types";

const JOBS_QUERY_KEY = ["jobs"];

export const useJobQuery = (id: string) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: ({ queryKey }) => {
      const [, jobId] = queryKey; // ["job", id]
      return fetchJob(jobId as string);
    },
    enabled: !!id,
  });
};

// FETCH
export const useJobsQuery = () => {
  return useQuery<Job[]>({
    queryKey: JOBS_QUERY_KEY,
    queryFn: fetchJobs,
  });
};

export const useJobMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOBS_QUERY_KEY });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Job> }) =>
      updateJob(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOBS_QUERY_KEY });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOBS_QUERY_KEY });
    },
  });

  return {
    createJob: createMutation.mutateAsync,
    updateJob: updateMutation.mutateAsync,
    deleteJob: deleteMutation.mutateAsync,

    creating: createMutation.isPending,
    updating: updateMutation.isPending,
    deleting: deleteMutation.isPending,

    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
};

