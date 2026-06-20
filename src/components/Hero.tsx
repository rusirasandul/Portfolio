import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Twitter, ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import HeroRobot from './HeroRobot';

const FOCUS_AREAS = [
  'AI Engineering',
  'Cyber Security',
  'Full-Scale Applications',
  'Project Management',
  'Cloud Architecture',
  'DevOps Engineering',
];

const SOCIALS = [
  { icon: Github, href: 'https://github.com/rusirasandul', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/rusira-sandul-b6bb87292', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:rusirasandulhw@gmail.com', label: 'Email' },
  { icon: Twitter, href: 'https://x.com/RusiraS64320', label: 'X (Twitter)' },
];

const CV_URL =
  'https://drive.google.com/file/d/1fKUmOiahHyCtY5J0KmwEKH05yOmuFUSd/view?usp=sharing';

const STATS = [
  { value: '2x', label: 'Concurrent Degrees' },
  { value: '10+', label: 'Shipped Projects' },
  { value: '7+', label: 'Leadership Roles' },
];

const Hero = () => {
  const [currentFocus, setCurrentFocus] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentFocus((prev) => (prev + 1) % FOCUS_AREAS.length),
      2200
    );
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-28 pb-16 sm:px-8">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-faint bg-[size:46px_46px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_40%,#000_55%,transparent_100%)]" />
        <div className="absolute left-1/2 top-[-10%] h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-accent/20 blur-[130px] animate-float-slow" />
        <div className="absolute right-[8%] top-[30%] h-[320px] w-[320px] rounded-full bg-iris/15 blur-[120px] animate-float" />
        <div className="absolute left-[6%] bottom-[8%] h-[300px] w-[300px] rounded-full bg-sky-glow/10 blur-[120px]" />
      </div>

      {/* Interactive robot tucked into the corner */}
      <HeroRobot />

      <div className="container-width relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex max-w-[92vw] items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium text-zinc-300 backdrop-blur-md sm:px-4 sm:text-xs"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for opportunities &amp; collaborations
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-4xl text-balance text-4xl font-bold leading-[1.08] sm:text-6xl md:text-7xl"
        >
          Hi, I&apos;m <span className="text-gradient">Rusira Sandul</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-lg text-zinc-400 sm:mt-5 sm:text-2xl"
        >
          <span>I build software focused on</span>
          <span className="inline-flex h-7 items-center overflow-hidden sm:h-8">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentFocus}
                initial={{ y: 18, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="font-display font-semibold text-accent-light"
              >
                {FOCUS_AREAS[currentFocus]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-5 max-w-2xl text-balance text-sm leading-relaxed text-zinc-400 sm:mt-6 sm:text-lg"
        >
          A Computer Science undergraduate on a rare double-degree path, exploring the
          intersection of <span className="text-zinc-200">AI</span>, full-stack engineering,
          and <span className="text-zinc-200">cyber security</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <button onClick={() => scrollToSection('projects')} className="btn-primary">
            View My Work
            <ArrowUpRight size={17} />
          </button>
          <button onClick={() => scrollToSection('contact')} className="btn-ghost">
            Get in Touch
          </button>
          <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <Download size={16} />
            Résumé
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-8 flex items-center gap-3"
        >
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:text-accent-light"
            >
              <Icon size={19} />
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 grid w-full max-w-xl grid-cols-3 divide-x divide-white/10 rounded-2xl glass py-4 sm:mt-14 sm:py-5"
        >
          {STATS.map((s) => (
            <div key={s.label} className="px-1.5 sm:px-2">
              <div className="font-display text-xl font-bold text-white sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-zinc-500 sm:text-xs">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-zinc-500 transition-colors hover:text-accent-light md:block"
      >
        <ArrowDown size={22} />
      </button>
    </section>
  );
};

export default Hero;
