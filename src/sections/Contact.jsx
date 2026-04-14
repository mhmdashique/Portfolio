import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCheck, FiLoader, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useSectionAnimation } from '../hooks/useSectionAnimation';

const Contact = () => {
  const [formState, setFormState] = useState('idle'); // idle | submitting | success
  const { ref, inView } = useSectionAnimation(0.1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState('submitting');
    
    try {
      // Simulate API call as requested
      await axios.post('http://localhost:5000/api/contact', formData);
      setFormState('success');
      toast.success('Message sent successfully!');
      setTimeout(() => {
          setFormState('idle');
          setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    } catch (error) {
      // Fallback for demo
      console.warn("Contact API fail, simulating success for demo.");
      setTimeout(() => {
        setFormState('success');
        toast.success('Message sent! (Simulated)');
        setTimeout(() => {
            setFormState('idle');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      }, 1500);
    }
  };

  const fieldVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: 0.1 * i, duration: 0.5 }
    })
  };

  return (
    <section id="contact" className="py-12 bg-[#0d1326] overflow-hidden px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={inView ? { y: 0, opacity: 1 } : {}}
           transition={{ duration: 0.6 }}
           className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-syne mb-2">Get In <span className="text-secondary">Touch</span></h2>
          <p className="text-gray-400 text-sm">Have a project in mind? Let's talk about it.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16" ref={ref}>
          {/* Contact Info */}
          <div className="space-y-12">
            <motion.div 
               initial={{ x: -60, opacity: 0 }}
               animate={inView ? { x: 0, opacity: 1 } : {}}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="space-y-8"
            >
                <div className="flex items-start gap-6 group">
                   <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center text-2xl group-hover:bg-accent group-hover:text-background transition-all duration-300">
                      <FiMail />
                   </div>
                   <div>
                      <h4 className="text-xl font-syne font-bold">Email</h4>
                      <p className="text-gray-400">ashiqueoffl7@gmail.com</p>
                   </div>
                </div>

                <div className="flex items-start gap-6 group">
                   <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-2xl group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                      <FiMapPin />
                   </div>
                   <div>
                      <h4 className="text-xl font-syne font-bold">Location</h4>
                      <p className="text-gray-400">Thiruvananthapuram, Kerala</p>
                   </div>
                </div>

                <div className="flex items-start gap-6 group">
                   <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center text-2xl group-hover:bg-accent group-hover:text-background transition-all duration-300">
                      <FiPhone />
                   </div>
                   <div>
                      <h4 className="text-xl font-syne font-bold">Phone</h4>
                      <p className="text-gray-400">+91 79075 14040</p>
                   </div>
                </div>
            </motion.div>

            {/* Aesthetic Background Element */}
            <div className="relative w-full h-40 rounded-3xl overflow-hidden glass border border-white/5 p-8 flex items-center justify-center opacity-50 select-none">
                <p className="text-accent font-black text-6xl opacity-10 font-syne rotate-12">CONNECT</p>
            </div>
          </div>

          {/* Contact Form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {[
              { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
              { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
              { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Project Collaboration' }
            ].map((field, i) => (
              <motion.div 
                key={field.name} 
                custom={i}
                variants={fieldVariants}
                animate={inView ? 'visible' : 'hidden'}
                className="space-y-2"
              >
                <label className="text-sm font-syne font-bold text-gray-400 uppercase tracking-widest">{field.label}</label>
                <input
                  required
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                  className="w-full px-6 py-4 bg-background border border-white/10 rounded-2xl focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all font-dmSans"
                />
              </motion.div>
            ))}

            <motion.div 
                custom={3}
                variants={fieldVariants}
                animate={inView ? 'visible' : 'hidden'}
                className="space-y-2"
              >
              <label className="text-sm font-syne font-bold text-gray-400 uppercase tracking-widest">Message</label>
              <textarea
                required
                rows="5"
                placeholder="Your message here..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-6 py-4 bg-background border border-white/10 rounded-2xl focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all font-dmSans resize-none"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={formState !== 'idle'}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`shimmer-btn relative w-full py-5 rounded-2xl font-syne font-bold text-lg overflow-hidden transition-all duration-300 ${
                formState === 'success' ? 'bg-green-500 text-white' : 'bg-accent text-background'
              }`}
            >
              <AnimatePresence mode="wait">
                {formState === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <FiSend />
                  </motion.div>
                )}
                {formState === 'submitting' && (
                  <motion.div
                    key="submitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <FiLoader />
                    </motion.div>
                    <span>Sending...</span>
                  </motion.div>
                )}
                {formState === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <FiCheck size={24} />
                    <span>Sent!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
