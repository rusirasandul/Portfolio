import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "AlgoArena",
      description: "An inter-university coding competition platform that brings together aspiring developers to compete, learn, and grow their algorithmic problem-solving skills.",
      techStack: ["React", "Node.js", "MongoDB", "Express"],
      github: "#",
      demo: "#"
    },
    {
      title: "Elegant Capitals",
      description: "A sophisticated corporate website built with React, featuring modern design principles and responsive layouts for optimal user experience.",
      techStack: ["React", "Tailwind CSS", "JavaScript"],
      github: "#",
      demo: "#"
    },
    {
      title: "Prestige Studios",
      description: "A comprehensive digital marketing agency website showcasing services, portfolio, and client testimonials with dynamic content management.",
      techStack: ["React", "CSS3", "Node.js"],
      github: "#",
      demo: "#"
    },
    {
      title: "Aurora 2026",
      description: "A conference event platform featuring sessions on social engineering and agentic AI, with real-time scheduling and participant management.",
      techStack: ["React", "Firebase", "AI Integration"],
      github: "#",
      demo: "#"
    },
    {
      title: "Midwife & Baby Care System",
      description: "A healthcare management system designed to streamline midwife operations, patient records, and baby care tracking with secure data handling.",
      techStack: ["Java", "SQL", "JavaFX"],
      github: "#",
      demo: "#"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container-width">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-slate-400 text-lg mb-12">
            A selection of my recent work and contributions
          </p>
          
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
