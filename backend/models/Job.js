// backend/models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  requiredSkills: { type: [String], default: [] }, // e.g. ["React","Node.js"]
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Job", jobSchema);
