import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Users, Calendar } from 'lucide-react';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  type?: string;
  location?: string;
  description: string;
  skills?: string[];
  color: string;
}

// --- DATA: PROFESSIONAL EXPERIENCE ---
const PROFESSIONAL_DATA: ExperienceItem[] = [
  {
    id: 1,
    role: "Software Engineer",
    company: "BreachWall",
    period: "Jan 2025 - Present",
    type: "Full-time",
    location: "Colombo (Hybrid)",
    description: "Contributing to core software architecture and SaaS solutions in a high-growth environment.",
    skills: ["SaaS", "Client Requirements", "Software Architecture"],
    color: "cyan"
  },
  {
    id: 2,
    role: "Brand Visibility Manager",
    company: "Elegant Capitals",
    period: "Jul 2025 - Present",
    type: "Internship",
    location: "Nugegoda (Hybrid)",
    description: "Managing brand presence and analyzing market trends to drive business insights and growth.",
    skills: ["Data Analysis", "Market Awareness", "Business Insights"],
    color: "cyan"
  },
  {
    id: 3,
    role: "Digital Marketing Intern",
    company: "Procons Academy",
    period: "Jun 2025 - Aug 2025",
    type: "Internship",
    location: "Colombo (Hybrid)",
    description: "Supported web development initiatives and digital marketing strategies.",
    skills: ["Web Development", "Marketing", "Content Strategy"],
    color: "slate"
  }
];

// --- DATA: VOLUNTEERING & LEADERSHIP ---
const VOLUNTEERING_DATA: ExperienceItem[] = [
  {
    id: 1,
    role: "University Ambassador",
    company: "G17 Global",
    period: "Jul 2025 - Present",
    description: "Representing USJ for Industry, Innovation, and Infrastructure (SDG 9). Promoting sustainable development goals.",
    color: "purple"
  },
  {
    id: 2,
    role: "Treasurer - Aurora 2026",
    company: "Computer Science Association (USJ)",
    period: "Nov 2025 - Present",
    description: "Managing finances and logistics for the Aurora 2026 conference. Leading the budgeting and resource allocation for this major university event.",
    color: "purple"
  },
  {
    id: 3,
    role: "Co-Chairperson",
    company: "AlgoArena 1.0",
    period: "Aug 2025 - Jan 2026",
    description: "Led the organizing committee for a major inter-university algorithm and coding competition. Coordinated logistics and technical coordination.",
    color: "purple"
  },
  {
    id: 4,
    role: "Industry Relation Committee Member",
    company: "IEEE CS Student Branch (USJ)",
    period: "Jan 2025 - Present",
    description: "Bridging the gap between the university student body and industry professionals. Organizing industry talks and networking events.",
    color: "purple"
  },
  {
    id: 5,
    role: "Head of Finance",
    company: "Rotaract Club of USJ",
    period: "Mar 2025 - May 2025",
    description: "Oversaw financial planning and fund management for club projects and community service initiatives.",
    color: "slate"
  },
  {
    id: 6,
    role: "Project Chairperson",
    company: "Beauty of Cloud 1.0",
    period: "Feb 2025 - Aug 2025",
    description: "Directed a cloud computing awareness project under the IEEE CS Student Branch. Created educational content and organized workshops.",
    color: "slate"
  },
  {
    id: 7,
    role: "Member",
    company: "Leo Club of USJ",
    period: "Oct 2025 - Present",
    description: "Active member contributing to community service and leadership development initiatives.",
    color: "slate"
  }
];

interface TimelineViewProps {
  data: ExperienceItem[];
  icon: React.ReactNode;
}

const TimelineView: React.FC<TimelineViewProps> = ({ data, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 pl-4 md:pl-0"
    >
      {data.map((item) => (
        <div key={item.id} className="relative group md:w-3/4 mx-auto border-l-2 border-slate-800 pl-8 pb-8 last:pb-0 last:border-0">
          
          {/* Timeline Node */}
          <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-500/50 group-hover:scale-125 group-hover:bg-cyan-500 transition-all duration-300"></div>

          {/* Card Content */}
          <div className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-xl hover:bg-slate-900 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden">
            
            {/* Subtle glow effect on hover */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  {item.role}
                </h3>
                <div className="text-cyan-400 font-medium flex items-center gap-2 text-sm mt-1">
                  {icon}
                  {item.company}
                </div>
              </div>
              
              <div className="text-xs font-mono text-slate-500 bg-slate-950/50 px-3 py-1 rounded-full border border-slate-800 flex items-center gap-2 whitespace-nowrap">
                <Calendar size={12} />
                {item.period}
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-2xl">
              {item.description}
            </p>

            {/* Skills / Tags */}
            {item.skills && (
              <div className="flex flex-wrap gap-2">
                {item.skills.map(skill => (
                  <span key={skill} className="text-xs px-2 py-1 bg-slate-800/50 text-slate-400 rounded border border-slate-700/50">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'professional' | 'volunteer'>('professional');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-slate-950 text-slate-200 relative" id="experience" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-rule='evenodd' stroke='%2306b6d4' fill='none' stroke-opacity='0.05'/%3E%3C/svg%3E")`,
      backgroundSize: '60px 60px'
    }}>
      <div className="container-width max-w-5xl">
        
        {/* Header & Toggle Switch */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <motion.h2 
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="text-4xl md:text-5xl font-bold flex items-center gap-3"
          >
            <Briefcase className="text-cyan-400" size={40} />
            Experience <span className="text-slate-600">&</span> Leadership
          </motion.h2>

          {/* Custom Toggle Switch */}
          <div className="flex bg-slate-900/80 p-1 rounded-lg border border-slate-800 relative">
            {/* The sliding background */}
            <motion.div 
              className="absolute top-1 bottom-1 bg-cyan-900/40 rounded-md border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
              layoutId="activeTabBackground"
              initial={false}
              animate={{
                left: activeTab === 'professional' ? '4px' : '50%',
                width: 'calc(50% - 4px)',
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
            
            <button
              onClick={() => setActiveTab('professional')}
              className={`relative z-10 px-6 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'professional' ? 'text-cyan-100' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Professional
            </button>
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`relative z-10 px-6 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === 'volunteer' ? 'text-cyan-100' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Leadership
            </button>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'professional' ? (
              <TimelineView key="professional" data={PROFESSIONAL_DATA} icon={<Briefcase size={16} />} />
            ) : (
              <TimelineView key="volunteer" data={VOLUNTEERING_DATA} icon={<Users size={16} />} />
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Experience;
