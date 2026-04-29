import { createFileRoute } from '@tanstack/react-router'
import Kanban from '../components/Kanban'

export const Route = createFileRoute("/applications")({
  component: Applications,
})

function Applications() {
   return (
    <div className="p-2">
      <button 
        className="py-2 px-4 bg-orange-500 hover:bg-orange-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 text-white rounded-md font-semibold"
      >
        Add Job
      </button>

      <Kanban />
    </div>
  )
}
