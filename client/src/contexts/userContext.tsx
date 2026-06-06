import { createContext, useContext, type Dispatch, type SetStateAction } from "react";

export interface User {
  email: string;
  id: number;
}

interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used with a UserContext");
  }

  return context;
}