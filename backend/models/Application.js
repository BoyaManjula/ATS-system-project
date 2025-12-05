import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  candidateEmail: { type: String, required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: false }, // optional now
  status: {
    type: String,
    enum: ["Pending", "Reviewed", "Rejected", "Selected"],
    default: "Pending",
  },
  appliedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Application", applicationSchema);
