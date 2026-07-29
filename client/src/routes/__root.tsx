import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Sidebar from "../components/Sidebar";
import { UserContext, type User } from "../contexts/userContext";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export const Route = createRootRoute({ 
  component: RootLayout,
  loader: async () => {
    try {
      const refreshRes = await fetch(`${import.meta.env.VITE_API_URL}/api/users/refresh-token`, 
        { 
          method: "POST", 
          credentials: "include" 
        }
      );

      if (!refreshRes.ok) {
        return null;
      }

      const userRes = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
        credentials: "include",
      });

      return userRes.ok ? userRes.json() : null;
    } catch (err) {
      return null;
    }
  }
})

function RootLayout() {
  const loaderUser = Route.useLoaderData();
  const [user, setUser] = useState<User | null>(loaderUser);

  useEffect(() => {
    setUser(loaderUser);
  }, [loaderUser]);

  return (
    <>
      <div className="md:flex">
        <UserContext.Provider value={{ user, setUser }}>
          <div className="hidden md:flex">
            <Sidebar />
          </div>

          <div className="md:hidden">
            <Navbar />
          </div>

          <main className="flex-1 min-w-0 p-5">
            <Outlet />
          </main>
        </UserContext.Provider>
      </div>

      <TanStackRouterDevtools />
    </>
  )
}