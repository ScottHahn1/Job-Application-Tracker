import DashboardCard from "./DashboardCard";
import { Link } from "@tanstack/react-router";
import type { RecentApplicationsData } from "../routes";

interface RecentApplicationsProps {
  isError: boolean;
  error: Error | null;
  recent: RecentApplicationsData[] | undefined;
}

const RecentApplications = ({ recent, isError, error }: RecentApplicationsProps) => {
  if (isError) {
    return (
      <div
        className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-800"
        role="alert"
      >
        <p className="text-sm mt-1">
          {error?.message || "Something went wrong. Please try again."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-semibold text-lg text-gray-700 rounded-xl py-4 w-full">Recent Applications</h2>
      
      <div className="flex flex-col gap-4 md:flex-row">
        {
          recent?.length ?
          recent.map(application => (
            <DashboardCard
              key={application.id}
              id={application.id}
              company={application.company_name}
              role={application.job_title}
              status={application.status}
              dateApplied={application.application_date}
            />
          ))
          :
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-700">
              No recent applications
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Start tracking your job applications to see them here.
            </p>

            <Link
              to="/applications"
              className="mt-4 inline-block rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            >
              Add Application
            </Link>
          </div>
        }
      </div>   
    </div>
  )
}

export default RecentApplications