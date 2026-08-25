import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { getTotalApplications } from "../api/applications"
import { useUserContext } from "../contexts/userContext";
import TotalApplications from "../components/TotalApplications";
import RecentApplications from "../components/RecentApplications";

export interface TotalApplicationsData {
  total: number;
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
}

export interface RecentApplicationsData {
  id: number;
  company_name: string;
  job_title: string;
  status: Status;
  application_date: string;
}

export const Route = createFileRoute("/")({
  component: Home
})

function Home () {
  const { user } = useUserContext();

  const { 
    data: total, isLoading: isTotalLoading, isError: isTotalError, error: totalError 
  } = useQuery<TotalApplicationsData>({
    queryKey: ["totalApplications", user?.id],
    queryFn: () => getTotalApplications(user === null)
  })

  const { 
    data: recent, isLoading: isRecentLoading, isError: isRecentError, error: recentError 
  } = useQuery<RecentApplicationsData[]>({
    queryKey: ["recentApplications", user?.id],
    queryFn: () => getRecentApplications(user === null)
  })

  if (isTotalLoading || isRecentLoading) {
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

  return (
    <div className="flex flex-col gap-8 bg-gray-50 md:p-4">
      {
        !user && (
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
            <span className="font-medium">Demo Mode</span>. 
            You're viewing sample application data. 
            {" "}
            <Link to="/login" className="font-semibold underline hover:no-underline">
              Sign in
            </Link>
            {" "}
            or
            {" "}
            <Link
              to="/register"
              className="font-semibold underline hover:no-underline"
            >
              create an account
            </Link>
            {" "}
            to manage your own applications.
          </div>
        )
      }

      <TotalApplications
        isError={isTotalError}
        error={totalError}
        total={total}
      />

      <RecentApplications 
        isError={isRecentError}
        error={recentError}
        recent={recent}
      />
    </div>
  )
}