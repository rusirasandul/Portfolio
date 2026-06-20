import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, MapPin, ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading';

const CONTACTS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'rusirasandulhw@gmail.com',
    href: 'mailto:rusirasandulhw@gmail.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/rusirasandul',
    href: 'https://github.com/rusirasandul',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'in/rusira-sandul',
    href: 'https://www.linkedin.com/in/rusira-sandul-b6bb87292',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-[140px]" />

      <div className="container-width">
        <SectionHeading
          eyebrow="Get in Touch"
          title={<>Let&apos;s build something <span className="text-gradient">together</span></>}
          description="Have a project in mind or just want to say hi? My inbox is always open."
          align="center"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="glass flex flex-col justify-between gap-8 rounded-3xl p-8"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold text-white">
                Let&apos;s connect
              </h3>
              <p className="mt-3 text-zinc-400">
                I&apos;m always interested in new projects, opportunities, and conversations.
                Whether you have a question or just want to say hi, feel free to reach out.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
                <MapPin size={15} className="text-accent-light" />
                Colombo, Sri Lanka
              </div>
            </div>

            <div className="space-y-3">
              {CONTACTS.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:border-accent/30 hover:bg-white/[0.05]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-accent-light">
                    <Icon size={19} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs uppercase tracking-wider text-zinc-500">{label}</div>
                    <div className="truncate text-sm font-medium text-zinc-200">{value}</div>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-zinc-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-light"
                  />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-8"
          >
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" value={formData.name} onChange={handleChange} />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-zinc-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about your idea..."
                  className="glass-input resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-white transition-all hover:bg-accent-dark hover:shadow-glow"
              >
                Send Message
                <Send size={17} />
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FieldProps> = ({ label, name, type = 'text', value, onChange }) => (
  <div>
    <label htmlFor={name} className="mb-2 block text-sm font-medium text-zinc-300">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      placeholder={label}
      className="glass-input"
    />
  </div>
);

export default Contact;
