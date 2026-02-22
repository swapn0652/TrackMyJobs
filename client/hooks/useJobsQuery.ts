"use client";

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
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
      const [, jobId] = queryKey;
      return fetchJob(jobId as string);
    },
    enabled: !!id,
  });
};

export const useJobsQuery = (filters: Record<string, any>) => {
  return useQuery<Job[]>({
    queryKey: ["jobs", filters],
    queryFn: () => fetchJobs(filters),
    placeholderData: keepPreviousData
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

    onSuccess: (response, variables) => {
      const updatedJob = response.data;

      queryClient.setQueryData(
        ["job", variables.id],
        updatedJob
      );

      queryClient.invalidateQueries({ queryKey: JOBS_QUERY_KEY });
    }
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
