import express from "express";
import Application from "../models/Application.js";
import Job from "../models/Job.js";

const router = express.Router();

// Create a new application
router.post("/apply", async (req, res) => {
  try {
    const { candidateName, candidateEmail, jobId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const newApplication = new Application({
      candidateName,
      candidateEmail,
      jobId,
    });

    await newApplication.save();
    res.status(201).json({ message: "Application submitted", data: newApplication });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit application" });
  }
});

// Get all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId", "title") // Include job title
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch applications" });
  }
});

// Update application status
router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: "Status updated", data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update status" });
  }
});

// Delete an application
router.delete("/:id", async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Application deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete application" });
  }
});

export default router;
