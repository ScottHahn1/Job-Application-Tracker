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
        isLoading={isLoading}
        isError={isError}
        error={error}
        total={total}
      />

      <RecentApplications />
    </div>
  )
}