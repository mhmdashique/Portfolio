import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Journey', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 15, 30, 0)", "rgba(10, 15, 30, 0.85)"]
  );
  const borderColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]
  );

  // Scroll spy: detect active section
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const link = navLinks.find(l => l.href === `#${id}`);
            if (link) setActiveLink(link.name);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    setActiveLink(link.name);
    setMobileMenuOpen(false);
    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-[100] pointer-events-none">
      <motion.nav
        style={{ 
          backgroundColor, 
          borderColor,
        }}
        className="w-full backdrop-blur-xl h-20 flex items-center justify-between px-8 md:px-12 pointer-events-auto border-b"
      >
        <motion.a 
          href="#home"
          onClick={(e) => handleLinkClick(e, navLinks[0])}
          className="text-2xl font-black font-syne text-accent tracking-tighter cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          MA<span className="text-secondary">.</span>
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center bg-white/5 px-6 py-2 rounded-full border border-white/5 gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className={`relative font-syne font-bold text-xs uppercase tracking-[0.2em] transition-colors py-1 cursor-pointer ${
                activeLink === link.name ? 'text-accent' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.name}
              {activeLink === link.name && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent"
                />
              )}
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <motion.a
            href="#contact"
            onClick={(e) => handleLinkClick(e, navLinks[5])}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-6 py-2.5 bg-accent text-background font-syne font-black text-xs uppercase tracking-widest rounded-full shadow-lg shadow-accent/20 cursor-pointer"
          >
            Hire Me
          </motion.a>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 text-white"
            >
              {mobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="absolute top-24 left-0 w-full px-6 md:hidden pointer-events-none"
            >
              <div className="bg-[#0d1326]/95 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 flex flex-col items-center gap-6 pointer-events-auto shadow-2xl">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    whileHover={{ x: 5 }}
                    className={`text-xl font-syne font-black ${activeLink === link.name ? 'text-accent' : 'text-white'}`}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
