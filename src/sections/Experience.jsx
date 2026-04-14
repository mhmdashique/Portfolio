import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { FiBriefcase, FiBookOpen, FiMapPin, FiCalendar } from 'react-icons/fi';

const experiences = [
  {
    type: "professional",
    role: "Full Stack Developer",
    company: "Originate IT",
    period: "2025 - Present",
    location: "Trivandrum, India",
    description: "Leading the development of modern web solutions and architecting scalable backend systems.",
    highlights: [
      "Building high-performance applications using the MERN stack.",
      "Designing and implementing microservices architecture.",
      "Optimizing database queries and improving API response times.",
      "Mentoring junior developers and conducting code reviews."
    ]
  },
  {
    type: "professional",
    role: "Intern – MERN Stack Developer",
    company: "Srishti Innovative",
    period: "2024 - 2025",
    location: "Trivandrum, India",
    description: "Built and deployed full-stack web applications using React.js, Node.js, and MongoDB.",
    highlights: [
      "Developed responsive user interfaces with React.js.",
      "Built and integrated RESTful APIs with Node.js and Express.",
      "Collaborated with developers to improve application performance and maintainability.",
      "Participated in agile development cycles and daily standups."
    ]
  }
];

const education = [
  {
    type: "academic",
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Sarabhai Institute of Science and Technology, KTU",
    year: "2019 - 2023",
    location: "Thiruvananthapuram, Kerala",
    description: "Graduated with a CGPA of 6.2. Focused on core software engineering and systems design.",
    highlights: ["Data Structures & Algorithms", "Operating Systems", "Database Management", "Web Technologies"]
  },
  {
    type: "academic",
    degree: "Higher Secondary Education (12th)",
    institution: "Govt. VHSS Paruthippally",
    year: "2017 - 2019",
    location: "Thiruvananthapuram, Kerala",
    description: "Focused on Science and Mathematics with Computer Science as a core elective.",
    highlights: ["Mathematics", "Physics", "Chemistry", "Computer Science"]
  },
  {
    type: "academic",
    degree: "Secondary Education (10th)",
    institution: "Govt VHSS Paruthippally",
    year: "2016 - 2017",
    location: "Thiruvananthapuram, Kerala",
    description: "Graduated with strong performance across all subjects.",
    highlights: ["Science", "Mathematics", "Social Studies", "Language Studies"]
  }
];

const Experience = () => {
  const [activeTab, setActiveTab] = useState('professional');
  const { ref, inView } = useSectionAnimation(0.1);

  const data = activeTab === 'professional' ? experiences : education;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="experience" className="py-12 bg-background relative overflow-hidden px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-10">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-4xl font-black font-syne leading-tight">
              My <span className="text-secondary italic">Career</span> <br />
              <span className="text-accent">Journey</span>
            </h2>
          </motion.div>

          {/* Toggle Buttons */}
          <div className="flex bg-[#161b2e] p-1.5 rounded-2xl border border-white/5">
            <button
              onClick={() => setActiveTab('professional')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-syne font-bold transition-all duration-300 ${
                activeTab === 'professional' ? 'bg-accent text-background shadow-lg shadow-accent/20' : 'text-gray-400 hover:text-white'
              }`}
            >
              <FiBriefcase />
              Professional
            </button>
            <button
              onClick={() => setActiveTab('academic')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-syne font-bold transition-all duration-300 ${
                activeTab === 'academic' ? 'bg-secondary text-white shadow-lg shadow-secondary/20' : 'text-gray-400 hover:text-white'
              }`}
            >
              <FiBookOpen />
              Academic
            </button>
          </div>
        </div>

        <div ref={ref} className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 gap-8"
            >
              {data.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="glass p-1 rounded-[2rem] border border-white/5 group-hover:border-accent/30 transition-all duration-500 overflow-hidden">
                    <div className="bg-[#12172a] rounded-[1.9rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
                      {/* Left: Meta Info */}
                      <div className="md:w-1/4 space-y-4">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase ${
                          activeTab === 'professional' ? 'bg-accent/10 text-accent' : 'bg-secondary/10 text-secondary'
                        }`}>
                          <FiCalendar /> {item.period || item.year}
                        </div>
                        <p className="text-gray-400 font-medium flex items-center gap-2">
                          <FiMapPin className="text-gray-600" /> {item.location}
                        </p>
                      </div>

                      {/* Right: Detailed Content */}
                      <div className="flex-1">
                        <h3 className="text-3xl font-syne font-bold mb-2 group-hover:text-accent transition-colors">
                          {item.role || item.degree}
                        </h3>
                        <p className={`text-xl font-dmSans font-bold mb-6 ${
                          activeTab === 'professional' ? 'text-secondary' : 'text-accent'
                        }`}>
                          {item.company || item.institution}
                        </p>
                        
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-3xl">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-3">
                          {item.highlights.map((highlight, hIdx) => (
                            <span 
                              key={hIdx}
                              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400 uppercase tracking-wider group-hover:border-white/20 transition-all"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Aesthetic Connector Line */}
                  {index !== data.length - 1 && (
                    <div className="absolute left-[50%] md:left-[12.5%] -bottom-8 w-[2px] h-8 bg-gradient-to-b from-white/10 to-transparent" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;
