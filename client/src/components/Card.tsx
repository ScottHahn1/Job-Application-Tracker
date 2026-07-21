import type { Status } from "../types/applications";
import { formatStatus } from "../utils/applications";
import DeleteApplication from "./DeleteApplication";

interface CardProps {
  id: number
  company: string;
  role: string;
  status: Status;
  dateApplied: string;
}

const Card = ({ id, company, role, status, dateApplied }: CardProps) => {
  const statusColours = {
    applied: 'bg-sky-100 text-sky-600',
    interview: 'bg-orange-100 text-orange-600',
    offer: 'bg-green-100 text-green-600',
    rejected: 'bg-red-100 text-red-600',
  }

  const statusColour = statusColours[status];

  return (
    <div className="p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-900">
          {role}
        </h3>

        <span className={`text-xs px-2 rounded-full ${statusColour}`}>
          {formatStatus(status)}
        </span>
      </div>

      <p className="text-sm text-gray-500 mt-2">{company}</p>
      <p className="text-xs text-gray-400 mt-1">{dateApplied.toString()}</p>

      <DeleteApplication id={id} />
    </div>
  )
}

export default Card