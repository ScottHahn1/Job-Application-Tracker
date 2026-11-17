import type { Dispatch, SetStateAction } from "react";

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>, 
  setInput: Dispatch<SetStateAction<string>>,
  setError: Dispatch<SetStateAction<string>>
) => {
  setError("");
  setInput(e.target.value);
}

export const refreshAccessToken = async () => {
  const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/api/users/refresh-token`, 
    { 
      method: "POST", 
      credentials: "include" 
    }
  );

  if (!refreshRes.ok) {
    return null;
  }

  return refreshRes.json();
}

export const getUser = async () => {
  const userRes = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
    credentials: "include",
  });

  if (!userRes.ok) {
    return null;
  }

  return userRes.json();
}