import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { cn } from '../../lib/utils';

const Dial = ({ isActive, isTransforming, activeIndex, masterControl }) => {
  const dialRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Pulse animation
    const pulse = anime({
      targets: dialRef.current,
      filter: [
        'drop-shadow(0 0 5px rgba(74, 222, 128, 0.5))',
        'drop-shadow(0 0 15px rgba(74, 222, 128, 0.8))'
      ],
      duration: 2000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

    return () => pulse.pause();
  }, []);

  // Rotate ring based on active index - enhanced visibility
  useEffect(() => {
    anime({
      targets: ringRef.current,
      rotate: activeIndex * 72,
      scale: [0.95, 1],  // Pulse effect for visibility
      duration: 800,  // Increased from 600ms for more visible rotation
      easing: 'easeOutElastic(1, 0.6)'  // Elastic bounce for visibility
    });
  }, [activeIndex]);

  return (
    <div className="relative w-full h-full flex items-center justify-center preserve-3d">
      
      {/* --- TOP SURFACE RING --- */}
      <div 
        ref={ringRef}
        className="absolute w-full h-full rounded-full flex items-center justify-center transform transition-transform duration-500 preserve-3d"
        style={{
             // Enhanced Brushed Metal Surface
             background: 'conic-gradient(from 180deg, #3f3f46, #fafafa 8%, #d4d4d8 18%, #52525b 28%, #18181b 42%, #52525b 58%, #f4f4f5 68%, #d4d4d8 78%, #52525b 92%, #3f3f46)',
             border: '2px solid #a1a1aa',
             boxShadow: `
               0 8px 16px rgba(0, 0, 0, 0.4),
               inset 0 2px 4px rgba(255, 255, 255, 0.3),
               inset 0 -2px 4px rgba(0, 0, 0, 0.3)
             `
        }}
      >
        {/* Inner Bevel Detail */}
        <div className="absolute w-[88%] h-[88%] rounded-full"
             style={{ 
               background: 'linear-gradient(145deg, #3f3f46, #71717a, #52525b)',
               boxShadow: 'inset 3px 3px 8px rgba(0,0,0,0.9), inset -2px -2px 6px rgba(255,255,255,0.1)'
             }}
        ></div>
      </div>

      {/* --- RECESSED FACEPLATE --- */}
      {/* Pushed back in Z-space for physical depth */}
      <div 
        className="absolute w-[82%] h-[82%] rounded-full bg-[#09090b] flex items-center justify-center overflow-hidden transform translate-z-[-4px]"
        style={{ boxShadow: 'inset 0 0 20px rgba(0,0,0,1)' }}
      >
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        
        {/* --- THE HOURGLASS SYMBOL --- */}
        {/* 
           NEW GEOMETRY STRATEGY:
           Instead of clipping the green shape, we render a FULL green circle and overlay
           two black wedges (triangles) from the sides. This guarantees the top/bottom
           edges match the circular curve perfectly.
        */}
        <div 
            ref={dialRef}
            className={cn(
                "relative w-[95%] h-[95%] rounded-full transition-all duration-300 flex items-center justify-center",
                isActive ? "opacity-100" : "opacity-90"
            )}
        >
            {/* 1. Base Green Glow Layer (The whole circle) */}
            <div className={cn(
                "absolute inset-0 rounded-full",
                masterControl 
                    ? "bg-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.4)]" 
                    : "bg-[#4ade80] shadow-[0_0_50px_rgba(74,222,128,0.4)]"
            )}
            style={{
                background: masterControl 
                    ? 'radial-gradient(circle at 30% 30%, #22d3ee, #0891b2)'
                    : 'radial-gradient(circle at 30% 30%, #86efac, #22c55e)'
            }}
            ></div>

            {/* 2. Black Wedge Overlays (The Cutouts) */}
            {/* 
                We make these LARGER than the container to ensure the "outer" edge 
                is completely handled by the container's rounded-full + overflow-hidden,
                guaranteeing a perfect curve at the watch edge.
            */}
            
            {/* Left Wedge (Covers the left side, points inward) */}
            <div className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[60%] h-[150%] bg-[#09090b]"
                 style={{ 
                     clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)', // Triangle pointing right
                     // Adjust translateX to control the "pinch" width of the hourglass
                     transform: 'translateX(2px)' 
                 }}
            ></div>

            {/* Right Wedge (Covers the right side, points inward) */}
            <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[60%] h-[150%] bg-[#09090b]"
                 style={{ 
                     clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)', // Triangle pointing left
                     transform: 'translateX(-2px)'
                 }}
            ></div>

            {/* 3. Surface Polish */}
            {/* Edge highlight */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-80 pointer-events-none mix-blend-overlay"></div>
            
            {/* Curved Glass Reflection */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-40 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default Dial;
