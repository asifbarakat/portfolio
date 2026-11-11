import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import { profile } from "../data/portfolio";
import LiveConsole from "./LiveConsole";

const marqueeItems = [
  "Playwright", "Appium", "Postman", "Grafana k6", "Chrome DevTools", "GitHub Actions",
  "TypeScript", "Python", "Flutter", "Docker", "Linux", "Raspberry Pi 5",
];

function useTypewriter(words, { typeSpeed = 60, deleteSpeed = 30, pause = 1500 } = {}) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let timeout;
    if (!deleting && text === word) timeout = setTimeout(() => setDeleting(true), pause);
    else if (deleting && text === "") {
      setDeleting(false);
      setI((v) => v + 1);
    } else {
      timeout = setTimeout(
        () => setText((p) => (deleting ? word.slice(0, p.length - 1) : word.slice(0, p.length + 1))),
        deleting ? deleteSpeed : typeSpeed
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, i, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

const fade = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export default function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section id="top" className="relative px-6 pt-36 pb-10">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            {...fade(0)}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-1.5 font-mono text-xs text-mute"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
            </span>
            Open to SQA / SDET roles
          </motion.div>

          <motion.h1
            {...fade(0.05)}
            className="text-5xl font-semibold leading-[0.98] tracking-tighter text-bone sm:text-7xl lg:text-8xl"
          >
            Asif Barakat
            <br />
            <span className="serif text-acid">Chowdhury</span>
          </motion.h1>

          <motion.div {...fade(0.15)} className="mt-7 h-7 font-mono text-base text-bone sm:text-lg">
            <span className="text-acid">&gt;</span> {typed}
            <span className="ml-0.5 inline-block h-5 w-[9px] translate-y-1 animate-blink bg-acid" />
          </motion.div>

          <motion.p {...fade(0.25)} className="mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
            {profile.summary}
          </motion.p>

          <motion.div {...fade(0.35)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-acid px-6 py-3 font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              View my work
              <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-line px-6 py-3 font-semibold text-bone transition-colors hover:border-acid hover:text-acid"
            >
              Get in touch
            </a>
            <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-mute transition-colors hover:border-acid hover:text-acid">
              <FaGithub size={18} />
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-mute transition-colors hover:border-acid hover:text-acid">
              <FaLinkedinIn size={17} />
            </a>
          </motion.div>

          <motion.div {...fade(0.45)} className="mt-7 flex items-center gap-2 font-mono text-xs text-mute">
            <FiMapPin /> {profile.location}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
          <LiveConsole />
        </motion.div>
      </div>

      {/* stat strip */}
      <div className="mx-auto mt-20 grid max-w-6xl grid-cols-2 border-y border-line md:grid-cols-4">
        {profile.stats.map((s, i) => (
          <div key={s.label} className={`px-6 py-7 ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i > 0 ? "md:border-l" : ""} border-line`}>
            <div className="text-4xl font-semibold tracking-tight text-bone">{s.value}</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-mute">{s.label}</div>
          </div>
        ))}
      </div>

      {/* tool marquee */}
      <div className="mx-auto mt-0 max-w-6xl overflow-hidden border-b border-line py-5">
        <div className="flex w-max animate-marquee gap-10">
          {[...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i} className="flex items-center gap-10 font-mono text-sm uppercase tracking-widest text-mute">
              {m} <span className="text-acid">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
