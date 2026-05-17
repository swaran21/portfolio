import React, { useState } from 'react';
import useSound from '../../hooks/useSound';

const AresProjects = ({ setActiveTab }) => {
  const { playSound } = useSound();
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      serial: '001-ALPHA',
      title: 'SECURE_CLOUD_DATA_HUB',
      stack: 'NODE.JS / PYTHON / AWS',
      date: 'OCT 2025',
      status: 'DEPLOYED',
      desc: 'Cloud-native secure data platform with end-to-end encryption, automated backup pipelines, and multi-region availability zones designed for secure remote ledger processing.',
      features: ['AES-256 Cloud Encryption', 'Multi-Region Backup Automation', 'Python Telemetry Worker', 'AWS Identity & Access Controller']
    },
    {
      serial: '002-BETA',
      title: 'FITNESS_AI',
      stack: 'SPRING BOOT / MICROSERVICES',
      date: 'JUL 2025',
      status: 'ARCHIVED',
      desc: 'Cloud-native microservices platform for AI-powered fitness tracking with personalized workout generation, performance indexes, and nutritional analysis.',
      features: ['Spring Boot Microservices', 'RAG Nutrition Assistant', 'Personalized Gym Planner', 'NoSQL Database Schema']
    },
    {
      serial: '003-GAMMA',
      title: 'AI_POWERED_CHAT_APP',
      stack: 'SPRING BOOT / WEBSOCKETS',
      date: 'JUN 2025',
      status: 'ACTIVE',
      desc: 'Real-time messaging application with AI-powered response suggestions, WebSocket-based low-latency communication networks, and secure encrypted message logs.',
      features: ['Low-Latency WebSockets', 'Gemini AI API Uplink', 'Encrypted Cache Buffer', 'Real-time Telemetry Monitor']
    },
    {
      serial: '004-DELTA',
      title: 'TRON_ARES_PORTFOLIO',
      stack: 'REACT / THREE.JS / GSAP',
      date: 'MAY 2026',
      status: 'ACTIVE',
      desc: 'This immersive cyber-brutalist digital portfolio — featuring a 3D WebGL environment grid, zero-g scrolling camera dynamics, and sleek glassmorphic interfaces.',
      features: ['Three.js Grid Shader', 'GSAP ScrollTrigger Engine', 'Modular React Shell', 'Zero-G Inertia Layout']
    }
  ];

  const openProject = (proj) => {
    setSelectedProject(proj);
    playSound('transform');
  };

  const closeProject = () => {
    setSelectedProject(null);
    playSound('tick');
  };

  return (
    <div className="w-full relative px-5 md:px-16 max-w-[1400px] mx-auto">
      {/* Narrative Section Header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="w-10 h-px bg-primary"></span>
        <span className="font-body text-[11px] text-primary uppercase tracking-[0.4em]">SECTION_003 // PROJECT_ARCHIVE</span>
      </div>
      <h2 className="font-display text-4xl md:text-6xl font-bold text-on-surface uppercase tracking-tighter mb-16">PROJECT_ARCHIVE</h2>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {projects.map((proj) => (
          <div 
            key={proj.serial} 
            onClick={() => openProject(proj)}
            onMouseEnter={() => playSound('hover')}
            className="glass-panel p-6 md:p-8 border border-primary/20 relative group hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,84,75,0.1)] cursor-pointer flex flex-col justify-between"
          >
            <div className="absolute top-3 right-3 font-label-caps text-[9px] text-primary/30">SERIAL: {proj.serial}</div>
            
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-2 py-0.5 border text-[10px] font-label-caps ${proj.status === 'ACTIVE' ? 'border-primary text-primary' : proj.status === 'DEPLOYED' ? 'border-primary/60 text-primary/80' : 'border-primary/20 text-primary/40'}`}>
                  {proj.status}
                </span>
                <span className="font-body text-[11px] text-primary/60">{proj.date}</span>
              </div>
              
              <h3 className="font-display text-lg md:text-xl font-bold text-on-surface mb-2 uppercase tracking-wide group-hover:text-primary transition-colors">{proj.title}</h3>
              <p className="font-body text-xs text-on-surface-variant mb-4 leading-relaxed line-clamp-3">{proj.desc}</p>
            </div>
            
            <div className="border-t border-primary/10 pt-3 flex justify-between items-center font-body text-[10px] text-primary/60 uppercase tracking-wider">
              <span>{proj.stack}</span>
              <span className="group-hover:text-primary transition-colors flex items-center gap-1">DECODE <span className="material-symbols-outlined text-[12px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span></span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#020202]/95 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="absolute inset-0 scanline pointer-events-none opacity-20"></div>
          
          <div className="w-full max-w-3xl glass-panel relative p-8 md:p-10 border border-primary/30 glow-red overflow-y-auto max-h-[90vh]">
            <button
              onClick={closeProject}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            <div className="font-label-caps text-[10px] text-primary/60 mb-2">
              DECODED // PROJECT_DOSSIER: {selectedProject.serial}
            </div>

            <h2 className="font-display text-3xl font-bold text-primary mb-6 uppercase tracking-wider">
              {selectedProject.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-left">
              <div className="md:col-span-2 space-y-4">
                <h4 className="font-label-caps text-xs text-primary/80 tracking-wider">SYSTEM_LOGS_DOSSIER</h4>
                <p className="font-body text-sm text-on-surface/85 leading-relaxed">
                  {selectedProject.desc}
                </p>
              </div>

              <div className="space-y-4 bg-primary/5 p-4 border border-primary/10">
                <h4 className="font-label-caps text-xs text-primary tracking-wider">BUILT_SPECIFICATIONS</h4>
                <ul className="space-y-2 font-body text-xs text-on-surface-variant">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} className="flex gap-2 items-center">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 border-t border-primary/10 pt-6">
              <span className="font-body text-xs text-primary/70 self-center uppercase">
                COMPILED_ON: {selectedProject.date}
              </span>
              
              <button
                onClick={closeProject}
                className="sm:ml-auto w-full sm:w-auto px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-background font-label-caps text-xs tracking-wider transition-all duration-300 cursor-pointer"
              >
                RETURN_TO_ARCHIVE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AresProjects;
