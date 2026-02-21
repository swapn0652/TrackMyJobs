"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { File } from "lucide-react";
import { useJobMutations } from "@/hooks/useJobsQuery";
import { useUpload } from "@/hooks/useUpload";
import { CreateJobDTO } from "@/types/jobs.types";
import { getErrorMessage } from "@/utils/error";
import { Briefcase, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddJobForm() {
  const { createJob, creating, createError } = useJobMutations();
  const { uploadFile, uploading, uploadError } = useUpload();
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const router = useRouter();

  const { register, handleSubmit, reset, setValue, formState: { errors, isValid } } = useForm<CreateJobDTO>({
    mode: "onChange",
    defaultValues: { resumePath: "" },
  });

  // Handle resume file upload
  const handleFileChange = async (file: globalThis.File) => {
    if (!file) return;

    try {
      const res = await uploadFile(file); 
      setValue("resumePath", res.data.path, { shouldValidate: true, shouldDirty: true });
      setUploadedFileName(file.name);
    } catch (err) {
      console.error(err);
      alert("Resume upload failed. Try again!");
    }
  };

  // Handle form submit
  const onSubmit = async (data: CreateJobDTO) => {
    await createJob({
      ...data,
      jobDescription: data.jobDescription || undefined,
      jobLink: data.jobLink || undefined,
      resumePath:
        data.resumePath && data.resumePath !== ""
          ? data.resumePath
          : undefined,

      minCtc: data.minCtc ? Number(data.minCtc) : undefined,
      maxCtc: data.maxCtc ? Number(data.maxCtc) : undefined,
    });

    reset();
    setUploadedFileName(null);
    router.push("/jobs");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-4 flex items-center justify-center gap-2">
        <Briefcase size={28} /> Add New Job <PlusCircle size={28} />
      </h1>

      {/* Errors */}
      {createError && <p className="text-red-600 text-center font-semibold">{getErrorMessage(createError)}</p>}
      {uploadError && <p className="text-red-600 text-center font-semibold">{getErrorMessage(uploadError)}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-lg sm:text-xl">

        {/* Company Name */}
        <div>
          <label className="block mb-1 font-semibold">Company Name *</label>
          <input
            {...register("companyName", { required: "Company name is required" })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
        </div>

        {/* Job Role */}
        <div>
          <label className="block mb-1 font-semibold">Job Role *</label>
          <input
            {...register("jobRole", { required: "Job role is required" })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.jobRole && <p className="text-red-500 text-sm">{errors.jobRole.message}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-semibold">Location *</label>
          <input
            {...register("location", { required: "Location is required" })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>

        {/* Source */}
        <div>
          <label className="block mb-1 font-semibold">Source *</label>
          <input
            {...register("source", { required: "Source is required" })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.source && <p className="text-red-500 text-sm">{errors.source.message}</p>}
        </div>

        {/* Applied Date */}
        <div>
          <label className="block mb-1 font-semibold">Applied Date *</label>
          <input
            type="date"
            {...register("appliedDate", { required: "Applied date is required" })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {errors.appliedDate && <p className="text-red-500 text-sm">{errors.appliedDate.message}</p>}
        </div>

        {/* Job Description */}
        <div>
          <label className="block mb-1 font-semibold">Job Description</label>
          <textarea
            rows={5}
            {...register("jobDescription")}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* CTC */}
        <div>
          <label className="block mb-1 font-semibold">CTC Range (LPA)</label>

          <div className="flex gap-4">
            <input
              type="number"
              step="0.1"
              placeholder="Min CTC"
              {...register("minCtc")}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              type="number"
              step="0.1"
              placeholder="Max CTC"
              {...register("maxCtc")}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Job Link */}
        <div>
          <label className="block mb-1 font-semibold">Job Link</label>
          <input
            {...register("jobLink")}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block mb-1 font-semibold flex items-center gap-2">
            <File size={20} /> Upload Resume
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {/* hidden input for RHF */}
          <input type="hidden" {...register("resumePath")} />

          {uploading && <p className="text-gray-500 text-sm mt-1">Uploading...</p>}
          {uploadedFileName && <p className="text-gray-600 text-sm mt-1">Uploaded: {uploadedFileName}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || creating} 
          className={`w-full text-xl sm:text-2xl rounded-xl font-semibold sketch-border press-btn 
            p-3 ${!isValid || creating ? "bg-gray-300 cursor-not-allowed pointer-events-none" : "bg-yellow-200 cursor-pointer"}`}
        >
          {creating ? "Adding..." : "Add Job"}
        </button>
      </form>
    </div>
  );
}