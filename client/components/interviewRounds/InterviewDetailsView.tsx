"use client";

import { Pencil } from "lucide-react";
import { formatDate } from "@/utils/date";
import { Job, RoundResult } from "@/types/jobs.types";
import TimelineItem from "../jobs/TimelineItem";

type Props = {
  job: Job;
  onEdit: () => void;
};

const resultLabelMap: Record<RoundResult, string> = {
  WAITING: "Pending",
  PASSED: "Passed",
  FAILED: "Failed",
};

export default function InterviewDetailsView({ job, onEdit }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 w-full">
      <div className="flex justify-between mb-6 items-center">
        <h2 className="text-2xl font-semibold">Interview Process</h2>

        <button
          onClick={onEdit}
          className="press-btn sketch-border px-5 py-2 text-sm bg-blue-200 flex items-center gap-2"
        >
          <Pencil size={16} />
          Edit Interview
        </button>
      </div>

      <div className="space-y-6">
        {job.interviewRounds && job.interviewRounds.length > 0 ? (
          job.interviewRounds.map((round) => (
            <TimelineItem
              key={round.id}
              title={round.roundType}
              status={resultLabelMap[round.result]}
              date={
                round.roundDate
                  ? formatDate(round.roundDate)
                  : "No date"
              }
              notes={round.notes}
            />
          ))
        ) : (
          <p className="text-gray-500">
            No interview rounds added.
          </p>
        )}
      </div>
    </div>
  );
}