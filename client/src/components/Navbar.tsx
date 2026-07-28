import { Link, useRouter } from "@tanstack/react-router";
import { useUserContext } from "../contexts/userContext";
import { logout } from "./Sidebar";
import { BriefcaseBusiness, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user } = useUserContext();
  const [openMenu, setOpenMenu] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    await router.invalidate();
    router.navigate({ to: "/" })
  }

  return (
    <nav className="bg-blue-900 min-w-screen p-2 text-center text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="h-5 w-5 text-blue-200"  />
          
          <h1 className="text-xl font-semibold">
            CareerPier
          </h1>
        </div>

        <button
          aria-label={openMenu ? "Close menu" : "Open menu"}
          aria-expanded={openMenu}
          aria-controls="mobile-navigation"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {
        openMenu && (
          <div id="mobile-navigation" className="flex flex-col gap-2 p-2 text-lg">
            <Link
              to="/"
              activeProps={{
                className: "bg-blue-700 p-1 w-full rounded-lg"
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/applications"
              activeProps={{
                className: "bg-blue-700 p-1 w-full rounded-lg"
              }}
            >
              Applications
            </Link>
            <Link
              to="/register"
              activeProps={{
                className: "bg-blue-700 p-1 w-full rounded-lg"
              }}
            >
              Register
            </Link>
            {
              !user && (
                <Link
                  to="/login"
                  activeProps={{
                    className: "bg-blue-700 p-1 w-full rounded-lg"
                  }}
                >
                  Login
                </Link>
              )
            }
            {
              user && (
                <div onClick={handleLogout} className="p-1 w-full rounded-lg">
                  Logout
                </div>
              )
            }
          </div>
        )
      }
    </nav>
  )
}

export default Navbar