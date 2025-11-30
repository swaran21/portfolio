import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { cn } from '../../lib/utils';

const Dial = ({ isActive, isTransforming, activeIndex, masterControl }) => {
  const hourglassRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      // Active state animation (Green glow)
      anime({
        targets: hourglassRef.current,
        opacity: [0.5, 1],
        duration: 1000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    } else {
      // Idle state animation (Subtle pulse)
      anime({
        targets: hourglassRef.current,
        opacity: [0.3, 0.6],
        duration: 2000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });
    }
  }, [isActive]);

  // Calculate rotation for the dial ring
  // 5 sections = 72 degrees each.
  // We want the "gap" or "indicator" to point to the active section.
  const rotation = activeIndex * 72;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full bg-black">
      {/* Faceplate Details */}
      <div className="absolute inset-2 border-2 border-gray-600 rounded-full opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-80"></div>

      {/* The Hourglass Symbol */}
      <div 
        ref={hourglassRef}
        className={cn(
          "relative w-24 h-24 md:w-32 md:h-32 transition-colors duration-500 z-10",
          isActive 
            ? (masterControl ? "text-cyan-400 drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]" : "text-green-500 drop-shadow-[0_0_15px_rgba(0,255,0,0.8)]")
            : (masterControl ? "text-cyan-900/50" : "text-green-900/50")
        )}
      >
        {/* Top Triangle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[30px] border-r-[30px] border-t-[50px] border-l-transparent border-r-transparent border-t-current md:border-l-[40px] md:border-r-[40px] md:border-t-[60px]"></div>
        
        {/* Bottom Triangle */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[50px] border-l-transparent border-r-transparent border-b-current md:border-l-[40px] md:border-r-[40px] md:border-b-[60px]"></div>
        
        {/* Center Diamond (Core) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-current rotate-45 rounded-sm"></div>
      </div>

      {/* Rotating Ring (Visual) */}
      <div 
        className={cn(
            "absolute inset-4 border-4 border-dashed border-gray-700 rounded-full transition-all duration-500 ease-out",
            isActive ? (masterControl ? "border-cyan-500/50" : "border-green-500/50") : ""
        )}
        style={{
            transform: `rotate(${isActive ? rotation : 0}deg)`
        }}
      >
        {/* Indicator on the ring */}
        <div className={cn(
            "absolute top-0 left-1/2 -translate-x-1/2 w-2 h-4 shadow-[0_0_10px_rgba(0,255,0,1)] rounded-b-full",
            masterControl ? "bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,1)]" : "bg-green-500 shadow-[0_0_10px_rgba(0,255,0,1)]"
        )}></div>
      </div>
    </div>
  );
};

export default Dial;
