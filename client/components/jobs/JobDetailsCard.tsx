"use client";

import { Job } from "@/types/jobs.types";
import { formatDate } from "@/utils/date";
import {
  MapPin,
  Calendar,
  DollarSign,
  Link as LinkIcon,
  Activity,
  Pencil,
} from "lucide-react";
import InfoItem from "./InfoItem";

export default function JobDetailsCard({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 w-full relative">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            {job.companyName}
          </h2>
          <p className="text-lg text-gray-600 mt-1">
            {job.jobRole}
          </p>
        </div>

        <button className="press-btn sketch-border px-5 py-2 text-sm flex items-center gap-2 bg-red-200">
          <Pencil size={16} />
          Edit Job
        </button>
      </div>

      {/* INFO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InfoItem icon={<MapPin size={18} />} label="Location" value={job.location} />
        <InfoItem icon={<DollarSign size={18} />} label="CTC" value={job.ctcRange || "Not specified"} />
        <InfoItem icon={<Calendar size={18} />} label="Applied On" value={formatDate(job.appliedDate)} />
        <InfoItem icon={<Activity size={18} />} label="Status" value={job.status} />
        {job.jobLink && (
          <InfoItem icon={<LinkIcon size={18} />} label="Job Link" value={job.jobLink} />
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Job Description
        </h3>

        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {job.jobDescription || "No description provided."}
        </p>
      </div>
    </div>
  );
}
