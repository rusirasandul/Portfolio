import { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const HeroRoboBackground = () => {
  // 1. Setup Motion Values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Track actual mouse movement globally
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Get mouse position relative to the center of the screen
      const { clientX, clientY } = event;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Update motion values
      mouseX.set(clientX - centerX);
      mouseY.set(clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // 3. Transform mouse movement into constrained head movement pixels.
  const headX = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [-30, 30]);
  const headY = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], [-20, 20]);
  
  // Make the eyes move slightly more than the head for a parallax "looking" effect
  const eyesX = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [-40, 40]);
  const eyesY = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], [-25, 25]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center z-0 opacity-30 md:opacity-50">
      <svg
        width="500"
        height="500"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
      >
        {/* --- BODY GROUP (Static) --- */}
        <g id="robo-body">
          {/* Main Torso */}
          <rect x="150" y="280" width="200" height="180" rx="40" fill="#1e293b" stroke="#334155" strokeWidth="4"/>
          {/* Chest Detail Arc Reactor */}
          <circle cx="250" cy="370" r="30" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" className="animate-pulse"/>
          <circle cx="250" cy="370" r="15" fill="#06b6d4" style={{ filter: 'blur(2px)' }}/>
          {/* Neck connection */}
          <rect x="225" y="250" width="50" height="40" fill="#334155" />
        </g>

        {/* --- HEAD GROUP (Moves with cursor) --- */}
        <motion.g 
          id="robo-head"
          style={{ x: headX, y: headY }}
        >
          {/* Head Shape */}
          <rect x="125" y="80" width="250" height="180" rx="50" fill="#1e293b" stroke="#334155" strokeWidth="4"/>
          {/* Antenna */}
          <line x1="250" y1="80" x2="250" y2="30" stroke="#334155" strokeWidth="6" strokeLinecap="round"/>
          <circle cx="250" cy="30" r="10" fill="#06b6d4" className="animate-ping"/>

          {/* --- EYES GROUP (Moves slightly more for parallax) --- */}
          <motion.g id="robo-eyes" style={{ x: eyesX, y: eyesY }}>
            {/* Eye container screen */}
            <rect x="165" y="140" width="170" height="70" rx="35" fill="#0f172a" />
            
            {/* Left Eye (Glowing) */}
            <circle cx="210" cy="175" r="18" fill="#22d3ee" style={{ filter: 'drop-shadow(0 0 15px rgba(34,211,238,0.8))' }}/>
            {/* Right Eye (Glowing) */}
            <circle cx="290" cy="175" r="18" fill="#22d3ee" style={{ filter: 'drop-shadow(0 0 15px rgba(34,211,238,0.8))' }}/>
            
            {/* Little reflections in eyes */}
            <circle cx="216" cy="168" r="5" fill="white" opacity="0.8"/>
            <circle cx="296" cy="168" r="5" fill="white" opacity="0.8"/>
          </motion.g>
          
          {/* Mouth/Grill */}
          <rect x="200" y="225" width="100" height="10" rx="5" fill="#334155"/>
        </motion.g>
      </svg>
    </div>
  );
};

export default HeroRoboBackground;
