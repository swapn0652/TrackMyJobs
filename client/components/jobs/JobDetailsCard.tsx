"use client";

import { useState } from "react";
import { Job } from "@/types/jobs.types";
import JobDetailsView from "./JobDetailsView";
import JobDetailsEditForm from "./JobDetailsEditForm";

export default function JobDetailsCard({ job }: { job: Job }) {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <JobDetailsEditForm job={job} onCancel={() => setIsEditing(false)} onSuccess={() => setIsEditing(false)} />
  ) : (
    <JobDetailsView job={job} onEdit={() => setIsEditing(true)} />
  );
}