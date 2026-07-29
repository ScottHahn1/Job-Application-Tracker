import { Link, useRouter } from "@tanstack/react-router";
import { Briefcase, BriefcaseBusiness, LayoutDashboard, LogIn, LogOut, UserPlus } from "lucide-react";
import { useUserContext } from "../contexts/userContext";

export const logout = async () => {
  await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
    method: "POST",
    credentials: "include"
  })
}

const Sidebar = () => {
  const { user } = useUserContext();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    await router.invalidate();
    router.navigate({ to: "/" })
  }
  
  return (
    <div className="min-h-screen w-64 bg-blue-900 text-white p-4">
      <div className="mb-8 px-2 flex items-center gap-2">
        <BriefcaseBusiness className="h-5 w-5 text-blue-200"  />
        
        <h1 className="font-semibold text-xl">CareerPier</h1>
      </div>

      <nav className="space-y-2">
        <Link
          to="/" 
          activeProps={{
            className: "bg-blue-700"
          }}
          className="block p-2 rounded-lg cursor-pointer hover:bg-blue-800"
        >
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </div>
        </Link>

        <Link 
          to="/applications"
          activeProps={{
            className: "bg-blue-700"
          }}
          className="block p-2 rounded cursor-pointer hover:bg-blue-800"
        >
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            <span>Applications</span>
          </div>
        </Link>

        <Link 
          to="/register"
          activeProps={{
            className: "bg-blue-700"
          }}
          className="block p-2 rounded-lg cursor-pointer hover:bg-blue-800"
        >
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            <span>Register</span>
          </div>
        </Link>

        {
          !user && (
            <Link 
              to="/login"
              activeProps={{
                className: "bg-blue-700"
              }}
              className="block p-2 rounded-lg cursor-pointer hover:bg-blue-800"
            >
              <div className="flex items-center gap-2">
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </div>
            </Link>
          )
        }

        {
          user && (
            <div 
              className="block p-2 rounded-lg cursor-pointer hover:bg-blue-800" 
              onClick={handleLogout}
            >
              <div className="flex items-center gap-2">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </div>
            </div>
          )
        }
      </nav>
    </div>
  )
}

export default Sidebar