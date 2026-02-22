import { axiosClient } from "@/utils/axiosClient";

export const syncInterviewRounds = async (jobId: string, rounds: any[]) => {
  const res = await axiosClient.put(`/api/interview-rounds/job/${jobId}`, {
    rounds,
  });
  return res.data.data;
};