import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">ATS Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-yellow-400 transition">Dashboard</Link>
        <Link to="/upload" className="hover:text-yellow-400 transition">Upload Resume</Link>
        <Link to="/resumes" className="hover:text-yellow-400 transition">View Resumes</Link>

        {/* ✅ Added Job Feature Link */}
        <Link to="/jobs" className="hover:text-yellow-400 transition">Jobs</Link>
        <Link to="/applications" className="hover:text-yellow-400 transition">Applications</Link>

      </nav>
    </div>
  );
}

export default Sidebar;
