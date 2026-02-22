"use client";

import { useJobQuery } from "@/hooks/useJobsQuery";
import Loader from "@/components/ui/Loader";
import JobDetailsCard from "@/components/jobs/JobDetailsCard";
import InterviewDetailsCard from "@/components/interviewRounds/InterviewDetailsCard";

export default function JobDetailsClient({ id }: { id: string }) {
  const { data: job, isLoading, isError } = useJobQuery(id);

  if (isLoading) return <Loader />;

  if (isError || !job)
    return (
      <p className="text-center mt-20 text-red-500 text-xl">
        Failed to load job details
      </p>
    );

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <JobDetailsCard job={job} />
      <InterviewDetailsCard job={job}/>
    </div>
  );
}
