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
      // Trigger a simulated manifest download
      const element = document.createElement("a");
      const file = new Blob([
        `=========================================\n`,
        `ARES_SYSTEM // OPERATOR_SAISW_DOSSIER\n`,
        `=========================================\n\n`,
        `[IDENTITY]\n`,
        `- Operator ID: SAISW // NULL\n`,
        `- Role: Principal Full Stack Architect\n`,
        `- Location: SECTOR_V_CORE\n`,
        `- Uptime: 14212 Cycles\n`,
        `- Clearance: LEVEL_09_RED\n\n`,
        `[TECHNICAL_SPECIFICATIONS]\n`,
        `- Frontend & Interactive UI/UX: 94%\n`,
        `- API Architecture & Logic: 88%\n`,
        `- Decoupled Grid Systems: 76%\n\n`,
        `[DIRECTIVES]\n`,
        `1. Optimize user response latency to <0.02ms.\n`,
        `2. Architect modular, high-contrast reactive shells.\n`,
        `3. Harden zero-trust distributed ledger nodes.\n\n`,
        `=========================================\n`,
        `PROTOCOL ACTIVE // SYSTEM ONLINE\n`,
        `=========================================\n`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = "SAISW_MAINBOARD_MANIFESTO.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  return (
    <div className="w-full">
      <main className="relative z-10 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Profile Column (Left) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Profile Identity Card */}
            <div className="glass-panel relative p-8 group border border-primary/20">
              <div className="absolute top-4 right-4 font-label-caps text-[10px] text-primary/40 opacity-70">
                SN: 8842-AX-772
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-48 h-48 border-2 border-primary glow-red p-2 mb-6">
                  <img 
                    alt="Identity Portrait" 
                    className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA56KzfqboMx_3Et7WblDKQoSQn9t_8N8zynVtF9COzE0jTkXg10YfptQPPtLpFYBLm39pj83S6cYbhp5js_nPxFWKpQJO_MU3sHMe8QEPgZor_WjrWGDEFi9SUxEo6UHxGumw7O2mOxyVz6UbOyqu2eVpa-fc5V1I9-aAMyjP9FjVj8O-YJ75BYHSRsGqc6TsSSvzJhe3ILIry3mPs_pyF5TFWoqo4cJLtVZPUtbtN6FtQv8vYd_5neBkv-Dm0ktkksMYnRd3Qm8Y"
                  />
                </div>
                
                <h1 className="font-display text-3xl font-bold text-primary tracking-tighter uppercase mb-2">
                  OPERATOR_SAISW
                </h1>
                
                <p className="font-body text-xs text-on-surface-variant tracking-[0.2em] uppercase mb-6">
                  Principal System Architect
                </p>
                
                <div className="w-full border-t border-primary/20 pt-6 space-y-4 text-left">
                  <div className="flex justify-between items-center">
                    <span className="font-label-caps text-[10px] text-on-surface-variant">CLEARANCE</span>
                    <span className="font-body text-xs text-primary font-bold">LEVEL_09_RED</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label-caps text-[10px] text-on-surface-variant">LOCATION</span>
                    <span className="font-body text-xs text-primary">SECTOR_V_CORE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label-caps text-[10px] text-on-surface-variant">UPTIME</span>
                    <span className="font-body text-xs text-primary">14,212_CYCLES</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="glass-panel p-8 border border-primary/10">
              <h3 className="font-label-caps text-xs text-primary tracking-widest uppercase mb-8 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">terminal</span>
                Technical_Specs
              </h3>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-body text-xs uppercase tracking-wider">Frontend UI Architecture</span>
                    <span className="font-body text-xs text-primary font-bold">94%</span>
                  </div>
                  <div className="h-1 w-full bg-primary/10 relative">
                    <div className="absolute top-0 left-0 h-full bg-primary glow-sm" style={{ width: '94%' }}></div>
                    <div className="absolute top-0 left-0 h-full w-full flex justify-between pointer-events-none">
                      <div className="w-px h-full bg-background"></div>
                      <div className="w-px h-full bg-background"></div>
                      <div className="w-px h-full bg-background"></div>
                      <div className="w-px h-full bg-background"></div>
                      <div className="w-px h-full bg-background"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-body text-xs uppercase tracking-wider">API Sync Logic</span>
                    <span className="font-body text-xs text-primary font-bold">88%</span>
                  </div>
                  <div className="h-1 w-full bg-primary/10 relative">
                    <div className="absolute top-0 left-0 h-full bg-primary glow-sm" style={{ width: '88%' }}></div>
                    <div className="absolute top-0 left-0 h-full w-full flex justify-between pointer-events-none">
                      <div className="w-px h-full bg-background"></div>
                      <div className="w-px h-full bg-background"></div>
                      <div className="w-px h-full bg-background"></div>
                      <div className="w-px h-full bg-background"></div>
                      <div className="w-px h-full bg-background"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-body text-xs uppercase tracking-wider">Decoupled Systems</span>
                    <span className="font-body text-xs text-primary font-bold">76%</span>
                  </div>
                  <div className="h-1 w-full bg-primary/10 relative">
                    <div className="absolute top-0 left-0 h-full bg-primary glow-sm" style={{ width: '76%' }}></div>
                    <div className="absolute top-0 left-0 h-full w-full flex justify-between pointer-events-none">
                      <div className="w-px h-full bg-background"></div>
                      <div className="w-px h-full bg-background"></div>
                      <div className="w-px h-full bg-background"></div>
                      <div className="w-px h-full bg-background"></div>
                      <div className="w-px h-full bg-background"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Column (Right) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-panel p-8 md:p-10 relative overflow-hidden h-full border border-primary/20">
              <div className="scanline"></div>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2 border border-primary/40 bg-primary/5">
                  <span className="material-symbols-outlined text-primary">history_edu</span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface tracking-tight uppercase">
                  MISSION_DOSSIER
                </h2>
              </div>
              
              <div className="space-y-6 font-body text-sm md:text-base leading-relaxed text-on-surface/85">
                <div className="flex gap-4">
                  <span className="text-primary font-bold shrink-0">[LOG_01]</span>
                  <p>
                    Initializing sequence. My trajectory in the digital frontier began as a developer building optimized web applications. For years, I have navigated the complexities of reactive client systems, transposing raw visual metrics into scalable, high-performance web mainframes. The directive is absolute precision.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <span className="text-primary font-bold shrink-0">[LOG_02]</span>
                  <p>
                    The ARES_SYSTEM represents the apex of this engineering philosophy. By merging Cyber-Brutalist aesthetics with obsidian-layer state architectures, we deliver interactive spaces that don't just display portfolio data—they actively pulse with it. My role is to bridge human design and code optimization.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <span className="text-primary font-bold shrink-0">[LOG_03]</span>
                  <p>
                    Current operational directives focus on containerized pipeline delivery, performant CSS systems, and robust GraphQL consensus endpoints. We are constantly pushing past template designs into deeply tactile digital environments where every interactive node is carefully compiled.
                  </p>
                </div>
                
                <div className="pt-8 border-t border-primary/20">
                  <h4 className="font-label-caps text-xs text-primary uppercase mb-6 tracking-widest font-bold">
                    Active_Mainframe_Nodes
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div 
                      onClick={() => { playSound('tick'); setActiveTab('PROJECTS'); }}
                      className="p-4 border border-primary/10 hover:border-primary/50 transition-colors group cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-body text-xs text-primary font-bold group-hover:glow-sm uppercase">PROJECT_NEON</span>
                        <span className="material-symbols-outlined text-sm text-on-surface-variant group-hover:text-primary transition-colors">arrow_outward</span>
                      </div>
                      <p className="text-[10px] text-on-surface-variant font-body uppercase leading-tight">
                        High-Intensity Telemetry Mainboard Tool
                      </p>
                    </div>
                    
                    <div 
                      onClick={() => { playSound('tick'); setActiveTab('PROJECTS'); }}
                      className="p-4 border border-primary/10 hover:border-primary/50 transition-colors group cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-body text-xs text-primary font-bold group-hover:glow-sm uppercase">VOID_SHELTER</span>
                        <span className="material-symbols-outlined text-sm text-on-surface-variant group-hover:text-primary transition-colors">arrow_outward</span>
                      </div>
                      <p className="text-[10px] text-on-surface-variant font-body uppercase leading-tight">
                        Encrypted Ledger Replication Hub
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    onClick={handleDownload}
                    disabled={downloading}
                    onMouseEnter={() => playSound('hover')}
                    className="flex-1 min-w-[200px] border border-primary bg-primary text-background px-8 py-4 font-label-caps text-xs font-bold hover:bg-background hover:text-primary transition-all duration-300 glow-sm uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    {downloading ? 'COMPILING_DOSSIER...' : 'Download_Main_Manifest'}
                  </button>
                  
                  <button 
                    onClick={() => { playSound('transform'); setActiveTab('STREAM'); }}
                    onMouseEnter={() => playSound('hover')}
                    className="flex-1 min-w-[200px] border border-primary/30 px-8 py-4 font-label-caps text-xs font-bold hover:bg-primary/10 hover:border-primary transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                    Establish_Uplink_Channel
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
        
        {/* System Status Metrics */}
        <div className="mt-12 glass-panel p-4 flex flex-col md:flex-row justify-between items-center gap-4 border border-primary/10">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary animate-pulse"></span>
              <span className="font-body text-xs uppercase tracking-widest text-primary font-bold">System_Online</span>
            </div>
            <div className="hidden md:block h-4 w-px bg-primary/20"></div>
            <span className="font-body text-xs text-on-surface-variant uppercase">Network_Lat: 12ms</span>
            <span className="font-body text-xs text-on-surface-variant uppercase">Sync_Ratio: 0.998</span>
          </div>
          
          <div className="flex gap-6 font-label-caps text-xs">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-on-surface-variant hover:text-primary transition-all duration-300"
            >
              GITHUB_CORE
            </a>
            <a 
              onClick={() => { playSound('tick'); setActiveTab('STREAM'); }}
              className="text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer"
            >
              COMM_CHANNEL
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="text-on-surface-variant hover:text-primary transition-all duration-300"
            >
              LINKED_NODE
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AresIdentity;
