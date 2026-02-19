"use client";

import { useState } from "react";
import { useJobMutations } from "@/hooks/useJobsQuery";
import { AxiosError } from "axios";

const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || "Something went wrong";
  }
  return "Something went wrong";
};

export default function AddJobForm() {
  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [source, setSource] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [ctcRange, setCtcRange] = useState("");
  const [jobLink, setJobLink] = useState("");

  const { createJob, creating, createError } = useJobMutations();

  const onSubmit = async () => {
    await createJob({
      companyName,
      jobRole,
      source,
      appliedDate,
      jobDescription,
      ctcRange,
      jobLink,
    });

    alert("Job added successfully! 🚀");

    setCompanyName("");
    setJobRole("");
    setSource("");
    setAppliedDate("");
    setJobDescription("");
    setCtcRange("");
    setJobLink("");
  };


  return (
    <div className="max-w-3xl mx-auto space-y-6 p-6 bg-white border-2 border-black rounded-xl shadow-md">
      <h1 className="text-3xl sm:text-4xl text-center mb-4">Add New Job 📝</h1>

      {createError && (
        <p className="text-red-600 text-center font-semibold">
          {getErrorMessage(createError)}
        </p>
      )}


      <div className="space-y-4 text-lg sm:text-xl">
        <div>
          <label className="block mb-1 font-semibold">Company Name</label>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
            className="w-full p-3 sketch-border bg-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Job Role</label>
          <input
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            placeholder="Enter job role"
            className="w-full p-3 sketch-border bg-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Source</label>
          <input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="LinkedIn, Referral, etc."
            className="w-full p-3 sketch-border bg-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Applied Date</label>
          <input
            value={appliedDate}
            onChange={(e) => setAppliedDate(e.target.value)}
            type="date"
            className="w-full p-3 sketch-border bg-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Enter job description"
            rows={6} // bigger textarea
            className="w-full p-3 sketch-border bg-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">CTC Range</label>
          <input
            value={ctcRange}
            onChange={(e) => setCtcRange(e.target.value)}
            placeholder="e.g., 10-12 LPA"
            className="w-full p-3 sketch-border bg-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Job Link</label>
          <input
            value={jobLink}
            onChange={(e) => setJobLink(e.target.value)}
            placeholder="Enter job posting link"
            className="w-full p-3 sketch-border bg-white"
          />
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={creating}
        className="press-btn w-full p-3 sketch-border bg-yellow-200 text-xl sm:text-2xl cursor-pointer"
      >
        {creating ? "Adding..." : "Add Job 🚀"}
      </button>
    </div>
  );
}
