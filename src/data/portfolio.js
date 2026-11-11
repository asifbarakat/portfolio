/* ==================================================================
 *  PORTFOLIO CONTENT
 *  Single source of truth for everything on the site.
 * ================================================================== */

export const profile = {
  name: "Asif Barakat Chowdhury",
  roles: [
    "SQA Engineer Intern @ AppifyLab",
    "Aspiring SDET",
    "Web & Mobile Test Automation",
    "Load & Performance Testing",
  ],
  tagline: "SQA Engineer Intern @ AppifyLab  //  CSE Graduate @ Leading University",
  summary:
    "I make software reliable, scalable and fast under real-world load. My day-to-day is end-to-end web and mobile automation, API validation and performance engineering, backed by a computer science degree and hands-on work in cross-platform apps and edge systems.",
  location: "Sylhet, Bangladesh",
  email: "asifbarakat2001@gmail.com",
  socials: {
    github: "https://github.com/asifbarakat",
    linkedin: "https://www.linkedin.com/in/asif-barakat-4087a8253",
  },
  stats: [
    { value: "3.8", label: "CGPA · BSc CSE" },
    { value: "6", label: "QA tools in daily use" },
    { value: "4+", label: "Shipped projects" },
    { value: "SQA", label: "Intern @ AppifyLab" },
  ],
};

export const experience = {
  role: "SQA Engineer Intern",
  company: "AppifyLab",
  period: "Present",
  description:
    "Verifying production workflows across web, mobile and API layers: authoring Playwright and Appium suites, validating REST APIs in Postman, and benchmarking behaviour under concurrency with Grafana k6.",
  highlights: [
    "Playwright E2E (TypeScript)",
    "Appium mobile automation",
    "Postman API validation",
    "Grafana k6 load testing",
    "Regression & defect lifecycle",
  ],
};

export const education = {
  degree: "BSc in Computer Science & Engineering",
  institution: "Leading University",
  detail: "CGPA 3.8 / 4.0",
  note: "Focus: software engineering, systems and distributed computing.",
};

/* ---- SKILLS ------------------------------------------------------ */
export const skillGroups = [
  {
    title: "Quality Engineering",
    accent: "emerald",
    items: [
      "Playwright",
      "Appium",
      "Postman",
      "Grafana k6",
      "Chrome DevTools",
      "GitHub Actions",
      "Manual Testing",
      "API Testing",
      "Regression Testing",
      "Performance Testing",
      "Test Case Design",
      "Defect Tracking",
    ],
  },
  {
    title: "Languages & Frameworks",
    accent: "cyan",
    items: ["TypeScript", "JavaScript", "Python", "Dart", "Flutter", "React", "C", "C++", "SQL", "PHP"],
  },
  {
    title: "Systems & Edge",
    accent: "violet",
    items: [
      "Linux",
      "Raspberry Pi 5",
      "Docker",
      "Git",
      "Split Computing",
      "Distributed Inference",
      "P2P Networking",
      "OpenCV",
      "YOLO",
    ],
  },
  {
    title: "Platforms & Tooling",
    accent: "cyan",
    items: ["Firebase", "Supabase", "MySQL", "VS Code", "Android Studio", "Figma"],
  },
];

/* ---- RESEARCH / SYSTEMS WORK ------------------------------------- */
export const research = [
  {
    kind: "Systems Research",
    title: "Adaptive Split Computing & Feature Extraction",
    description:
      "Distributed edge-to-host inference runtime that benchmarks intermediate feature extraction, zero-parameter compression and live handoff resilience across Raspberry Pi 5 nodes and desktop RPC servers.",
    contributions: [
      {
        head: "Zero-Parameter Compression",
        body: "Sparsity thresholding and quantization compress intermediate feature maps with no retraining overhead.",
      },
      {
        head: "Hardware-in-the-Loop",
        body: "End-to-end split inference benchmarked on physical CPU-only Raspberry Pi 5 edge nodes.",
      },
      {
        head: "Handoff Resilience",
        body: "Measured uplink bandwidth reduction against local inference latency across the RPC boundary.",
      },
    ],
    stack: ["Python", "PyTorch", "Raspberry Pi 5", "RPC", "Embedded Linux"],
  },
];

/* ---- PROJECTS ---------------------------------------------------- */
export const projects = [
  {
    name: "Multi-Product E2E & Automation Suite",
    badge: "AppifyLab",
    description:
      "Automated web, mobile, API and stress-testing architecture for production workflows.",
    features:
      "Verifies complex user journeys, database states and load thresholds across multiple products.",
    stack: ["Playwright", "Appium", "TypeScript", "Grafana k6", "Postman", "CI/CD"],
    featured: true,
  },
  {
    name: "DigitalDelta",
    badge: "Hackathon",
    description:
      "Offline peer-to-peer disaster-response communication app for zero-internet emergencies.",
    features:
      "Zero-config device discovery, real-time data transmission and localized permissions, with no external servers.",
    stack: ["Flutter", "Dart", "P2P Networking", "Offline-First"],
    featured: true,
  },
  {
    name: "CodeSentrix",
    badge: "EdTech",
    description:
      "Interactive computer science learning platform with algorithm visualizers and coding challenges.",
    features: "Authored the full technical curriculum and shipped deployment workflows.",
    stack: ["Flutter", "Dart", "Mobile App", "Visualizers"],
    featured: false,
  },
  {
    name: "Schema Extraction via CV",
    badge: "Computer Vision",
    description:
      "Pipeline that converts static database diagrams into structured relational models.",
    features:
      "Custom YOLO detection plus OpenCV processing to identify and extract tables and relations.",
    stack: ["Python", "YOLO", "OpenCV"],
    featured: false,
  },
];

/* ---- NAV --------------------------------------------------------- */
export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "research", label: "Systems" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
