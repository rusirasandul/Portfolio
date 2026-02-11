import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 text-slate-400 font-sans relative z-10 hexagon-bg">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Identity */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">
              RS<span className="text-cyan-500">.</span>
            </h2>
            <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">
              Rusira Sandul <br />
              <span className="text-slate-500 text-sm">
                Software Engineer & Computer Science Undergraduate (USJ). 
                Building AI-powered solutions and exploring the future of Cyber Security.
              </span>
            </p>
            <div className="flex gap-4">
              <SocialLink href="https://github.com/rusirasandul" icon={<Github size={20} />} />
              <SocialLink href="https://www.linkedin.com/in/rusira-sandul-b6bb87292" icon={<Linkedin size={20} />} />
              <SocialLink href="mailto:rusirasandulhw@gmail.com" icon={<Mail size={20} />} />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-slate-100 font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><FooterLink href="#about">About Me</FooterLink></li>
              <li><FooterLink href="#projects">Projects</FooterLink></li>
              <li><FooterLink href="#achievements">Achievements</FooterLink></li>
              <li><a href="https://drive.google.com/file/d/1fKUmOiahHyCtY5J0KmwEKH05yOmuFUSd/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="block hover:text-cyan-400 hover:translate-x-1 transition-all duration-300">Download CV</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-slate-100 font-semibold mb-6">Resources</h3>
            <ul className="space-y-4 text-sm">
              <li><FooterLink href="#skills">Tech Skills</FooterLink></li>
              {/* This link triggers the JARVIS bot */}
              <li>
                <button 
                  onClick={() => {
                    const jarvisButton = document.querySelector('button[aria-label="Toggle Jarvis"]') as HTMLButtonElement;
                    jarvisButton?.click();
                  }}
                  className="hover:text-cyan-400 transition-colors text-left hover:translate-x-1 transition-all duration-300"
                >
                  Ask JARVIS AI
                </button>
              </li>
              <li><FooterLink href="#contact">Contact</FooterLink></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© {currentYear} Rusira Sandul. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-cyan-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components for clean code
const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    className="block hover:text-cyan-400 hover:translate-x-1 transition-all duration-300"
  >
    {children}
  </a>
);

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;
