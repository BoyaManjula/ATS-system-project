import React, { useEffect, useState } from "react";
import axios from "axios";

function ResumeList() {
  const [resumes, setResumes] = useState([]);
  const [skillSearch, setSkillSearch] = useState("");

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/resume/all");
      setResumes(res.data);
    } catch (err) {
      console.error("Failed to fetch resumes:", err);
    }
  };

  const handleSearch = async () => {
    if (!skillSearch) {
      fetchResumes();
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/resume/search?skill=${skillSearch}`
      );
      setResumes(res.data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/resume/${id}`);
      fetchResumes(); // refresh list
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">All Resumes 📄</h1>

      <div className="flex mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by skill..."
          value={skillSearch}
          onChange={(e) => setSkillSearch(e.target.value)}
          className="p-2 rounded text-black w-80"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 transition"
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/20">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Extracted Text</th>
              <th className="px-4 py-2">Skills</th>
              <th className="px-4 py-2">Resume File</th>
              <th className="px-4 py-2">Action</th> {/* Delete button column */}
            </tr>
          </thead>
          <tbody>
            {resumes.map((r) => (
              <tr key={r._id} className="hover:bg-white/10">
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2">
                  {r.extractedText.length > 50
                    ? r.extractedText.substring(0, 50) + "..."
                    : r.extractedText}
                </td>
                <td className="px-4 py-2">{r.skills.join(", ")}</td>
                <td className="px-4 py-2">
                  <a
                    href={`http://localhost:5000/uploads/${r.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:underline"
                  >
                    View / Download
                  </a>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResumeList;
