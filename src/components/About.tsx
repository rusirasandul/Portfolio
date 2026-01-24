import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Cpu, Globe, Zap } from 'lucide-react';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, desc }) => (
  <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-cyan-500/30 transition-colors group">
    <div className="mb-4 bg-slate-950 w-12 h-12 rounded-lg flex items-center justify-center border border-slate-800 group-hover:border-cyan-500/50 transition-colors">
      {icon}
    </div>
    <h3 className="text-slate-200 font-bold mb-1">{title}</h3>
    <p className="text-slate-500 text-sm">{desc}</p>
  </div>
);

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-slate-800/30 text-slate-200 relative overflow-hidden" id="about">
      
      {/* Background Tech Elements */}
      <div className="absolute top-20 left-10 text-slate-900 opacity-10 pointer-events-none text-9xl font-bold select-none">
        01
      </div>

      <div className="container-width max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Photo */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Photo Container with Glow Effect */}
            <div className="relative group">
              {/* Cyan Glow Background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500"></div>
              
              {/* Photo */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-cyan-500/30 group-hover:border-cyan-400/50 transition-all duration-500">
                <img 
                  src="/assets/images/profile.png" 
                  alt="Rusira Sandul"
                  className="w-full aspect-square object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect fill="%23334155" width="400" height="400"/><text x="50%" y="50%" fill="%2394a3b8" font-size="20" text-anchor="middle" dominant-baseline="middle" font-family="Arial">Add your photo to<tspan x="50%" dy="25">public/assets/images/profile.jpg</tspan></text></svg>';
                  }}
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Current Focus Card */}
            <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">Current Focus</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span>Full-stack Development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span>AI/Machine Learning Integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span>Cyber Security Concepts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span>Network Engineering (OSPF, RIP)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-3">▹</span>
                  <span>Game Development</span>
                </li>
              </ul>
            </div>
          </motion.div>


          {/* Right Column: The Narrative & Tech DNA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-12 bg-cyan-500"></span>
              <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">
                Profile Architecture
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight">
              Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Curiosity</span> <br />
              & Innovation.
            </h2>

            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                I am a <strong className="text-slate-200">Computer Science Undergraduate</strong> pursuing a rare <span className="text-cyan-300 font-semibold">double-degree path</span>. 
                I bridge the gap between pure software engineering and scientific principles, simultaneously reading for a <strong className="text-slate-200">BSc in Computer Science</strong> at the <em className="text-slate-300">University of Westminster</em> and a <strong className="text-slate-200">BASc in Physical Sciences</strong> at the <em className="text-slate-300">University of Sri Jayewardenepura</em>.
              </p>
              
              <p>
                My passion lies in <strong className="text-slate-200">problem-solving</strong> through technology. While I am skilled in core languages like <strong className="text-slate-200">Python</strong> and <strong className="text-slate-200">Java</strong>, I am constantly pushing my boundaries into emerging fields like <strong className="text-slate-200">AI, Machine Learning</strong>, and <strong className="text-slate-200">Cybersecurity</strong>.
              </p>

              <p>
                I don't just write code; I look for opportunities to connect with like-minded individuals and build systems that make a tangible impact.
              </p>
            </div>

            {/* Resume / Connect Buttons */}
            <div className="flex gap-4 flex-wrap pt-4">
              <a 
                href="#contact" 
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md font-semibold transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)]"
              >
                Let's Connect
              </a>
              <a 
                href="/resume.pdf" 
                className="px-8 py-3 border border-slate-700 text-slate-300 hover:border-cyan-500 hover:text-cyan-400 rounded-md transition-all"
              >
                Download CV
              </a>
            </div>

            {/* Tech DNA Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <InfoCard 
                icon={<Code size={32} className="text-cyan-400" />}
                title="Core Stack"
                desc="Python, Java, MERN Stack"
              />
              <InfoCard 
                icon={<Cpu size={32} className="text-purple-400" />}
                title="Next Gen"
                desc="AI, Machine Learning"
              />
              <InfoCard 
                icon={<Globe size={32} className="text-blue-400" />}
                title="Web Dev"
                desc="Scalable React Systems"
              />
              <InfoCard 
                icon={<Zap size={32} className="text-yellow-400" />}
                title="Interests"
                desc="Cyber Security, Innovation"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
