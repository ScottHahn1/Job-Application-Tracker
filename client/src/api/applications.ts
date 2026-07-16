interface PostVariables {
  company: string;
  jobTitle: string;
  status: string;
  date: string;
}

export const addApplication = async ({ company, jobTitle, status, date }: PostVariables) => {
  const response = await fetch("http://localhost:8888/api/applications", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ company, jobTitle, status, date})
  })

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const getApplications = async () => {
  const response = await fetch("http://localhost:8888/api/applications", {
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const deleteApplication = async (id: number) => {
  const response = await fetch(`http://localhost:8888/api/applications?id=${id}`, {
    method: "DELETE",
    credentials: "include"
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Something went wrong");
  }
}