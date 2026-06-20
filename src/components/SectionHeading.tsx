import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6 }}
    className={`mb-12 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
  >
    <span className="eyebrow">
      <span className="h-px w-6 bg-accent-light/60" />
      {eyebrow}
    </span>
    <h2 className="mt-4 text-balance text-3xl font-bold sm:text-4xl md:text-5xl">
      {title}
    </h2>
    {description && (
      <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
        {description}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
