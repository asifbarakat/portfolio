import { motion, useScroll, useSpring } from "framer-motion";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Research from "./components/Research";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400"
      />

      <Background />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Research />
        <Projects />
        <div className="py-8">
          <Achievements />
        </div>
        <Contact />
      </main>

      <Footer />
    </>
  );
}
