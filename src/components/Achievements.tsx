import { motion } from 'framer-motion';
import { Linkedin, ExternalLink } from 'lucide-react';
import SectionHeading from './SectionHeading';

const POST_IDS = [
  '7418240089471778816',
  '7391081779711033344',
  '7365634360898695169',
  '7328475828961378304',
  '7308171524920745984',
  '7306509454324219905',
  '7299672042600046592',
  '7297098846801641472',
  '7296970439954767872',
];

const LinkedInEmbedCard = ({ id, index }: { id: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    viewport={{ once: true }}
    className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white shadow-card transition-all duration-300 hover:border-sky-glow/40 hover:shadow-glow-sm"
  >
    <iframe
      src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${id}`}
      height="550"
      width="100%"
      frameBorder="0"
      allowFullScreen
      title={`LinkedIn post ${id}`}
      className="h-[550px] w-full"
    />
  </motion.div>
);

const Achievements = () => {
  return (
    <section id="achievements" className="section relative overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-sky-glow/10 blur-[130px]" />

      <div className="container-width">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Live Feed"
            title={<>Latest from my <span className="text-gradient">network</span></>}
            description="Recent updates, achievements, and highlights from my professional journey."
          />
          <a
            href="https://www.linkedin.com/in/rusira-sandul-b6bb87292"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-12 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-4 py-2 text-sm font-semibold text-zinc-200 transition-all hover:border-sky-glow/50 hover:text-sky-glow"
          >
            <Linkedin size={16} />
            Follow on LinkedIn
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POST_IDS.map((id, index) => (
            <LinkedInEmbedCard key={id} id={id} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
