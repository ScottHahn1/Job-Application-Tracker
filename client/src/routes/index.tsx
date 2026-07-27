import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { getTotalApplications } from "../api/applications"
import { useUserContext } from "../contexts/userContext";
import TotalApplications from "../components/totalApplications";
import RecentApplications from "../components/RecentApplications";

export interface TotalApplicationsData {
  total: number;
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
}

export const Route = createFileRoute("/")({
  component: Home
})

function Home () {
  const { user } = useUserContext();

  const { data: total, isLoading, isError, error } = useQuery<TotalApplicationsData>({
    queryKey: ["totalApplications"],
    queryFn: () => getTotalApplications(user === null)
  })

  return (
    <div className="p-4 flex flex-col gap-8 bg-gray-50">
      <TotalApplications
        isLoading={isLoading}
        isError={isError}
        error={error}
        total={total}
      />

      <RecentApplications />
    </div>
  )
}