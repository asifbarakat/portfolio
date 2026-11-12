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
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    /* reducedMotion="user" disables transform animations for people who
       set "reduce motion" in their OS. */
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
