import Sidebar from "./components/Sidebar"
import Applications from "./pages/Applications"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 min-w-0 p-5">
        <Dashboard />
        <Applications />
      </main>
    </div>
  )
}

export default App
