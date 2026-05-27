import express from 'express';
import { handleContactSubmit } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact - Submit a contact message
router.post('/contact', handleContactSubmit);

export default router;
