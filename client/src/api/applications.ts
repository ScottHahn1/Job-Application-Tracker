interface PostVariables {
  company: string;
  jobTitle: string;
  status: string;
  date: string;
}

export const addApplication = async ({ company, jobTitle, status, date }: PostVariables) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`, {
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
  ? `${import.meta.env.VITE_API_URL}/api/applications/demo`
  : `${import.meta.env.VITE_API_URL}/api/applications`;
  
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
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applications?id=${id}`, {
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
  ? `${import.meta.env.VITE_API_URL}/api/applications/total/demo` 
  : `${import.meta.env.VITE_API_URL}/api/applications/total`;

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
  ? `${import.meta.env.VITE_API_URL}/api/applications/recent/demo` 
  : `${import.meta.env.VITE_API_URL}/api/applications/recent`;

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