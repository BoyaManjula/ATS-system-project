import React, { useEffect, useState } from "react";
import axios from "axios";

function Rejected() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchRejected();
  }, []);

  const fetchRejected = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/applications");
      const filtered = res.data.filter(app => app.status === "Rejected");
      setApplications(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Rejected Candidates</h1>

      {applications.length === 0 && (
        <p className="text-yellow-300">No rejected candidates found.</p>
      )}

      <div className="space-y-3">
        {applications.map(app => (
          <div key={app._id} className="p-4 bg-white/10 rounded">
            <h2 className="text-xl font-semibold">{app.candidateName}</h2>
            <p className="text-white/80">{app.candidateEmail}</p>
            <p className="mt-2 text-white/70">Job: {app.jobId?.title}</p>
            <p>Status: {app.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rejected;
