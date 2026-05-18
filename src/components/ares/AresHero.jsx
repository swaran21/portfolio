import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import useSound from '../../hooks/useSound';

const AresHero = ({ setActiveTab }) => {
  const { playSound } = useSound();
  const containerRef = useRef(null);
  const welcomeRef = useRef(null);
  const heroContentRef = useRef(null);

  const handleAction = (tabId) => {
    setActiveTab(tabId);
    playSound('transform');
  };

  useGSAP(() => {
    // Cinematic Scroll Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%", // The animation lasts for one full screen of scrolling
        scrub: 1, // Smooth scrubbing tied to scrollbar
        pin: true, // Pins the section in place while the animation happens
      }
    });

    // 1. Fade out and move up the "Welcome" text
    tl.to(welcomeRef.current, {
      y: -100,
      opacity: 0,
      filter: "blur(10px)",
      duration: 1
    })
    // 2. Bring in the actual Hero Content from below
    .fromTo(heroContentRef.current, 
      { y: 150, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.5 },
      "-=0.5" // Overlap the animations slightly
    );
  }, { scope: containerRef });

  return (
    <div className="w-full">
      
      <div className="w-full relative" ref={containerRef}>
        {/* ─── CINEMATIC INTRO ("Welcome to this world") ─── */}
        <div 
          ref={welcomeRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none h-screen"
        >
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-[0.3em] uppercase text-on-surface drop-shadow-[0_0_15px_rgba(255,84,75,0.6)]">
            Welcome to this <span className="text-primary italic">World</span>
          </h1>
          <div className="mt-12 flex flex-col items-center opacity-60 animate-pulse">
            <span className="font-label-caps text-[10px] text-primary mb-2 tracking-[0.3em]">INITIALIZE_SCROLL</span>
            <div className="w-px h-20 bg-gradient-to-b from-primary to-transparent"></div>
          </div>
        </div>

        {/* ─── ACTUAL HERO CONTENT ─── */}
        <section 
          ref={heroContentRef}
          className="relative h-screen flex items-center justify-center overflow-hidden z-10 pt-12 opacity-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/90 z-0 pointer-events-none"></div>
          
          <div className="relative z-10 text-center px-5 max-w-4xl mx-auto">
            <div className="mb-6 inline-block px-4 py-1 border border-primary/40 bg-primary/5 font-mono text-xs text-primary uppercase tracking-[0.3em]">
              User: SAISW_ADMIN // Protocol: ACTIVE
            </div>
            
            <h1 className="font-display text-5xl md:text-[80px] font-bold tracking-tighter mb-8 leading-tight text-on-surface uppercase">
              MARAM <span className="text-primary drop-shadow-[0_0_20px_rgba(255,84,75,0.8)]">SAI</span> SWARAN
            </h1>
            
            <p className="max-w-2xl mx-auto text-on-surface-variant font-body text-base md:text-lg mb-12 opacity-85 leading-relaxed">
              Welcome to the high-fidelity digital mainframe. I engineer premium frontend interfaces, low-latency API architectures, and immersive cybernetic portfolios.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => handleAction('PROJECTS')}
                onMouseEnter={() => playSound('hover')}
                className="w-full sm:w-auto px-12 py-5 border border-primary text-primary font-label-caps text-xs tracking-[0.2em] bg-transparent hover:bg-primary hover:text-on-primary hover:glow-primary transition-all duration-300 group cursor-pointer flex items-center justify-center gap-2"
              >
                INITIALIZE_LOGS 
                <span className="material-symbols-outlined text-[16px] align-middle">terminal</span>
              </button>
              
              <button 
                onClick={() => handleAction('IDENTITY')}
                onMouseEnter={() => playSound('hover')}
                className="w-full sm:w-auto px-12 py-5 border border-white/10 text-on-surface font-label-caps text-xs tracking-[0.2em] hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                VIEW_DOSSIER
              </button>
            </div>
          </div>
        </section>
      </div>
      
      {/* (Keep your Active Protocols / Bento Box section down here, just outside the pinned H-Screen container) */}
      <div className="ares-section-wrapper px-5 md:px-16 max-w-[1400px] mx-auto mt-24 mb-16 grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
        <div className="md:col-span-8 glass-panel p-8 md:p-10 relative overflow-hidden group border border-primary/20">
          <div className="absolute top-4 right-4 font-label-caps text-[10px] text-primary/30">S/N: 883-CORE</div>
          <span className="material-symbols-outlined text-primary text-5xl mb-8">dynamic_form</span>
          
          <h3 className="font-display text-2xl md:text-3xl text-on-surface mb-4 font-bold uppercase tracking-wide">NEURAL_INTERFACE_DESIGN</h3>
          
          <p className="text-on-surface-variant font-body text-sm md:text-base mb-8 max-w-xl leading-relaxed">
            Designing modular frontend layout systems, high-fidelity responsive user flows, and modern cyber-brutalist custom dashboards.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 border border-primary/20 text-primary font-label-caps text-[10px]">UX_REMAP // REACT</span>
            <span className="px-3 py-1 border border-primary/20 text-primary font-label-caps text-[10px]">VISUAL_OVERLAY // TAILWIND</span>
            <span className="px-3 py-1 border border-primary/20 text-primary font-label-caps text-[10px]">GLITCH_MITIGATION</span>
          </div>
        </div>

        {/* Protocol Metric */}
        <div className="md:col-span-4 glass-panel p-8 md:p-10 flex flex-col justify-between border border-primary/10">
          <div className="font-label-caps text-xs text-primary/60 mb-8">LATENCY_REDUCTION</div>
          <div>
            <div className="text-5xl md:text-6xl font-display font-bold text-primary leading-none mb-2">0.02ms</div>
            <p className="text-on-surface-variant font-body text-xs tracking-wider uppercase">OPTIMIZED_RESPONSE_TIME</p>
          </div>
          
          <div className="mt-8 space-y-2">
            <div className="h-1.5 bg-primary/10 w-full overflow-hidden">
              <div className="h-full bg-primary w-4/5 glow-sm"></div>
            </div>
            <div className="flex justify-between font-label-caps text-[10px] text-on-surface-variant">
              <span>BUFF_READY</span>
              <span>80%_LOAD</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AresHero;
