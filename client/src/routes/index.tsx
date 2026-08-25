import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { getRecentApplications, getTotalApplications } from "../api/applications"
import { useUserContext } from "../contexts/userContext";
import TotalApplications from "../components/TotalApplications";
import RecentApplications from "../components/RecentApplications";
import DemoModeBanner from "../components/DemoModeBanner";
import type { Status } from "../types/applications";

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
          <DemoModeBanner />
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