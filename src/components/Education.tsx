import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, BookOpen } from 'lucide-react';

const EDUCATION_DATA = [
  {
    id: 1,
    school: "University of Westminster",
    sub: "(Affiliated with IIT Campus)",
    degree: "BSc (Hons) in Computer Science",
    period: "Sep 2023 - Apr 2027",
    status: "Reading",
    description: "Primary specialized degree focusing on Software Engineering, Full Stack Development, and Data Science.",
    activities: "IEEE Computer Society, IEEE Robotics & Automation Society",
    skills: ["Angular", "C#", "Node.js", "Spring Framework", "UML"],
    color: "cyan"
  },
  {
    id: 2,
    school: "University of Sri Jayewardenepura",
    sub: "",
    degree: "BASc in Physical Sciences",
    period: "Feb 2024 - Feb 2027",
    status: "Reading",
    description: "Concurrent degree providing a strong foundation in Mathematics, Physics, and Applied Sciences.",
    activities: "IEEE Student Branch, Astro Club, CS Association",
    skills: ["Applied Math", "C++", "Statistical Analysis", "Physics"],
    color: "blue"
  },
  {
    id: 3,
    school: "Rahula College",
    sub: "Matara",
    degree: "Primary & Secondary Education",
    period: "Jan 2007 - Aug 2021",
    status: "Completed",
    description: "Foundation of academic and extracurricular excellence.",
    activities: "Science Society, Scout Troop, Football Team, Cricket Team",
    skills: ["Chemistry", "Physics", "Mathematics"],
    color: "slate"
  }
];

interface TimelineItemProps {
  data: typeof EDUCATION_DATA[0];
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ data, index }) => {
  const isEven = index % 2 === 0;

  const colorClasses = {
    cyan: { dot: 'bg-cyan-400', border: 'border-cyan-500/50 hover:border-cyan-400/50', text: 'text-cyan-400' },
    blue: { dot: 'bg-blue-400', border: 'border-blue-500/50 hover:border-blue-400/50', text: 'text-blue-400' },
    slate: { dot: 'bg-slate-400', border: 'border-slate-500/50 hover:border-slate-400/50', text: 'text-slate-400' }
  };

  const colors = colorClasses[data.color as keyof typeof colorClasses];

  return (
    <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${isEven ? '' : 'text-right'}`}>
      
      {/* Timeline Dot */}
      <div className={`absolute left-0 md:left-1/2 w-10 h-10 -ml-5 md:-ml-5 bg-slate-900 border-2 ${colors.border} rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(6,182,212,0.4)] group-hover:scale-110 transition-transform`}>
        <div className={`w-3 h-3 rounded-full ${colors.dot} animate-pulse`}></div>
      </div>

      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className={`w-[calc(100%-3rem)] md:w-[45%] ml-14 md:ml-0 p-6 bg-slate-900/60 backdrop-blur-sm border border-slate-800 ${colors.border} rounded-xl transition-colors duration-300`}
      >
        {/* Date & Status */}
        <div className={`flex items-center gap-2 text-xs font-mono ${colors.text} mb-2 ${!isEven ? 'md:justify-end' : ''}`}>
          <Calendar size={14} />
          <span>{data.period}</span>
          <span className="px-2 py-0.5 bg-slate-800 rounded-full text-slate-400 border border-slate-700">
            {data.status}
          </span>
        </div>

        {/* Degree & School */}
        <h3 className="text-xl font-bold text-slate-100 mb-1">{data.school}</h3>
        {data.sub && <p className="text-sm text-slate-500 mb-2">{data.sub}</p>}
        <h4 className={`text-lg font-semibold ${colors.text} mb-3`}>{data.degree}</h4>

        {/* Description & Activities */}
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          {data.description}
        </p>
        
        {/* Skills Tags */}
        <div className={`flex flex-wrap gap-2 ${!isEven ? 'md:justify-end' : ''}`}>
          {data.skills.slice(0, 4).map(skill => (
             <span key={skill} className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
               {skill}
             </span>
          ))}
        </div>

        {/* Activities Note */}
        <div className={`mt-4 pt-4 border-t border-slate-800 flex items-start gap-2 text-xs text-slate-500 ${!isEven ? 'md:justify-end' : ''}`}>
           <BookOpen size={14} className="mt-0.5 shrink-0" />
           <span>{data.activities}</span>
        </div>

      </motion.div>
    </div>
  );
};

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-slate-950 text-slate-200 relative overflow-hidden hexagon-bg" id="education">
      <div className="container-width max-w-4xl">
        
        {/* Header */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <GraduationCap className="text-cyan-400" size={40} />
            Education
          </h2>
          <p className="text-slate-400 text-lg">
            A unique double-degree journey bridging Computer Science and Physical Sciences.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 md:before:left-1/2 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
          
          {EDUCATION_DATA.map((item, index) => (
            <TimelineItem key={item.id} data={item} index={index} />
          ))}

        </div>
      </div>
    </section>
  );
};

export default Education;
