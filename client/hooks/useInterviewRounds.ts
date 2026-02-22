import { syncInterviewRounds } from "@/services/interviewRounds.service";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useInterviewRounds = (jobId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rounds: any[]) =>
      syncInterviewRounds(jobId, rounds),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["job", jobId],
      });
    },
  });
};