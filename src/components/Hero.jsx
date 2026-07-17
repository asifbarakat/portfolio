import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { profile } from "../data/portfolio";

/* Typewriter that cycles through profile.roles */
function useTypewriter(words, { typeSpeed = 70, deleteSpeed = 40, pause = 1400 } = {}) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let timeout;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setI((v) => v + 1);
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1)
        );
      }, deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, i, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(profile.roles);

  return (
    <section id="top" className="relative flex min-h-screen items-center px-6 pt-28 pb-16">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left — copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Asif Barakat
            <br />
            <span className="gradient-text">Chowdhury</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 h-8 font-mono text-lg text-slate-300 sm:text-xl"
          >
            <span className="text-cyan-400">&gt;</span> {typed}
            <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-0.5 animate-pulse bg-cyan-400" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 font-semibold text-[#05070d] transition-transform hover:scale-[1.03]"
            >
              View my work
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 font-semibold text-slate-200 transition-colors hover:border-cyan-400/50 hover:text-white"
            >
              <HiOutlineMail /> Get in touch
            </a>
            <div className="ml-1 flex items-center gap-2">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-xl border border-slate-700 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-white"
              >
                <FaGithub size={19} />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-xl border border-slate-700 text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-white"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 flex items-center gap-2 text-sm text-slate-500"
          >
            <FiMapPin /> {profile.location}
          </motion.div>
        </div>

        {/* Right — terminal card + stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="animate-float-slow"
        >
          <div className="glow-border rounded-2xl border border-slate-800 bg-slate-900/60 shadow-2xl backdrop-blur-sm">
            {/* title bar */}
            <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
              <span className="ml-2 font-mono text-xs text-slate-500">asif@edge-node: ~</span>
            </div>
            {/* body */}
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-slate-300">
<span className="text-slate-500"># deploy at the edge, not the cloud</span>{"\n"}
<span className="text-violet-400">const</span> asif = {"{"}
{"\n"}  role: <span className="text-emerald-400">"Systems &amp; AI Engineer"</span>,
{"\n"}  focus: [<span className="text-cyan-300">"split-computing"</span>, <span className="text-cyan-300">"edge-ai"</span>],
{"\n"}  hardware: <span className="text-emerald-400">"Raspberry Pi 5"</span>,
{"\n"}  ships: <span className="text-amber-300">true</span>,
{"\n"}{"}"};
{"\n"}
{"\n"}<span className="text-violet-400">await</span> asif.<span className="text-cyan-300">build</span>(<span className="text-emerald-400">"something great"</span>);
            </pre>
          </div>

          {/* stat strip */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            {profile.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-center"
              >
                <div className="gradient-text text-2xl font-bold">{s.value}</div>
                <div className="mt-0.5 text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
