import { createFileRoute } from '@tanstack/react-router'
import Kanban from '../components/Kanban'
import { useState } from 'react';
import ApplicationForm from '../components/ApplicationForm';

export const Route = createFileRoute("/applications")({
  component: Applications,
})

function Applications() {
  const [showForm, setShowForm] = useState(false);
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="p-2">
      <button 
        className="py-2 px-4 bg-orange-500 hover:bg-orange-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 text-white rounded-md font-semibold"
        onClick={() => setShowForm(true)}
      >
        Add Job
      </button>

      { showForm && 
        <ApplicationForm
          company={company}
          setCompany={setCompany}
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          status={status}
          setStatus={setStatus}
          date={date}
          setDate={setDate}
          setShowForm={setShowForm}
         /> 
      }

      <Kanban />
    </div>
  )
}
