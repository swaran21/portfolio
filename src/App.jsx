import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Asset Imports
import tronBg from './assets/tron-background.png';

// Component Imports
import AresBootScreen from './components/ares/AresBootScreen';
import TronGrid from './components/ares/TronGrid';
import AresHeader from './components/ares/AresHeader';
import AresHero from './components/ares/AresHero';
import AresIdentity from './components/ares/AresIdentity';
import AresProjects from './components/ares/AresProjects';
import AresStream from './components/ares/AresStream';
import AresFooter from './components/ares/AresFooter';
// import DebrisField from './components/ares/DebrisField';

import './App.css';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

const App = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('HERO');
  const [theme, setTheme] = useState('red');
  
  // Create a ref for the main container to scope GSAP animations
  const mainRef = useRef(null);
  const debrisRef = useRef(null);

  React.useEffect(() => {
    if (theme === 'blue') {
      document.body.classList.add('theme-blue');
    } else {
      document.body.classList.remove('theme-blue');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'red' ? 'blue' : 'red');

  // The useGSAP hook safely handles setup and automatic cleanup!
  useGSAP(() => {
    if (!isBooted) return;

    // 1. Track overall scroll progress for 3D camera
    ScrollTrigger.create({
      trigger: mainRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => setScrollProgress(self.progress),
    });

    // 2. Animate each section on scroll (Anti-gravity float effect)
    const sections = gsap.utils.toArray('.ares-section-wrapper');
    sections.forEach((section) => {
      gsap.fromTo(section,
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1.2,
          },
        }
      );
    });

    // 3. Track active section for header highlight
    const sectionEls = gsap.utils.toArray('[data-section]');
    sectionEls.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(el.dataset.section),
        onEnterBack: () => setActiveSection(el.dataset.section),
      });
    });

  }, { dependencies: [isBooted], scope: mainRef });

  // Handle smooth scrolling triggered from Header/Footer
  const scrollToSection = (sectionId) => {
    const target = document.getElementById(sectionId.toLowerCase());
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render boot screen if not initialized
  if (!isBooted) {
    return (
      <AresBootScreen 
        theme={theme}
        toggleTheme={toggleTheme}
        onComplete={(target = 'hero') => {
          setIsBooted(true);
          if (target !== 'hero') {
            // Wait slightly longer for GSAP to settle before scrolling
            setTimeout(() => {
              scrollToSection(target);
            }, 800);
          }
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-on-background relative isolate font-body selection:bg-primary selection:text-background" ref={mainRef}>
      
      {/* Fallback background image (Properly imported for Vite) */}
      <div className="fixed inset-0 -z-50 pointer-events-none bg-[#020202]">
        <img
          alt="TRON: Ares red world environment"
          className="w-full h-full object-cover opacity-50"
          src={tronBg}
        />
      </div>

      {/* ─── 3D SUBSTRATE ─── */}
      <TronGrid scrollProgress={scrollProgress} theme={theme} />

      {/* Subtle overlays for text readability against the bright grid */}
      <div className="fixed inset-0 -z-30 pointer-events-none">
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* CRT Scanline overlay */}
      <div className="fixed inset-0 scanline pointer-events-none z-50 opacity-20"></div>

      {/* ─── HEADER ORCHESTRATION ─── */}
      <AresHeader
        activeTab={activeSection}
        setActiveTab={scrollToSection}
        onReboot={() => {
          window.scrollTo(0, 0);
          setIsBooted(false);
        }}
      />

      {/* ─── MAIN MODULAR CONTENT ─── */}
      <main className="relative z-10 pt-20">
        
        {/* SECTION: HERO */}
        <section id="hero" data-section="HERO" className="min-h-screen">
          <AresHero setActiveTab={scrollToSection} />
        </section>

        {/* SECTION: IDENTITY */}
        <section id="identity" data-section="IDENTITY" className="ares-section-wrapper pt-32 pb-16">
          <AresIdentity setActiveTab={scrollToSection} />
        </section>

        {/* SECTION: PROJECTS */}
        <section id="projects" data-section="PROJECTS" className="ares-section-wrapper pt-32 pb-16">
          <AresProjects setActiveTab={scrollToSection} theme={theme} debrisRef={debrisRef} />
        </section>

        {/* SECTION: STREAM / CONTACT */}
        <section id="stream" data-section="STREAM" className="ares-section-wrapper pt-32 pb-32">
          <AresStream />
        </section>

      </main>

      {/* ─── FOOTER ORCHESTRATION ─── */}
      <AresFooter setActiveTab={scrollToSection} />

      {/* ─── PERSISTENT DEBRIS FIELD (footer cubes) ─── */}
      {/* <DebrisField ref={debrisRef} /> */}
      
    </div>
  );
};

export default App;

