import React, { useState, useEffect, useRef } from 'react';
import useSound from '../../hooks/useSound';

const AresBootScreen = ({ onComplete }) => {
  const [logs, setLogs] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const logEndRef = useRef(null);
  const { playSound } = useSound();

  const bootLogs = [
    "ARES_SYSTEM // INITIALIZING BOOT SEQUENCE_v.03",
    "UPLINK_STATUS: CONNECTING TO SECTOR_V_CORE...",
    "SECURE_SHELL_CONNECTED // PROTOCOL: ENCOM_SSH_V4",
    "DECRYPTING OBSIDIAN STORAGE NODES...",
    "LOADING NEURAL GRAPH LAYER...",
    "DECELERATING DIGITAL TRACERS...",
    "SYNCHRONIZING INTERFACE PARAMETERS:",
    "  > colors: #ffb4ab (ares-red)",
    "  > fonts: Space Grotesk / JetBrains Mono",
    "  > status: ACTIVE_NO_DEREZZ_DETECTED",
    "MAIN_REACTIVE_CORE: ONLINE [uptime: 14212 cycles]",
    "SYSTEM INTEGRITY: 100% (STABLE)",
    "ESTABLISHING HIGH-FIDELITY MAINBOARD OVERLAY...",
    "ARES PROTOCOL IS READY FOR COGNITIVE CONNECTION."
  ];

  useEffect(() => {
    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentLogIndex]]);
        playSound('tick');
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setShowButton(true);
        playSound('hover');
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleStart = () => {
    setIsInitializing(true);
    playSound('transform');
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-6 bg-grid opacity-95 relative overflow-hidden">
      <div className="absolute inset-0 scanline pointer-events-none z-10"></div>
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] z-0"></div>

      {/* Main Terminal Frame */}
      <div className="w-full max-w-2xl glass-panel relative p-8 glow-red flex flex-col justify-between min-h-[420px] z-10">
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="w-2 h-2 bg-primary/30"></span>
          <span className="w-2 h-2 bg-primary/50"></span>
          <span className="w-2 h-2 bg-primary animate-pulse"></span>
        </div>
        
        {/* Terminal Header */}
        <div className="border-b border-primary/20 pb-4 mb-6">
          <h2 className="text-primary font-bold text-lg tracking-widest font-label-caps">
            ARES_SYSTEM_LOADER // TERMINAL_UPLINK
          </h2>
        </div>

        {/* Scrolling Log Content */}
        <div className="flex-1 font-mono text-sm space-y-2 overflow-y-auto max-h-[220px] pr-2 scrollbar-thin text-on-surface/80">
          {logs.map((log, index) => (
            <div key={index} className="flex gap-2">
              <span className="text-primary font-bold shrink-0">&gt;&gt;</span>
              <p className={index === logs.length - 1 && !showButton ? 'text-primary' : ''}>
                {log}
              </p>
            </div>
          ))}
          <div ref={logEndRef} />
        </div>

        {/* Action Button Container */}
        <div className="mt-8 pt-4 border-t border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`w-3.5 h-3.5 ${isInitializing ? 'bg-secondary' : 'bg-primary'} animate-pulse rounded-full`}></span>
            <span className="text-xs uppercase tracking-widest text-on-surface-variant font-label-caps">
              {isInitializing ? 'INITIALIZING_FLUX...' : showButton ? 'AWAITING_COGNITIVE_SYNC' : 'PREPARING_DATA_MAINBOARD'}
            </span>
          </div>

          {showButton && (
            <button
              onClick={handleStart}
              disabled={isInitializing}
              className={`w-full md:w-auto px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-on-primary hover:glow-primary font-label-caps text-xs tracking-[0.2em] transition-all duration-300 ${
                isInitializing ? 'opacity-50 cursor-not-allowed scale-95' : 'active:scale-95'
              }`}
            >
              INITIALIZE_COGNITIVE_LINK
            </button>
          )}
        </div>
      </div>

      {/* Decorative cyber corner highlights */}
      <div className="absolute top-10 left-10 w-24 h-1 bg-primary opacity-20 hidden md:block"></div>
      <div className="absolute top-10 left-10 w-1 h-24 bg-primary opacity-20 hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-24 h-1 bg-primary opacity-20 hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-1 h-24 bg-primary opacity-20 hidden md:block"></div>
    </div>
  );
};

export default AresBootScreen;
