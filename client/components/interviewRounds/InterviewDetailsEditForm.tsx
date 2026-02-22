"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useInterviewRounds } from "@/hooks/useInterviewRounds";
import { Save, X, Plus, Trash } from "lucide-react";
import { Job, RoundResult } from "@/types/jobs.types";

type FormValues = {
  rounds: {
    id?: string;
    roundType: string;
    roundDate: string | null;
    notes?: string | null;
    result: RoundResult;
  }[];
};

type Props = {
  job: Job;
  onCancel: () => void;
  onSuccess: () => void;
};

export default function InterviewDetailsEditForm({
  job,
  onCancel,
  onSuccess,
}: Props) {
  const { mutateAsync, isPending } = useInterviewRounds(job.id);

  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      rounds:
        job.interviewRounds?.map((round) => ({
          id: round.id,
          roundType: round.roundType,
          roundDate: round.roundDate
            ? new Date(round.roundDate).toISOString().split("T")[0]
            : "",
          notes: round.notes ?? "",
          result: round.result,
        })) || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rounds",
  });

  const onSubmit = async (data: FormValues) => {
    await mutateAsync(data.rounds);
    onSuccess();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 w-full">
      <h2 className="text-2xl font-bold mb-6">
        Edit Interview Rounds
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border p-4 rounded-xl space-y-4"
          >
            <input
              placeholder="Round Type"
              {...register(`rounds.${index}.roundType`)}
              className="input-field w-full"
            />

            <input
              type="date"
              {...register(`rounds.${index}.roundDate`)}
              className="input-field w-full"
            />

            <textarea
              placeholder="Notes"
              {...register(`rounds.${index}.notes`)}
              className="input-field w-full"
            />

            <select
              {...register(`rounds.${index}.result`)}
              className="input-field w-full"
            >
              <option value="WAITING">Waiting</option>
              <option value="PASSED">Passed</option>
              <option value="FAILED">Failed</option>
            </select>

            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 flex items-center gap-2"
            >
              <Trash size={16} />
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              roundType: "",
              roundDate: null,
              notes: "",
              result: "WAITING",
            })
          }
          className="flex items-center gap-2 text-blue-600"
        >
          <Plus size={16} />
          Add Round
        </button>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 p-3 rounded-xl bg-yellow-200 sketch-border press-btn flex items-center justify-center gap-2"
          >
            <Save size={16} />
            Save
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="flex-1 p-3 rounded-xl bg-red-200 sketch-border press-btn flex items-center justify-center gap-2"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}