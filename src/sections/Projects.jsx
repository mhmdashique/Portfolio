import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import axios from 'axios';
import { useSectionAnimation } from '../hooks/useSectionAnimation';

// Fallback data if API fails
const fallbackProjects = [
  {
    id: 1,
    title: "Blog Management Website",
    category: "Full Stack",
    description: "A feature-rich blogging platform with secure user authentication, a rich-text content editor, and an integrated AI-powered chat assistant for enhanced user engagement.",
    tech: ["React.js", "Node.js", "MongoDB", "OpenAI API"],
    github: "http://github.com/mhmdashique/BlogProject",
    image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=1770&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "E-Commerce Website",
    category: "MERN Stack",
    description: "A complete online shopping solution featuring product catalog management, secure payment gateway integration, shopping cart functionality, and an admin dashboard for order tracking.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/mhmdashique/Ecommerce-model",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1770&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "website for a water delivery service",
    category: "Full stack",
    description: "A clean, minimalist blog application with local storage persistence, category-based filtering, and a responsive reading experience optimized for all devices.",
    tech: ["Next.js", "Tailwind CSS", "Local Storage"],
    github: "https://github.com/mhmdashique/waterdelivery",
    image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=1773&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Charity Website",
    category: "Frontend",
    description: "A visually compelling nonprofit website designed to drive donations and volunteer engagement, featuring campaign showcases, impact statistics, and a streamlined donation flow.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/mhmdashique/charity-website",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1770&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Website For a Shop",
    category: "Fullstack",
    description: "A modern storefront web application with product listings, inventory management, customer reviews, and a seamless checkout experience for small business owners.",
    tech: ["React.js", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/mhmdashique/charity-website",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1770&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Portfolio",
    category: "Fullstack",
    description: "A high-performance personal portfolio built with scroll-triggered animations, dynamic theming, and a modular component architecture to showcase projects and skills.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/mhmdashique/Portfolio",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1715&auto=format&fit=crop"
  }
];

const Projects = () => {
  const [projects, setProjects] = useState(fallbackProjects);
  const { ref, inView } = useSectionAnimation(0.1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.warn("Project API check failed, using fallback data.");
      }
    };
    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const cardVariants = {
    hidden: { y: 80, opacity: 0, rotateX: 8 },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotateX: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const tagContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3
      }
    }
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section id="projects" className="py-12 bg-[#0a0f1e] px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading with split animation */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 overflow-hidden">
          <motion.h2
            initial={{ x: -60, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-3xl md:text-5xl font-black font-syne"
          >
            My
          </motion.h2>
          <motion.h2
            initial={{ x: 60, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-3xl md:text-5xl font-black font-syne text-accent"
          >
            Projects
          </motion.h2>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group bg-[#161b2e] rounded-3xl overflow-hidden border border-white/5 hover:border-accent/40 shadow-2xl transition-shadow hover:shadow-accent/10"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] to-transparent opacity-60" />
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="p-2 bg-background/80 backdrop-blur-md rounded-full text-white hover:text-accent transition-colors"
                  >
                    <FiGithub size={20} />
                  </motion.a>
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="p-2 bg-background/80 backdrop-blur-md rounded-full text-white hover:text-accent transition-colors"
                    >
                      <FiExternalLink size={20} />
                    </motion.a>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-syne font-bold group-hover:text-accent transition-colors">{project.title}</h3>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-secondary font-bold px-2 py-1 rounded bg-secondary/10">{project.category}</span>
                </div>
                
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{project.description}</p>
                
                <motion.div 
                  variants={tagContainerVariants}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {project.tech.map((tag, idx) => (
                    <motion.span
                      key={idx}
                      variants={tagVariants}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300 uppercase letter-spacing-wide"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                <div className="pt-4 border-t border-white/5">
                   <motion.button
                      className="relative text-accent font-syne text-sm font-bold flex items-center gap-2 group/btn"
                   >
                      <motion.div 
                        className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent"
                        whileHover={{ width: '100%' }}
                      />
                   </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
