"use client";

import { useRouter } from "next/navigation";
import type { JobCardProps } from "@/types/jobs.types";

export default function JobCard({ job }: JobCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/jobs/job/${job.id}`)}
      className="sketch-border bg-white p-5 cursor-pointer press-btn 
                 hover:-translate-y-1 transition-transform duration-200 space-y-3"
    >
      <div>
        <h2 className="text-2xl font-bold">{job.companyName}</h2>
        <p className="text-lg">{job.jobRole}</p>
        <p className="text-sm text-gray-600">{job.location}</p>
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        {job.source && (
          <span className="bg-yellow-100 px-2 py-1 sketch-border">
            {job.source}
          </span>
        )}

        {(job.minCtc || job.maxCtc) && (
          <span className="bg-green-100 px-2 py-1 sketch-border">
            💰 {job.minCtc ?? "?"} - {job.maxCtc ?? "?"} LPA
          </span>
        )}

        {job.appliedDate && (
          <span className="bg-blue-100 px-2 py-1 sketch-border">
            📅 {new Date(job.appliedDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}