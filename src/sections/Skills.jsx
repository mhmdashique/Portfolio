import { motion } from 'framer-motion';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { 
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiJavascript, 
  SiTailwindcss, SiRedux, SiGit, SiAxios, SiPostman, SiVite,
  SiFigma, SiNextdotjs, SiTypescript 
} from 'react-icons/si';
import { FaHtml5, FaCss3Alt, FaFileWord, FaFileExcel, FaFilePowerpoint } from 'react-icons/fa';

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React.js", icon: <SiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "HTML5", icon: <FaHtml5 /> },
      { name: "CSS3", icon: <FaCss3Alt /> },
      { name: "Redux", icon: <SiRedux /> },
      { name: "Vite", icon: <SiVite /> },
    ]
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Express.js", icon: <SiExpress /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Axios", icon: <SiAxios /> },
      { name: "REST APIs", icon: <SiPostman /> },
    ]
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", icon: <SiGit /> },
      { name: "Figma", icon: <SiFigma /> },
      { name: "MS Office Suite", icon: <div className="flex gap-1"><FaFileWord /><FaFileExcel /><FaFilePowerpoint /></div> },
      { name: "MS Word", icon: <FaFileWord /> },
      { name: "MS Excel", icon: <FaFileExcel /> },
      { name: "MS PowerPoint", icon: <FaFilePowerpoint /> },
    ]
  }
];

const Skills = () => {
  const { ref, inView } = useSectionAnimation(0.1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };

  const badgeContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <section id="skills" className="py-12 bg-[#0d1326] px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-syne mb-2">Technical <span className="text-accent">Arsenal</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">The tools and technologies I use to bring digital experiences to life.</p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {skillCategories.map((category, catIdx) => (
            <div key={catIdx} className="space-y-6">
              <motion.h3 
                initial={{ x: -20, opacity: 0 }}
                animate={inView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * catIdx }}
                className="text-xl font-syne font-bold text-secondary uppercase tracking-widest border-l-4 border-secondary pl-4"
              >
                {category.title}
              </motion.h3>

              <motion.div 
                variants={badgeContainerVariants}
                className="grid grid-cols-2 gap-4"
              >
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    variants={badgeVariants}
                    whileHover={{ 
                      y: -4, 
                      scale: 1.05,
                      boxShadow: "0 10px 30px -10px rgba(0, 212, 170, 0.3)"
                    }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-background border border-white/5 hover:border-accent/50 transition-colors group"
                  >
                    <span className="text-2xl text-accent group-hover:scale-110 transition-transform">{skill.icon}</span>
                    <span className="font-dmSans font-medium text-sm">{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
