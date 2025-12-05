import React, { useEffect, useState } from "react";
import axios from "axios";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [statusOptions] = useState(["Pending", "Reviewed", "Rejected", "Selected"]);

  useEffect(() => { fetchApplications(); }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/applications");
      setApplications(res.data);
    } catch (err) { console.error(err); }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/applications/status/${id}`, { status });
      fetchApplications();
    } catch (err) { console.error(err); }
  };

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/applications/${id}`);
      fetchApplications();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-indigo-800 to-blue-900">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-lg">
        Candidate Applications
      </h1>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.length === 0 && (
          <p className="text-white/70 text-lg">No applications submitted yet.</p>
        )}

        {applications.map((app) => (
          <div
            key={app._id}
            className="p-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex justify-between items-center transition transform hover:scale-105 hover:shadow-2xl"
          >
            <div>
              <h2 className="text-xl font-semibold text-white">{app.candidateName}</h2>
              <p className="text-sm text-white/80">{app.candidateEmail}</p>
              <p className="text-sm mt-2 text-white/70">Job: {app.jobId?.title || "N/A"}</p>
              <p className="text-sm mt-1 text-white/70">Status: {app.status}</p>
            </div>

            <div className="flex gap-3 items-center">
              <select
                value={app.status}
                onChange={(e) => updateStatus(app._id, e.target.value)}
                className="text-black px-3 py-1 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <button
                onClick={() => deleteApplication(app._id)}
                className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-semibold hover:bg-yellow-300 transition transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applications;
