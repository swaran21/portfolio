import React, { useState, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import useSound from '../../hooks/useSound';
import FractureOverlay from './FractureOverlay';

const AresProjects = ({ setActiveTab, theme = 'red' }) => {
  const { playSound } = useSound();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);
  const cardRefs = useRef({});

  const projects = [
    {
      serial: '001-ALPHA',
      title: 'SECURE_CLOUD_DATA_HUB',
      stack: 'NODE.JS / PYTHON / AWS',
      date: 'OCT 2025',
      status: 'DEPLOYED',
      desc: 'Cloud-native secure data platform with end-to-end encryption, automated backup pipelines, and multi-region availability zones designed for secure remote ledger processing.',
      caseStudy: 'Architected a highly resilient cloud data hub designed to handle massive throughput while ensuring zero-trust security. By implementing AES-256 encryption at rest and in transit, and deploying across multiple AWS availability zones, the system achieves 99.99% uptime. The Python telemetry worker actively monitors ledger anomalies in real-time, reducing incident response latency by 60%.',
      features: ['AES-256 Cloud Encryption', 'Multi-Region Backup Automation', 'Python Telemetry Worker', 'AWS Identity & Access Controller']
    },
    {
      serial: '002-BETA',
      title: 'FITNESS_AI_MICROSERVICES',
      stack: 'SPRING BOOT / MICROSERVICES',
      date: 'JUL 2025',
      status: 'ARCHIVED',
      desc: 'Cloud-native microservices platform for AI-powered fitness tracking with personalized workout generation, performance indexes, and nutritional analysis.',
      caseStudy: 'Engineered a decoupled microservices architecture using Spring Boot to handle heavy computational loads for AI-driven fitness analytics. By utilizing a Retrieval-Augmented Generation (RAG) nutrition assistant and an optimized NoSQL schema, the system rapidly queries complex meal combinations. Optimized database indexing reduced query latency from 150ms down to 0.04ms under peak load.',
      features: ['Spring Boot Microservices Architecture', 'RAG Nutrition Assistant', 'Personalized Gym Planner Engine', 'Optimized NoSQL Database Schema']
    },
    {
      serial: '003-GAMMA',
      title: 'AI_POWERED_CHAT_NETWORK',
      stack: 'SPRING BOOT / WEBSOCKETS',
      date: 'JUN 2025',
      status: 'ACTIVE',
      desc: 'Real-time messaging application with AI-powered response suggestions, WebSocket-based low-latency communication networks, and secure encrypted message logs.',
      caseStudy: 'Built a high-throughput, real-time messaging layer utilizing Spring Boot and WebSockets. Integrated the Gemini AI API to provide intelligent, context-aware response suggestions on the fly. To solve high-concurrency bottlenecks, an encrypted cache buffer was implemented, dropping average message delivery latency to an astonishing 0.02ms. The system includes a live telemetry monitor for node health.',
      features: ['Low-Latency WebSockets (0.02ms)', 'Gemini AI API Uplink Integration', 'Encrypted Cache Buffer System', 'Real-time Telemetry Monitor']
    },
    {
      serial: '004-DELTA',
      title: 'TRON_ARES_PORTFOLIO',
      stack: 'REACT / THREE.JS / GSAP',
      date: 'MAY 2026',
      status: 'ACTIVE',
      desc: 'This immersive cyber-brutalist digital portfolio — featuring a 3D WebGL environment grid, zero-g scrolling camera dynamics, and sleek glassmorphic interfaces.',
      caseStudy: 'Designed as a high-fidelity "digital mainframe", this portfolio leverages GSAP ScrollTrigger for hardware-accelerated anti-gravity animations and parallax effects. Custom WebGL shaders and complex React component lifecycles were orchestrated to ensure 60fps performance without sacrificing the deep, atmospheric "Ares OS" aesthetic. It serves as both a resume and a technical demonstration.',
      features: ['Three.js Grid Shader Implementation', 'GSAP ScrollTrigger Physics Engine', 'Modular React Shell Architecture', 'Zero-G Inertia Layout & Glassmorphism']
    }
  ];

  const openProject = useCallback((proj, triggerFracture) => {
    if (isAnimating) return;
    setIsAnimating(true);
    playSound('transform');

    // Get the card element to shatter
    const cardEl = cardRefs.current[proj.serial];
    if (cardEl && triggerFracture) {
      triggerFracture(cardEl);
    }
  }, [isAnimating, playSound]);

  // Called at 50% of the shatter animation
  const handleMidpoint = useCallback((proj) => {
    setSelectedProject(proj);
    setModalVisible(true);
    // Animate the modal content dropping in
    requestAnimationFrame(() => {
      if (modalRef.current) {
        gsap.fromTo(modalRef.current,
          { y: -60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
        );
      }
    });
  }, []);

  const handleShatterComplete = useCallback(() => {
    setIsAnimating(false);
  }, []);

  const closeProject = useCallback(() => {
    // Restore all card opacities
    Object.values(cardRefs.current).forEach((el) => {
      if (el) gsap.to(el, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    });
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        y: 30, opacity: 0, scale: 0.97,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setSelectedProject(null);
          setModalVisible(false);
          playSound('tick');
        }
      });
    } else {
      setSelectedProject(null);
      setModalVisible(false);
      playSound('tick');
    }
  }, [playSound]);

  return (
    <div className="w-full relative px-5 md:px-16 max-w-[1400px] mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-10 h-px bg-primary"></span>
        <span className="font-body text-[11px] text-primary uppercase tracking-[0.4em] font-bold bg-background/50 px-2 py-0.5">SECTION_003 // PROJECT_ARCHIVE</span>
      </div>
      <h2 className="font-display text-4xl md:text-6xl font-bold text-on-surface uppercase tracking-tighter mb-16 drop-shadow-md">PROJECT_ARCHIVE</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {projects.map((proj) => (
          <FractureOverlay
            key={proj.serial}
            theme={theme}
            onMidpoint={() => handleMidpoint(proj)}
            onComplete={handleShatterComplete}
          >
            {(triggerFracture) => (
              <div 
                ref={(el) => { cardRefs.current[proj.serial] = el; }}
                onClick={() => openProject(proj, triggerFracture)}
                onMouseEnter={() => playSound('hover')}
                className="glass-panel p-6 md:p-8 relative group hover:border-primary transition-all duration-300 hover:shadow-[0_0_20px_var(--color-primary)] cursor-pointer flex flex-col justify-between h-full"
              >
                <div className="absolute top-4 right-4 font-body text-[10px] text-primary/60 font-bold drop-shadow-md">SERIAL: {proj.serial}</div>
                
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-2 py-0.5 border text-[10px] font-body font-bold bg-background/80 drop-shadow-md ${proj.status === 'ACTIVE' ? 'border-primary text-primary' : proj.status === 'DEPLOYED' ? 'border-primary/60 text-primary/80' : 'border-primary/40 text-on-surface/60'}`}>
                      {proj.status}
                    </span>
                    <span className="font-body text-[11px] text-primary font-bold bg-background/50 px-2 py-0.5 rounded-sm">{proj.date}</span>
                  </div>
                  
                  <h3 className="font-display text-lg md:text-xl font-bold text-on-surface mb-2 uppercase tracking-wide group-hover:text-primary transition-colors drop-shadow-md">{proj.title}</h3>
                  <p className="font-sans text-xs text-on-surface mb-4 leading-relaxed line-clamp-3 font-normal drop-shadow-[0_1px_1px_rgba(0,0,0,1)] opacity-90">{proj.desc}</p>
                </div>
                
                <div className="border-t border-primary/30 pt-4 flex justify-between items-center font-body text-[10px] text-primary uppercase tracking-wider font-bold drop-shadow-md">
                  <span>{proj.stack}</span>
                  <span className="group-hover:text-background group-hover:bg-primary transition-colors flex items-center gap-1 bg-background/80 px-2 py-1 border border-primary/20 rounded-sm">DECODE <span className="material-symbols-outlined text-[12px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span></span>
                </div>
              </div>
            )}
          </FractureOverlay>
        ))}
      </div>

      {/* ─── DECODED PROJECT DOSSIER (with drop-in animation) ─── */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-background/90 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="absolute inset-0 scanline pointer-events-none opacity-30"></div>
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={closeProject}
          ></div>
          
          <div 
            ref={modalRef}
            className="w-full max-w-4xl glass-panel relative p-8 md:p-12 border border-primary glow-sm overflow-y-auto max-h-[90vh]"
            style={{ opacity: 0 }}
          >
            <button onClick={closeProject} className="absolute top-4 right-4 text-primary hover:text-on-surface transition-colors cursor-pointer drop-shadow-md">
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>

            <div className="font-body text-[10px] text-primary/80 mb-2 font-bold bg-background/50 inline-block px-2 py-0.5 rounded-sm">DECODED // PROJECT_DOSSIER: {selectedProject.serial}</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-8 uppercase tracking-wider drop-shadow-md">{selectedProject.title}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 text-left">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-4">
                  <h4 className="font-body text-xs text-primary tracking-wider font-bold drop-shadow-md border-b border-primary/20 pb-2">SYSTEM_LOGS_DOSSIER</h4>
                  <p className="font-sans text-sm text-on-surface font-normal leading-relaxed drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">{selectedProject.desc}</p>
                </div>
                
                <div className="space-y-4 bg-background/20 p-5 rounded-md border border-primary/20">
                  <h4 className="font-body text-xs text-primary tracking-wider font-bold drop-shadow-md flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">architecture</span>
                    ENGINEERING_CASE_STUDY
                  </h4>
                  <p className="font-sans text-sm text-on-surface/90 font-normal leading-relaxed drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">{selectedProject.caseStudy}</p>
                </div>
              </div>

              <div className="space-y-4 glass-panel p-6 drop-shadow-md self-start">
                <h4 className="font-body text-xs text-primary tracking-wider font-bold border-b border-primary/20 pb-2">BUILT_SPECIFICATIONS</h4>
                <ul className="space-y-3 font-sans text-xs text-on-surface font-normal">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} className="flex gap-2 items-start drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
                      <span className="material-symbols-outlined text-primary text-[14px] mt-0.5">check_circle</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 border-t border-primary/30 pt-6 items-center">
              <span className="font-body text-xs text-primary font-bold uppercase drop-shadow-md bg-background/50 px-2 py-1">COMPILED_ON: {selectedProject.date}</span>
              <button onClick={closeProject} className="sm:ml-auto w-full sm:w-auto px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-background font-label-caps text-xs tracking-wider transition-all duration-300 cursor-pointer font-bold drop-shadow-md">
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