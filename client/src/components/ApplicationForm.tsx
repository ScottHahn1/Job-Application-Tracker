import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type Dispatch, type SetStateAction } from "react";
import { addApplication } from "../api/applications";

interface Props {
  company: string;
  setCompany: Dispatch<SetStateAction<string>>;
  jobTitle: string;
  setJobTitle: Dispatch<SetStateAction<string>>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

const ApplicationForm = ({
  company,
  setCompany,
  jobTitle,
  setJobTitle,
  status,
  setStatus,
  date,
  setDate,
  setShowForm
}: Props) => {
  const queryClient = useQueryClient();
  
  const [applicationAdded, setApplicationAdded] = useState(false);
  
  const { mutate } = useMutation({
    mutationFn: addApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      setApplicationAdded(true);
    },
    onError: (err) => alert(`Mutation error: ${err}`)
  })

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowForm(false);
    mutate({ company, jobTitle, status, date });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 mt-4">
        <label>
          Company Name: 
          <input type="text" onChange={(e) => setCompany(e.target.value)} />
        </label>

        <label>
          Job Title: 
          <input type="text" onChange={(e) => setJobTitle(e.target.value)} />
        </label>

        <label>
          Application Status: 
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>

        <label>
          Date Posted: 
          <input type="date" onChange={(e) => setDate(e.target.value.toString())} />
        </label>

        <button type="submit">Submit</button>
      </div>
    </form>
  )
}

export default ApplicationForm