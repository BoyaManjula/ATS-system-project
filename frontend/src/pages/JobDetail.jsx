// frontend/src/pages/JobDetail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchRanking();
  }, [id]);

  const fetchRanking = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/jobs/${id}/score`);
      setJob(res.data.job);
      setCandidates(res.data.candidates);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  return (
    <div className="p-6 text-white">
      {loading && <p>Loading…</p>}
      {!loading && job && (
        <>
          <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
          <p className="mb-4">{job.description}</p>
          <p className="mb-6">Required skills: {job.requiredSkills.join(", ")}</p>

          <h2 className="text-2xl font-semibold mb-3">Candidate Ranking</h2>
          <div className="space-y-3">
            {candidates.length === 0 && <p>No candidates yet.</p>}
            {candidates.map(c => (
              <div key={c._id} className="p-4 bg-white/10 rounded flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-4">
                    <h3 className="text-lg font-semibold">{c.name}</h3>
                    <div className="text-sm bg-white/10 px-2 py-1 rounded">{c.score}%</div>
                  </div>
                  <p className="mt-2 text-sm text-white/80">{c.extractedText?.substring(0, 120)}{c.extractedText?.length > 120 ? "..." : ""}</p>

                  <div className="mt-3 text-sm">
                    <div><strong>Matched:</strong> {c.matchedSkills.length ? c.matchedSkills.join(", ") : "—"}</div>
                    <div className="mt-1"><strong>Missing:</strong> {c.missingSkills.length ? c.missingSkills.join(", ") : "—"}</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <a className="text-yellow-400 hover:underline" href={`http://localhost:5000/uploads/${c.filename}`} target="_blank" rel="noreferrer">View</a>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default JobDetail;
