import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import HeroRoboBackground from './HeroRoboBackground';
import StarkTechBackground from './StarkTechBackground';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const focusAreas = [
    "AI Engineer",
    "Cyber Security",
    "Full Scale Software Application",
    "Project Management",
    "Cloud Architecture",
    "DevOps Engineering",
    "Software Development"
  ];

  const [currentFocus, setCurrentFocus] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFocus((prev) => (prev + 1) % focusAreas.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [focusAreas.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding pt-32 overflow-hidden">
      {/* 1. The Stark Tech Background (Deepest Layer) */}
      <StarkTechBackground />
      
      {/* 2. Robot Background (Middle Layer) */}
      <HeroRoboBackground />
      
      <div className="container-width relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* HUD Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4 px-3 py-1 border border-cyan-500/30 rounded-full bg-cyan-950/30 backdrop-blur-md"
            >
              <span className="text-cyan-400 text-xs font-mono tracking-widest">EST. 2026 // STARK PROTOCOLS</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 filter drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">Rusira Sandul</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-400 mb-8 leading-relaxed"
            >
              I build scalable software and explore the intersection of <span className="text-amber-500 font-semibold">AI</span> and Engineering.
            </motion.p>

            {/* Social Media Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex gap-4 mb-8"
            >
              <a
                href="https://github.com/rusirasandul"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 hover:bg-slate-900 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/rusirasandul"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 hover:bg-slate-900 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:rusirasandulhw@gmail.com"
                className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 hover:bg-slate-900 transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
              <a
                href="https://twitter.com/rusirasandul"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400 hover:bg-slate-900 transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {/* Iron Man Styled Buttons */}
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 rounded-none skew-x-[-10deg] bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(8,145,178,0.6)] border border-cyan-400"
              >
                <span className="skew-x-[10deg] inline-block">View Work</span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 rounded-none skew-x-[-10deg] border border-cyan-500/50 text-cyan-400 hover:bg-cyan-950/50 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                <span className="skew-x-[10deg] inline-block">Contact Me</span>
              </button>
              <a
                href="/Rusira_Sandul_CV.pdf"
                download
                className="px-8 py-3 bg-slate-800 border-2 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-accent font-semibold rounded-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block"
          >
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 min-h-[200px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFocus}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <p className="text-slate-500 text-sm mb-2 font-mono">Focus on</p>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    {focusAreas[currentFocus]}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
