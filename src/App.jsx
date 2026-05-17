import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AresBootScreen from './components/ares/AresBootScreen';
import TronGrid from './components/ares/TronGrid';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('HERO');
  const mainRef = useRef(null);

  useEffect(() => {
    if (!isBooted || !mainRef.current) return;

    // Track overall scroll progress for 3D camera
    ScrollTrigger.create({
      trigger: mainRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => setScrollProgress(self.progress),
    });

    // Animate each section on scroll
    const sections = mainRef.current.querySelectorAll('.ares-section');
    sections.forEach((section) => {
      gsap.fromTo(section,
        { y: 80, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1.2,
          },
        }
      );
    });

    // Track active section for header highlight
    const sectionEls = mainRef.current.querySelectorAll('[data-section]');
    sectionEls.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(el.dataset.section),
        onEnterBack: () => setActiveSection(el.dataset.section),
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [isBooted]);

  if (!isBooted) {
    return <AresBootScreen onComplete={() => setIsBooted(true)} />;
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'hero', label: 'HERO' },
    { id: 'identity', label: 'IDENTITY' },
    { id: 'experience', label: 'PROTOCOLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'STREAM' },
  ];

  return (
    <div className="min-h-screen bg-background text-on-background relative font-body selection:bg-primary selection:text-background">
      {/* 3D TRON World */}
      <TronGrid scrollProgress={scrollProgress} />

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 -z-30 pointer-events-none">
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Fallback background image */}
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <img
          alt="TRON: Ares red world environment"
          className="w-full h-full object-cover"
          src="/tron-background.jpg"
          onError={(e) => {
            e.target.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuC5hToL5ipSoQJxk-FASvhg2pFYJqkYugF7Sx3vnSuAqx11sjkS-L44RIh4b2iq7GRfWAaBzbvOZ7F9lK45wSHZVm10I_DV-jaGSM2mFK6xZbkfdWcup_KKApJjl4wxWGNix8-8xWUyBj9PbOBMmGgsOm0sGckM_1F3ez8k34V1VTraSalpziaIHV-d4ElWbwuovY-mVVbDNsUH7QUzW8AuiTvhXJhNhud8e9OE-rWI-WUnUGxAiDjdOHCsvjAsbcB9PkHBCWVADyk";
          }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Scanline overlay */}
      <div className="fixed inset-0 scanline pointer-events-none z-50 opacity-30"></div>

      {/* ─── HEADER ─── */}
      <header className="fixed top-0 w-full border-b border-primary/30 bg-background/80 backdrop-blur-xl z-40 flex justify-between items-center px-5 md:px-16 h-16 shadow-[0_0_15px_rgba(255,84,75,0.15)]">
        <div onClick={() => scrollTo('hero')} className="font-display text-xl text-primary drop-shadow-[0_0_10px_rgba(255,84,75,0.6)] cursor-pointer tracking-tighter font-bold">
          ARES_SYSTEM
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`font-label-caps text-[11px] tracking-[0.15em] pb-1 cursor-pointer transition-all duration-300 ${
                activeSection === item.label
                  ? 'text-primary font-bold border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <a
          href="/MARAM_SAI_SWARAN_RESUME.pdf"
          target="_blank"
          className="border border-primary text-primary px-4 py-1.5 font-label-caps text-[11px] tracking-[0.15em] hover:bg-primary hover:text-on-primary transition-all duration-200 active:scale-95"
        >
          RESUME
        </a>
      </header>

      {/* ─── MAIN SCROLLABLE CONTENT ─── */}
      <main ref={mainRef} className="relative z-10">

        {/* ═══ HERO ═══ */}
        <section id="hero" data-section="HERO" className="min-h-screen flex items-center justify-center relative pt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/80 pointer-events-none"></div>
          <div className="relative text-center px-5 max-w-4xl mx-auto">
            <div className="mb-4 inline-block px-4 py-1 border border-primary/40 bg-primary/5 font-body text-[11px] text-primary uppercase tracking-[0.3em]">
              CLEARANCE: LEVEL_09_RED // STATUS: ONLINE
            </div>
            <h1 className="font-display text-5xl md:text-[80px] font-bold tracking-tighter mb-6 leading-[0.95] text-on-surface uppercase">
              MARAM <span className="text-primary drop-shadow-[0_0_25px_rgba(255,84,75,0.8)]">SAI</span> SWARAN
            </h1>
            <p className="font-display text-lg md:text-2xl text-on-surface-variant tracking-[0.15em] uppercase mb-8 font-light">
              PRINCIPAL SYSTEM ARCHITECT // SWE INTERN
            </p>
            <p className="max-w-2xl mx-auto text-on-surface-variant/80 font-body text-sm md:text-base mb-12 leading-relaxed">
              Full-stack developer engineering high-performance backend systems, AI-powered applications, and immersive cybernetic interfaces from the digital frontier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => scrollTo('projects')} className="px-10 py-4 border border-primary text-primary font-label-caps text-[11px] tracking-[0.2em] hover:bg-primary hover:text-on-primary transition-all duration-300 flex items-center justify-center gap-2">
                ENTER_THE_GRID <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
              </button>
              <button onClick={() => scrollTo('contact')} className="px-10 py-4 border border-white/15 text-on-surface font-label-caps text-[11px] tracking-[0.2em] hover:bg-white/5 transition-all">
                ESTABLISH_UPLINK
              </button>
            </div>

            {/* System stats */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 font-body text-[11px] text-on-surface-variant/60 uppercase tracking-wider">
              <span>STACK: JAVA / SPRING_BOOT / CLOUD</span>
              <span className="hidden md:inline">|</span>
              <span>LATENCY: 0.02ms</span>
              <span className="hidden md:inline">|</span>
              <span>CGPA: 8.73</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40 animate-pulse">
            <span className="font-label-caps text-[9px] text-primary mb-2 tracking-[0.3em]">SCROLL_INTO_GRID</span>
            <div className="w-px h-14 bg-gradient-to-b from-primary to-transparent"></div>
          </div>
        </section>

        {/* ═══ IDENTITY / EDUCATION ═══ */}
        <section id="identity" data-section="IDENTITY" className="ares-section py-24 md:py-32 px-5 md:px-16 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-px bg-primary"></span>
            <span className="font-body text-[11px] text-primary uppercase tracking-[0.4em]">SECTION_002 // OPERATOR_IDENTITY</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-on-surface uppercase tracking-tighter mb-16">THE_ARCHITECT</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Education */}
            <div className="glass-panel p-8 border border-primary/20 relative">
              <div className="absolute top-3 right-3 font-label-caps text-[9px] text-primary/30">NODE: EDU-VCE</div>
              <span className="material-symbols-outlined text-primary text-3xl mb-6">school</span>
              <h3 className="font-display text-xl font-bold text-on-surface mb-4 uppercase tracking-wide">EDUCATION_MATRIX</h3>
              <div className="space-y-4 font-body text-sm">
                <div className="border-l-2 border-primary/40 pl-4">
                  <p className="text-primary font-bold text-xs tracking-wider">INSTITUTION</p>
                  <p className="text-on-surface">Vardhaman College of Engineering</p>
                </div>
                <div className="border-l-2 border-primary/40 pl-4">
                  <p className="text-primary font-bold text-xs tracking-wider">DEGREE</p>
                  <p className="text-on-surface">B.Tech Computer Science (2023 - 2027)</p>
                </div>
                <div className="border-l-2 border-primary/40 pl-4">
                  <p className="text-primary font-bold text-xs tracking-wider">METRIC_CGPA</p>
                  <p className="text-on-surface text-2xl font-display font-bold text-primary">8.73</p>
                </div>
              </div>
            </div>

            {/* Technical Arsenal */}
            <div className="glass-panel p-8 border border-primary/20 relative">
              <div className="absolute top-3 right-3 font-label-caps text-[9px] text-primary/30">NODE: TECH-SPEC</div>
              <span className="material-symbols-outlined text-primary text-3xl mb-6">terminal</span>
              <h3 className="font-display text-xl font-bold text-on-surface mb-6 uppercase tracking-wide">TECHNICAL_ARSENAL</h3>
              <div className="space-y-5">
                {[
                  { label: 'CORE_LOGIC', skills: 'Java, Python, Node.js', pct: 92 },
                  { label: 'FRAMEWORKS', skills: 'Spring Boot, React, Next.js', pct: 88 },
                  { label: 'INFRASTRUCTURE', skills: 'AWS, GCP (Certified Mar 2026)', pct: 80 },
                  { label: 'NEURAL_NETS', skills: 'RAG Pipelines, Gemini API, Groq', pct: 75 },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="font-body text-xs uppercase tracking-wider text-on-surface-variant">{s.label}: <span className="text-on-surface">{s.skills}</span></span>
                      <span className="font-body text-xs text-primary font-bold">{s.pct}%</span>
                    </div>
                    <div className="h-1 bg-primary/10 w-full overflow-hidden">
                      <div className="h-full bg-primary glow-sm transition-all duration-1000" style={{ width: `${s.pct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ EXPERIENCE / ACTIVE PROTOCOLS ═══ */}
        <section id="experience" data-section="PROTOCOLS" className="ares-section py-24 md:py-32 px-5 md:px-16 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-px bg-primary"></span>
            <span className="font-body text-[11px] text-primary uppercase tracking-[0.4em]">SECTION_003 // ACTIVE_PROTOCOLS</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-on-surface uppercase tracking-tighter mb-16">EXPERIENCE_LOG</h2>

          <div className="space-y-6">
            {[
              {
                role: 'Software Engineer Intern',
                org: 'DevAI',
                period: 'JAN 2026 — PRESENT',
                status: 'ACTIVE',
                log: 'Developing healthcare-related RAG pipelines and AI integrations. Building production-grade Spring Boot microservices with Gemini API.',
              },
              {
                role: 'DSA Mentor',
                org: 'MentiBy',
                period: 'JAN 2026',
                status: 'COMPLETED',
                log: 'Mentoring student batches in complex Data Structures and Algorithms. Conducted live problem-solving sessions and code reviews.',
              },
              {
                role: 'Backend Developer Intern',
                org: 'PearlThoughts',
                period: 'JUL 2025 — AUG 2025',
                status: 'ARCHIVED',
                log: 'Architecting high-availability backend infrastructures with Node.js. Implemented REST APIs and database optimization pipelines.',
              },
            ].map((exp, i) => (
              <div key={i} className="glass-panel p-6 md:p-8 border border-primary/20 relative group hover:border-primary/50 transition-colors duration-300">
                <div className="absolute top-3 right-3 font-label-caps text-[9px] text-primary/30">ENTRY_{String(i + 1).padStart(2, '0')}</div>
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  <div className="shrink-0 flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 ${exp.status === 'ACTIVE' ? 'bg-primary animate-pulse' : 'bg-primary/30'}`}></div>
                    <span className="font-label-caps text-[10px] text-primary tracking-wider">{exp.period}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-on-surface uppercase tracking-wide">{exp.role} <span className="text-primary">@ {exp.org}</span></h3>
                    <p className="font-body text-sm text-on-surface-variant mt-2 leading-relaxed">{exp.log}</p>
                  </div>
                  <span className={`px-2 py-0.5 border text-[10px] font-label-caps self-start ${exp.status === 'ACTIVE' ? 'border-primary text-primary' : 'border-primary/20 text-primary/50'}`}>
                    {exp.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ PROJECTS ═══ */}
        <section id="projects" data-section="PROJECTS" className="ares-section py-24 md:py-32 px-5 md:px-16 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-px bg-primary"></span>
            <span className="font-body text-[11px] text-primary uppercase tracking-[0.4em]">SECTION_004 // PROJECT_ARCHIVE</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-on-surface uppercase tracking-tighter mb-16">PROJECT_ARCHIVE</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                serial: '001-ALPHA',
                title: 'SECURE_CLOUD_DATA_HUB',
                stack: 'NODE.JS / PYTHON / AWS',
                date: 'OCT 2025',
                status: 'DEPLOYED',
                desc: 'Cloud-native secure data platform with end-to-end encryption, automated backup pipelines, and multi-region availability zones.',
              },
              {
                serial: '002-BETA',
                title: 'FITNESS_AI',
                stack: 'SPRING BOOT / MICROSERVICES',
                date: 'JUL 2025',
                status: 'ARCHIVED',
                desc: 'Cloud-native microservices platform for AI-powered fitness tracking with personalized workout generation and nutritional analysis.',
              },
              {
                serial: '003-GAMMA',
                title: 'AI_POWERED_CHAT_APP',
                stack: 'SPRING BOOT / WEBSOCKETS',
                date: 'JUN 2025',
                status: 'ACTIVE',
                desc: 'Real-time messaging application with AI-powered response suggestions, WebSocket-based communication, and encrypted message storage.',
              },
              {
                serial: '004-DELTA',
                title: 'TRON_ARES_PORTFOLIO',
                stack: 'REACT / THREE.JS / GSAP',
                date: 'MAY 2026',
                status: 'ACTIVE',
                desc: 'This immersive cyber-brutalist portfolio — featuring a 3D TRON world, antigravity scroll mechanics, and high-fidelity glassmorphic design.',
              },
            ].map((proj) => (
              <div key={proj.serial} className="glass-panel p-6 md:p-8 border border-primary/20 relative group hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,84,75,0.1)]">
                <div className="absolute top-3 right-3 font-label-caps text-[9px] text-primary/30">SERIAL: {proj.serial}</div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-2 py-0.5 border text-[10px] font-label-caps ${proj.status === 'ACTIVE' ? 'border-primary text-primary' : proj.status === 'DEPLOYED' ? 'border-primary/60 text-primary/80' : 'border-primary/20 text-primary/40'}`}>
                    {proj.status}
                  </span>
                  <span className="font-body text-[11px] text-primary/60">{proj.date}</span>
                </div>
                <h3 className="font-display text-lg md:text-xl font-bold text-on-surface mb-2 uppercase tracking-wide group-hover:text-primary transition-colors">{proj.title}</h3>
                <p className="font-body text-xs text-on-surface-variant mb-4 leading-relaxed">{proj.desc}</p>
                <div className="border-t border-primary/10 pt-3 font-body text-[10px] text-primary/60 uppercase tracking-wider">{proj.stack}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CONTACT / STREAM ═══ */}
        <section id="contact" data-section="STREAM" className="ares-section py-24 md:py-32 px-5 md:px-16 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-px bg-primary"></span>
            <span className="font-body text-[11px] text-primary uppercase tracking-[0.4em]">SECTION_005 // ESTABLISH_UPLINK</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-on-surface uppercase tracking-tighter mb-16">
            JOIN_THE <span className="text-primary">FLUX</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CTA */}
            <div className="glass-panel p-8 md:p-10 border border-primary/20 flex flex-col justify-between">
              <div>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-8">
                  Ready to integrate with the ARES protocol? Terminal access is open for collaborative ventures, freelance projects, and high-stakes system development.
                </p>
              </div>
              <div className="space-y-4">
                <a href="mailto:maramsaiswaran@gmail.com" className="block p-4 border border-primary/20 hover:border-primary transition-colors group">
                  <span className="font-label-caps text-[9px] text-on-surface-variant/60 block">DIRECT_LINE</span>
                  <span className="font-body text-sm text-on-surface group-hover:text-primary transition-colors">MARAMSAISWARAN@GMAIL.COM</span>
                </a>
                <a href="https://github.com/saiswaran1607" target="_blank" rel="noreferrer" className="block p-4 border border-primary/20 hover:border-primary transition-colors group">
                  <span className="font-label-caps text-[9px] text-on-surface-variant/60 block">GITHUB_CORE</span>
                  <span className="font-body text-sm text-on-surface group-hover:text-primary transition-colors">GITHUB.COM/SAISWARAN1607</span>
                </a>
                <a href="https://linkedin.com/in/maramsaiswaran" target="_blank" rel="noreferrer" className="block p-4 border border-primary/20 hover:border-primary transition-colors group">
                  <span className="font-label-caps text-[9px] text-on-surface-variant/60 block">LINKED_NODE</span>
                  <span className="font-body text-sm text-on-surface group-hover:text-primary transition-colors">LINKEDIN.COM/IN/MARAMSAISWARAN</span>
                </a>
              </div>
            </div>

            {/* Download resume + system status */}
            <div className="space-y-6">
              <div className="glass-panel p-8 border border-primary/20 text-center">
                <span className="material-symbols-outlined text-primary text-5xl mb-4">download</span>
                <h3 className="font-display text-xl font-bold text-on-surface uppercase mb-3">DOWNLOAD_MANIFESTO</h3>
                <p className="font-body text-xs text-on-surface-variant mb-6">Retrieve the compiled operator dossier in PDF format.</p>
                <a href="/MARAM_SAI_SWARAN_RESUME.pdf" target="_blank" className="inline-block px-10 py-4 border border-primary text-primary font-label-caps text-[11px] tracking-[0.2em] hover:bg-primary hover:text-on-primary transition-all duration-300">
                  INITIALIZE_DOWNLOAD
                </a>
              </div>
              <div className="glass-panel p-6 border border-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-label-caps text-[10px] text-on-surface-variant">CORE_STATUS</span>
                  <span className="flex items-center gap-2 font-body text-[11px] text-primary font-bold">
                    <span className="w-2 h-2 bg-primary animate-pulse rounded-full shadow-[0_0_6px_rgba(255,84,75,0.6)]"></span>
                    OPERATIONAL
                  </span>
                </div>
                <div className="space-y-2 font-body text-xs">
                  <div className="flex justify-between"><span className="text-on-surface-variant/60">LATENCY:</span><span className="text-primary font-bold">12ms</span></div>
                  <div className="flex justify-between"><span className="text-on-surface-variant/60">ENCRYPTION:</span><span className="text-primary font-bold">AES-256</span></div>
                  <div className="flex justify-between"><span className="text-on-surface-variant/60">PROTOCOL:</span><span className="text-primary font-bold">ENCOM_SSH_V4</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-primary/20 bg-background/80 backdrop-blur-md py-10 px-5 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-label-caps text-[11px] text-primary tracking-[0.2em]">ARES_SYSTEM</div>
          <div className="flex gap-6 font-body text-[11px] text-on-surface-variant uppercase tracking-wider">
            <a href="https://github.com/saiswaran1607" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GITHUB</a>
            <a href="https://linkedin.com/in/maramsaiswaran" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LINKEDIN</a>
            <a href="mailto:maramsaiswaran@gmail.com" className="hover:text-primary transition-colors">EMAIL</a>
          </div>
          <div className="font-body text-[10px] text-on-surface-variant/40 uppercase tracking-wider">
            © 2026 MARAM SAI SWARAN. PROTOCOL ACTIVE.
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
