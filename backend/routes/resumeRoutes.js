import express from "express";
import multer from "multer";
import Resume from "../models/Resume.js";
import pdf from "pdf-parse";
import fs from "fs";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Skills list
const SKILLS_LIST = [
  "JavaScript","Python","Java","C++","C#","React","Node.js","Express",
  "MongoDB","MySQL","PostgreSQL","HTML","CSS","AWS","Docker","Kubernetes",
  "Git","TypeScript","Next.js","Django","Flask","TensorFlow","PyTorch",
  "Machine Learning","Deep Learning","AI","REST","GraphQL","SQL"
];

// Function to extract skills from text
function extractSkills(text) {
  const normalizedText = text
    .replace(/\r/g, " ")
    .replace(/\n/g, " ")
    .replace(/[^\w\s\+\.#-]/g, " ") // keep + . # - for C++, C#, Node.js
    .toLowerCase();

  const words = normalizedText.split(/\s+/);
  const found = new Set();

  SKILLS_LIST.forEach(skill => {
    const skillLower = skill.toLowerCase();
    if (words.includes(skillLower)) found.add(skill);
  });

  return Array.from(found);
}

// ------------------- Routes ------------------- //

// UPLOAD Resume
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const filePath = req.file.path;
    const name = req.body.name || "Unknown";

    // Read PDF
    const dataBuffer = fs.readFileSync(filePath);
    const parsed = await pdf(dataBuffer);

    // Extract skills
    const skills = extractSkills(parsed.text);

    const newResume = new Resume({
      name,
      extractedText: parsed.text,
      filename: req.file.filename,
      skills: skills.length > 0 ? skills : [],
    });

    await newResume.save();

    res.status(200).json({
      message: "Resume uploaded successfully",
      data: newResume,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error });
  }
});

// GET All Resumes
router.get("/all", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ uploadedAt: -1 });
    res.json(resumes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch resumes." });
  }
});

// SEARCH Resumes by skill
router.get("/search", async (req, res) => {
  try {
    const { skill } = req.query;
    if (!skill) return res.status(400).json({ message: "Skill is required" });

    const resumes = await Resume.find({
      skills: { $regex: new RegExp(skill, "i") },
    }).sort({ uploadedAt: -1 });

    res.json(resumes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Search failed." });
  }
});

// DELETE Resume
router.delete("/:id", async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    // Delete file from uploads folder
    const filePath = `uploads/${resume.filename}`;
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: "Resume deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete resume" });
  }
});

export default router;