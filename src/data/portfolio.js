/* ==================================================================
 *  PORTFOLIO CONTENT
 *  ------------------------------------------------------------------
 *  This is the single source of truth for everything on the site.
 *  Edit the values below to update your portfolio — no component
 *  code needs to change.
 * ================================================================== */

export const profile = {
  name: "Asif Barakat Chowdhury",
  // Rotating roles shown in the hero (the typewriter effect cycles these)
  roles: [
    "Software Engineer",
    "Mobile App Developer",
    "Systems & AI Researcher",
    "Split Computing @ the Edge",
  ],
  tagline:
    "Computer Science & Engineering  ·  Software Engineer  ·  Systems & AI Researcher",
  summary:
    "I build systems that run where the cloud can't reach. My work spans systems architecture, cross-platform mobile development, and distributed AI execution — from offline peer-to-peer applications and custom computer-vision pipelines to advanced research in split computing for edge nodes and distributed large-language-model inference.",
  location: "Sylhet, Bangladesh",
  email: "asifbarakat2001@gmail.com",
  socials: {
    github: "https://github.com/asifbarakat",
    linkedin: "https://www.linkedin.com/in/asif-barakat-4087a8253",
  },
  // Quick headline stats for the hero strip
  stats: [
    { value: "3.8", label: "CGPA · BSc CSE" },
    { value: "4", label: "Research tracks" },
    { value: "4+", label: "Shipped projects" },
    { value: "1", label: "IEEE publication" },
  ],
};

/* ---- PUBLICATION ------------------------------------------------- */
export const publication = {
  // TODO: replace with the exact paper title from IEEE Xplore.
  title: "Peer-Reviewed Research Publication",
  venue: "IEEE Xplore",
  url: "https://doi.org/10.1109/qpain69676.2026.11546109",
};

export const education = {
  // NOTE: confirm the institution name / graduation year and update if needed.
  degree: "BSc in Computer Science & Engineering",
  institution: "Leading University",
  detail: "CGPA 3.8 / 4.0",
  note: "Focus: systems architecture, edge AI, and distributed computing.",
};

/* ---- SKILLS ------------------------------------------------------ */
export const skillGroups = [
  {
    title: "Languages & Frameworks",
    accent: "cyan",
    items: [
      "C",
      "C++",
      "Python",
      "Dart",
      "PHP",
      "SQL",
      "HTML",
      "React",
      "Flutter",
      "Tailwind CSS",
    ],
  },
  {
    title: "AI, ML & Systems Research",
    accent: "violet",
    items: [
      "Split Computing",
      "Zero-Parameter Compression",
      "Sparsity Thresholding",
      "Model Quantization",
      "Layer Partitioning",
      "Distributed Inference",
      "Auto-Regressive Decoding",
      "Llama",
      "Qwen",
      "YOLO",
      "OpenCV",
    ],
  },
  {
    title: "Systems & Hardware",
    accent: "emerald",
    items: [
      "Offline P2P Networks",
      "Local Device Discovery",
      "Decentralized Edge Computing",
      "Microservices",
      "Raspberry Pi 5",
      "CPU-Only Edge Optimization",
      "Hardware-in-the-Loop",
    ],
  },
  {
    title: "Tools & Methodologies",
    accent: "cyan",
    items: [
      "Docker",
      "Figma",
      "Canva",
      "draw.io",
      "Responsive UI Design",
      "Rapid Prototyping",
      "Technical Curriculum Design",
    ],
  },
];

/* ---- RESEARCH ---------------------------------------------------- */
export const research = [
  {
    kind: "Academic Thesis",
    title:
      "When Zero-Parameter Split Computing Wins: A Training-Free Split-Feasibility Screen for Feature Transmission in CPU-Only IoT Surveillance",
    description:
      "Formulated and validated a training-free feasibility screen and zero-parameter compression pipeline enabling highly efficient, low-latency intermediate feature transmission across resource-constrained, CPU-only edge environments — without learned bottlenecks.",
    contributions: [
      {
        head: "Zero-Parameter Compression",
        body: "A zero-parameter operator leveraging sparsity thresholding and quantization to compress intermediate feature maps while preserving downstream detection fidelity — no retraining overhead.",
      },
      {
        head: "Training-Free Feasibility Screen",
        body: "An evaluation framework based on high-resolution backbone channel width to rapidly identify optimal layer partition points.",
      },
      {
        head: "Hardware-in-the-Loop Validation",
        body: "Deployed and benchmarked the end-to-end split-inference pipeline on physical CPU-only edge nodes (Raspberry Pi 5), measuring uplink bandwidth reduction versus local inference latency.",
      },
    ],
    stack: ["Python", "Raspberry Pi 5", "Edge AI", "Model Quantization", "Computer Vision"],
  },
  {
    kind: "Standalone Research",
    title: "Distributed Edge-to-Server LLM Split Inference",
    description:
      "Investigating partition paradigms and performance bottlenecks specific to executing open-weights Large Language Models (Llama, Qwen) across distributed edge–server topologies.",
    contributions: [
      {
        head: "Communication Overhead",
        body: "Mitigating the overhead inherent to token-by-token auto-regressive decoding across the network boundary.",
      },
      {
        head: "KV-Cache Partitioning",
        body: "Optimizing Key-Value cache partitioning and memory footprints across resource-constrained edge hardware.",
      },
      {
        head: "Dynamic Offloading",
        body: "Managing sequence-length scaling and dynamic workload offloading without degrading generation consistency.",
      },
    ],
    stack: ["Python", "Llama", "Qwen", "Distributed Inference", "Transformers"],
  },
];

/* ---- PROJECTS ---------------------------------------------------- */
export const projects = [
  {
    name: "DigitalDelta",
    badge: "Hackathon",
    description:
      "A rapid-prototyped, decentralized, cloud-independent communication app built under intense hackathon constraints.",
    features:
      "Offline peer-to-peer local network for real-time data transmission, automated zero-config device discovery, and custom-managed localized permissions — no external servers or internet required.",
    stack: ["Flutter", "Dart", "Local Networking"],
    featured: true,
  },
  {
    name: "CodeSentrix",
    badge: "EdTech",
    description:
      "An educational-technology app delivering end-to-end computer science education.",
    features:
      "Architected and wrote the complete technical curriculum alongside interactive features — real-time algorithm visualizers and integrated coding challenges — and prepared deployment workflows.",
    stack: ["Flutter", "Dart"],
    featured: true,
  },
  {
    name: "Schema Extraction via CV",
    badge: "Computer Vision",
    description:
      "A computer-vision engineering project that converts static database diagrams into structured data.",
    features:
      "Trained and deployed custom YOLO object-detection models with OpenCV image processing to identify, segment, and extract relational database structures from raw visual diagrams.",
    stack: ["Python", "YOLO", "OpenCV"],
    featured: false,
  },
  {
    name: "MagicScribe",
    badge: "Mobile · OCR",
    description:
      "A mobile app with built-in OCR for extracting editable text from photos and documents.",
    features:
      "Integrates Tesseract OCR into a Flutter app — capture or pick an image and pull structured text out of it, backed by Firebase accounts.",
    stack: ["Flutter", "Dart", "Tesseract OCR", "Firebase"],
    featured: false,
  },
];

/* ---- NAV --------------------------------------------------------- */
export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
