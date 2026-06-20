import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import JarvisBot from './components/JarvisBot';

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Ambient color field for the liquid glass to refract */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[40rem] w-[40rem] rounded-full bg-accent/[0.14] blur-[140px]" />
        <div className="absolute top-1/3 -right-32 h-[34rem] w-[34rem] rounded-full bg-iris/[0.12] blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[32rem] w-[32rem] rounded-full bg-sky-glow/[0.08] blur-[150px]" />
        <div className="absolute top-2/3 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-fuchsia-500/[0.06] blur-[150px]" />
      </div>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Achievements />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <JarvisBot />
    </div>
  );
}

export default App;
