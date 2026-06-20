import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';
import SectionHeading from './SectionHeading';

const EDUCATION_DATA = [
  {
    id: 1,
    school: 'University of Westminster',
    sub: 'Affiliated with IIT Campus',
    degree: 'BSc (Hons) in Computer Science',
    period: 'Sep 2023 — Apr 2027',
    status: 'Reading',
    description:
      'Primary specialized degree focusing on Software Engineering, Full Stack Development, and Data Science.',
    activities: 'IEEE Computer Society, IEEE Robotics & Automation Society',
    skills: ['Angular', 'C#', 'Node.js', 'Spring Framework', 'UML'],
  },
  {
    id: 2,
    school: 'University of Sri Jayewardenepura',
    sub: '',
    degree: 'BSc in Physical Science',
    period: 'Feb 2024 — Feb 2027',
    status: 'Reading',
    description:
      'Concurrent degree providing a strong foundation in Mathematics, Physics, and Applied Sciences.',
    activities: 'IEEE Student Branch, Astro Club, CS Association',
    skills: ['Applied Math', 'C++', 'Statistical Analysis', 'Physics'],
  },
  {
    id: 3,
    school: 'Rahula College',
    sub: 'Matara',
    degree: 'Primary & Secondary Education',
    period: 'Jan 2007 — Aug 2021',
    status: 'Completed',
    description: 'Foundation of academic and extracurricular excellence.',
    activities: 'Science Society, Scout Troop, Football Team, Cricket Team',
    skills: ['Chemistry', 'Physics', 'Mathematics'],
  },
];

const Education: React.FC = () => {
  return (
    <section id="education" className="section relative">
      <div className="container-width max-w-4xl">
        <SectionHeading
          eyebrow="Education"
          title={<>A double-degree <span className="text-gradient">journey</span></>}
          description="Bridging Computer Science and Physical Science across two universities, simultaneously."
          align="center"
        />

        <div className="relative pl-8 sm:pl-0">
          {/* vertical line */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-gradient-to-b from-accent/50 via-white/10 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-8">
            {EDUCATION_DATA.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`relative sm:flex sm:items-center sm:gap-8 ${
                    isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* node */}
                  <span className="absolute left-[-25px] top-6 grid h-4 w-4 place-items-center rounded-full bg-ink-950 ring-2 ring-accent/60 sm:left-1/2 sm:-translate-x-1/2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>

                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                    className="glass glass-hover w-full rounded-2xl p-6 sm:w-[calc(50%-2rem)]"
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-light">
                        <Calendar size={13} />
                        {item.period}
                      </span>
                      <span className="chip">{item.status}</span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white">{item.school}</h3>
                    {item.sub && <p className="text-xs text-zinc-500">{item.sub}</p>}
                    <p className="mt-1 text-sm font-semibold text-accent-light">{item.degree}</p>

                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span key={skill} className="chip">{skill}</span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-start gap-2 border-t border-white/[0.06] pt-4 text-xs text-zinc-500">
                      <BookOpen size={13} className="mt-0.5 shrink-0" />
                      <span>{item.activities}</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-zinc-500">
          <GraduationCap size={18} className="text-accent-light" />
          <span className="text-sm">Continuously learning, always building.</span>
        </div>
      </div>
    </section>
  );
};

export default Education;
