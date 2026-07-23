import { useQuery } from "@tanstack/react-query"
import { getApplications } from "../api/applications"
import Card from "./Card";
import type { Status } from "../types/applications";
import { formatStatus } from "../utils/applications";

interface Applications {
  id: number;
  company_name: string;
  job_title: string;
  status: Status;
  application_date: string;
}

const Kanban = () => {
  const statuses: Status[] = ["applied", "interview", "offer", "rejected"];

  const { data: applications, isLoading, isError, error } = useQuery<Applications[]>({
    queryKey: ["applications"],
    queryFn: getApplications
  })

  const statusColours = {
    applied: 'bg-sky-200 text-sky-800',
    interview: 'bg-orange-200 text-orange-800',
    offer: 'bg-green-200 text-green-800',
    rejected: 'bg-red-200 text-red-800',
  }

  if (isLoading) {
    return (
      <div className="mt-4 flex justify-center py-12">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-sky-600"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-800"
        role="alert"
      >
        <p className="text-sm mt-1">
          {error.message || "Something went wrong. Please try again."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-6 mt-4">
      {
        statuses?.map(status => (
          <div className="w-80 bg-gray-100 rounded-2xl flex flex-col gap-3">
            <h2 className={`font-semibold text-lg text-gray-700 rounded-xl px-3 py-4 w-full ${statusColours[status]}`}>
              {formatStatus(status)}
            </h2>

            <div className="p-4">
              {
                applications
                ?.filter(application => application.status === status)
                .map(application => (
                  <Card
                    id={application.id}
                    company={application.company_name}
                    role={application.job_title}
                    status={application.status}
                    dateApplied={application.application_date}
                  />
                ))
              }
            </div> 
          </div>
        ))
      }
    </div>
  )
}

export default Kanban