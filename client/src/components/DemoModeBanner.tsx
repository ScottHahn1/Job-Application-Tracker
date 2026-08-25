import { Link } from "@tanstack/react-router"

const DemoModeBanner = () => {
  return (
    <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
      <span className="font-medium">Demo Mode</span>. 
      You're viewing sample application data. 
      {" "}
      <Link to="/login" className="font-semibold underline hover:no-underline">
        Sign in
      </Link>
      {" "}
      or
      {" "}
      <Link
        to="/register"
        className="font-semibold underline hover:no-underline"
      >
        create an account
      </Link>
      {" "}
      to manage your own applications.
    </div>
  )
}

export default DemoModeBanner