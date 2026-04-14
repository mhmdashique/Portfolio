import { motion } from 'framer-motion';
import { useSectionAnimation } from '../hooks/useSectionAnimation';

/**
 * Reusable wrapper component for animated sections.
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Section content
 * @param {string} props.direction - "up" | "down" | "left" | "right"
 * @param {number} props.delay - Animation delay in seconds
 * @param {number} props.duration - Animation duration in seconds
 * @param {string} props.className - Additional CSS classes
 */
const AnimatedSection = ({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 0.7,
  className = ""
}) => {
  const { ref, inView } = useSectionAnimation();

  const getVariants = () => {
    const variants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          duration, 
          delay, 
          ease: "easeOut" 
        }
      }
    };

    switch (direction) {
      case "up":
        variants.hidden.y = 60;
        variants.visible.y = 0;
        break;
      case "down":
        variants.hidden.y = -60;
        variants.visible.y = 0;
        break;
      case "left":
        variants.hidden.x = -60;
        variants.visible.x = 0;
        break;
      case "right":
        variants.hidden.x = 60;
        variants.visible.x = 0;
        break;
      default:
        break;
    }

    return variants;
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
