import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const HeroRobot = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(event.clientX - centerX);
      mouseY.set(event.clientY - centerY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const halfW = typeof window !== 'undefined' ? window.innerWidth / 2 : 720;
  const halfH = typeof window !== 'undefined' ? window.innerHeight / 2 : 450;

  const headX = useSpring(useTransform(mouseX, [-halfW, halfW], [-14, 14]), { stiffness: 120, damping: 18 });
  const headY = useSpring(useTransform(mouseY, [-halfH, halfH], [-10, 10]), { stiffness: 120, damping: 18 });
  const eyesX = useSpring(useTransform(mouseX, [-halfW, halfW], [-22, 22]), { stiffness: 150, damping: 16 });
  const eyesY = useSpring(useTransform(mouseY, [-halfH, halfH], [-14, 14]), { stiffness: 150, damping: 16 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
      className="pointer-events-none absolute bottom-0 left-0 z-[2] hidden select-none lg:block"
    >
      {/* ambient glow behind robot */}
      <div className="absolute bottom-6 left-6 h-44 w-44 rounded-full bg-accent/25 blur-[80px]" />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <svg
          width="260"
          height="260"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-[200px] w-[200px] lg:h-[240px] lg:w-[240px]"
        >
          {/* --- BODY (static) --- */}
          <g>
            <rect x="150" y="280" width="200" height="180" rx="44" fill="#15151f" stroke="rgba(255,255,255,0.10)" strokeWidth="4" />
            <circle cx="250" cy="370" r="30" fill="#0b0b12" stroke="#8b5cf6" strokeWidth="3" className="animate-pulse" />
            <circle cx="250" cy="370" r="14" fill="#a78bfa" className="robo-blur" />
            <rect x="225" y="250" width="50" height="40" rx="8" fill="#1c1c28" />
          </g>

          {/* --- HEAD (tracks cursor) --- */}
          <motion.g style={{ x: headX, y: headY }}>
            <rect x="125" y="80" width="250" height="180" rx="54" fill="#15151f" stroke="rgba(255,255,255,0.10)" strokeWidth="4" />
            {/* Antenna */}
            <line x1="250" y1="80" x2="250" y2="30" stroke="#1c1c28" strokeWidth="6" strokeLinecap="round" />
            <circle cx="250" cy="28" r="9" fill="#a78bfa" className="animate-ping" />
            <circle cx="250" cy="28" r="5" fill="#8b5cf6" />

            {/* --- EYES (parallax) --- */}
            <motion.g style={{ x: eyesX, y: eyesY }}>
              <rect x="165" y="140" width="170" height="70" rx="35" fill="#0b0b12" />
              <circle cx="210" cy="175" r="18" fill="#a78bfa" className="robo-glow" />
              <circle cx="290" cy="175" r="18" fill="#a78bfa" className="robo-glow" />
              <circle cx="216" cy="168" r="5" fill="#ffffff" opacity="0.85" />
              <circle cx="296" cy="168" r="5" fill="#ffffff" opacity="0.85" />
            </motion.g>

            {/* Mouth grill */}
            <rect x="200" y="225" width="100" height="9" rx="4.5" fill="rgba(255,255,255,0.14)" />
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default HeroRobot;
