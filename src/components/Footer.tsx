import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const CV_URL =
  'https://drive.google.com/file/d/1fKUmOiahHyCtY5J0KmwEKH05yOmuFUSd/view?usp=sharing';

const SOCIALS = [
  { href: 'https://github.com/rusirasandul', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/rusira-sandul-b6bb87292', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:rusirasandulhw@gmail.com', icon: Mail, label: 'Email' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const openAssistant = () => {
    const btn = document.querySelector(
      'button[aria-label="Toggle Jarvis"]'
    ) as HTMLButtonElement | null;
    btn?.click();
  };

  return (
    <footer className="relative border-t border-white/[0.06] pt-16 pb-8">
      <div className="container-width px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-iris text-sm font-bold text-white">
                RS
              </span>
              <span className="font-display text-lg font-semibold text-white">Rusira Sandul</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500">
              Software Engineer &amp; BSc Physical Science undergraduate (USJ). Building
              AI-powered solutions and exploring the future of cyber security.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:-translate-y-1 hover:border-accent/50 hover:text-accent-light"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><FooterLink href="#about">About Me</FooterLink></li>
              <li><FooterLink href="#projects">Projects</FooterLink></li>
              <li><FooterLink href="#achievements">Live Feed</FooterLink></li>
              <li>
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 transition-colors hover:text-accent-light"
                >
                  Download CV
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold text-white">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><FooterLink href="#skills">Tech Skills</FooterLink></li>
              <li>
                <button
                  onClick={openAssistant}
                  className="text-left text-zinc-500 transition-colors hover:text-accent-light"
                >
                  Ask the AI Assistant
                </button>
              </li>
              <li><FooterLink href="#contact">Contact</FooterLink></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-zinc-600 sm:flex-row">
          <p>© {currentYear} Rusira Sandul. Crafted with care.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-zinc-400 transition-all hover:border-accent/40 hover:text-accent-light"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-zinc-500 transition-colors hover:text-accent-light">
    {children}
  </a>
);

export default Footer;
