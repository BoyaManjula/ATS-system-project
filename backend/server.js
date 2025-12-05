import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import resumeRoutes from "./routes/resumeRoutes.js";
import path from "path";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
const PORT = process.env.PORT || 5000;

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/resume", resumeRoutes);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
