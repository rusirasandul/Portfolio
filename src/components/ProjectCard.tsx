import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  github: string;
  demo: string;
  index: number;
}

const ProjectCard = ({ title, description, techStack, github, demo, index }: ProjectCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 flex flex-col h-full hover:border-accent/50 transition-all duration-300"
    >
      <h3 className="text-2xl font-bold mb-3 text-slate-100">{title}</h3>
      <p className="text-slate-400 mb-4 flex-grow leading-relaxed">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.map((tech, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-slate-700/50 text-accent text-sm rounded-full font-mono"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex gap-4">
        <a
          href={github}
          className="text-slate-300 hover:text-accent transition-colors flex items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Code
        </a>
        <a
          href={demo}
          className="text-slate-300 hover:text-accent transition-colors flex items-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Demo
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
