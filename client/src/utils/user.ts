import type { Dispatch, SetStateAction } from "react";

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>, 
  setInput: Dispatch<SetStateAction<string>>,
  setError: Dispatch<SetStateAction<string>>
) => {
  setError("");
  setInput(e.target.value);
}