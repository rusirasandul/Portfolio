import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Users, Calendar, MapPin } from 'lucide-react';
import SectionHeading from './SectionHeading';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  type?: string;
  location?: string;
  description: string;
  skills?: string[];
}

const PROFESSIONAL_DATA: ExperienceItem[] = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'BreachWall',
    period: 'Jan 2025 — Present',
    type: 'Full-time',
    location: 'Colombo (Hybrid)',
    description:
      'Contributing to core software architecture and SaaS solutions in a high-growth environment.',
    skills: ['SaaS', 'Client Requirements', 'Software Architecture'],
  },
  {
    id: 2,
    role: 'Brand Visibility Manager',
    company: 'Elegant Capitals',
    period: 'Jul 2025 — Present',
    type: 'Internship',
    location: 'Nugegoda (Hybrid)',
    description:
      'Managing brand presence and analyzing market trends to drive business insights and growth.',
    skills: ['Data Analysis', 'Market Awareness', 'Business Insights'],
  },
  {
    id: 3,
    role: 'Digital Marketing Intern',
    company: 'Procons Academy',
    period: 'Jun 2025 — Aug 2025',
    type: 'Internship',
    location: 'Colombo (Hybrid)',
    description: 'Supported web development initiatives and digital marketing strategies.',
    skills: ['Web Development', 'Marketing', 'Content Strategy'],
  },
];

const VOLUNTEERING_DATA: ExperienceItem[] = [
  {
    id: 1,
    role: 'Chairperson',
    company: 'IEEE Computer Society — USJ Student Branch',
    period: 'Feb 2026 — Present',
    description:
      'Leading the IEEE Computer Society Student Branch at USJ. Spearheading technical initiatives, organizing workshops, and fostering innovation in the student tech community.',
  },
  {
    id: 2,
    role: 'University Ambassador',
    company: 'G17 Global',
    period: 'Jul 2025 — Present',
    description:
      'Representing USJ for Industry, Innovation, and Infrastructure (SDG 9). Promoting sustainable development goals.',
  },
  {
    id: 3,
    role: 'Treasurer — Aurora 2026',
    company: 'Computer Science Association (USJ)',
    period: 'Nov 2025 — Present',
    description:
      'Managing finances and logistics for the Aurora 2026 conference. Leading budgeting and resource allocation for this major university event.',
  },
  {
    id: 4,
    role: 'Co-Chairperson',
    company: 'AlgoArena 1.0',
    period: 'Aug 2025 — Jan 2026',
    description:
      'Led the organizing committee for a major inter-university algorithm and coding competition. Coordinated logistics and technical coordination.',
  },
  {
    id: 5,
    role: 'Head of Finance — 4score 7.0 Project',
    company: 'Rotaract Club of USJ',
    period: 'Mar 2025 — May 2025',
    description:
      'Oversaw financial planning and fund management for the 4score 7.0 project, leading budgeting and financial reporting for community service initiatives.',
  },
  {
    id: 6,
    role: 'Project Chairperson',
    company: 'Beauty of Cloud 1.0',
    period: 'Feb 2025 — Aug 2025',
    description:
      'Directed a cloud computing awareness project under the IEEE CS Student Branch. Created educational content and organized workshops.',
  },
  {
    id: 7,
    role: 'Member',
    company: 'Leo Club of USJ',
    period: 'Oct 2025 — Present',
    description:
      'Active member contributing to community service and leadership development initiatives.',
  },
];

const TimelineView: React.FC<{ data: ExperienceItem[]; icon: React.ReactNode }> = ({
  data,
  icon,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.3 }}
    className="relative space-y-6 border-l border-white/10 pl-8"
  >
    {data.map((item, i) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: i * 0.05 }}
        className="group relative"
      >
        <span className="absolute -left-[39px] top-5 grid h-4 w-4 place-items-center rounded-full bg-ink-950 ring-2 ring-accent/50 transition-all group-hover:ring-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        </span>

        <div className="glass glass-hover rounded-2xl p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-white">{item.role}</h3>
              <div className="mt-1 flex items-center gap-2 text-sm font-medium text-accent-light">
                {icon}
                {item.company}
              </div>
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-400">
              <Calendar size={12} />
              {item.period}
            </span>
          </div>

          {(item.type || item.location) && (
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-zinc-500">
              {item.type && <span className="chip">{item.type}</span>}
              {item.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} /> {item.location}
                </span>
              )}
            </div>
          )}

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
            {item.description}
          </p>

          {item.skills && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.skills.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    ))}
  </motion.div>
);

const TABS = [
  { id: 'professional', label: 'Professional', icon: Briefcase },
  { id: 'volunteer', label: 'Leadership', icon: Users },
] as const;

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'professional' | 'volunteer'>('professional');

  return (
    <section id="experience" className="section relative">
      <div className="container-width max-w-4xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Experience"
            title={<>Where I&apos;ve <span className="text-gradient">made impact</span></>}
          />

          <div className="relative mb-12 flex rounded-full border border-white/10 bg-white/[0.03] p-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`relative z-10 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  activeTab === id ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {activeTab === id && (
                  <motion.span
                    layoutId="exp-tab"
                    className="absolute inset-0 rounded-full bg-accent/20 ring-1 ring-accent/40"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <Icon size={15} className="relative z-10" />
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait">
            {activeTab === 'professional' ? (
              <TimelineView
                key="professional"
                data={PROFESSIONAL_DATA}
                icon={<Briefcase size={15} />}
              />
            ) : (
              <TimelineView key="volunteer" data={VOLUNTEERING_DATA} icon={<Users size={15} />} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Experience;
