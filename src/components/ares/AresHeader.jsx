import React from 'react';
import useSound from '../../hooks/useSound';

const AresHeader = ({ activeTab, setActiveTab, onReboot, theme, toggleTheme }) => {
  const { playSound } = useSound();

  const navItems = [
    { id: 'HERO', label: 'HERO' },
    { id: 'IDENTITY', label: 'IDENTITY' },
    { id: 'PROJECTS', label: 'PROJECTS' },
    { id: 'STREAM', label: 'STREAM' }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    playSound('tick');
  };

  return (
    <header className="fixed top-0 w-full border-b border-primary/30 bg-background/85 backdrop-blur-xl z-40 flex justify-between items-center px-5 md:px-16 h-20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      {/* Title */}
      <div 
        onClick={onReboot}
        className="font-display text-2xl text-primary drop-shadow-md cursor-pointer tracking-tighter select-none hover:opacity-85 transition-opacity font-bold"
      >
        SWARAN_OS
      </div>

      {/* Navigation Shell */}
      <nav className="hidden md:flex gap-8 items-center drop-shadow-[0_1px_1px_rgba(0,0,0,1)]">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              onMouseEnter={() => playSound('hover')}
              className={`font-label-caps text-xs tracking-[0.2em] transition-all duration-300 pb-1 cursor-pointer focus:outline-none font-bold ${
                isActive 
                  ? 'text-primary border-b-2 border-primary' 
                  : 'text-on-surface hover:text-primary'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Initialize / Reboot Mainframe Trigger & Theme Toggle */}
      <div className="flex gap-4 items-center">
        <button 
          onClick={() => {
            playSound('tick');
            toggleTheme();
          }}
          onMouseEnter={() => playSound('hover')}
          className="hidden sm:flex border border-primary text-primary px-4 py-2 font-label-caps text-[10px] tracking-[0.25em] font-bold hover:bg-primary hover:text-background transition-all duration-200 active:scale-95 cursor-pointer bg-background/50 items-center gap-2"
        >
          <span className="material-symbols-outlined text-[14px]">palette</span>
          {theme === 'blue' ? 'CYAN_SYNC' : 'RED_SYNC'}
        </button>
        <button 
          onClick={() => {
            playSound('transform');
            onReboot();
          }}
          onMouseEnter={() => playSound('hover')}
          className="border border-primary text-primary px-6 py-2 font-label-caps text-xs tracking-[0.25em] font-bold hover:bg-primary hover:text-background transition-all duration-200 active:scale-95 cursor-pointer glow-sm bg-background/50"
        >
          REBOOT_LINK
        </button>
      </div>
    </header>
  );
};

export default AresHeader;