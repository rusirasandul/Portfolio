import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-slate-800/30">
      <div className="container-width">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p className="text-lg">
                I'm a <span className="text-accent font-semibold">Software Engineer</span> and{' '}
                <span className="text-accent font-semibold">Computer Science Undergraduate</span> at the 
                University of Sri Jayewardenepura, where I balance academic excellence with practical application.
              </p>
              
              <p className="text-lg">
                My expertise spans the <span className="text-accent">MERN Stack</span> (MongoDB, Express, React, Node.js), 
                along with Python and Java. I'm passionate about building scalable applications while exploring 
                cutting-edge technologies in <span className="text-accent">AI/Machine Learning</span>, 
                <span className="text-accent"> Cyber Security</span>, and <span className="text-accent">Network Engineering</span>.
              </p>
              
              <p className="text-lg">
                Beyond coding, I'm actively involved in leadership roles with the{' '}
                <span className="text-accent font-semibold">Leo Club</span> and{' '}
                <span className="text-accent font-semibold">IEEE Student Branch at USJ</span>, 
                where I help organize technical events and foster a collaborative learning environment.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-accent">Current Focus</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start">
                    <span className="text-accent mr-3">▹</span>
                    <span>Full-stack Development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3">▹</span>
                    <span>AI/Machine Learning Integration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3">▹</span>
                    <span>Cyber Security Concepts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3">▹</span>
                    <span>Network Engineering (OSPF, RIP)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent mr-3">▹</span>
                    <span>Game Development</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
