import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiDownload, FiGithub, FiLinkedin, FiInstagram, FiArrowRight, FiMail } from 'react-icons/fi';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const socials = [
    { icon: <FiGithub />, href: "https://github.com/mohammedashiqueofficial7", label: "GitHub" },
    { icon: <FiLinkedin />, href: "https://linkedin.com/in/mohammed-ashique-s-13613b339", label: "LinkedIn" },
    { icon: <FiInstagram />, href: "#", label: "Instagram" },
    { icon: <FiMail />, href: "mailto:ashiqueoffl7@gmail.com", label: "Email" }
  ];

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1e]"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-secondary/15 rounded-full blur-[120px]" />
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      </div>

      <motion.div 
        style={{ y: contentY, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 mb-6"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
          </span>
          <span className="text-[8px] font-black font-syne uppercase tracking-widest text-gray-300">Open for Collaboration</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-7xl font-black font-syne tracking-tighter leading-none mb-6"
        >
          MAKING <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-secondary">DIGITAL</span><br />
          IMPACT.
        </motion.h1>

        {/* Bio */}
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-base md:text-lg font-dmSans max-w-xl leading-relaxed mb-8"
        >
          I'm <span className="text-white font-bold">Mohammed Ashique S</span>, a Full Stack Developer building scalable, beautiful web applications with the latest technology.
        </motion.p>

        {/* CTAs */}
        <motion.div 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className="flex flex-wrap gap-4 items-center justify-center mb-10"
        >
          <a href="#projects" className="group flex items-center gap-2 px-8 py-3.5 bg-accent text-background font-syne font-black text-xs uppercase tracking-widest rounded-xl shadow-xl shadow-accent/20 hover:scale-105 transition-all">
            View Projects <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="/resume.pdf" className="flex items-center gap-2 px-8 py-3.5 border border-white/10 text-white font-syne font-black text-sm uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all">
            <FiDownload /> Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center gap-8"
        >
          {socials.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, color: '#00d4aa' }}
              className="text-2xl text-gray-500 transition-colors"
              title={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Aesthetic Side Numbers */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 opacity-10 font-syne font-black text-4xl">
        <p>01</p>
        <p>02</p>
        <p>03</p>
      </div>

      {/* Scroll Down */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer"
        onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] font-black font-syne uppercase tracking-[0.4em] text-gray-600">Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
