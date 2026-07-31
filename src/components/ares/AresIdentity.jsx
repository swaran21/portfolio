import React, { useState } from 'react';
import useSound from '../../hooks/useSound';
import profileImg from '../../assets/profile-portfolio.png';

const AresIdentity = ({ setActiveTab }) => {
  const { playSound } = useSound();
  const [downloading, setDownloading] = useState(false);
  const [highlightedSkills, setHighlightedSkills] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [showAllExp, setShowAllExp] = useState(false);

  const handleExperienceClick = (exp) => {
    playSound('tick');
    if (highlightedSkills === exp.relatedSkills) {
      setHighlightedSkills(null);
      setSelectedExperience(null);
    } else {
      setHighlightedSkills(exp.relatedSkills);
      setSelectedExperience(exp);
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    playSound('transform');
    setTimeout(() => {
      setDownloading(false);
      playSound('hover');
      const element = document.createElement("a");
      const file = new Blob([
        `=========================================\n`,
        `PORTFOLIO // MARAM_SAI_SWARAN\n`,
        `=========================================\n\n`,
        `[IDENTITY]\n`,
        `- Operator ID: MARAM_SAI_SWARAN\n`,
        `- Role: Software Engineer // Full Stack Developer\n`,
        `- Education: B.Tech CSE @ Vardhaman College of Engineering\n`,
        `- Academic Metric: 8.38 CGPA\n`,
        `- Timeline: 2023 - 2027\n`,
        `- Experience: 1+ Years\n\n`,
        `[TECHNICAL_SPECIFICATIONS]\n`,
        `- Languages (Java, Python, C, JavaScript)\n`,
        `- Frameworks (Spring Boot, Spring Security, Spring Data JPA, Hibernate, React.js, Node.js, Tailwind CSS)\n`,
        `- Backend (REST APIs, Microservices, Spring Cloud, OpenFeign, Spring Cloud Gateway, Resilience4j, OpenAPI/Swagger)\n`,
        `- DevOps/Cloud (AWS, Google Cloud Platform, Apache Kafka, Docker, Kubernetes, Jenkins, CI/CD, Grafana)\n`,
        `- Databases (PostgreSQL, MySQL, MongoDB, Redis)\n`,
        `- Testing (JUnit, Mockito)\n`,
        `- Developer Tools (Git, GitHub, Maven, Gradle, IntelliJ IDEA, Eclipse, VS Code, Postman)\n`,
        `- Core Concepts (System Design, Distributed Systems, Event-Driven Architecture)\n\n`,
        `[DIRECTIVES]\n`,
        `1. Optimize system response latency to <0.02ms.\n`,
        `2. Build production-grade high-performance backend systems.\n`,
        `3. Deploy zero-trust containerized microservice architectures.\n\n`,
        `=========================================\n`,
        `PROTOCOL ACTIVE // SYSTEM ONLINE\n`,
        `=========================================\n`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = "MARAM_SAI_SWARAN_RESUME.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  return (
    <div className="w-full px-5 md:px-16 max-w-[1400px] mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-10 h-px bg-primary"></span>
        <span className="font-body text-[11px] text-primary uppercase tracking-[0.4em] font-bold bg-background/50 px-2 py-0.5">SECTION_002 // ABOUT_ME</span>
      </div>
      <h2 className="font-display text-4xl md:text-6xl font-bold text-on-surface uppercase tracking-tighter mb-16 drop-shadow-md">ABOUT_ME</h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Profile Card */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-panel relative p-8 group">
            <div className="absolute top-4 right-4 font-body text-[10px] text-primary/60 font-bold">
              SN: 8842-MS-772
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-48 h-48 border-2 border-primary glow-sm p-2 mb-6 bg-background/20 rounded-sm">
                <img
                  alt="Maram Sai Swaran"
                  className="w-full h-full object-cover transition-all duration-500 rounded-sm"
                  src={profileImg}
                />
              </div>

              <h1 className="font-display text-2xl font-bold text-primary tracking-tighter uppercase mb-2 drop-shadow-md">
                SAI_SWARAN
              </h1>
              <p className="font-body text-xs text-on-surface tracking-[0.2em] uppercase mb-6 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                Software Engineer // Full Stack Developer
              </p>

              <div className="w-full border-t border-primary/30 pt-6 space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <span className="font-body text-[10px] text-on-surface/80 font-bold drop-shadow-md">Vardhaman College</span>
                  <span className="font-body text-xs text-primary font-bold drop-shadow-md">2023 - 2027</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-[10px] text-on-surface/80 font-bold drop-shadow-md">B.Tech CSE</span>
                  <span className="font-body text-xs text-primary font-bold drop-shadow-md">CGPA: 8.38</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-[10px] text-on-surface/80 font-bold drop-shadow-md">EXPERIENCE</span>
                  <span className="font-body text-xs text-primary font-bold drop-shadow-md">1+ Years</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8">
            <h3 className="font-body text-xs text-primary tracking-widest uppercase mb-8 flex items-center gap-2 font-bold drop-shadow-md">
              <span className="material-symbols-outlined text-[18px]">terminal</span>
              Technical_Specs
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Languages', skills: 'Java, Python, C, JavaScript', pct: '95%' },
                { label: 'Frameworks', skills: 'Spring Boot, React.js, Node.js, Tailwind CSS', pct: '90%' },
                { label: 'Backend', skills: 'REST APIs, Microservices, Spring Cloud', pct: '92%' },
                { label: 'DevOps/Cloud', skills: 'AWS, GCP, Kafka, Docker, Kubernetes', pct: '88%' },
                { label: 'Databases', skills: 'PostgreSQL, MySQL, MongoDB, Redis', pct: '85%' },
                { label: 'Tools', skills: 'Git, Maven, Gradle, Postman', pct: '90%' },
                { label: 'Core Concepts', skills: 'System Design, Event-Driven Arch', pct: '90%' }
              ].map((s) => {
                const isHighlighted = highlightedSkills && highlightedSkills.includes(s.label);
                return (
                  <div key={s.label} className="transition-all duration-300">
                    <div className="flex justify-between mb-2">
                      <span className={`font-body text-xs uppercase tracking-wider transition-colors duration-300 drop-shadow-[0_1px_1px_rgba(0,0,0,1)] ${isHighlighted ? 'text-primary font-bold' : 'text-on-surface/80 font-bold'}`}>
                        {s.label}: <span className={`${isHighlighted ? 'text-on-surface' : 'text-on-surface/60'} font-normal`}>{s.skills}</span>
                      </span>
                      <span className={`font-body text-xs font-bold transition-colors duration-300 drop-shadow-md ${isHighlighted ? 'text-on-surface' : 'text-primary'}`}>{s.pct}</span>
                    </div>
                    <div className="h-1 w-full bg-background/20 border border-primary/20 relative overflow-visible rounded-full">
                      <div className={`absolute top-0 left-0 h-full transition-all duration-500 rounded-full ${isHighlighted ? 'bg-on-surface shadow-[0_0_10px_#fff]' : 'bg-primary glow-sm'}`} style={{ width: s.pct }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <div className="glass-panel p-8 md:p-10 relative overflow-hidden h-full">
            <div className="scanline"></div>

            <div className="flex items-center gap-4 mb-8">
              <div className="p-2 border border-primary/40 bg-background/20 drop-shadow-md">
                <span className="material-symbols-outlined text-primary">history_edu</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface tracking-tight uppercase drop-shadow-md">
                EXPERIENCE
              </h2>
            </div>

            <div className="space-y-8">
              {[
                {
                  role: 'Full Stack Developer Intern',
                  org: 'RavenDOS',
                  period: 'JAN 2026 — APR 2026',
                  status: 'COMPLETED',
                  log: 'Engineered an Agentic RAG architecture using Qdrant for semantic search and containerized microservices on K8s.',
                  relatedSkills: ['React', 'Node.js', 'Kubernetes', 'Qdrant', 'RAG'],
                  details: [
                    'Engineered an Agentic Retrieval-Augmented Generation (RAG) architecture that dynamically routes healthcare queries using Qdrant for semantic search and hybrid re-ranking.',
                    'Developed the core application with a React frontend and Node.js/Express backend to handle authentication, validations, and complex prompt engineering.',
                    'Integrated Apache Kafka for asynchronous event streaming, utilizing worker nodes to synchronize state between MySQL and Qdrant.',
                    'Containerized services with Docker and orchestrated highly resilient deployments using Kubernetes (K8s) and Jenkins CI/CD pipelines.'
                  ]
                },
                {
                  role: 'DSA Mentor Intern',
                  org: 'MentiBY',
                  period: 'SEP 2025 — JAN 2026',
                  status: 'COMPLETED',
                  log: 'Directed intensive training sessions in Advanced Data Structures & Algorithms using Java.',
                  relatedSkills: ['Java', 'Data Structures', 'Algorithms', 'Mentorship'],
                  details: [
                    'Directed and led batch-wise intensive training sessions in Advanced Data Structures & Algorithms using Java.',
                    'Mentored students in core problem-solving strategies and system logic.',
                    'Conducted rigorous code reviews and interactive doubt-solving sessions.',
                    'Focused on optimizing algorithm efficiency and reducing time/space complexity.'
                  ]
                },
                {
                  role: 'AWS Trainee',
                  org: 'MassMutual India',
                  period: 'AUG 2025 — OCT 2025',
                  status: 'COMPLETED',
                  log: 'Completed comprehensive AWS cloud architecture case study with hands-on core AWS services experience.',
                  relatedSkills: ['AWS', 'Cloud Architecture', 'EC2', 'S3'],
                  details: [
                    'Successfully completed a comprehensive AWS cloud architecture case study.',
                    'Gained hands-on experience with core AWS services and scalable cloud infrastructure.',
                    'Received a Certificate of Appreciation for demonstrating a strong understanding of cloud-native concepts.',
                    'Applied best practices to practical real-world scenarios.'
                  ]
                },
                {
                  role: 'Backend Developer Intern',
                  org: 'PearlThoughts',
                  period: 'JUL 2025 — AUG 2025',
                  status: 'COMPLETED',
                  log: 'Designed secure RESTful APIs for a real-time doctor-patient appointment platform utilized by multiple clinics.',
                  relatedSkills: ['RESTful APIs', 'Database Optimization', 'Agile SDLC', 'Java'],
                  details: [
                    'Designed and integrated secure RESTful APIs supporting a real-time doctor–patient appointment platform.',
                    'Actively contributed to the Agile SDLC by managing database optimization and tracking daily sprint goals.',
                    'Conceptualized comprehensive ER diagrams for robust relational data structuring.',
                    'Collaborated closely with DevOps to support seamless server-side deployments and manage pull requests.'
                  ]
                },
                {
                  role: 'AI & ML Intern',
                  org: 'NIELIT',
                  period: 'AUG 2024 — OCT 2024',
                  status: 'COMPLETED',
                  log: 'Developed predictive Machine Learning models and Deep Learning neural networks using Python and LSTMs.',
                  relatedSkills: ['Python', 'Machine Learning', 'LSTM', 'Deep Learning'],
                  details: [
                    'Developed and trained comprehensive Machine Learning models (Linear Regression, Random Forest) for predictive data analysis.',
                    'Designed and implemented Deep Learning neural networks using Python.',
                    'Specifically utilized Long Short-Term Memory (LSTM) networks to process sequential data.',
                    'Focused on enhancing data prediction accuracy over complex datasets.'
                  ]
                }
              ].slice(0, showAllExp ? 5 : 4).map((exp, i) => {
                const isActive = highlightedSkills === exp.relatedSkills;
                return (
                  <div
                    key={i}
                    onClick={() => handleExperienceClick(exp)}
                    className={`border-l-2 pl-6 relative cursor-pointer transition-all duration-300 py-3 group ${isActive ? 'border-primary bg-primary/10' : 'border-primary/30 hover:bg-background/20'}`}
                  >
                    <div className={`absolute -left-[7px] top-4 w-3 h-3 rounded-full transition-all duration-300 ${isActive ? 'bg-on-surface shadow-[0_0_10px_#fff] scale-125' : 'bg-primary group-hover:scale-110'}`}></div>
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2 drop-shadow-md">
                      <h3 className="font-display text-lg font-bold text-on-surface uppercase">{exp.role} <span className="text-primary">@ {exp.org}</span></h3>
                      <span className="font-body text-[10px] text-primary font-bold bg-background/20 border border-primary/20 px-2 py-0.5 uppercase">{exp.period}</span>
                    </div>
                    <p className="font-sans text-xs text-on-surface font-normal leading-relaxed drop-shadow-[0_1px_1px_rgba(0,0,0,1)] opacity-90">{exp.log}</p>
                  </div>
                );
              })}

              <div className="pt-8 border-t border-primary/30 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  onMouseEnter={() => playSound('hover')}
                  className="flex-1 min-w-[200px] border border-primary bg-primary/10 hover:bg-primary text-primary hover:text-background px-8 py-4 font-body text-xs font-bold transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 glass-panel"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  {downloading ? 'COMPILING...' : 'DOWNLOAD RESUME'}
                </button>
                {/* Load More Button */}
                <button
                  onClick={() => setShowAllExp(!showAllExp)}
                  onMouseEnter={() => playSound('hover')}
                  className="flex-1 min-w-[200px] border border-primary/40 bg-background/20 hover:border-primary text-on-surface hover:text-primary px-8 py-4 font-body text-xs font-bold transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer glass-panel"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showAllExp ? 'expand_less' : 'expand_more'}
                  </span>
                  {showAllExp ? 'SHOW LESS' : 'LOAD MORE'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cloud & AI & Accolades Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Achievements Focus */}
        <div className="glass-panel p-8 text-left">
          <h3 className="font-body text-xs text-primary tracking-widest uppercase mb-6 flex items-center gap-2 font-bold drop-shadow-md">
            <span className="material-symbols-outlined text-[18px]">emoji_events</span>
            ACHIEVEMENTS
          </h3>
          <div className="space-y-6">
            <div className="border-l-2 border-primary/40 pl-4 relative group">
              <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-all duration-300"></div>
              <h4 className="font-display text-sm md:text-base font-bold text-on-surface uppercase mb-1 drop-shadow-md">Competitive Programming</h4>
              <p className="font-sans text-xs text-on-surface/90 font-normal leading-relaxed drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                Achieved a LeetCode Rating of 1937 (Global Rank: 31,199), demonstrating advanced algorithmic problem-solving; active on Codeforces (1283) and CodeChef (1330).
              </p>
            </div>
            <div className="border-l-2 border-primary/40 pl-4 relative group">
              <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-all duration-300"></div>
              <h4 className="font-display text-sm md:text-base font-bold text-on-surface uppercase mb-1 drop-shadow-md">Winner — Agentforce Salesforce Hackathon</h4>
              <span className="font-body text-[10px] text-primary font-bold border border-primary/20 bg-background/20 px-2 py-0.5 uppercase mb-2 inline-block">MAR 2026</span>
              <p className="font-sans text-xs text-on-surface/90 font-normal leading-relaxed drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                Led the development of an AI Preventive Healthcare Detection & Monitoring System.
              </p>
            </div>
            <div className="border-l-2 border-primary/40 pl-4 relative group">
              <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-all duration-300"></div>
              <h4 className="font-display text-sm md:text-base font-bold text-on-surface uppercase mb-1 drop-shadow-md">Microsoft Recognition & Azure Subscription Grant</h4>
              <span className="font-body text-[10px] text-primary font-bold border border-primary/20 bg-background/20 px-2 py-0.5 uppercase mb-2 inline-block">MAR 2025</span>
              <p className="font-sans text-xs text-on-surface/90 font-normal leading-relaxed drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                Awarded a month of free Azure Subscription for outstanding technical participation and passion for new technologies.
              </p>
            </div>
          </div>
        </div>

        {/* Certifications Registry */}
        <div className="glass-panel p-8 text-left">
          <h3 className="font-body text-xs text-primary tracking-widest uppercase mb-6 flex items-center gap-2 font-bold drop-shadow-md">
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            CERTIFICATIONS
          </h3>
          <div className="space-y-4">
            {[
              "Claude 101 & Intro to Model Context Protocol (MCP) — Anthropic",
              "Google Cloud Career Launchpad — Google Cloud Skills Boost",
              "Software Engineering Virtual Experience — JPMorgan Chase & Co.",
              "Java Spring Boot (Advanced) & Java Foundation — Infosys SpringBoard",
              "Career Essentials in Generative AI by Microsoft and LinkedIn — Microsoft"
            ].map((cert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-background/10 border border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-colors group rounded-sm">
                <span className="material-symbols-outlined text-primary text-[16px] mt-0.5 group-hover:drop-shadow-[0_0_8px_var(--color-primary)] transition-all">verified</span>
                <p className="font-sans text-xs text-on-surface font-normal leading-relaxed drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                  {cert}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Details Holographic Modal */}
      {selectedExperience && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-md cursor-pointer"
            onClick={() => { setSelectedExperience(null); setHighlightedSkills(null); playSound('tick'); }}
          ></div>
          <div className="relative glass-panel p-8 md:p-12 max-w-3xl w-full max-h-[85vh] overflow-y-auto glow-sm [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-background/20 [&::-webkit-scrollbar-thumb]:bg-primary">
            <button
              onClick={() => { setSelectedExperience(null); setHighlightedSkills(null); playSound('tick'); }}
              className="absolute top-6 right-6 text-primary hover:text-on-surface transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-3xl drop-shadow-md">close</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-primary"></span>
              <span className="font-body text-[10px] text-primary uppercase tracking-[0.3em] font-bold">DECRYPTED_LOG_ARCHIVE</span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface uppercase mb-2 drop-shadow-md">
              {selectedExperience.role}
            </h2>
            <h3 className="font-display text-xl md:text-2xl text-primary uppercase mb-8 font-bold drop-shadow-md">
              @ {selectedExperience.org} <span className="text-on-surface/60 text-sm ml-2 font-normal">// {selectedExperience.status}</span>
            </h3>

            <div className="space-y-6 font-sans text-sm md:text-base text-on-surface font-normal leading-relaxed drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
              {selectedExperience.details.map((detail, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <span className="text-primary font-bold mt-1">&gt;&gt;</span>
                  <p>{detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-primary/30 flex flex-wrap gap-3">
              {selectedExperience.relatedSkills.map(skill => (
                <span key={skill} className="px-4 py-2 glass-panel border border-primary/40 text-primary font-body text-[10px] tracking-widest uppercase font-bold drop-shadow-md rounded-sm">
                  {skill}
                </span>
              ))}
            </div>
            <div className="scanline opacity-30"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AresIdentity;