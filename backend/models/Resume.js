import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  extractedText: { type: String },
  filename: { type: String },
  skills: { type: [String], default: [] },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Resume", resumeSchema);
