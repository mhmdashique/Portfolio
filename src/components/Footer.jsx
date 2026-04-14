import { motion } from 'framer-motion';
import { useSectionAnimation } from '../hooks/useSectionAnimation';
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram, FiArrowUp } from 'react-icons/fi';

const Footer = () => {
    const { ref, inView } = useSectionAnimation(0.1);

    const socialLinks = [
        { icon: <FiGithub />, href: "https://github.com/mohammedashiqueofficial7", name: "GitHub" },
        { icon: <FiLinkedin />, href: "https://linkedin.com/in/mohammed-ashique-s-13613b339", name: "LinkedIn" },
        { icon: <FiTwitter />, href: "#", name: "Twitter" },
        { icon: <FiInstagram />, href: "#", name: "Instagram" },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="py-8 bg-background border-t border-white/5 relative" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-xl font-syne font-bold text-accent mb-1 tracking-widest uppercase">ASHIQUE.</h2>
                    <p className="text-gray-500 text-sm font-dmSans">Crafting digital experiences with passion and precision.</p>
                </motion.div>

                <div className="flex gap-6 mb-12">
                    {socialLinks.map((link, index) => (
                        <motion.a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={inView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ delay: index * 0.1, type: "spring" }}
                            whileHover={{ rotate: 360, color: '#00d4aa' }}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-xl text-gray-400 transition-colors"
                        >
                            {link.icon}
                        </motion.a>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col md:flex-row justify-between w-full items-center text-gray-500 text-sm border-t border-white/5 pt-8"
                >
                    <p>© 2024 Mohammed Ashique S. All Rights Reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
                    </div>
                </motion.div>

                <motion.button
                    onClick={scrollToTop}
                    whileHover={{ y: -5 }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-accent text-background rounded-full flex items-center justify-center shadow-lg shadow-accent/20 z-10"
                >
                    <FiArrowUp size={24} />
                </motion.button>
            </div>
        </footer>
    );
};

export default Footer;
