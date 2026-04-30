import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Sidebar from "../components/Sidebar";

const RootLayout = () => (
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

export const Route = createRootRoute({ component: RootLayout })