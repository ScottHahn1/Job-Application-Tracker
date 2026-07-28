import { useQuery } from "@tanstack/react-query"
import { getApplications } from "../api/applications"
import Card from "./Card";
import type { Status } from "../types/applications";
import { formatStatus } from "../utils/applications";
import { useUserContext } from "../contexts/userContext";

interface Applications {
  id: number;
  company_name: string;
  job_title: string;
  status: Status;
  application_date: string;
}

const Kanban = () => {
  const statuses: Status[] = ["applied", "interview", "offer", "rejected"];

  const { user } = useUserContext();

  const { data: applications, isLoading, isError, error } = useQuery<Applications[]>({
    queryKey: ["applications"],
    queryFn: () => getApplications(user === null)
  })

  const statusColours = {
    applied: "bg-sky-200 text-sky-800",
    interview: "bg-orange-200 text-orange-800",
    offer: "bg-green-200 text-green-800",
    rejected: "bg-red-200 text-red-800",
  }

  const columnColours = {
    applied: "bg-sky-50",
    interview: "bg-orange-50",
    offer: "bg-green-50",
    rejected: "bg-red-50",
  }

   const emptyMessages = {
    applied: "No applications yet",
    interview: "No interviews scheduled",
    offer: "No offers yet",
    rejected: "No rejected applications",
  };

  if (isLoading) {
    return (
      <div className="mt-4 flex justify-center py-12">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-sky-600"
          role="status"
          aria-label="Loading applications"
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
    <div className="mt-4 md:flex md:gap-2">
      {
        statuses?.map(status => (
          <div key={status} className={`bg-gray-100 rounded-2xl ${columnColours[status]} md:w-80`}>
            <h2 className={`font-semibold text-lg text-gray-700 rounded-xl px-3 py-4 w-full ${statusColours[status]}`}>
              {formatStatus(status)}
            </h2>

            <div className="p-4 flex flex-col gap-4">
              { 
                !applications?.length ? (
                  <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-gray-300 text-sm text-gray-400">
                    {emptyMessages[status]}
                  </div>
                )
                :
                applications
                .filter(application => application.status === status)
                .map(application => (
                  <Card
                    key={application.id}
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