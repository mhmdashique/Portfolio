import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiDownload, FiGithub, FiLinkedin, FiInstagram, FiArrowRight, FiMail } from 'react-icons/fi';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.5 + 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 170, 0.6)';
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 170, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const socials = [
    { icon: <FiGithub />, href: "https://github.com/mhmdashique", label: "GitHub" },
    { icon: <FiLinkedin />, href: "https://linkedin.com/in/mohammed-ashique-s-13613b339", label: "LinkedIn" },
    { icon: <FiInstagram />, href: "https://www.instagram.com/aashiq_mhm.d/", label: "Instagram" },
    { icon: <FiMail />, href: "mailto:ashiqueoffl7@gmail.com", label: "Email" }
  ];

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1e]"
    >
      <ParticleCanvas />

      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div 
          animate={{ 
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.3, 0.9, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[15%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -60, 30, 0],
            y: [0, 50, -80, 0],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 40, -60, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[60%] left-[50%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px]"
        />

        {/* Floating Geometric Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30 - i * 10, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              rotate: [0, 180, 360],
              opacity: [0.15, 0.3, 0.15]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
            className="absolute"
            style={{
              top: `${15 + i * 14}%`,
              left: `${8 + i * 16}%`,
            }}
          >
            <div 
              className={`${i % 3 === 0 ? 'w-3 h-3 rounded-full' : i % 3 === 1 ? 'w-4 h-4 rotate-45' : 'w-2 h-6 rounded-full'} border ${i % 2 === 0 ? 'border-accent/20' : 'border-secondary/20'}`}
            />
          </motion.div>
        ))}

        {/* Orbiting Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/[0.02] rounded-full"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent/30 rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-secondary/30 rounded-full" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/[0.015] rounded-full"
        >
          <div className="absolute top-1/2 right-0 translate-y-[-50%] w-1.5 h-1.5 bg-accent/20 rounded-full" />
        </motion.div>

        {/* Dot Grid */}
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
          <a href="/Mohammed_Ashique_S Resume Latest.pdf" target="_blank" className="flex items-center gap-2 px-8 py-3.5 border border-white/10 text-white font-syne font-black text-sm uppercase tracking-widest rounded-xl hover:bg-white/5 transition-all">
            <FiDownload /> Preview CV
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
