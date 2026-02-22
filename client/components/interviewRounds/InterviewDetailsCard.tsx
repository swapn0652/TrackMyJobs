"use client";

import { useState } from "react";
import { Job } from "@/types/jobs.types";
import InterviewDetailsView from "./InterviewDetailsView";
import InterviewDetailsEditForm from "./InterviewDetailsEditForm";

export default function InterviewDetailsCard({ job }: { job: Job }) {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <InterviewDetailsEditForm
      job={job}
      onCancel={() => setIsEditing(false)}
      onSuccess={() => setIsEditing(false)}
    />
  ) : (
    <InterviewDetailsView
      job={job}
      onEdit={() => setIsEditing(true)}
    />
  );
}