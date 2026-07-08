import { useQuery } from "@tanstack/react-query"
import { getApplications } from "../api/applications"
import Card, { type Status } from "./Card";

interface Applications {
  company_name: string;
  job_title: string;
  status: Status;
  dateApplied: string;
}

const Kanban = () => {
  const statuses = ["applied", "interview", "offer", "rejected"];

  const { data: applications, isLoading, isError } = useQuery<Applications[]>({
    queryKey: ["applications"],
    queryFn: getApplications
  })

  return (
    <div className="flex gap-6 mt-4 ">
      {
        statuses?.map(status => (
          <div className="w-80  bg-gray-100 rounded-2xl p-4 flex flex-col gap-3">
            <h2 className="font-semibold text-lg text-gray-700 px-3">
              {status}
            </h2>

            {
              applications
              ?.filter(application => application.status === status)
              .map(application => (
                <Card
                  company={application.company_name}
                  role={application.job_title}
                  status={application.status}
                  dateApplied={application.dateApplied}
                />
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default Kanban