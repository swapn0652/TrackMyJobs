"use client";

import { Pencil } from "lucide-react";
import TimelineItem from "./TimelineItem";

export default function InterviewDetailsCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 w-full relative">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Interview Process
        </h2>

        <button className="press-btn sketch-border px-5 py-2 text-sm flex items-center gap-2 bg-blue-200">
          <Pencil size={16} />
          Edit Interview
        </button>
      </div>

      {/* Dummy Timeline */}
      <div className="space-y-6 text-gray-600">
        <TimelineItem title="Application Submitted" status="Completed" />
        <TimelineItem title="HR Screening" status="Pending" />
        <TimelineItem title="Technical Round" status="Pending" />
      </div>
    </div>
  );
}


