import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="px-6 md:px-12 lg:px-24 py-2">
        <div className="flex justify-between items-center">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* Profile Photo Circle */}
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-cyan-400/50">
              <img 
                src="/assets/images/profile.jpg" 
                alt="Rusira Sandul"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to initials if image doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-full h-full bg-cyan-500 flex items-center justify-center text-slate-900 text-xs font-bold">
                RS
              </div>
            </div>
            <h1 className="text-lg font-bold text-white">
              Rusira Sandul
            </h1>
          </motion.div>
          
          <div className="hidden md:flex space-x-6 ml-auto">
            {['about', 'education', 'experience', 'projects', 'achievements', 'skills', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-white hover:text-gray-400 transition-colors capitalize text-sm"
              >
                {item}
              </button>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden text-white" aria-label="Menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
