import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "Next.js", "Three.js", "Framer Motion", "Tailwind CSS", "TypeScript", "JavaScript", "HTML", "CSS"]
    },
    {
      title: "Backend",
      skills: ["Java", "Python", "C#", "JavaScript", "Node.js", "Nest.js", "Express", ".NET", "RESTful APIs"]
    },
    {
      title: "Database",
      skills: ["MySQL", "MongoDB", "PostgreSQL"]
    },
    {
      title: "Tools & Deployment",
      skills: ["Git", "Excel", "IntelliJ Idea", "VS Code", "Jira", "GitHub", "Postman"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <section id="skills" className="section-padding bg-slate-800/30">
      <div className="container-width">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-slate-400 text-lg mb-12">
            Technologies and tools I work with
          </p>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid md:grid-cols-2 gap-8"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-accent/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4 text-accent">{category.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-slate-700/50 text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
