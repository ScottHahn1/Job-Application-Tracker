import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Sidebar from "../components/Sidebar";
import { UserContext, type User } from "../contexts/userContext";
import { useState } from "react";

export const Route = createRootRoute({ 
  component: RootLayout,
  loader: async () => {
    try {
      const refreshRes = await fetch("http://localhost:8888/api/users/refresh-token", 
        { 
          method: "POST", 
          credentials: "include" 
        }
      );

      if (!refreshRes.ok) {
        return null;
      }

      const userRes = await fetch("http://localhost:8888/api/users/me", {
        credentials: "include",
      });

      return userRes.ok ? userRes.json() : null;
    } catch (err) {
      return null;
    }
  }
})

function RootLayout() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 p-5">
          <UserContext.Provider value={{ user, setUser }}>
            <Outlet />
          </UserContext.Provider>
        </main>
      </div>

      <TanStackRouterDevtools />
    </>
  )
}