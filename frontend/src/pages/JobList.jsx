// frontend/src/pages/JobList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      setJobs(jobs.filter(job => job._id !== id));
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Jobs</h1>
        <Link to="/jobs/create" className="bg-yellow-400 text-black px-4 py-2 rounded">Create Job</Link>
      </div>

      <div className="space-y-3">
        {jobs.map(job => (
          <div key={job._id} className="p-4 bg-white/10 rounded">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-sm text-white/80">{job.description}</p>
                <p className="text-sm mt-2 text-white/70">Skills: {job.requiredSkills.join(", ")}</p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <Link to={`/jobs/${job._id}`} className="text-yellow-400 hover:underline">View Ranking</Link>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobList;
