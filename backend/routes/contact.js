import express from 'express';
import { handleContactSubmit } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact - Submit a contact message
router.post('/contact', handleContactSubmit);

// GET /api/time - Get current server time
router.get('/time', (req, res) => {
  res.json({
    success: true,
    time: new Date().toISOString(),
    timestamp: Date.now(),
  });
});

// Alias: /api/tym -> /api/time
router.get('/tym', (req, res) => {
  res.json({
    success: true,
    time: new Date().toISOString(),
    timestamp: Date.now(),
  });
});

// GET /api/projects - Project list (fallback data for frontend)
router.get('/projects', (req, res) => {
  res.json([
    {
      id: 1,
      title: "Blog Management Website",
      category: "Full Stack",
      description: "A feature-rich blogging platform with secure user authentication and a rich-text content editor.",
      tech: ["React.js", "Node.js", "MongoDB", "OpenAI API"],
      github: "https://github.com/mhmdashique/BlogProject",
      image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1770&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "E-Commerce Website",
      category: "MERN Stack",
      description: "A complete online shopping solution with product catalog management and secure payment gateway.",
      tech: ["MongoDB", "Express", "React", "Node.js"],
      github: "https://github.com/mhmdashique/Ecommerce-model",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1770&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Water Delivery Service",
      category: "Full stack",
      description: "A clean, minimalist web application for water delivery services.",
      tech: ["Next.js", "Tailwind CSS"],
      github: "https://github.com/mhmdashique/waterdelivery",
      image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=1773&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Charity Website",
      category: "Frontend",
      description: "A visually compelling nonprofit website designed to drive donations and volunteer engagement, featuring campaign showcases, impact statistics, and a streamlined donation flow.",
      tech: ["React.js", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/mhmdashique/charity-website",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1770&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Website For a Shop",
      category: "Fullstack",
      description: "A modern storefront web application with product listings, inventory management, customer reviews, and a seamless checkout experience for small business owners.",
      tech: ["React.js", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/mhmdashique/charity-website",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1770&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Portfolio",
      category: "Fullstack",
      description: "A high-performance personal portfolio built with scroll-triggered animations, dynamic theming, and a modular component architecture to showcase projects and skills.",
      tech: ["React.js", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/mhmdashique/Portfolio",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1715&auto=format&fit=crop",
    },
  ]);
});

export default router;
