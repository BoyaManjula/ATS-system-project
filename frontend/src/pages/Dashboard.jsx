import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [resumeCount, setResumeCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [recentResumes, setRecentResumes] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchRecentResumes();
    fetchRecentJobs();
  }, []);

  const fetchStats = async () => {
    try {
      const resumeRes = await axios.get("http://localhost:5000/api/resume/all");
      const jobRes = await axios.get("http://localhost:5000/api/jobs");

      setResumeCount(resumeRes.data.length);
      setJobCount(jobRes.data.length);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const fetchRecentResumes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/resume/all");
      const recent = res.data
        .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
        .slice(0, 5);
      setRecentResumes(recent);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRecentJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      const recent = res.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentJobs(recent);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 min-h-screen">
      {/* ATS Overview */}
      <div className="mb-8 p-6 rounded-2xl shadow-xl bg-white/10 backdrop-blur-md border border-white/20 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Welcome to the ATS Dashboard
        </h1>
        <p className="text-white/90 text-lg mb-2">
          <strong>Automated Talent Tracking System (ATS)</strong> helps recruiters streamline the hiring process.
        </p>
        <p className="text-white/80 text-lg">
          Upload and manage resumes, post job openings, and quickly identify candidates with the right skills — all in one centralized platform.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Resumes", value: resumeCount },
          { title: "Total Jobs", value: jobCount },
          { title: "Quick Upload", value: "Upload resumes easily" },
          { title: "Quick Job Post", value: "Post jobs quickly" },
        ].map((card, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl shadow-lg bg-gradient-to-r from-blue-500 to-blue-600/70 backdrop-blur-md border border-white/20 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="text-lg">
              {typeof card.value === "number" ? (
                <span className="text-3xl font-bold">{card.value}</span>
              ) : (
                card.value
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Resumes */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-white">Recently Uploaded Resumes</h2>
          {recentResumes.length === 0 ? (
            <p className="text-white/70">No resumes uploaded yet.</p>
          ) : (
            <ul className="space-y-2 text-white/90">
              {recentResumes.map((r) => (
                <li key={r._id} className="flex justify-between items-center hover:bg-white/10 p-2 rounded transition">
                  <span>{r.name}</span>
                  <a
                    href={`http://localhost:5000/uploads/${r.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-200 hover:text-white hover:underline transition"
                  >
                    View
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Jobs */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600/50 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-white">Recently Created Jobs</h2>
          {recentJobs.length === 0 ? (
            <p className="text-white/70">No jobs posted yet.</p>
          ) : (
            <ul className="space-y-2 text-white/90">
              {recentJobs.map((job) => (
                <li key={job._id} className="flex justify-between items-center hover:bg-white/10 p-2 rounded transition">
                  <span>{job.title}</span>
                  <a
                    href={`/jobs/${job._id}`}
                    className="text-blue-200 hover:text-white hover:underline transition"
                  >
                    View
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
