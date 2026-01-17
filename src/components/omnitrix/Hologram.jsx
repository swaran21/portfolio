import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { cn } from '../../lib/utils';

const Hologram = ({ icon: Icon, label, isActive, masterControl }) => {
  const beamRef = useRef(null);
  const contentRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      // Beam emergence animation
      anime({
        targets: beamRef.current,
        scaleY: [0, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo',
        begin: () => {
          if (beamRef.current) beamRef.current.style.transformOrigin = 'bottom center';
        }
      });

      // Glow pulse at base
      anime({
        targets: glowRef.current,
        scale: [0.8, 1.2],
        opacity: [0.6, 1],
        duration: 1000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      });

      // Content float-in
      anime({
        targets: contentRef.current,
        opacity: [0, 1],
        translateY: ['100px', '0px'],
        duration: 1200,  
        delay: 400,
        easing: 'easeOutBack'
      });
    } else {
      anime({
        targets: [beamRef.current, contentRef.current, glowRef.current],
        opacity: 0,
        duration: 400,
        easing: 'easeInExpo'
      });
    }
  }, [isActive, label]);

  if (!Icon) return null;

  const beamColor = masterControl ? '#22d3ee' : '#4ade80';
  const glowColor = masterControl ? 'rgba(34, 211, 238,' : 'rgba(74, 222, 128,';

  return (
    <div className="absolute top-0 left-0 w-full h-full z-[100] pointer-events-none preserve-3d overflow-visible">
      
      {/* CYLINDRICAL BEAM - Straight pipe/tube shape */}
      <div 
        ref={beamRef}
        className="absolute preserve-3d"
        style={{
          bottom: '50%',
          left: '50%',
          width: '180px', // Narrower tube
          height: '800px',
          transform: 'translateX(-50%) rotateX(-90deg)',
          transformOrigin: 'bottom center',
          transformStyle: 'preserve-3d',
          opacity: 0
        }}
      >
        {/* Main cylindrical beam - straight edges */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${glowColor} 0.8) 0%, ${glowColor} 0.4) 50%, ${glowColor} 0.1) 100%)`,
            filter: 'blur(20px)',
          }}
        ></div>

        {/* Inner bright core - also cylindrical */}
        <div 
          className="absolute left-[25%] right-[25%] top-0 bottom-0"
          style={{
            background: `linear-gradient(to top, ${glowColor} 1) 0%, ${glowColor} 0.6) 30%, ${glowColor} 0.2) 100%)`,
            filter: 'blur(10px)',
          }}
        ></div>

        {/* Left edge highlight */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-[4px] opacity-80"
          style={{
            background: `linear-gradient(to top, ${glowColor} 0.4) 0%, ${glowColor} 1) 100%)`,
            boxShadow: `0 0 10px ${beamColor}`,
          }}
        ></div>

        {/* Right edge highlight */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-[4px] opacity-80"
          style={{
            background: `linear-gradient(to top, ${glowColor} 0.4) 0%, ${glowColor} 1) 100%)`,
            boxShadow: `0 0 10px ${beamColor}`,
          }}
        ></div>
      </div>

      {/* INTENSE BASE GLOW */}
      <div 
        ref={glowRef}
        className={cn(
          "absolute w-[200px] h-[200px] rounded-full blur-[40px] opacity-80",
          masterControl ? "bg-cyan-400" : "bg-green-400"
        )}
        style={{ 
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) translateZ(5px)',
          boxShadow: `0 0 100px 50px ${beamColor}`,
          opacity: 0
        }}
      ></div>

      {/* FLOATING PARTICLES */}
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className={cn(
            "absolute w-1 h-1 rounded-full opacity-70",
            masterControl ? "bg-cyan-300" : "bg-green-300"
          )}
          style={{
            left: `calc(50% + ${(Math.random() - 0.5) * 100}px)`, // Constrained to narrower beam
            bottom: `${50 + Math.random() * 700}px`,
            transform: 'translateZ(' + (Math.random() * 100 + 50) + 'px)',
            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            filter: `blur(${Math.random() > 0.5 ? 1 : 0}px)`
          }}
        ></div>
      ))}

      {/* ALIEN SILHOUETTE CONTENT - Smaller */}
      <div 
        ref={contentRef}
        className="absolute flex flex-col items-center preserve-3d"
        style={{
          left: '50%',
          bottom: '400px',
          transform: 'translateX(-50%) translateZ(100px)',
          opacity: 0
        }}
      >
        {/* Omnitrix symbol above head - smaller */}
        <div className={cn(
          "w-10 h-10 mb-6 relative",
          masterControl ? "text-cyan-300" : "text-green-300"
        )}
        style={{
          filter: `drop-shadow(0 0 12px ${beamColor})`
        }}>
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
            <path d="M20 10 L50 50 L20 90 M80 10 L50 50 L80 90" 
                  stroke="currentColor" 
                  strokeWidth="10" 
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"/>
            <circle cx="50" cy="50" r="8" fill="currentColor"/>
          </svg>
        </div>

        {/* Alien Icon - Reduced size */}
        <Icon 
          size={180} 
          strokeWidth={0} 
          fill="currentColor"
          fillOpacity={0.85}
          className={cn(
            "opacity-90",
            masterControl ? "text-cyan-300" : "text-green-300"
          )} 
          style={{
            filter: `drop-shadow(0 0 25px ${beamColor}) drop-shadow(0 0 50px ${beamColor})`,
          }}
        />
        
        {/* Label - smaller text */}
        <div className="mt-6">
          <span className={cn(
            "block text-xl font-black tracking-[0.3em] uppercase",
            masterControl ? "text-cyan-200" : "text-green-200"
          )}
          style={{
            filter: `drop-shadow(0 0 12px ${beamColor})`,
            textShadow: `0 0 15px ${beamColor}, 0 0 30px ${beamColor}`
          }}>
            {label}
          </span>
        </div>
      </div>

      {/* CSS Keyframes for particles */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateZ(var(--z, 50px)); 
          }
          50% { 
            transform: translateY(-30px) translateZ(var(--z, 50px)); 
          }
        }
      `}</style>
    </div>
  );
};

export default Hologram;
