import React, { useEffect, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [bootText, setBootText] = useState('INITIALIZING...');

  useEffect(() => {
    const bootSequence = [
      { text: 'INITIALIZING OMNITRIX OS...', delay: 0 },
      { text: 'SCANNING DNA SAMPLES...', delay: 800 },
      { text: 'LOADING ALIEN DATABASE...', delay: 1600 },
      { text: 'CALIBRATING HOLOGRAM PROJECTOR...', delay: 2400 },
      { text: 'SYNCHRONIZING MASTER CONTROL...', delay: 3200 },
      { text: 'BOOT SEQUENCE COMPLETE', delay: 4000 }
    ];

    bootSequence.forEach(({ text, delay }) => {
      setTimeout(() => setBootText(text), delay);
    });

    // Progress bar animation
    anime({
      targets: { value: 0 },
      value: 100,
      duration: 4500,
      easing: 'easeInOutQuad',
      update: function(anim) {
        setProgress(Math.round(anim.animations[0].currentValue));
      },
      complete: () => {
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(74, 222, 128, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(74, 222, 128, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridScroll 20s linear infinite'
        }}
      ></div>

      <div className="relative z-10 text-center">
        {/* Omnitrix Symbol */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-32 h-32">
            {/* Rotating outer ring */}
            <div className="absolute inset-0 rounded-full border-4 border-green-500/30 animate-spin" style={{ animationDuration: '3s' }}></div>
            
            {/* Pulsing core */}
            <div className="absolute inset-4 rounded-full bg-green-500/20 border-2 border-green-500 animate-pulse"></div>
            
            {/* Center hourglass */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-12 h-12 text-green-400">
                <path 
                  d="M20 10 L50 50 L20 90 M80 10 L50 50 L80 90" 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-pulse"
                />
                <circle cx="50" cy="50" r="6" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Boot Text */}
        <div className="mb-8">
          <p className="text-green-400 font-mono text-xl tracking-wider animate-pulse">
            {bootText}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-96 max-w-md mx-auto">
          <div className="h-2 bg-green-900/30 rounded-full overflow-hidden border border-green-500/30">
            <div 
              className="h-full bg-green-500 transition-all duration-200 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <p className="text-green-500 font-mono text-sm mt-2">{progress}%</p>
        </div>

        {/* DNA Strands Animation */}
        <div className="mt-12 flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="w-2 h-8 bg-green-500/50 rounded-full"
              style={{
                animation: `dnaWave 1s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes gridScroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes dnaWave {
          0%, 100% { transform: scaleY(1); opacity: 0.5; }
          50% { transform: scaleY(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
