"use client";

import { TimelineItemProps } from "@/types/jobs.types";

export default function TimelineItem({
  title,
  status,
  date,
  notes,
}: TimelineItemProps) {
  return (
    <div className="border-l-4 border-blue-400 pl-4 space-y-2 pb-4">
      
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <span className="text-sm text-gray-600">{status}</span>
      </div>

      {date && (
        <p className="text-sm text-gray-500">
          {date}
        </p>
      )}

      {notes && (
        <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
          {notes}
        </div>
      )}
    </div>
  );
}