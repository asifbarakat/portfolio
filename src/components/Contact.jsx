import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiArrowUpRight } from "react-icons/fi";
import { Reveal } from "./ui";
import { profile } from "../data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 px-6 py-16 text-center md:px-16">
          <span className="relative font-mono text-sm text-cyan-400">
            05 <span className="text-slate-500">//</span> let's talk
          </span>
          <h2 className="relative mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Let's build something
            <br />
            <span className="text-cyan-400">at the edge.</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl leading-relaxed text-slate-400">
            Open to research collaborations, software engineering roles, and interesting
            systems problems. The fastest way to reach me is email — I read everything.
          </p>

          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 px-8 py-4 text-lg font-semibold text-slate-950 transition-colors shadow-sm"
          >
            <HiOutlineMail size={20} /> {profile.email}
          </motion.a>

          <div className="relative mt-8 flex items-center justify-center gap-3">
            <SocialLink href={profile.socials.github} icon={FaGithub} label="GitHub" />
            <SocialLink href={profile.socials.linkedin} icon={FaLinkedinIn} label="LinkedIn" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function SocialLink({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2 rounded-xl border border-slate-700 px-5 py-3 font-medium text-slate-200 transition-colors hover:border-cyan-400/50 hover:text-white"
    >
      <Icon size={18} /> {label}
      <FiArrowUpRight className="text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-400" />
    </a>
  );
}
