import { BrowserRouter as Router } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './components/Footer';

const ScrollProgressIndicator = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-accent origin-left z-[9999]"
      style={{ scaleX }}
    />
  );
};

function App() {
  return (
    <Router>
      <div className="bg-background min-h-screen text-white selection:bg-accent/30 selection:text-accent">
        <ScrollProgressIndicator />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#161b2e',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'DM Sans'
            }
          }}
        />
        
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
