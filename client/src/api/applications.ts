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

  if (response.status === 401) {
    throw new Error(
      "Demo mode: Sign in to add applications."
    );
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const getApplications = async (isDemo: boolean) => {
  const url = isDemo 
  ? "http://localhost:8888/api/applications/demo" 
  : "http://localhost:8888/api/applications";
  
  const response = await fetch(url, {
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

  if (response.status === 401) {
    throw new Error(
      "Demo mode: Sign in to delete applications."
    );
  }

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Something went wrong");
  }
}

export const getTotalApplications = async (isDemo: boolean) => {
  const url = isDemo 
  ? "http://localhost:8888/api/applications/total/demo" 
  : "http://localhost:8888/api/applications/total";

  const response = await fetch(url, {
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const getRecentApplications = async (isDemo: boolean) => {
  const url = isDemo 
  ? "http://localhost:8888/api/applications/recent/demo" 
  : "http://localhost:8888/api/applications/recent";

  const response = await fetch(url, {
    method: "GET",
    credentials: "include"
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}