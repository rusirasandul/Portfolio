import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/InvestmentCircles';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import JarvisBot from './components/JarvisBot';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Experience />
      <Projects />
      <Achievements />
      <Skills />
      <Contact />
      <Footer />
      <JarvisBot />
    </div>
  );
}

export default App;
