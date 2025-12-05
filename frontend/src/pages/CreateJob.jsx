import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!title) {
      setMessage("Job title is required");
      return;
    }

    const requiredSkills = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await axios.post("http://localhost:5000/api/jobs", {
        title,
        description,
        requiredSkills,
      });

      setMessage("Job created successfully!");
      setTitle("");
      setDescription("");
      setSkills("");

      navigate(`/jobs/${res.data._id}`);
    } catch (err) {
      console.error(err);
      setMessage("Failed to create job");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg border border-gray-200">

        {/* Header */}
        <h1 className="text-3xl font-semibold text-blue-700 mb-6 text-center">
          Create Job Posting
        </h1>

        {/* Job Title */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Job Title *</label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., Frontend Developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Job Description</label>
          <textarea
            className="w-full p-2 border rounded h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Describe the responsibilities, requirements, etc."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Required Skills (comma separated)
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., React, Node.js, SQL"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={handleCreate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Create Job
        </button>

        {/* Message */}
        {message && (
          <p className="text-center text-sm text-green-600 mt-4">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default CreateJob;
