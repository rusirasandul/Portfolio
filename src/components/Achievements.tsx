import { motion } from 'framer-motion';
import { Heart, Eye, Linkedin, Award } from 'lucide-react';

interface AchievementPost {
  id: number;
  organization: string;
  category: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
  stats: { views: string; likes: string };
  link: string;
  icon: React.ReactNode;
}

// --- DATA: Your Real Achievements ---
const ACHIEVEMENT_POSTS: AchievementPost[] = [
  {
    id: 1,
    organization: "AlgoArena 2025",
    category: "Leadership",
    title: "Project Co-Chair",
    date: "January 17, 2025",
    content: "Successfully organized and led 'AlgoArena', a major inter-university mobile app development competition, in collaboration with the Leo Club and IEEE Student Branch.",
    tags: ["#Leadership", "#AlgoArena", "#USJ"],
    stats: { views: "2.1k", likes: "112" },
    link: "https://linkedin.com/in/rusirasandul", 
    icon: <Award size={20} className="text-yellow-400" />
  },
  {
    id: 2,
    organization: "IEEE CS Student Branch",
    category: "Leadership",
    title: "Project Chairperson - Beauty of Cloud 1.0",
    date: "February 2025 - August 2025",
    content: "Directed a comprehensive cloud computing awareness project under the IEEE CS Student Branch at USJ. Created educational content, organized workshops, and led the team in promoting cloud technologies among students.",
    tags: ["#CloudComputing", "#IEEE", "#Education"],
    stats: { views: "1.8k", likes: "94" },
    link: "https://linkedin.com/in/rusirasandul", 
    icon: <Award size={20} className="text-blue-400" />
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 bg-slate-950 text-slate-200 relative overflow-hidden">
      
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Simple, Clean Header */}
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl font-bold flex items-center gap-3"
          >
            <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
            Achievements <span className="text-slate-600">&</span> Recognition
          </motion.h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENT_POSTS.map((post, index) => (
            <AchievementCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const AchievementCard = ({ post, index }: { post: AchievementPost; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all hover:-translate-y-1"
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-slate-700 transition-colors">
            {post.icon}
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">{post.organization}</h3>
            <p className="text-xs text-cyan-500 font-mono">{post.category}</p>
          </div>
        </div>
        <a href={post.link} className="text-slate-600 hover:text-cyan-400 transition-colors">
          <Linkedin size={18} />
        </a>
      </div>

      {/* Content */}
      <h4 className="font-semibold text-lg mb-2 text-slate-200 group-hover:text-cyan-400 transition-colors">
        {post.title}
      </h4>
      <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-4">
        {post.content}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
        <span className="text-xs text-slate-500">{post.date}</span>
        <div className="flex gap-3 text-xs text-slate-500">
           <span className="flex items-center gap-1"><Eye size={12}/> {post.stats.views}</span>
           <span className="flex items-center gap-1"><Heart size={12}/> {post.stats.likes}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Achievements;
