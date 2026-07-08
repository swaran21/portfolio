import React from 'react';
import useSound from '../../hooks/useSound';
import Magnetic from './Magnetic';
import DebrisField from './DebrisField';

const AresFooter = ({ setActiveTab, debrisRef, theme = 'red' }) => {
  const { playSound } = useSound();

  const handleLinkClick = (tabId) => {
    setActiveTab(tabId);
    playSound('tick');
  };

  const navLinks = [
    { id: 'hero', label: 'GRID_HOME' },
    { id: 'projects', label: 'PROJECT_ARCHIVE' },
    { id: 'identity', label: 'OPERATOR_DOSSIER' },
    { id: 'stream', label: 'ESTABLISH_UPLINK' },
  ];

  return (
    <footer className="relative mt-32 border-t border-primary/30 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] overflow-hidden z-20">
      {/* Layer 0 — dark frosted base */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-md" style={{ zIndex: 0 }}></div>

      {/* Layer 1 — debris field piles up BEHIND the text */}
      <DebrisField ref={debrisRef} theme={theme} />

      {/* Layer 10 — content is always the top-most, fully readable layer */}
      <div className="relative py-16 px-5 md:px-16" style={{ zIndex: 10 }}>
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left Side Logo & Version */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="font-display text-lg text-primary font-bold tracking-widest drop-shadow-md">
            SWARAN_OS // MAINFRAME
          </div>
          <p className="font-body text-[10px] text-on-surface/60 uppercase tracking-widest font-bold">
            © 2026 MARAM SAI SWARAN // PROTOCOL: SECURE_UPLINK
          </p>
        </div>

        {/* Navigation / Channel uplinks (magnetic pull toward cursor) */}
        <div className="flex flex-wrap justify-center gap-8 font-label-caps text-xs font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
          {navLinks.map((link) => (
            <Magnetic key={link.id} strength={0.3}>
              <button
                onClick={() => handleLinkClick(link.id)}
                className="text-on-surface hover:text-primary hover:drop-shadow-[0_0_8px_var(--color-primary)] transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </button>
            </Magnetic>
          ))}
        </div>

        {/* Right Side Sync info */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1 font-body text-[10px] drop-shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping shadow-[0_0_5px_var(--color-primary)]"></span>
            <span className="text-primary font-bold">[SYSTEM SYNCHRONIZED]</span>
          </div>
          <span className="text-on-surface/80 uppercase font-bold">
            NODE_SECURED: HYDERABAD_IN
          </span>
        </div>

        </div>
      </div>
    </footer>
  );
};

export default AresFooter;