import React, { useState } from "react";
import axios from "axios";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!name || !file) {
      setMessage("Enter name and select file.");
      return;
    }
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("name", name);

    try {
      await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage("✅ Resume uploaded successfully!");
      setName("");
      setFile(null);
    } catch {
      setMessage("❌ Failed to upload resume.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-blue-700 to-purple-700 p-6">
      {/* Page Heading */}
      <h1 className="text-4xl font-extrabold mb-6 text-white text-center drop-shadow-lg mt-6">
        Upload Your Resume 📄
      </h1>

      {/* Form Container */}
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-6 p-4 rounded-lg w-full text-black font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 transition shadow-md"
        />

        {/* File Upload */}
        <label
          htmlFor="resume"
          className="cursor-pointer w-full p-8 border-2 border-dashed border-white/50 rounded-2xl text-center mb-6 hover:bg-white/10 transition shadow-inner text-white font-medium"
        >
          {file ? file.name : "Click to select a resume (PDF)"}
        </label>
        <input
          id="resume"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf"
        />

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="w-full mt-2 bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg"
        >
          Upload Resume
        </button>

        {/* Feedback Message */}
        {message && (
          <p className="mt-6 text-lg font-medium text-center text-white/90">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default UploadResume;
