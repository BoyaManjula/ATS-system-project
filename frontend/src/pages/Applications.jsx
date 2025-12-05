import { Link } from "react-router-dom";

function Applications() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-white mb-6">Applications</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Link
          to="/applications/candidates"
          className="p-6 bg-white/10 backdrop-blur rounded-xl shadow-xl hover:scale-105 transition-transform"
        >
          <h2 className="font-bold text-xl text-white">Candidate Applications</h2>
          <p className="text-white/80 mt-2">View all received candidate applications</p>
        </Link>

        <Link
          to="/applications/shortlisted"
          className="p-6 bg-white/10 backdrop-blur rounded-xl shadow-xl hover:scale-105 transition-transform"
        >
          <h2 className="font-bold text-xl text-white">Shortlisted</h2>
          <p className="text-white/80 mt-2">View shortlisted candidates</p>
        </Link>

        <Link
          to="/applications/rejected"
          className="p-6 bg-white/10 backdrop-blur rounded-xl shadow-xl hover:scale-105 transition-transform"
        >
          <h2 className="font-bold text-xl text-white">Rejected</h2>
          <p className="text-white/80 mt-2">View rejected applications</p>
        </Link>

      </div>
    </div>
  );
}

export default Applications;
