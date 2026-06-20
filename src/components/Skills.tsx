import { motion } from 'framer-motion';
import { Layout, Server, Database, Wrench } from 'lucide-react';
import SectionHeading from './SectionHeading';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    icon: Layout,
    color: 'text-accent-light',
    skills: ['React', 'Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Backend',
    icon: Server,
    color: 'text-iris',
    skills: ['Java', 'Spring Boot', 'Python', 'C#', 'Node.js', 'Nest.js', 'Express', '.NET', 'RESTful APIs'],
  },
  {
    title: 'Database',
    icon: Database,
    color: 'text-emerald-400',
    skills: ['MySQL', 'MongoDB', 'PostgreSQL'],
  },
  {
    title: 'Tools & Deployment',
    icon: Wrench,
    color: 'text-sky-glow',
    skills: ['Git', 'GitHub', 'IntelliJ IDEA', 'VS Code', 'Jira', 'Postman', 'Excel'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section relative">
      <div className="container-width">
        <SectionHeading
          eyebrow="Skills & Expertise"
          title={<>My <span className="text-gradient">technical toolkit</span></>}
          description="Technologies and tools I reach for to design, build, and ship."
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SKILL_CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass glass-hover rounded-3xl p-7"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.03]">
                    <Icon size={20} className={category.color} />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ y: -2 }}
                      className="cursor-default rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-accent/40 hover:text-white"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
