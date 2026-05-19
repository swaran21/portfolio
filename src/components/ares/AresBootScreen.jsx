import React, { useState } from 'react';
import useSound from '../../hooks/useSound';
import firstPageBgRed from '../../assets/tron-first-page.png';
import firstPageBgBlue from '../../assets/tron-blue.png';

const AresBootScreen = ({ onComplete, theme, toggleTheme }) => {
  const { playSound } = useSound();
  const [isInitializing, setIsInitializing] = useState(false);
  const [isTerminating, setIsTerminating] = useState(false);

  // Dynamic Theme Variables for the Glow Effects
  const isBlue = theme === 'blue';
  const glowSm = isBlue ? 'drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]' : 'drop-shadow-[0_0_15px_rgba(255,84,75,0.8)]';
  const glowLg = isBlue ? 'drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]' : 'drop-shadow-[0_0_20px_rgba(255,84,75,0.8)]';
  const protocolText = isBlue ? 'CYAN_GRID_PROTOCOL' : 'ARES_RED_PROTOCOL';

  const handleStart = (target = 'hero') => {
    if (isInitializing || isTerminating) return;
    setIsInitializing(true);
    playSound('transform');
    setTimeout(() => {
      onComplete(target);
    }, 1200);
  };

  const handleConfig = () => {
    if (isInitializing || isTerminating) return;
    playSound('tick');
    toggleTheme();
  };

  const firstPageBg = isBlue ? firstPageBgBlue : firstPageBgRed;

  return (
    <div className={`fixed inset-0 z-50 font-body text-on-surface relative h-screen w-screen bg-background overflow-hidden transition-all duration-1000 ${isTerminating ? 'opacity-0 scale-105 blur-xl' : 'opacity-100 scale-100 blur-0'} ${isBlue ? 'theme-blue' : ''}`}>

      {/* Fixed Background */}
      <div className="absolute inset-0 z-[0] w-full h-full pointer-events-none">
        <img alt="Ares Grid Background" className="w-full h-full object-cover transition-opacity duration-700" src={firstPageBg} />
        {/* Gradient overlay to darken the left side for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent"></div>
        {/* Subtle Circuit Grid Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(${isBlue ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 84, 75, 0.05)'} 1px, transparent 1px), linear-gradient(90deg, ${isBlue ? 'rgba(0, 255, 255, 0.05)' : 'rgba(255, 84, 75, 0.05)'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-12 lg:p-16">

        {/* HUD Top */}
        <div className="flex justify-between items-start w-full pointer-events-none">
          {/* Branding Top Left */}
          <div className={`font-display text-3xl md:text-4xl text-primary tracking-widest font-bold transition-all duration-500 ${glowSm}`}>
            SWARAN_OS
            <div className="font-label-caps text-[10px] text-primary/60 tracking-[0.3em] mt-2 font-normal">PORTFOLIO_BUILD.2026 // STATUS: OPTIMAL</div>
          </div>

          {/* Status Top Right */}
          <div className="text-right font-body text-[10px] text-on-surface/70 tracking-[0.2em] flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full animate-pulse ${isBlue ? 'bg-cyan-400' : 'bg-primary'}`}></span>
              <span className={`font-label-caps font-bold ${isBlue ? 'text-cyan-400' : 'text-primary'}`}>SERVER_SYNC: ONLINE</span>
            </div>
            
            {/* Add a subtle dark text-shadow so it's readable on light backgrounds */}
            <div className="text-on-surface drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              <div>COORD: 17.3850 N // 78.4867 E</div> 
              <div>RUNTIME: JAVA // SPRING_BOOT</div>
              <div>INFRA: GCP // AWS_ACTIVE</div>
            </div>
          </div>
        </div>

        {/* Main Menu Bottom Left */}
        <div className="w-full flex justify-between items-end">
          <div className="flex flex-col gap-6 pointer-events-auto max-w-xl">
            <div>
              {/* Dynamic Protocol Text */}
              <div className="font-label-caps text-[10px] text-primary/70 tracking-[0.4em] mb-2 animate-pulse">
                UPLINK_ESTABLISHED // {protocolText}
              </div>
              <h1 className="font-display text-5xl md:text-7xl text-on-surface tracking-tighter leading-none drop-shadow-lg uppercase font-bold">
                MARAM SAI <span className={`text-primary transition-all duration-500 ${glowLg}`}>SWARAN</span>
              </h1>
              <div className="font-body text-sm mt-3 text-on-surface/80 tracking-widest uppercase border-l-2 border-primary pl-3 transition-colors duration-500">
                System Architect // Software Engineer
              </div>
            </div>

            <nav className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => handleStart('hero')}
                onMouseEnter={() => playSound('hover')}
                className="text-left px-6 py-4 border-l-4 border-primary text-primary font-label-caps tracking-[0.2em] bg-gradient-to-r from-primary/20 to-transparent hover:bg-primary/30 transition-all duration-300 group flex items-center gap-4 w-72 md:w-96 glow-sm cursor-pointer"
              >
                <span className="opacity-70 text-[10px]">01</span>
                {isInitializing ? 'INITIALIZING...' : '[ENTER_MAINFRAME]'}
              </button>

              <button
                onClick={() => handleStart('projects')}
                onMouseEnter={() => playSound('hover')}
                className="text-left px-6 py-4 border-l-4 border-white/20 text-on-surface/80 font-label-caps tracking-[0.2em] hover:border-primary hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent transition-all duration-300 group flex items-center gap-4 w-72 md:w-96 cursor-pointer"
              >
                <span className="opacity-50 text-[10px]">02</span>
                [PROJECT_ARCHIVE]
              </button>

              <button
                onClick={handleConfig}
                onMouseEnter={() => playSound('hover')}
                className="text-left px-6 py-4 border-l-4 border-white/20 text-on-surface/80 font-label-caps tracking-[0.2em] hover:border-primary hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent transition-all duration-300 group flex items-center gap-4 w-72 md:w-96 cursor-pointer"
              >
                <span className="opacity-50 text-[10px]">03</span>
                {isBlue ? '[PROTOCOL: CYAN_SYNC]' : '[PROTOCOL: RED_SYNC]'}
              </button>

              {/* FIXED: Now uses standard primary hover colors, and points to the stream section! */}
              <button
                onClick={() => handleStart('stream')}
                onMouseEnter={() => playSound('hover')}
                className="text-left px-6 py-4 border-l-4 border-white/20 text-on-surface/80 font-label-caps tracking-[0.2em] hover:border-primary hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent transition-all duration-300 group flex items-center gap-4 w-72 md:w-96 mt-4 cursor-pointer"
              >
                <span className="opacity-50 text-[10px]">04</span>
                [ESTABLISH_UPLINK]
              </button>
            </nav>
          </div>

          {/* HUD Bottom Right */}
          <div className="pointer-events-none opacity-50 flex flex-col items-end hidden sm:flex">
            <div className="flex gap-2 mb-3">
              <div className="w-8 h-px bg-primary"></div>
              <div className="w-16 h-px bg-primary"></div>
              <div className="w-4 h-px bg-primary"></div>
            </div>
            <div className="flex gap-2 mb-4 items-end">
              <div className="w-1 h-4 bg-primary/40"></div>
              <div className="w-1 h-6 bg-primary/80"></div>
              <div className="w-1 h-8 bg-primary"></div>
              <div className="w-1 h-3 bg-primary/20"></div>
              <div className="w-1 h-5 bg-primary/60"></div>
            </div>
            <span className="font-label-caps text-[10px] text-primary tracking-[0.4em]">NODE_SECURED: HYDERABAD_IN</span>
          </div>
        </div>
      </div>

      <div className="scanline"></div>
    </div>
  );
};

export default AresBootScreen;