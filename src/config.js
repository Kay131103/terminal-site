/* ============================================================
 *  EDIT THIS FILE to make the site yours.
 *  Everything the terminal displays comes from this config.
 *  Populated from resume.krithiuk.space (Krithi U K's resume).
 * ============================================================ */

export const PROFILE = {
  name: "Krithi U K",
  handle: "krithi",
  role: "Applied AI Engineer · Full-Stack Developer",
  location: "Mangaluru, Karnataka, India",
  tagline:
    "Document pipelines by day, saxophone by night. Occasional victim of my own curiosity.",

  email: "krithidps2003@gmail.com",
  phone: "+91 94496 89659",
  github: "https://github.com/Kay131103",
  linkedin: "https://www.linkedin.com/in/krithi-u-k-6076b1163/",
  website: "https://resume.krithiuk.space", // KRITHI.OS — desktop-OS portfolio

  about:
    "Applied AI and software developer experienced in building document-intelligence " +
    "pipelines, LLM-powered workflows and cloud-deployed applications. I combine " +
    "Python/FastAPI, .NET and modern web development with prompt engineering, " +
    "data-quality controls, testing and deployment.",

  skills: {
    "languages": "Python, C#, JavaScript, TypeScript, SQL, Java, C/C++",
    "ai & data": "LLMs, vision-language models, prompt engineering, RAG, embeddings, vector search, document AI, knowledge graphs",
    "backend": "FastAPI, ASP.NET Core / .NET 10, REST APIs, PostgreSQL, pgvector",
    "frontend": "Next.js, React, Angular, Tailwind CSS",
    "cloud": "AWS Bedrock, ECS Fargate, S3, EC2, Amplify, Docker, GitHub Actions, CloudFormation, Git",
  },

  experience: [
    {
      role: "Junior Software Developer",
      org: "EG India",
      period: "Apr 2025 – Present",
      points: [
        "AI price-list extraction platform: resumable multi-stage document pipeline turning Danish construction price lists (VVS, masonry, painting) into structured, reviewable data — rendering, Claude vision extraction on AWS Bedrock, trade-specific prompts, dedup and job-stage controls.",
        "Improved extraction quality: grid-row number synthesis, collision handling, cross-reference price resolution, VVS surcharge classification; per-job Bedrock token & cost tracking.",
        "85+ pull requests authored in a codebase with 170+ merged PRs and 60+ backend test modules.",
        "FastAPI services + PostgreSQL/pgvector; Next.js & React workflows for PDF upload, page-level review, row editing, document comparison and Excel export.",
        "Docker & ECS Fargate deployment, CloudFormation infra and GitHub Actions CI/CD across dev and production environments.",
        "Construction cost-estimation platform: six product areas incl. AI-assisted tender import (PDF/Excel) and .NET 10 estimation features; ~70 product issues identified & resolved with 200+ frontend unit-test files.",
        "Optimised a legacy Danish Microsoft Access app from 2–3 minutes of processing to under 10 seconds.",
      ],
    },
    {
      role: "Research Intern",
      org: "NITK (National Institute of Technology Karnataka)",
      period: "Jan – Apr 2025",
      points: [
        "Researched video captioning models — how visual-frame understanding maps to natural-language description — exploring feeding generated captions into structured knowledge graphs.",
      ],
    },
  ],

  education: [
    {
      degree: "Bachelor of Engineering — Computer Science",
      school: "NMAM Institute of Technology",
      period: "2021 – 2025 · CGPA 8.93 / 10",
    },
  ],

  certifications: [
    "Google AI Essentials",
    "Google Prompting Essentials",
    "Microsoft Azure AI Essentials",
    "Generative AI: Introduction to Large Language Models",
    "AI Foundations: Neural Networks",
    "PostgreSQL Essential Training",
    "Introduction to Deep Learning",
  ],

  projects: [
    {
      name: "voice-agent",
      desc: "Real-time voice agent — Gemini Live assistant with WebSocket audio streaming and interruption handling (Next.js, TypeScript, FastAPI).",
      url: "",
    },
    {
      name: "rag-chatbot",
      desc: "RAG chatbot with query rewriting, cited & streamed answers, multi-provider LLM support (LangGraph, ChromaDB, FastAPI).",
      url: "",
    },
    {
      name: "pr-review-agent",
      desc: "GitHub pull-request review automation mixing deterministic checks with optional LLM feedback (Python, GitHub API, Docker).",
      url: "",
    },
    {
      name: "video-captioning",
      desc: "NITK research — describing video and structuring output as searchable, relationship-aware knowledge graphs.",
      url: "",
    },
    {
      name: "krithi.os",
      desc: "Desktop-OS portfolio you're... not on right now. Windows, taskbar, easter eggs (resume.krithiuk.space).",
      url: "https://resume.krithiuk.space",
    },
    // Live URLs — deployed to Cloudflare Pages
    { name: "collab-playground", desc: "Shared whiteboard + code editor, synced live via Yjs CRDTs.", url: "https://collab-playground.pages.dev" },
    { name: "nebula", desc: "25k-particle WebGL galaxy with cursor gravity wells and mic-reactive mode.", url: "https://nebula-5d2.pages.dev" },
    { name: "codebase-explorer", desc: "Paste any GitHub repo → interactive dependency graph. 100% client-side.", url: "https://codebase-explorer-ajn.pages.dev" },
  ],

  resume: "resume.pdf", // lives in /public → served at /resume.pdf
};
