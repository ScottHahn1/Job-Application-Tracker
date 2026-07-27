import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type Dispatch, type SetStateAction } from "react";
import { addApplication } from "../api/applications";
import { Info } from "lucide-react";

interface Props {
  company: string;
  setCompany: Dispatch<SetStateAction<string>>;
  jobTitle: string;
  setJobTitle: Dispatch<SetStateAction<string>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setApplicationAdded: Dispatch<SetStateAction<boolean>>;
}

const ApplicationForm = ({
  company,
  setCompany,
  jobTitle,
  setJobTitle,
  status,
  setStatus,
  date,
  setDate,
  setShowForm,
  setApplicationAdded
}: Props) => {
  const queryClient = useQueryClient();
  
  const { mutate, isError, error } = useMutation({
    mutationFn: addApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      setApplicationAdded(true);
      setShowForm(false);
    }
  })

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ company, jobTitle, status, date });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="company"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Company Name
          </label>

          <input
            id="company"
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="jobTitle"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Job Title
          </label>

          <input
            id="jobTitle"
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Application Status
          </label>

          <select
            id="status"
            value={status}
            className="w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="date"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Date Applied
          </label>

          <input
            id="date"
            type="date"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {isError && (
          <div
            className="flex gap-2 mt-3 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            <Info className="w-5 h-5" /> 
            <span>{error.message}</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="rounded-md border cursor-pointer border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-md cursor-pointer bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default ApplicationForm