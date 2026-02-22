"use client";

import { useForm } from "react-hook-form";
import { Job } from "@/types/jobs.types";
import { useJobMutations } from "@/hooks/useJobsQuery";
import { Save, X } from "lucide-react";

export default function JobDetailsEditForm({
  job,
  onCancel,
  onSuccess,
}: {
  job: Job;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const { updateJob, updating } = useJobMutations();

  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      companyName: job.companyName,
      jobRole: job.jobRole,
      location: job.location,
      source: job.source,
      appliedDate: job.appliedDate.split("T")[0],
      minCtc: job.minCtc || "",
      maxCtc: job.maxCtc || "",
      jobLink: job.jobLink || "",
      jobDescription: job.jobDescription || "",
      status: job.status,
    },
  });

  const onSubmit = async (data: any) => {
    await updateJob({
      id: job.id,
      data: {
        ...data,
        minCtc: data.minCtc ? Number(data.minCtc) : null,
        maxCtc: data.maxCtc ? Number(data.maxCtc) : null,
      },
    });

    onSuccess();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 w-full">
      <h2 className="text-2xl font-bold mb-6">Edit Job Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">Company Name</label>
            <input {...register("companyName")} className="input-field" />
          </div>

          <div>
            <label className="block mb-2 font-medium">Job Role</label>
            <input {...register("jobRole")} className="input-field" />
          </div>

          <div>
            <label className="block mb-2 font-medium">Location</label>
            <input {...register("location")} className="input-field" />
          </div>

          <div>
            <label className="block mb-2 font-medium">Source</label>
            <input {...register("source")} className="input-field" />
          </div>

          <div>
            <label className="block mb-2 font-medium">Applied Date</label>
            <input type="date" {...register("appliedDate")} className="input-field" />
          </div>

          <div>
            <label className="block mb-2 font-medium">Status</label>
            <select {...register("status")} className="input-field">
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEWING">Interviewing</option>
              <option value="OFFERED">Offered</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

        </div>

        {/* CTC */}
        <div>
          <label className="block mb-2 font-medium">CTC Range (LPA)</label>
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Min" {...register("minCtc")} className="input-field" />
            <input type="number" placeholder="Max" {...register("maxCtc")} className="input-field" />
          </div>
        </div>

        {/* Link */}
        <div>
          <label className="block mb-2 font-medium">Job Link</label>
          <input {...register("jobLink")} className="input-field" />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Job Description</label>
          <textarea rows={4} {...register("jobDescription")} className="input-field" />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={updating}
            className="flex-1 p-3 rounded-xl font-semibold sketch-border bg-yellow-200 press-btn"
          >
            <Save size={16} className="inline mr-2" />
            {updating ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="flex-1 p-3 rounded-xl font-semibold sketch-border bg-red-200 press-btn"
          >
            <X size={16} className="inline mr-2" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}