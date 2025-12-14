import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { cn } from '../../lib/utils';

const Hologram = ({ icon: Icon, label, isActive, masterControl }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      // Pop up animation
      anime({
        targets: containerRef.current,
        translateY: [20, -150], // Float up higher from the dial
        opacity: [0, 1],
        scale: [0.5, 1.2],
        duration: 600,
        easing: 'easeOutElastic(1, .8)'
      });
    } else {
      anime({
        targets: containerRef.current,
        opacity: 0,
        scale: 0.5,
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  }, [isActive, label]); // Re-run when label changes (new section selected)

  if (!Icon) return null;

  const colorClass = masterControl ? "text-cyan-400" : "text-green-500";
  const glowClass = masterControl 
    ? "drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]" 
    : "drop-shadow-[0_0_15px_rgba(0,255,0,0.8)]";

  return (
    <div 
      ref={containerRef}
      className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center pointer-events-none opacity-0",
        colorClass
      )}
    >
      {/* Hologram Base Beam (Visual) */}
      <div className={cn(
        "absolute bottom-0 w-12 h-32 bg-gradient-to-t from-transparent via-current to-transparent opacity-20 blur-sm rounded-full",
        masterControl ? "via-cyan-500/30" : "via-green-500/30"
      )}></div>

      {/* The Icon */}
      <div className={cn(
        "relative p-4 rounded-full border border-current bg-black/50 backdrop-blur-sm mb-2",
        glowClass
      )}>
         <Icon size={48} />
         {/* Scanline overlay on the icon */}
         <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-30 rounded-full"></div>
      </div>

      {/* Label */}
      <span className="text-sm font-bold tracking-[0.2em] uppercase mt-2 drop-shadow-md">
        {label}
      </span>
    </div>
  );
};

export default Hologram;
