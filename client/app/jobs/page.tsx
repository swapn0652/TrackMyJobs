"use client";

import { useState, useMemo } from "react";
import { useJobsQuery } from "@/hooks/useJobsQuery";
import { useDebounce } from "@/hooks/useDebounce";
import JobCard from "@/components/jobs/JobCard";
import { PlusCircle, Search, SlidersHorizontal, X } from "lucide-react";
import Loader from "@/components/ui/Loader";
import { useRouter } from "next/navigation";

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const router = useRouter();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Draft state (user edits here)
  const [draftFilters, setDraftFilters] = useState({
    source: "",
    location: "",
    jobRole: "",
    minCtc: "",
    maxCtc: "",
    fromDate: "",
    toDate: "",
  });

  // Applied state (used in API)
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);

  const [sortBy, setSortBy] = useState("appliedDate");
  const [order, setOrder] = useState("desc");

  const filters = useMemo(
    () => ({
      search: debouncedSearch,
      ...appliedFilters,
      sortBy,
      order,
    }),
    [debouncedSearch, appliedFilters, sortBy, order]
  );

  const { data: jobs = [], isLoading } = useJobsQuery(filters);

  const handleDraftChange = (key: string, value: string) => {
    setDraftFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters(draftFilters);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    const empty = {
      source: "",
      location: "",
      jobRole: "",
      minCtc: "",
      maxCtc: "",
      fromDate: "",
      toDate: "",
    };
    setDraftFilters(empty);
    setAppliedFilters(empty);
  };

  return (
    <div className="space-y-6 relative">

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

        {/* Search */}
        <div className="flex items-center gap-2 sketch-border px-3 py-2 bg-white w-full md:w-1/2">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search company, role, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        {/* Right Controls */}
        <div className="flex gap-3 items-center flex-wrap">

          {/* Sort */}
          <select
            value={`${sortBy}-${order}`}
            onChange={(e) => {
              const [field, ord] = e.target.value.split("-");
              setSortBy(field);
              setOrder(ord);
            }}
            className="sketch-border px-3 py-2 bg-white cursor-pointer"
          >
            <option value="appliedDate-desc">Newest Applied</option>
            <option value="appliedDate-asc">Oldest Applied</option>
            <option value="companyName-asc">Company A-Z</option>
            <option value="companyName-desc">Company Z-A</option>
            <option value="minCtc-desc">CTC High → Low</option>
            <option value="minCtc-asc">CTC Low → High</option>
          </select>

          {/* Filters */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-200 sketch-border press-btn"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>

          {/* Add Job */}
          <button
            onClick={() => router.push("/jobs/add-job")}
            className="flex items-center gap-2 px-4 py-2 bg-green-200 sketch-border press-btn font-medium"
          >
            <PlusCircle size={18} />
            Add Job
          </button>

        </div>
      </div>

      {/* Grid / Empty State */}
      {isLoading ? (
        <Loader />
      ) : jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 space-y-6 text-center">

          <div className="text-6xl">📭</div>

          <h2 className="text-2xl font-semibold">
            No jobs found
          </h2>

          <p className="text-gray-500 max-w-md">
            Try adjusting your filters or start by adding a new job.
          </p>

        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {/* ================= FILTER DRAWER ================= */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 flex justify-end">
          <div className="w-full sm:w-[400px] bg-white h-full p-6 space-y-5 shadow-xl">

            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="cursor-pointer"
              >
                <X />
              </button>
            </div>

            {/* Source */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Source</label>
              <input
                type="text"
                value={draftFilters.source}
                onChange={(e) =>
                  handleDraftChange("source", e.target.value)
                }
                className="w-full sketch-border px-3 py-2"
              />
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Location</label>
              <input
                type="text"
                value={draftFilters.location}
                onChange={(e) =>
                  handleDraftChange("location", e.target.value)
                }
                className="w-full sketch-border px-3 py-2"
              />
            </div>

            {/* Job Role */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Job Role</label>
              <input
                type="text"
                value={draftFilters.jobRole}
                onChange={(e) =>
                  handleDraftChange("jobRole", e.target.value)
                }
                className="w-full sketch-border px-3 py-2"
              />
            </div>

            {/* CTC */}
            <div className="space-y-1">
              <label className="text-sm font-medium">CTC Range</label>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={draftFilters.minCtc}
                  onChange={(e) =>
                    handleDraftChange("minCtc", e.target.value)
                  }
                  className="w-1/2 sketch-border px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={draftFilters.maxCtc}
                  onChange={(e) =>
                    handleDraftChange("maxCtc", e.target.value)
                  }
                  className="w-1/2 sketch-border px-3 py-2"
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Applied Date</label>
              <div className="flex gap-3">
                <input
                  type="date"
                  value={draftFilters.fromDate}
                  onChange={(e) =>
                    handleDraftChange("fromDate", e.target.value)
                  }
                  className="w-1/2 sketch-border px-3 py-2"
                />
                <input
                  type="date"
                  value={draftFilters.toDate}
                  onChange={(e) =>
                    handleDraftChange("toDate", e.target.value)
                  }
                  className="w-1/2 sketch-border px-3 py-2"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={clearFilters}
                className="flex-1 bg-red-100 sketch-border press-btn py-2"
              >
                Clear
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 bg-yellow-200 sketch-border press-btn py-2"
              >
                Apply
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}