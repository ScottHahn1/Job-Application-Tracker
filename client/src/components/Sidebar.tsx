
const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-blue-900 text-white p-4">
      <div className="text-xl font-bold mb-5">Job Tracker</div>

      <nav className="space-y-2">
        <div className="p-2 rounded cursor-pointer hover:bg-blue-800">
          Dashboard
        </div>

        <div className="p-2 rounded cursor-pointer hover:bg-blue-800">
          Applications
        </div>
      </nav>
    </div>
  )
}

export default Sidebar