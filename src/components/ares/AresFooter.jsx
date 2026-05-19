import React from 'react';
import useSound from '../../hooks/useSound';

const AresFooter = ({ setActiveTab }) => {
  const { playSound } = useSound();

  const handleLinkClick = (tabId) => {
    setActiveTab(tabId);
    playSound('tick');
  };

  return (
    <footer className="mt-32 border-t border-primary/30 bg-background/95 backdrop-blur-md py-16 px-5 md:px-16 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] relative z-20">
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

        {/* Navigation / Channel uplinks */}
        <div className="flex flex-wrap justify-center gap-8 font-label-caps text-xs font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
          <button 
            onClick={() => handleLinkClick('hero')}
            className="text-on-surface hover:text-primary transition-all duration-300 cursor-pointer"
          >
            GRID_HOME
          </button>
          
          <button 
            onClick={() => handleLinkClick('projects')}
            className="text-on-surface hover:text-primary transition-all duration-300 cursor-pointer"
          >
            PROJECT_ARCHIVE
          </button>
          
          <button 
            onClick={() => handleLinkClick('identity')}
            className="text-on-surface hover:text-primary transition-all duration-300 cursor-pointer"
          >
            OPERATOR_DOSSIER
          </button>
          
          <button 
            onClick={() => handleLinkClick('stream')}
            className="text-on-surface hover:text-primary transition-all duration-300 cursor-pointer"
          >
            ESTABLISH_UPLINK
          </button>
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
    </footer>
  );
};

export default AresFooter;