import { createFileRoute } from '@tanstack/react-router'
import Kanban from '../components/Kanban'
import { useEffect, useState } from 'react';
import ApplicationForm from '../components/ApplicationForm';
import { useUserContext } from '../contexts/userContext';
import DemoModeBanner from '../components/DemoModeBanner';

export const Route = createFileRoute("/applications")({
  component: Applications,
})

function Applications() {
  const [showForm, setShowForm] = useState(false);
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [status, setStatus] = useState("Applied");
  const [date, setDate] = useState("");
  const [applicationAdded, setApplicationAdded] = useState(false);

  const { user } = useUserContext();

  useEffect(() => {
    if (!applicationAdded) return;

    const timer = setTimeout(() => {
      setApplicationAdded(false);
    }, 3000)
    
    return () => clearTimeout(timer);
  }, [applicationAdded])

  return (
    <div className="p-2 flex flex-col">
      {
        !user && (
          <DemoModeBanner />
        )
      }
      
      <div className="flex justify-center md:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:gap-0 md:justify-between md:w-full">
          <h1 className="text-2xl font-semibold">Job Applications</h1>

          {
            !showForm && (
              <button
                className="py-2 bg-orange-500 hover:bg-orange-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400 text-white rounded-md md:px-4 md:font-semibold"
                onClick={() => setShowForm(true)}
              >
                Add Application
              </button>
            )
          }
        </div>
      </div>

      {
        applicationAdded && (
          <div className="my-4 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-green-800 shadow-sm">
            <p>✅ Application added successfully.</p>
          </div>
        )
      }

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
          setApplicationAdded={setApplicationAdded}
         /> 
      }

      <Kanban />
    </div>
  )
}
