import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Github, ExternalLink, Folder, Layers, Database, Cpu, Globe } from 'lucide-react';

interface ProjectLinks {
  github: string;
  live: string;
}

interface FlagshipProject {
  id: number;
  title: string;
  status: string;
  role?: string;
  tech: string[];
  description: string;
  links: ProjectLinks;
  icon: React.ReactNode;
}

interface ArchiveProject {
  id: number;
  title: string;
  desc: string;
  tech: string[];
  link: string;
}

// --- DATA: FLAGSHIP PROJECTS (Top Tier) ---
const FLAGSHIP_PROJECTS: FlagshipProject[] = [
  {
    id: 1,
    title: "Enterprise Event Management System",
    status: "Flagship",
    tech: ["Java 21", "Spring Boot 3.2", "Apache Kafka", "Redis", "PostgreSQL", "Microservices"],
    description: "A production-grade distributed system designed to handle 5,000+ concurrent users. Features an event-driven architecture with Kafka for asynchronous processing, Redis for millisecond-latency caching, and a QR-based real-time check-in system preventing fraud.",
    links: { github: "#", live: "#" },
    icon: <Cpu size={24} className="text-cyan-400" />
  },
  {
    id: 2,
    title: "UniSync",
    role: "CodeSprint X Semifinalist",
    status: "In Dev",
    tech: ["React.js", "Spring Boot", "PostgreSQL", "Microservices Planned"],
    description: "A comprehensive campus life platform connecting students. Selected as a Semifinalist at IIT's CodeSprint X. Currently transitioning from monolithic to microservice architecture to scale user interactions.",
    links: { github: "#", live: "#" },
    icon: <Globe size={24} className="text-blue-400" />
  },
  {
    id: 3,
    title: "RIS Model Predicting Algorithm",
    status: "Research",
    tech: ["Python", "Flask", "SciPy", "Machine Learning", "Data Modeling"],
    description: "An end-to-end epidemiological solution forecasting avian disease spread using the SIR (Susceptible-Infected-Recovered) model. Features a CLI predictor and a Flask web dashboard for real-time visualization of infection trajectories.",
    links: { github: "#", live: "#" },
    icon: <Database size={24} className="text-green-400" />
  },
  {
    id: 4,
    title: "Luna Rest: Sleep Tracking System",
    status: "AI/ML",
    tech: ["Machine Learning", "React", "Spring Boot", "Wearable Integration"],
    description: "AI-powered platform predicting sleep quality (1-10 scale) for undergraduates. Integrates with wearables to provide personalized recommendations and study schedule optimization based on rest data.",
    links: { github: "#", live: "#" },
    icon: <Layers size={24} className="text-purple-400" />
  }
];

// --- DATA: ARCHIVE PROJECTS (Compact) ---
const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    id: 5,
    title: "J'Pythors Data Analytics",
    desc: "NLP & Data Viz case study using Hugging Face models and Plotly Dash.",
    tech: ["Python", "Pandas", "NLP", "Dash"],
    link: "https://github.com/rusirasandul/J-Pythors-"
  },
  {
    id: 6,
    title: "Real-Time Ticketing System",
    desc: "Event ticketing simulation using Producer-Consumer pattern.",
    tech: ["Java", "Angular", "Concurrency"],
    link: "https://github.com/rusirasandul/Real-Time-Ticket-management-Syatem"
  },
  {
    id: 7,
    title: "Plane Management System",
    desc: "Java CLI application for booking seats and managing flight data.",
    tech: ["Java", "OOP", "File Handling"],
    link: "https://github.com/rusirasandul/Plane-Manegement-IIT"
  },
  {
    id: 8,
    title: "Personal Portfolio v1",
    desc: "Responsive portfolio site built for Client-Side Development module.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    link: "https://github.com/rusirasandul/Portfolio"
  },
  {
    id: 9,
    title: "Sustainable Energy Site",
    desc: "Group project website focusing on eco-friendly energy solutions.",
    tech: ["HTML", "CSS", "JS"],
    link: "https://github.com/rusirasandul/Shop-Website"
  },
  {
    id: 10,
    title: "Academic Credit Predictor",
    desc: "Python utility to calculate credits based on student marks.",
    tech: ["Python", "Logic"],
    link: "#"
  }
];

interface FlagshipCardProps {
  project: FlagshipProject;
  index: number;
}

// --- COMPONENT: FLAGSHIP CARD (Big) ---
const FlagshipCard: React.FC<FlagshipCardProps> = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
  >
    {/* Hover Glow */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
          {project.icon}
        </div>
        <span className="px-3 py-1 text-xs font-mono font-bold text-cyan-400 bg-cyan-950/30 rounded-full border border-cyan-900/50">
          {project.role || project.status}
        </span>
      </div>

      <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">
        {project.title}
      </h3>
      
      <p className="text-slate-400 mb-6 leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tech.map(t => (
          <span key={t} className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700/50">
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4">
        <a href={project.links.github} className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors">
          <Github size={18} /> Code
        </a>
        <a href={project.links.live} className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-cyan-400 transition-colors">
          <ExternalLink size={18} /> Live Demo
        </a>
      </div>
    </div>
  </motion.div>
);

interface ArchiveCardProps {
  project: ArchiveProject;
  index: number;
}

// --- COMPONENT: ARCHIVE CARD (Compact) ---
const ArchiveCard: React.FC<ArchiveCardProps> = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ delay: index * 0.05 }}
    viewport={{ once: true }}
    className="bg-slate-900/50 border border-slate-800 p-5 rounded-lg hover:bg-slate-800 transition-colors group"
  >
    <div className="flex justify-between items-start mb-2">
      <h4 className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
        {project.title}
      </h4>
      <a href={project.link} className="text-slate-600 hover:text-cyan-400 transition-colors">
        <Github size={16} />
      </a>
    </div>
    <p className="text-sm text-slate-500 mb-3 line-clamp-2">{project.desc}</p>
    <div className="flex flex-wrap gap-2">
      {project.tech.map(t => (
        <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
          {t}
        </span>
      ))}
    </div>
  </motion.div>
);

const Projects: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-slate-950 text-slate-200 relative overflow-hidden" id="projects" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-rule='evenodd' stroke='%2306b6d4' fill='none' stroke-opacity='0.05'/%3E%3C/svg%3E")`,
      backgroundSize: '60px 60px'
    }}>
      
      {/* Background Grid Decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

      <div className="container-width max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <motion.h2 
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-4"
          >
            <Folder className="text-cyan-400" size={40} />
            System <span className="text-slate-600">Protocols</span>
          </motion.h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            A collection of deployed systems, research algorithms, and architectural experiments.
          </p>
        </div>

        {/* --- SECTION 1: FLAGSHIP GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {FLAGSHIP_PROJECTS.map((project, index) => (
            <FlagshipCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* --- SECTION 2: ARCHIVES HEADER --- */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px bg-slate-800 flex-1"></div>
          <span className="text-slate-500 font-mono text-sm uppercase tracking-widest">Development Archives</span>
          <div className="h-px bg-slate-800 flex-1"></div>
        </div>

        {/* --- SECTION 3: ARCHIVES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARCHIVE_PROJECTS.map((project, index) => (
            <ArchiveCard key={project.id} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
