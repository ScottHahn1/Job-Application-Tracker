import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Sidebar from "../components/Sidebar";

export const Route = createRootRoute({ 
  component: RootLayout,
  loader: async () => {
    try {
      const res = await fetch("http://localhost:8888/api/users/me", {
        credentials: "include",
      });

      return res.ok ? res.json() : null;
    } catch (err) {
      return null;
    }
  }
})

function RootLayout() {
  return (
    <>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 p-5">
          <Outlet />
        </main>
      </div>

      <TanStackRouterDevtools />
    </>
  )
}