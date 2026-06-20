import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Cpu, Globe, Database, Layers, ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';

interface FlagshipProject {
  id: number;
  title: string;
  status: string;
  role?: string;
  tech: string[];
  description: string;
  links: { github: string; live: string };
  icon: React.ReactNode;
}

interface ArchiveProject {
  id: number;
  title: string;
  desc: string;
  tech: string[];
  link: string;
}

const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    id: 1,
    title: 'Enterprise Event Management System',
    status: 'Flagship',
    tech: ['Java 21', 'Spring Boot 3.2', 'Apache Kafka', 'Redis', 'PostgreSQL', 'Microservices'],
    description:
      'A production-grade distributed system designed to handle 5,000+ concurrent users. Event-driven architecture with Kafka for async processing, Redis for millisecond-latency caching, and a QR-based real-time check-in system preventing fraud.',
    links: { github: '#', live: '#' },
    icon: <Cpu size={22} className="text-accent-light" />,
  },
  {
    id: 2,
    title: 'UniSync',
    role: 'CodeSprint X Semifinalist',
    status: 'In Dev',
    tech: ['React.js', 'Spring Boot', 'PostgreSQL', 'Microservices Planned'],
    description:
      'A comprehensive campus life platform connecting students. Selected as a Semifinalist at IIT\u2019s CodeSprint X. Currently transitioning from monolithic to microservice architecture to scale user interactions.',
    links: { github: '#', live: '#' },
    icon: <Globe size={22} className="text-sky-glow" />,
  },
  {
    id: 3,
    title: 'RIS Model Predicting Algorithm',
    status: 'Research',
    tech: ['Python', 'Flask', 'SciPy', 'Machine Learning', 'Data Modeling'],
    description:
      'An end-to-end epidemiological solution forecasting avian disease spread using the SIR model. Features a CLI predictor and a Flask web dashboard for real-time visualization of infection trajectories.',
    links: { github: '#', live: '#' },
    icon: <Database size={22} className="text-emerald-400" />,
  },
  {
    id: 4,
    title: 'Luna Rest: Sleep Tracking System',
    status: 'AI / ML',
    tech: ['Machine Learning', 'React', 'Spring Boot', 'Wearable Integration'],
    description:
      'AI-powered platform predicting sleep quality (1\u201310 scale) for undergraduates. Integrates with wearables to provide personalized recommendations and study schedule optimization based on rest data.',
    links: { github: '#', live: '#' },
    icon: <Layers size={22} className="text-iris" />,
  },
];

const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    id: 5,
    title: "J'Pythors Data Analytics",
    desc: 'NLP & Data Viz case study using Hugging Face models and Plotly Dash.',
    tech: ['Python', 'Pandas', 'NLP', 'Dash'],
    link: 'https://github.com/rusirasandul/J-Pythors-',
  },
  {
    id: 6,
    title: 'Real-Time Ticketing System',
    desc: 'Event ticketing simulation using the Producer-Consumer pattern.',
    tech: ['Java', 'Angular', 'Concurrency'],
    link: 'https://github.com/rusirasandul/Real-Time-Ticket-management-Syatem',
  },
  {
    id: 7,
    title: 'Plane Management System',
    desc: 'Java CLI application for booking seats and managing flight data.',
    tech: ['Java', 'OOP', 'File Handling'],
    link: 'https://github.com/rusirasandul/Plane-Manegement-IIT',
  },
  {
    id: 8,
    title: 'Personal Portfolio v1',
    desc: 'Responsive portfolio site built for the Client-Side Development module.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    link: 'https://github.com/rusirasandul/Portfolio',
  },
  {
    id: 9,
    title: 'Sustainable Energy Site',
    desc: 'Group project website focusing on eco-friendly energy solutions.',
    tech: ['HTML', 'CSS', 'JS'],
    link: 'https://github.com/rusirasandul/Shop-Website',
  },
  {
    id: 10,
    title: 'Academic Credit Predictor',
    desc: 'Python utility to calculate credits based on student marks.',
    tech: ['Python', 'Logic'],
    link: '#',
  },
];

const FlagshipCard: React.FC<{ project: FlagshipProject; index: number }> = ({
  project,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="group glass glass-hover relative overflow-hidden rounded-3xl p-7"
  >
    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

    <div className="relative z-10">
      <div className="mb-5 flex items-start justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] transition-colors group-hover:border-accent/30">
          {project.icon}
        </div>
        <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs font-semibold text-accent-light">
          {project.role || project.status}
        </span>
      </div>

      <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-accent-light">
        {project.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>

      <div className="mt-6 flex gap-5 border-t border-white/[0.06] pt-5">
        <a
          href={project.links.github}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 transition-colors hover:text-accent-light"
        >
          <Github size={17} /> Code
        </a>
        <a
          href={project.links.live}
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 transition-colors hover:text-accent-light"
        >
          <ExternalLink size={17} /> Live Demo
        </a>
      </div>
    </div>
  </motion.div>
);

const ArchiveCard: React.FC<{ project: ArchiveProject; index: number }> = ({
  project,
  index,
}) => (
  <motion.a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    className="group glass glass-hover flex flex-col rounded-2xl p-5"
  >
    <div className="mb-2 flex items-start justify-between gap-2">
      <h4 className="font-display font-semibold text-zinc-100 transition-colors group-hover:text-accent-light">
        {project.title}
      </h4>
      <ArrowUpRight
        size={16}
        className="shrink-0 text-zinc-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-light"
      />
    </div>
    <p className="mb-4 line-clamp-2 text-sm text-zinc-500">{project.desc}</p>
    <div className="mt-auto flex flex-wrap gap-1.5">
      {project.tech.map((t) => (
        <span
          key={t}
          className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-[11px] text-zinc-400"
        >
          {t}
        </span>
      ))}
    </div>
  </motion.a>
);

const Projects: React.FC = () => {
  return (
    <section id="projects" className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-faint bg-[size:46px_46px] [mask-image:radial-gradient(ellipse_50%_40%_at_50%_0%,#000_60%,transparent_100%)] opacity-50" />

      <div className="container-width">
        <SectionHeading
          eyebrow="Selected Work"
          title={<>Things I&apos;ve <span className="text-gradient">designed &amp; built</span></>}
          description="A collection of deployed systems, research algorithms, and architectural experiments."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {FLAGSHIP_PROJECTS.map((project, index) => (
            <FlagshipCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="my-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/[0.08]" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
            Development Archives
          </span>
          <div className="h-px flex-1 bg-white/[0.08]" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ARCHIVE_PROJECTS.map((project, index) => (
            <ArchiveCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
