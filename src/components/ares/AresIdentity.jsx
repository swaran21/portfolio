import React, { useState } from 'react';
import useSound from '../../hooks/useSound';

const AresIdentity = ({ setActiveTab }) => {
  const { playSound } = useSound();
  const [downloading, setDownloading] = useState(false);
  const [highlightedSkills, setHighlightedSkills] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

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
      
      // Setup a simulated robust download file
      const element = document.createElement("a");
      const file = new Blob([
        `=========================================\n`,
        `ARES_SYSTEM // OPERATOR_MARAM_SAI_SWARAN\n`,
        `=========================================\n\n`,
        `[IDENTITY]\n`,
        `- Operator ID: MARAM_SAI_SWARAN\n`,
        `- Role: Principal System Architect // SWE Intern\n`,
        `- Education: B.Tech CSE @ Vardhaman College of Engineering\n`,
        `- Academic Metric: 8.73 CGPA\n`,
        `- Timeline: 2023 - 2027\n`,
        `- Clearance: LEVEL_09_RED\n\n`,
        `[TECHNICAL_SPECIFICATIONS]\n`,
        `- Core Logic (Java, Python, Node.js): 92%\n`,
        `- Frameworks (Spring Boot, React, Next.js): 88%\n`,
        `- Infrastructure (AWS, GCP Certified): 80%\n`,
        `- Neural Networks (RAG Pipelines, Gemini API): 75%\n\n`,
        `[DIRECTIVES]\n`,
        `1. Optimize system response latency to <0.02ms.\n`,
        `2. Build production-grade high-performance backend systems.\n`,
        `3. Deploy zero-trust containerized microservice architectures.\n\n`,
        `=========================================\n`,
        `PROTOCOL ACTIVE // SYSTEM ONLINE\n`,
        `=========================================\n`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = "MARAM_SAI_SWARAN_MANIFESTO.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  return (
    <div className="w-full px-5 md:px-16 max-w-[1400px] mx-auto">
      {/* Narrative Section Header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="w-10 h-px bg-primary"></span>
        <span className="font-body text-[11px] text-primary uppercase tracking-[0.4em]">SECTION_002 // OPERATOR_IDENTITY</span>
      </div>
      <h2 className="font-display text-4xl md:text-6xl font-bold text-on-surface uppercase tracking-tighter mb-16">THE_ARCHITECT</h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Profile Identity Card (Left) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-panel relative p-8 group border border-primary/20">
            <div className="absolute top-4 right-4 font-label-caps text-[10px] text-primary/40 opacity-70">
              SN: 8842-MS-772
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-48 h-48 border-2 border-primary glow-red p-2 mb-6">
                <img 
                  alt="Identity Portrait" 
                  className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-500" 
                  src="https://gemini.google.com/share/17dae5568938"
                />
              </div>
              
              <h1 className="font-display text-2xl font-bold text-primary tracking-tighter uppercase mb-2">
                SAI_SWARAN
              </h1>
              
              <p className="font-body text-xs text-on-surface-variant tracking-[0.2em] uppercase mb-6">
                Principal System Architect
              </p>
              
              <div className="w-full border-t border-primary/20 pt-6 space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <span className="font-label-caps text-[10px] text-on-surface-variant">Vardhaman College</span>
                  <span className="font-body text-xs text-primary font-bold">2023 - 2027</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-label-caps text-[10px] text-on-surface-variant">B.Tech CSE</span>
                  <span className="font-body text-xs text-primary">CGPA: 8.73</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-label-caps text-[10px] text-on-surface-variant">CLEARANCE</span>
                  <span className="font-body text-xs text-primary font-bold">LEVEL_09_RED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Arsenal progress meters */}
          <div className="glass-panel p-8 border border-primary/10">
            <h3 className="font-label-caps text-xs text-primary tracking-widest uppercase mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">terminal</span>
              Technical_Specs
            </h3>
            
            <div className="space-y-6">
              {[
                { label: 'CORE_LOGIC', skills: 'Java, Python, Node.js', pct: '92%' },
                { label: 'FRAMEWORKS', skills: 'Spring Boot, React, Next.js', pct: '88%' },
                { label: 'INFRASTRUCTURE', skills: 'AWS, GCP (Certified)', pct: '80%' },
                { label: 'NEURAL_NETS', skills: 'RAG Pipelines, Gemini API', pct: '75%' },
              ].map((s) => {
                const isHighlighted = highlightedSkills && highlightedSkills.includes(s.label);
                return (
                  <div key={s.label} className="transition-all duration-300">
                    <div className="flex justify-between mb-2">
                      <span className={`font-body text-xs uppercase tracking-wider transition-colors duration-300 ${isHighlighted ? 'text-primary font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`}>
                        {s.label}: <span className={`font-normal ${isHighlighted ? 'text-on-surface' : 'text-on-surface-variant'}`}>{s.skills}</span>
                      </span>
                      <span className={`font-body text-xs font-bold transition-colors duration-300 ${isHighlighted ? 'text-white' : 'text-primary'}`}>{s.pct}</span>
                    </div>
                    <div className="h-1 w-full bg-primary/10 relative overflow-visible">
                      <div className={`absolute top-0 left-0 h-full transition-all duration-500 ${isHighlighted ? 'bg-white shadow-[0_0_15px_#fff,0_0_5px_#fff]' : 'bg-primary glow-sm'}`} style={{ width: s.pct }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Narrative & Timeline logs (Right) */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <div className="glass-panel p-8 md:p-10 relative overflow-hidden h-full border border-primary/20">
            <div className="scanline"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="p-2 border border-primary/40 bg-primary/5">
                <span className="material-symbols-outlined text-primary">history_edu</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface tracking-tight uppercase">
                ACTIVE_PROTOCOLS_TIMELINE
              </h2>
            </div>
            
            <div className="space-y-8">
              {[
                {
                  role: 'Software Engineer Intern',
                  org: 'DevAI',
                  period: 'JAN 2026 — PRESENT',
                  status: 'ACTIVE',
                  log: 'Developing healthcare-related RAG pipelines and AI integrations. Architecting Spring Boot components to sync custom vector embeddings with secure Gemini API pipelines.',
                  relatedSkills: ['NEURAL_NETS', 'FRAMEWORKS', 'CORE_LOGIC'],
                  details: [
                    'Architecting a highly scalable Retrieval-Augmented Generation (RAG) pipeline for healthcare analytics.',
                    'Synchronizing custom vector embeddings with the Gemini API to improve AI contextual accuracy.',
                    'Engineering critical Spring Boot backend microservices to ensure strict healthcare data compliance.',
                    'Optimizing database matrix operations, reducing overall query latency by up to 45%.'
                  ]
                },
                {
                  role: 'DSA Mentor',
                  org: 'MentiBy',
                  period: 'JAN 2026',
                  status: 'COMPLETED',
                  log: 'Mentoring student batches in complex Data Structures and Algorithms. Conducting high-throughput live problem-solving sessions and matrix optimizations.',
                  relatedSkills: ['CORE_LOGIC'],
                  details: [
                    'Mentoring student batches in advanced Data Structures, Algorithms, and System Design concepts.',
                    'Conducting high-throughput live problem-solving sessions focusing on time and space complexity.',
                    'Developing comprehensive lesson plans around dynamic programming, graph theory, and matrix optimizations.',
                    'Providing 1-on-1 code reviews and architectural guidance for over 50+ aspiring software engineers.'
                  ]
                },
                {
                  role: 'Backend Developer Intern',
                  org: 'PearlThoughts',
                  period: 'JUL 2025 — AUG 2025',
                  status: 'ARCHIVED',
                  log: 'Architecting high-availability backend infrastructures. Streamlining database execution cycles and establishing microservices connections.',
                  relatedSkills: ['CORE_LOGIC', 'FRAMEWORKS', 'INFRASTRUCTURE'],
                  details: [
                    'Architected high-availability backend infrastructures using Spring Boot and Node.js.',
                    'Streamlined database execution cycles and reduced redundant queries through efficient indexing and caching strategies.',
                    'Established secure and robust microservices connections over REST and gRPC protocols.',
                    'Automated cloud deployment pipelines to ensure 99.9% uptime during the internship tenure.'
                  ]
                },
              ].map((exp, i) => {
                const isActive = highlightedSkills === exp.relatedSkills;
                return (
                  <div 
                    key={i} 
                    onClick={() => handleExperienceClick(exp)}
                    className={`border-l-2 pl-6 relative cursor-pointer hover:bg-primary/5 transition-all duration-300 py-2 group ${isActive ? 'border-primary bg-primary/10' : 'border-primary/20'}`}
                  >
                    <div className={`absolute -left-[7px] top-3 w-3 h-3 rounded-full transition-all duration-300 ${isActive ? 'bg-white glow-primary scale-125' : 'bg-primary glow-sm group-hover:scale-110'}`}></div>
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <h3 className="font-display text-lg font-bold text-on-surface uppercase">{exp.role} <span className="text-primary">@ {exp.org}</span></h3>
                      <span className="font-body text-[10px] text-primary/60 uppercase">{exp.period}</span>
                    </div>
                    <p className="font-body text-xs text-on-surface-variant leading-relaxed">{exp.log}</p>
                  </div>
                );
              })}
              
              <div className="pt-8 border-t border-primary/20 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleDownload}
                  disabled={downloading}
                  onMouseEnter={() => playSound('hover')}
                  className="flex-1 min-w-[200px] border border-primary bg-primary text-background px-8 py-4 font-label-caps text-xs font-bold hover:bg-background hover:text-primary transition-all duration-300 glow-sm uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  {downloading ? 'COMPILING...' : 'Download_Main_Manifest'}
                </button>
                
                <button 
                  onClick={() => { playSound('transform'); setActiveTab('STREAM'); }}
                  onMouseEnter={() => playSound('hover')}
                  className="flex-1 min-w-[200px] border border-primary/30 px-8 py-4 font-label-caps text-xs font-bold hover:bg-primary/10 hover:border-primary transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">mail</span>
                  Establish_Uplink
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Experience Details Holographic Modal */}
      {selectedExperience && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer" 
            onClick={() => { setSelectedExperience(null); setHighlightedSkills(null); playSound('tick'); }}
          ></div>
          <div className="relative glass-panel border border-primary/40 p-8 md:p-12 max-w-3xl w-full max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in duration-300 glow-red">
            <button 
              onClick={() => { setSelectedExperience(null); setHighlightedSkills(null); playSound('tick'); }}
              className="absolute top-6 right-6 text-primary hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-primary"></span>
              <span className="font-label-caps text-[10px] text-primary uppercase tracking-[0.3em]">DECRYPTED_LOG_ARCHIVE</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface uppercase mb-2">
              {selectedExperience.role}
            </h2>
            <h3 className="font-display text-xl md:text-2xl text-primary uppercase mb-8">
              @ {selectedExperience.org} <span className="text-on-surface-variant text-sm ml-2">// {selectedExperience.status}</span>
            </h3>
            
            <div className="space-y-6 font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
              {selectedExperience.details.map((detail, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <span className="text-primary opacity-50 mt-1 transition-opacity duration-300 group-hover:opacity-100">&gt;&gt;</span>
                  <p className="group-hover:text-on-surface transition-colors duration-300">{detail}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-6 border-t border-primary/20 flex flex-wrap gap-3">
              {selectedExperience.relatedSkills.map(skill => (
                <span key={skill} className="px-4 py-2 bg-primary/10 border border-primary/30 text-primary font-label-caps text-[10px] tracking-widest uppercase">
                  {skill}
                </span>
              ))}
            </div>
            <div className="scanline"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AresIdentity;
