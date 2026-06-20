import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Cpu, Globe, ShieldCheck, ArrowUpRight, Download } from 'lucide-react';
import SectionHeading from './SectionHeading';

const FOCUS_LIST = [
  'Full-stack Development',
  'AI / Machine Learning Integration',
  'Cyber Security Concepts',
  'Network Engineering (OSPF, RIP)',
  'Game Development',
];

const DNA_CARDS = [
  { icon: Code2, title: 'Core Stack', desc: 'Python, Java, Spring Boot, MERN', color: 'text-accent-light' },
  { icon: Cpu, title: 'Next Gen', desc: 'AI & Machine Learning', color: 'text-iris' },
  { icon: Globe, title: 'Web Dev', desc: 'Scalable React systems', color: 'text-sky-glow' },
  { icon: ShieldCheck, title: 'Interests', desc: 'Cyber Security, Innovation', color: 'text-emerald-400' },
];

const CV_URL =
  'https://drive.google.com/file/d/1fKUmOiahHyCtY5J0KmwEKH05yOmuFUSd/view?usp=sharing';

const About: React.FC = () => {
  return (
    <section id="about" className="section relative">
      <div className="container-width">
        <SectionHeading
          eyebrow="About Me"
          title={<>Driven by <span className="text-gradient">curiosity</span> &amp; innovation</>}
          description="Bridging pure software engineering with scientific principles through a rare double-degree journey."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: portrait + focus */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="group relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-accent/30 via-iris/20 to-transparent opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-90" />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-850">
                <img
                  src="/assets/images/profile.png"
                  alt="Rusira Sandul"
                  className="aspect-[4/5] w-full object-cover"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.src =
                      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect fill="%23101019" width="400" height="500"/><text x="50%" y="48%" fill="%23a78bfa" font-size="22" text-anchor="middle" font-family="Arial">Add your photo</text><text x="50%" y="55%" fill="%2371717a" font-size="13" text-anchor="middle" font-family="Arial">public/assets/images/profile.png</text></svg>';
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="mb-4 font-display text-lg font-semibold text-white">
                Current Focus
              </h3>
              <ul className="space-y-3">
                {FOCUS_LIST.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: narrative + dna */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="space-y-5 text-base leading-relaxed text-zinc-400 sm:text-lg">
              <p>
                I am a <span className="text-zinc-100">Computer Science undergraduate</span> pursuing a
                rare <span className="text-accent-light">double-degree path</span> — simultaneously reading
                for a <span className="text-zinc-100">BSc in Computer Science</span> at the University of
                Westminster and a <span className="text-zinc-100">BSc in Physical Science</span> at the
                University of Sri Jayewardenepura.
              </p>
              <p>
                My passion lies in <span className="text-zinc-100">problem-solving</span> through technology.
                While I&apos;m grounded in core languages like Python and Java, I&apos;m constantly pushing into
                emerging fields like <span className="text-zinc-100">AI, Machine Learning</span>, and
                <span className="text-zinc-100"> Cybersecurity</span>.
              </p>
              <p>
                I don&apos;t just write code — I look for opportunities to connect with like-minded people and
                build systems that make a tangible impact.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary">
                Let&apos;s Connect
                <ArrowUpRight size={17} />
              </a>
              <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Download size={16} />
                Download CV
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {DNA_CARDS.map(({ icon: Icon, title, desc, color }) => (
                <div
                  key={title}
                  className="glass glass-hover group rounded-2xl p-5"
                >
                  <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <Icon size={20} className={color} />
                  </div>
                  <h4 className="font-display text-sm font-semibold text-white">{title}</h4>
                  <p className="mt-1 text-sm text-zinc-500">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
