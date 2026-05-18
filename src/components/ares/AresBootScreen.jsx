import React, { useState } from 'react';
import useSound from '../../hooks/useSound';
import firstPageBg from '../../assets/tron-first-page.png';

const AresBootScreen = ({ onComplete }) => {
  const { playSound } = useSound();
  const [isInitializing, setIsInitializing] = useState(false);

  const handleStart = () => {
    if (isInitializing) return;
    setIsInitializing(true);
    playSound('transform');
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 font-body text-on-surface relative h-screen w-screen bg-background overflow-hidden">
      {/* Fixed Background */}
      <div className="absolute inset-0 z-[0] w-full h-full pointer-events-none">
        <img alt="Ares Grid Background" className="w-full h-full object-cover" src={firstPageBg} />
        {/* Gradient overlay to darken the left side for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent"></div>
        {/* Subtle Circuit Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-30" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255, 84, 75, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 84, 75, 0.05) 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }}
        ></div>
      </div>
      
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-8 md:p-12 lg:p-16">
        {/* HUD Top */}
        <div className="flex justify-between items-start w-full pointer-events-none">
          {/* Branding Top Left */}
          <div className="font-display text-3xl md:text-4xl text-primary drop-shadow-[0_0_15px_rgba(255,84,75,0.8)] tracking-widest font-bold">
            ARES_SYSTEM
            <div className="font-label-caps text-[10px] text-primary/60 tracking-[0.3em] mt-2 font-normal">v.3.0.4 // ONLINE_STATUS: OPTIMAL</div>
          </div>
          
          {/* Status Top Right */}
          <div className="text-right font-body text-[10px] text-primary/70 tracking-[0.2em] flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse glow-sm"></span>
              <span className="font-label-caps">UPLINK_SECURE</span>
            </div>
            <div>COORD: 34.0522 N // 118.2437 W</div>
            <div>SYS.LOAD: 14%</div>
            <div>ENCRYPTION: AES-256</div>
          </div>
        </div>
        
        {/* Main Menu Bottom Left */}
        <div className="w-full flex justify-between items-end">
          <div className="flex flex-col gap-6 pointer-events-auto max-w-xl">
            <div>
              <div className="font-label-caps text-[10px] text-primary/70 tracking-[0.4em] mb-2">USER: ENCOM_ADMIN</div>
              <h1 className="font-display text-5xl md:text-7xl text-on-surface tracking-tighter leading-none drop-shadow-lg uppercase font-bold">
                THE <span className="text-primary drop-shadow-[0_0_20px_rgba(255,84,75,0.8)]">GRID</span> REBORN
              </h1>
            </div>
            
            <nav className="flex flex-col gap-2 mt-4">
              <button 
                onClick={handleStart}
                onMouseEnter={() => playSound('hover')}
                className="text-left px-6 py-4 border-l-4 border-primary text-primary font-label-caps tracking-[0.2em] bg-gradient-to-r from-primary/20 to-transparent hover:bg-primary/30 transition-all duration-300 group flex items-center gap-4 w-64 md:w-72 glow-sm cursor-pointer"
              >
                <span className="opacity-70 text-[10px]">01</span>
                {isInitializing ? 'INITIALIZING...' : 'INITIATE_SESSION'}
              </button>
              
              <button 
                onClick={() => playSound('tick')}
                onMouseEnter={() => playSound('hover')}
                className="text-left px-6 py-4 border-l-4 border-white/20 text-on-surface/80 font-label-caps tracking-[0.2em] hover:border-primary hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent transition-all duration-300 group flex items-center gap-4 w-64 md:w-72 cursor-pointer"
              >
                <span className="opacity-50 text-[10px]">02</span>
                ARCHIVE_ACCESS
              </button>
              
              <button 
                onClick={() => playSound('tick')}
                onMouseEnter={() => playSound('hover')}
                className="text-left px-6 py-4 border-l-4 border-white/20 text-on-surface/80 font-label-caps tracking-[0.2em] hover:border-primary hover:text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent transition-all duration-300 group flex items-center gap-4 w-64 md:w-72 cursor-pointer"
              >
                <span className="opacity-50 text-[10px]">03</span>
                SYSTEM_SETTINGS
              </button>
              
              <button 
                onClick={() => playSound('tick')}
                onMouseEnter={() => playSound('hover')}
                className="text-left px-6 py-4 border-l-4 border-white/20 text-on-surface/80 font-label-caps tracking-[0.2em] hover:border-error hover:text-error hover:bg-gradient-to-r hover:from-[#ffb4ab]/10 hover:to-transparent transition-all duration-300 group flex items-center gap-4 w-64 md:w-72 mt-4 cursor-pointer"
              >
                <span className="opacity-50 text-[10px]">04</span>
                DISCONNECT
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
            <span className="font-label-caps text-[10px] text-primary tracking-[0.4em]">ARES_PROTOCOL_ACTIVE</span>
          </div>
        </div>
      </div>
      
      <div className="scanline"></div>
    </div>
  );
};

export default AresBootScreen;
