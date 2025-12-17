import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { cn } from '../../lib/utils';

const Hologram = ({ icon: Icon, label, isActive, masterControl }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Force reset for simple entrance
    anime.set(containerRef.current, { 
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1.1 : 0.5 
    });

    if (isActive) {
      anime({
        targets: containerRef.current,
        translateY: ['10%', '-10%'],
        opacity: [0, 1],
        scale: [0.5, 1.1], 
        duration: 400,
        easing: 'easeOutBack'
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
  }, [isActive, label]);

  if (!Icon) return null;

  const colorClass = masterControl ? "text-cyan-400" : "text-green-500";
  const glowClass = masterControl 
    ? "drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]" 
    : "drop-shadow-[0_0_15px_rgba(0,255,0,0.8)]";

  return (
    <div 
      ref={containerRef}
      className={cn(
        "absolute top-0 left-0 w-full h-full z-[100] flex items-center justify-center pointer-events-none preserve-3d will-change-transform",
        colorClass
      )}
    >
      {/* 
         PART 1: THE STRUCTURE (Wireframe Cage)
         We rotate these planes -90deg X to stand up.
      */}
      <div 
        className="absolute inset-0 flex items-center justify-center preserve-3d"
        style={{ transform: 'rotateX(-90deg)' }}
      >
          {/* Vertical Lines Plane 1 (Left/Right) */}
          <div 
            className={cn(
                "absolute w-[82%] h-[400px] border-l-2 border-r-2 opacity-50", 
                masterControl ? "border-cyan-400" : "border-green-400",
                "from-transparent via-current to-transparent bg-gradient-to-t opacity-20" // Inner fill
            )}
            style={{ 
                transform: 'translateZ(0)', // On the pivot
                background: `linear-gradient(to top, ${masterControl ? 'rgba(34,211,238,0.2)' : 'rgba(74,222,128,0.2)'} 0%, transparent 100%)`
            }}
          ></div>

          {/* Vertical Lines Plane 2 (Front/Back) */}
          <div 
            className={cn(
                "absolute w-[82%] h-[400px] border-l-2 border-r-2 opacity-50", 
                masterControl ? "border-cyan-400" : "border-green-400"
            )}
            style={{ 
                transform: 'rotateY(90deg)', 
                background: `linear-gradient(to top, ${masterControl ? 'rgba(34,211,238,0.2)' : 'rgba(74,222,128,0.2)'} 0%, transparent 100%)`
            }}
          ></div>
      </div>


      {/* 
         PART 2: THE RINGS (Horizontal Slices)
         Using translateZ.
      */}
      {/* Base Ring */}
      <div 
        className={cn(
            "absolute w-[82%] h-[82%] rounded-full border-2 border-opacity-50 blur-[1px]",
            masterControl ? "border-cyan-500 bg-cyan-900/20" : "border-green-500 bg-green-900/20"
        )}
        style={{ transform: 'translateZ(2px)' }}
      ></div>

      {/* Mid Ring */}
      <div 
        className={cn(
            "absolute w-[82%] h-[82%] rounded-full border border-opacity-30 dashed",
            masterControl ? "border-cyan-400" : "border-green-400"
        )}
        style={{ 
            transform: 'translateZ(200px)',
            borderStyle: 'dashed' 
        }}
      ></div>

      {/* Top Ring */}
      <div 
        className={cn(
            "absolute w-[82%] h-[82%] rounded-full border-4 border-opacity-80 blur-[1px]",
            masterControl ? "border-cyan-200" : "border-green-200"
        )}
        style={{ 
            transform: 'translateZ(400px)', 
            boxShadow: `0 0 40px ${masterControl ? '#22d3ee' : '#4ade80'}`
        }}
      ></div>

      {/* 
         PART 3: CONTENT
         Floating at Mid-Height (200px)
      */}
      <div 
        className={cn(
            "absolute flex flex-col items-center justify-center gap-4 preserve-3d", 
            glowClass
        )}
        style={{
            transform: 'translateZ(200px)', // Center of the 400px beam
        }}
      >
          {/* Tilt to face camera */}
          <div style={{ transform: 'rotateX(-45deg)' }} className="flex flex-col items-center"> 
              <Icon 
                size={180} 
                strokeWidth={0} 
                fill="currentColor"
                fillOpacity={0.9}
                className={cn(
                    "drop-shadow-[0_0_20px_rgba(255,255,255,0.9)] animate-pulse", 
                    masterControl ? "text-cyan-50" : "text-[#ecfccb]" 
                )} 
             />
             
             <span className={cn(
                "block text-center text-2xl font-black tracking-[0.3em] uppercase drop-shadow-[0_0_10px_currentColor] mt-4",
                masterControl ? "text-cyan-100" : "text-green-100"
             )}>
                {label}
             </span>
          </div>
      </div>

    </div>
  );
};

export default Hologram;
