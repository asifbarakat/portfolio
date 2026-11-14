import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { motion, useScroll, useSpring, MotionConfig } from "framer-motion";
import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Research from "./components/Research";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      smoothWheel: true,
      anchors: { offset: -24 },
      respectReducedMotion: true,
    });
    return () => lenis.destroy();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-acid"
      />

      <Background />
      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Research />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  );
}
