import { motion } from 'framer-motion';
import { useSectionAnimation } from '../hooks/useSectionAnimation';

const About = () => {
  const { ref, inView } = useSectionAnimation(0.2);

  return (
    <section id="about" className="py-12 bg-background overflow-hidden px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold font-syne mb-6"
          >
            Beyond the <span className="text-accent underline decoration-secondary decoration-wavy deco-u-4">Code</span>
          </motion.h2>

          <div className="space-y-4 max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-base leading-relaxed"
            >
              I am a passionate MERN Stack Developer based in Thiruvananthapuram, Kerala, with a strong foundation in building scalable and responsive web applications. My journey in tech started with a curiosity for how things work on the internet, which quickly evolved into a full-blown obsession with modern web technologies.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-base leading-relaxed"
            >
              I believe that good software is not just about writing code; it's about crafting experiences that are intuitive, accessible, and performant. I love solving complex problems and turning ideas into functional, beautiful realities.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400 text-base leading-relaxed"
            >
              When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or sharing my knowledge with the developer community.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 grid grid-cols-2 gap-6 w-full max-w-md"
          >
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-accent font-syne font-bold text-xl">2+</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Years Exp.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-secondary font-syne font-bold text-xl">20+</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">Projects Done</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
