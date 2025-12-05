// backend/routes/jobRoutes.js
import express from "express";
import Job from "../models/Job.js";
import Resume from "../models/Resume.js";

const router = express.Router();

// Create job
router.post("/", async (req, res) => {
  try {
    const { title, description, requiredSkills } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });

    // normalize skills: trim and capitalize consistently
    const skills = (requiredSkills || []).map(s => s.trim()).filter(Boolean);
    const job = new Job({ title, description, requiredSkills: skills });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create job" });
  }
});

// Get jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

// Get single job
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch job" });
  }
});

/*
  Score candidates for a job:
  GET /api/jobs/:id/score
  Returns list of resumes with:
    - matchedSkills (array)
    - missingSkills (array)
    - score (0-100)
*/
router.get("/:id/score", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const resumes = await Resume.find(); // all resumes

    const required = job.requiredSkills.map(s => s.toLowerCase().trim());

    const scored = resumes.map(r => {
      const resumeSkills = (r.skills || []).map(s => s.toLowerCase().trim());
      // matched unique
      const matched = [...new Set(required.filter(sk => resumeSkills.some(rs => rs === sk || rs.includes(sk) || sk.includes(rs))))];
      // matched using flexible check: exact or includes either way
      // compute missing
      const missing = required.filter(sk => !matched.includes(sk));
      const score = required.length > 0 ? Math.round((matched.length / required.length) * 100) : 0;

      return {
        _id: r._id,
        name: r.name,
        filename: r.filename,
        extractedText: r.extractedText,
        matchedSkills: matched,
        missingSkills: missing,
        score,
      };
    });

    // sort desc by score
    scored.sort((a, b) => b.score - a.score);

    res.json({ job, candidates: scored });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to score candidates" });
  }
});

// Optional: delete job
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete job" });
  }
});

export default router;
