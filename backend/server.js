import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contact.js";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: "*", // In production, replace with your specific frontend domain or configure properly
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

// Base Check Route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Portfolio Backend API is running smoothly!",
  });
});

// API Routes
app.use("/api", contactRoutes);

// 404 Route handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(`💥 Unhandled Server Exception: ${err.message}`);
  res.status(500).json({
    success: false,
    error: "An unexpected server error occurred",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// Handle unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
});

// Define and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to database (non-blocking)
  connectDB().catch((err) => {
    console.error("Database connection warning:", err.message);
  });

  // Start server
  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `🚀 Server running on port ${PORT} (${process.env.NODE_ENV || "development"} mode)`,
    );
  });

  // Handle server errors
  server.on("error", (err) => {
    console.error("❌ Server error:", err);
  });
};

startServer().catch((err) => {
  console.error("❌ Failed to start server:", err);
  process.exit(1);
});
