import React from 'react';
import useSound from '../../hooks/useSound';

const AresHeader = ({ activeTab, setActiveTab, onReboot }) => {
  const { playSound } = useSound();

  const navItems = [
    { id: 'HERO', label: 'HERO' },
    { id: 'PROJECTS', label: 'PROJECTS' },
    { id: 'IDENTITY', label: 'IDENTITY' },
    { id: 'STREAM', label: 'STREAM' }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    playSound('tick');
  };

  return (
    <header className="fixed top-0 w-full border-b border-primary/30 bg-background/80 backdrop-blur-xl z-40 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 shadow-[0_0_15px_rgba(255,84,75,0.2)]">
      {/* Title */}
      <div 
        onClick={onReboot}
        className="font-display text-headline-md text-primary drop-shadow-[0_0_10px_rgba(255,180,171,0.8)] cursor-pointer tracking-tighter select-none hover:opacity-85 transition-opacity"
      >
        ARES_SYSTEM
      </div>

      {/* Navigation Shell */}
      <nav className="hidden md:flex gap-8 items-center">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              onMouseEnter={() => playSound('hover')}
              className={`font-label-caps text-xs tracking-[0.2em] transition-all duration-300 pb-1 cursor-pointer ${
                isActive 
                  ? 'text-primary font-bold border-b-2 border-primary glow-sm' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Initialize / Reboot Mainframe Trigger */}
      <button 
        onClick={() => {
          playSound('transform');
          onReboot();
        }}
        onMouseEnter={() => playSound('hover')}
        className="border border-primary text-primary px-6 py-2 font-label-caps text-xs tracking-[0.25em] hover:bg-primary/10 hover:text-primary transition-all duration-200 active:scale-95 cursor-pointer glow-sm"
      >
        REBOOT_LINK
      </button>
    </header>
  );
};

export default AresHeader;
