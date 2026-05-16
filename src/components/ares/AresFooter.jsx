import React from 'react';
import useSound from '../../hooks/useSound';

const AresFooter = ({ setActiveTab }) => {
  const { playSound } = useSound();

  const handleLinkClick = (tabId) => {
    setActiveTab(tabId);
    playSound('tick');
  };

  return (
    <footer className="mt-32 border-t border-primary/20 bg-background py-16 px-margin-mobile md:px-margin-desktop shadow-[0_-5px_15px_rgba(255,84,75,0.05)]">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Left Side Logo & Version */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="font-display text-lg text-primary font-bold tracking-widest drop-shadow-[0_0_8px_rgba(255,84,75,0.4)]">
            ARES_SYSTEM // MAINFRAME
          </div>
          <p className="font-body text-[10px] text-on-surface-variant uppercase tracking-widest">
            ALL RIGHTS RESERVED // PROTOCOL: ENCOM_SSH_V4
          </p>
        </div>

        {/* Navigation / Channel uplinks */}
        <div className="flex flex-wrap justify-center gap-8 font-label-caps text-xs">
          <button 
            onClick={() => handleLinkClick('HERO')}
            className="text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer"
          >
            GRID_HOME
          </button>
          
          <button 
            onClick={() => handleLinkClick('PROJECTS')}
            className="text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer"
          >
            PROJECT_ARCHIVE
          </button>
          
          <button 
            onClick={() => handleLinkClick('IDENTITY')}
            className="text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer"
          >
            OPERATOR_DOSSIER
          </button>
          
          <button 
            onClick={() => handleLinkClick('STREAM')}
            className="text-on-surface-variant hover:text-primary transition-all duration-300 cursor-pointer"
          >
            ESTABLISH_UPLINK
          </button>
        </div>

        {/* Right Side Sync info */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-1 font-body text-[10px]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
            <span className="text-primary font-bold">[SYSTEM SYNCHRONIZED]</span>
          </div>
          <span className="text-on-surface-variant/70 uppercase">
            Sector Code: V_CORE_GRID
          </span>
        </div>

      </div>
    </footer>
  );
};

export default AresFooter;
