import type { Status } from "../types/applications";
import type { TotalApplicationsData } from "../routes";

interface TotalApplicationsProps {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  total: TotalApplicationsData | undefined;
}

const statuses: Status[] = ["applied", "interview", "offer", "rejected"];

const TotalApplications = ({ isLoading, isError, error, total }: TotalApplicationsProps) => {
  if (isLoading) {
    return (
      <div className="mt-4 flex justify-center py-12">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-sky-600"
          role="status"
          aria-label="Loading total applications"
        />
      </div>
    )
  }

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
    )
  }
  
  return (
    <>
      <div>
        <h2 className="font-semibold text-lg text-gray-700 rounded-xl py-4 w-full">Total Applications</h2>
      
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {
            statuses.map(status => (
              <div key={status} className="p-5 rounded-xl shadow-sm bg-white border border-gray-200 hover:shadow-md transition">
                <p className="text-sm text-gray-500">
                  {
                    status[0].toUpperCase() + status.slice(1)
                  }
                </p>
                <h2 className="text-3xl font-semibold">
                  { total?.[status] ?? 0 }
                </h2>
              </div>
            ))
          }
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-lg text-gray-700 rounded-xl py-4 w-full">Metrics</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {
            statuses.map(status => (
              <div key={status} className="p-5 rounded-xl shadow-sm bg-white border border-gray-200 hover:shadow-md transition">
                <p className="text-sm text-gray-500">
                  {
                    status[0].toUpperCase() + status.slice(1)
                  }
                </p>
                
                <h2 className="text-3xl font-semibold">
                  {
                    total?.[status] && total.total
                    ? `${Math.round((total[status] / total.total) * 100)}%`
                    : "0%"
                  }
                </h2>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default TotalApplications