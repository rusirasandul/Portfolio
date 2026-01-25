import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';

// --- YOUR LINKEDIN POST IDs (Extracted from URLs) ---
const POST_IDS = [
  "7418240089471778816", // AlgoArena 2025
  "7391081779711033344", // Aurora 2025
  "7365634360898695169", // Beauty of Cloud Hackathon
  "7328475828961378304", // IEEE USJ
  "7308171524920745984", // Pixel Event
  "7306509454324219905", // Cyber Summit 25
  "7299672042600046592", // Data Science & ML
  "7297098846801641472", // Postman API
  "7296970439954767872", // Pixel Event 2
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 bg-slate-950 text-slate-200 relative overflow-hidden" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-rule='evenodd' stroke='%2306b6d4' fill='none' stroke-opacity='0.05'/%3E%3C/svg%3E")`,
      backgroundSize: '60px 60px'
    }}>
      
      {/* LinkedIn Blue Glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#0077b5]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Header */}
        <div className="mb-16 flex items-center gap-4">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 shadow-[0_0_15px_rgba(0,119,181,0.2)]">
            <Linkedin size={32} className="text-[#0077b5]" />
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-100">
              Live <span className="text-[#0077b5]">Feed</span>
            </h2>
            <p className="text-slate-400 mt-2">
              Recent updates and achievements from my professional network
            </p>
          </div>
        </div>

        {/* Grid of LinkedIn Embeds */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POST_IDS.map((id, index) => (
            <LinkedInEmbedCard key={id} id={id} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

// Smart Component that builds the LinkedIn embed URL
const LinkedInEmbedCard = ({ id, index }: { id: string; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      viewport={{ once: true }}
      className="rounded-xl overflow-hidden shadow-lg border border-slate-800 bg-white hover:shadow-[0_0_20px_rgba(0,119,181,0.3)] transition-all"
    >
      <iframe 
        src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${id}`}
        height="550"
        width="100%" 
        frameBorder="0" 
        allowFullScreen
        title={`LinkedIn post ${id}`}
        className="w-full h-[550px]"
      />
    </motion.div>
  );
};

export default Achievements;
