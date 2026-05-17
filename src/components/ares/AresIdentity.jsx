import React, { useState } from 'react';
import useSound from '../../hooks/useSound';

const AresIdentity = ({ setActiveTab }) => {
  const { playSound } = useSound();
  const [downloading, setDownloading] = useState(false);

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
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between mb-2">
                    <span className="font-body text-xs uppercase tracking-wider">{s.label}: <span className="text-on-surface-variant">{s.skills}</span></span>
                    <span className="font-body text-xs text-primary font-bold">{s.pct}</span>
                  </div>
                  <div className="h-1 w-full bg-primary/10 relative">
                    <div className="absolute top-0 left-0 h-full bg-primary glow-sm" style={{ width: s.pct }}></div>
                  </div>
                </div>
              ))}
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
                },
                {
                  role: 'DSA Mentor',
                  org: 'MentiBy',
                  period: 'JAN 2026',
                  status: 'COMPLETED',
                  log: 'Mentoring student batches in complex Data Structures and Algorithms. Conducting high-throughput live problem-solving sessions and matrix optimizations.',
                },
                {
                  role: 'Backend Developer Intern',
                  org: 'PearlThoughts',
                  period: 'JUL 2025 — AUG 2025',
                  status: 'ARCHIVED',
                  log: 'Architecting high-availability backend infrastructures. Streamlining database execution cycles and establishing microservices connections.',
                },
              ].map((exp, i) => (
                <div key={i} className="border-l-2 border-primary/20 pl-6 relative">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-primary rounded-full glow-sm"></div>
                  <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                    <h3 className="font-display text-lg font-bold text-on-surface uppercase">{exp.role} <span className="text-primary">@ {exp.org}</span></h3>
                    <span className="font-body text-[10px] text-primary/60 uppercase">{exp.period}</span>
                  </div>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed">{exp.log}</p>
                </div>
              ))}
              
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
    </div>
  );
};

export default AresIdentity;
