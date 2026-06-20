import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Feed' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const CV_URL =
  'https://drive.google.com/file/d/1fKUmOiahHyCtY5J0KmwEKH05yOmuFUSd/view?usp=sharing';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-card'
            : 'border border-transparent bg-transparent'
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2.5"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-iris text-sm font-bold text-white shadow-glow-sm">
            RS
          </span>
          <span className="hidden text-sm font-semibold text-zinc-100 sm:block">
            Rusira Sandul
          </span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                activeSection === id
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              {activeSection === id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-accent-dark hover:shadow-glow-sm sm:inline-flex"
          >
            <Download size={15} />
            Résumé
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-200 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 top-20 z-50 lg:hidden"
          >
            <div className="glass rounded-2xl p-3 shadow-card">
              <div className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                      activeSection === id
                        ? 'bg-accent/15 text-accent-light'
                        : 'text-zinc-300 hover:bg-white/5'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <a
                href={CV_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white"
              >
                <Download size={15} />
                Download Résumé
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
