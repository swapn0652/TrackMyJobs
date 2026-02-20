"use client";

import { useJobMutations } from "@/hooks/useJobsQuery";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";

type FormValues = {
  companyName: string;
  jobRole: string;
  location: string;
  source: string;
  appliedDate: string;
  jobDescription?: string;
  ctcRange?: string;
  jobLink?: string;
  resumePath?: string;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || "Something went wrong";
  }
  return "Something went wrong";
};

export default function AddJobForm() {
  const { createJob, creating, createError } = useJobMutations();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    await createJob({
      ...data,
      jobDescription: data.jobDescription || undefined,
      ctcRange: data.ctcRange || undefined,
      jobLink: data.jobLink || undefined,
      resumePath: data.resumePath || undefined,
    });

    reset();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6 bg-white border-2 border-black rounded-xl shadow-md">
      <h1 className="text-3xl sm:text-4xl text-center mb-4">Add New Job 📝</h1>

      {createError && (
        <p className="text-red-600 text-center font-semibold">
          {getErrorMessage(createError)}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-lg sm:text-xl">

        {/* Company */}
        <div>
          <label className="block mb-1 font-semibold">Company Name *</label>
          <input
            {...register("companyName", { required: "Company name is required" })}
            className="w-full p-3 sketch-border bg-white"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName.message}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 font-semibold">Job Role *</label>
          <input
            {...register("jobRole", { required: "Job role is required" })}
            className="w-full p-3 sketch-border bg-white"
          />
          {errors.jobRole && (
            <p className="text-red-500 text-sm">{errors.jobRole.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-semibold">Location *</label>
          <input
            {...register("location", { required: "Location is required" })}
            className="w-full p-3 sketch-border bg-white"
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Source */}
        <div>
          <label className="block mb-1 font-semibold">Source *</label>
          <input
            {...register("source", { required: "Source is required" })}
            className="w-full p-3 sketch-border bg-white"
          />
          {errors.source && (
            <p className="text-red-500 text-sm">{errors.source.message}</p>
          )}
        </div>

        {/* Applied Date */}
        <div>
          <label className="block mb-1 font-semibold">Applied Date *</label>
          <input
            type="date"
            {...register("appliedDate", { required: "Applied date is required" })}
            className="w-full p-3 sketch-border bg-white"
          />
          {errors.appliedDate && (
            <p className="text-red-500 text-sm">{errors.appliedDate.message}</p>
          )}
        </div>

        {/* Job Description */}
        <div>
          <label className="block mb-1 font-semibold">Job Description</label>
          <textarea
            rows={5}
            {...register("jobDescription")}
            className="w-full p-3 sketch-border bg-white"
          />
        </div>

        {/* CTC */}
        <div>
          <label className="block mb-1 font-semibold">CTC Range</label>
          <input
            {...register("ctcRange")}
            className="w-full p-3 sketch-border bg-white"
          />
        </div>

        {/* Job Link */}
        <div>
          <label className="block mb-1 font-semibold">Job Link</label>
          <input
            {...register("jobLink")}
            className="w-full p-3 sketch-border bg-white"
          />
        </div>

        {/* Resume Path (temporary) */}
        <div>
          <label className="block mb-1 font-semibold">
            Resume Path (temporary)
          </label>
          <input
            {...register("resumePath")}
            placeholder="/uploads/resume.pdf"
            className="w-full p-3 sketch-border bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={!isValid || creating}
          className={`w-full p-3 sketch-border text-xl sm:text-2xl 
            ${!isValid ? "bg-gray-300 cursor-not-allowed" : "bg-yellow-200 cursor-pointer"}`}
        >
          {creating ? "Adding..." : "Add Job 🚀"}
        </button>
      </form>
    </div>
  );
}
