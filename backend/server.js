import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import contactRoutes from './routes/contact.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // In production, replace with your specific frontend domain or configure properly
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Base Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Portfolio Backend API is running smoothly!' });
});

// API Routes
app.use('/api', contactRoutes);

// 404 Route handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(`💥 Unhandled Server Exception: ${err.message}`);
  res.status(500).json({
    success: false,
    error: 'An unexpected server error occurred',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Define and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
