import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const GlitchTransition = ({ isActive, onComplete }) => {
  const glitchRef = useRef(null);

  useEffect(() => {
    if (isActive && glitchRef.current) {
      // Matrix-style glitch animation
      const timeline = anime.timeline({
        easing: 'easeInOutQuad',
        complete: () => {
          if (onComplete) onComplete();
        }
      });

      timeline
        .add({
          targets: glitchRef.current,
          opacity: [0, 1],
          duration: 100
        })
        .add({
          targets: '.glitch-line',
          translateX: () => anime.random(-50, 50),
          duration: 50,
          delay: anime.stagger(10),
          loop: 5
        })
        .add({
          targets: glitchRef.current,
          opacity: [1, 0],
          duration: 200
        });
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div 
      ref={glitchRef}
      className="fixed inset-0 z-[9997] pointer-events-none opacity-0"
    >
      {/* Glitch lines */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="glitch-line absolute w-full bg-green-500/30"
          style={{
            height: '4px',
            top: `${i * 5}%`,
            boxShadow: '0 0 20px rgba(74, 222, 128, 0.8)'
          }}
        ></div>
      ))}

      {/* Digital noise overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(74, 222, 128, 0.3) 2px,
            rgba(74, 222, 128, 0.3) 4px
          )`,
          animation: 'glitchScan 0.1s linear infinite'
        }}
      ></div>

      <style>{`
        @keyframes glitchScan {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
};

export default GlitchTransition;
