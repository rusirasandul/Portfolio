import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const codeSnippet = `const developer = {
  name: "Rusira Sandul",
  focus: ["AI", "Engineering"],
  mission: "Build scalable software"
};`;

  return (
    <section className="min-h-screen flex items-center justify-center section-padding pt-32">
      <div className="container-width">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-accent font-mono text-sm mb-4"
            >
              Hi, I'm
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Rusira Sandul
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-400 mb-8 leading-relaxed"
            >
              I build scalable software and explore the intersection of AI and Engineering.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-accent hover:bg-accent-dark text-slate-900 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                View Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-slate-900 font-semibold rounded-lg transition-all duration-300"
              >
                Contact Me
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden md:block"
          >
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-slate-300">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
