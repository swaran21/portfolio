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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
      }
    });

    tl.to(welcomeRef.current, {
      y: -100,
      opacity: 0,
      filter: "blur(10px)",
      duration: 1
    })
    .fromTo(heroContentRef.current, 
      { y: 150, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.5 },
      "-=0.5"
    );

    // Mouse Parallax Effect
    const parallaxElements = gsap.utils.toArray('.parallax-element');
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const xPos = (e.clientX / innerWidth - 0.5);
      const yPos = (e.clientY / innerHeight - 0.5);

      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.dataset.speed) || 0.05;
        gsap.to(el, {
          x: xPos * 100 * speed,
          y: yPos * 100 * speed,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: containerRef });

  return (
    <div className="w-full">
      <div className="w-full relative" ref={containerRef}>
        
        {/* ─── CINEMATIC INTRO ─── */}
        <div ref={welcomeRef} className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none h-screen drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-[0.3em] uppercase text-on-surface drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Welcome to my <span className="text-primary italic drop-shadow-md">World</span>
          </h1>
          <div className="mt-12 flex flex-col items-center opacity-80 animate-pulse">
            <span className="font-label-caps text-[10px] text-primary mb-2 tracking-[0.3em] font-bold bg-background/50 px-2 py-1 rounded">SCROLL_TO_EXPLORE</span>
            <div className="w-px h-20 bg-gradient-to-b from-primary to-transparent"></div>
          </div>
        </div>

        {/* ─── ACTUAL HERO CONTENT ─── */}
        <section ref={heroContentRef} className="relative h-screen flex items-center justify-center overflow-hidden z-10 pt-12 opacity-0">
          {/* Faded dark box behind hero text to guarantee readability */}
          <div className="absolute inset-0 bg-background/40 backdrop-blur-[4px] z-0 pointer-events-none mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)"></div>
          
          <div className="relative z-10 text-center px-5 max-w-4xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            <div className="mb-6 inline-block px-4 py-1 border border-primary/20 bg-background/60 glass-panel font-body text-xs text-primary uppercase tracking-[0.3em] font-bold shadow-lg shadow-primary/10">
              User: SAISW_ADMIN // Protocol: ACTIVE
            </div>
            
            <h1 className="font-display text-5xl md:text-[80px] font-bold tracking-tighter mb-8 leading-tight text-on-surface uppercase parallax-element" data-speed="0.05">
              MARAM <span className="text-primary">SAI</span> SWARAN
            </h1>
            
            <p className="max-w-2xl mx-auto text-on-surface font-sans text-base md:text-lg mb-12 leading-relaxed bg-background/40 glass-panel p-6 rounded-lg border border-primary/10 parallax-element" data-speed="-0.02">
              Welcome to my portfolio. I am a <strong>Software Engineer</strong> specializing in <strong>Distributed Systems, System Designing, Backend Development</strong>, scalable cloud infrastructures, and high-performance backend engineering using <strong>Java</strong>, <strong>Spring Boot</strong> and <strong>Microservices</strong>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center parallax-element" data-speed="0.03">
              <button 
                onClick={() => handleAction('PROJECTS')}
                onMouseEnter={() => playSound('hover')}
                className="w-full sm:w-auto px-12 py-5 border border-primary text-primary font-label-caps text-xs tracking-[0.2em] glass-panel hover:bg-primary hover:text-background hover:glow-primary transition-all duration-300 group cursor-pointer flex items-center justify-center gap-2 font-bold"
              >
                VIEW PROJECTS 
                <span className="material-symbols-outlined text-[16px] align-middle">terminal</span>
              </button>
              
              <button 
                onClick={() => handleAction('IDENTITY')}
                onMouseEnter={() => playSound('hover')}
                className="w-full sm:w-auto px-12 py-5 border border-white/20 text-on-surface font-label-caps text-xs tracking-[0.2em] glass-panel hover:bg-white/10 hover:border-white/50 transition-all duration-300 cursor-pointer font-bold"
              >
                ABOUT ME
              </button>
            </div>
          </div>
        </section>
      </div>
      
      {/* ─── ACTIVE PROTOCOLS BENTO BOX ─── */}
      <div className="ares-section-wrapper px-5 md:px-16 max-w-[1400px] mx-auto mt-24 mb-16 grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
        <div className="md:col-span-8 glass-panel p-8 md:p-10 relative overflow-hidden group">
          <div className="absolute top-4 right-4 font-body text-[10px] text-primary/50 font-bold">S/N: 883-CORE</div>
          <span className="material-symbols-outlined text-primary text-5xl mb-8 drop-shadow-md">dns</span>
          
          <h3 className="font-display text-2xl md:text-3xl text-on-surface mb-4 font-bold uppercase tracking-wide drop-shadow-md">SOFTWARE ENGINEER</h3>
          
          <p className="text-on-surface font-sans text-sm md:text-base mb-8 max-w-xl leading-relaxed opacity-90 drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
            Designing modular backend logic, distributed cloud infrastructures, and high-throughput zero-trust security pipelines for enterprise applications.
          </p>
          
          <div className="flex flex-wrap gap-3 drop-shadow-md">
            <span className="px-3 py-1 border border-primary/40 bg-primary/10 text-primary font-body text-[10px] font-bold rounded-sm">JAVA // SPRING_BOOT</span>
            <span className="px-3 py-1 border border-primary/40 bg-primary/10 text-primary font-body text-[10px] font-bold rounded-sm">CLOUD // AWS,GCP</span>
            <span className="px-3 py-1 border border-primary/40 bg-primary/10 text-primary font-body text-[10px] font-bold rounded-sm">MICROSERVICES</span>
          </div>
        </div>

        <div className="md:col-span-4 glass-panel p-8 md:p-10 flex flex-col justify-between group">
          <div className="font-body text-xs text-primary/80 mb-8 font-bold drop-shadow-md tracking-wider">BACKEND_LATENCY_OPTIMIZATION</div>
          <div className="drop-shadow-md">
            <div className="text-5xl md:text-6xl font-display font-bold text-primary leading-none mb-2">99.9%</div>
            <p className="text-on-surface font-body text-[10px] tracking-wider uppercase opacity-90 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">SERVICE UPTIME & RELIABILITY</p>
          </div>
          
          <div className="mt-8 space-y-2">
            <div className="h-1.5 bg-background border border-primary/30 w-full overflow-hidden rounded-full">
              <div className="h-full bg-primary w-11/12 glow-sm"></div>
            </div>
            <div className="flex justify-between font-body text-[10px] text-on-surface font-bold drop-shadow-md">
              <span>MONITORED</span>
              <span>OPTIMIZED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AresHero;