import { Link } from "@tanstack/react-router"

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-blue-900 text-white p-4">
      <div className="text-xl font-bold mb-5">Job Tracker</div>

      <nav className="space-y-2">
        <Link
          to="/" 
          activeProps={{
            className: "bg-blue-700"
          }}
          className="block p-2 rounded cursor-pointer hover:bg-blue-800"
        >
          Dashboard
        </Link>

        <Link 
          to="/applications"
          activeProps={{
            className: "bg-blue-700"
          }}
          className="block p-2 rounded cursor-pointer hover:bg-blue-800"
        >
          Applications
        </Link>

         <Link 
          to="/register"
          activeProps={{
            className: "bg-blue-700"
          }}
          className="block p-2 rounded cursor-pointer hover:bg-blue-800"
        >
          Register
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar