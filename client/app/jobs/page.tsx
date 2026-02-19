"use client";

import { useEffect } from "react";
import { useJobsQuery } from "@/hooks/useJobsQuery";
import JobCard from "@/components/jobs/JobCard";

export default function JobsPage() {
  const { data: jobs = [], isLoading } = useJobsQuery();

  if (isLoading) {
    return (
      <div className="text-center text-2xl mt-10">
        Loading jobs...
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <div className="text-center mt-10 space-y-4">
        <h1 className="text-3xl">No jobs yet 🥲</h1>
        <p>Add your first job from "Add Job" page!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl">My Applications 📂</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
