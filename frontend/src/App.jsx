import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import ResumeList from "./pages/ResumeList";
import JobList from "./pages/JobList";
import CreateJob from "./pages/CreateJob";
import JobDetail from "./pages/JobDetail";
import Applications from "./pages/Applications";
import CandidateApplications from "./pages/CandidateApplications";
import Shortlisted from "./pages/Shortlisted";
import Rejected from "./pages/Rejected";
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 to-purple-700 flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <Header />

        <div className="mt-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<UploadResume />} />
            <Route path="/resumes" element={<ResumeList />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/jobs/create" element={<CreateJob />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/candidates" element={<CandidateApplications />} />
            <Route path="/applications/shortlisted" element={<Shortlisted />} />
            <Route path="/applications/rejected" element={<Rejected />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
