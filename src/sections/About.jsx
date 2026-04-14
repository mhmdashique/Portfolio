import { motion } from 'framer-motion';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { FiTarget, FiCodesandbox, FiMapPin, FiCpu } from 'react-icons/fi';

const About = () => {
  const { ref, inView } = useSectionAnimation(0.2);

  return (
    <section id="about" className="py-16 bg-background relative overflow-hidden px-4">
      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-12 text-left"
        >
          <h2 className="text-3xl md:text-5xl font-black font-syne tracking-tighter">
            THE STORY <span className="text-accent italic">SO FAR.</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-accent to-secondary mt-2 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Bio Card */}
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={inView ? { opacity: 1, x: 0 } : {}}
             transition={{ delay: 0.2 }}
             className="lg:col-span-8 glass p-8 rounded-[2.5rem] border border-white/10 flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                    <FiCodesandbox size={24} />
                </div>
                <h3 className="text-xl font-syne font-black uppercase tracking-widest text-white">The Mission</h3>
            </div>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-dmSans mb-4">
                I am <span className="text-white font-bold">Mohammed Ashique S</span>, a Computer Science graduate and aspiring software developer skilled in MERN stack development using React, Node.js, and MongoDB. I'm passionate about building scalable, responsive web applications that deliver seamless user experiences.
            </p>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-dmSans mb-4">
                Currently seeking opportunities to grow my career in an innovative, growth-focused organization where I can contribute to meaningful projects. My philosophy is simple: <span className="text-accent italic">"If it can be imagined, it can be engineered."</span>
            </p>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed font-dmSans">
                I enjoy working in collaborative environments where clean code and creative thinking go hand in hand. Whether it's building RESTful APIs, designing intuitive UI components, or optimizing database performance — I bring dedication and attention to detail to every project I take on.
            </p>
          </motion.div>

          {/* Stats Column */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ delay: 0.4 }}
               className="bg-[#161b2e] p-6 rounded-[2rem] border border-white/5 group hover:border-accent/30 transition-all"
            >
                <div className="flex justify-between items-start mb-4">
                    <FiTarget className="text-secondary text-2xl" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Milestone</span>
                </div>
                <p className="text-4xl font-syne font-black text-white">10+</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Projects Shipped</p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={inView ? { opacity: 1, y: 0 } : {}}
               transition={{ delay: 0.5 }}
               className="bg-[#161b2e] p-6 rounded-[2rem] border border-white/5 group hover:border-secondary/30 transition-all"
            >
                <div className="flex justify-between items-start mb-4">
                    <FiMapPin className="text-accent text-2xl" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Location</span>
                </div>
                <p className="text-xl font-syne font-black text-white">Kerala, India</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Remote Ready</p>
            </motion.div>
          </div>

          {/* Bottom Banner Card */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={inView ? { opacity: 1, y: 0 } : {}}
             transition={{ delay: 0.6 }}
             className="lg:col-span-12 glass p-6 rounded-[2rem] border border-white/10 flex flex-wrap items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
               <FiCpu className="text-accent text-2xl animate-pulse" />
               <p className="text-sm font-syne font-bold uppercase tracking-widest">Always Learning: Next.js 15, Web Assembly, AI Agents</p>
            </div>
            <a href="#contact" className="px-6 py-2 bg-white text-background rounded-full font-syne font-black text-[10px] uppercase tracking-widest hover:bg-accent hover:text-white transition-all">
                Let's Build Something
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
