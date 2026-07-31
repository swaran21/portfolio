import React, { useState, useEffect } from 'react';
import useSound from '../../hooks/useSound';

const AresBootScreen = ({ onComplete }) => {
  const { playSound } = useSound();
  const [isInitializing, setIsInitializing] = useState(false);
  const [isTerminating, setIsTerminating] = useState(false);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate static stars for the hyperspace effect
    const newStars = Array.from({ length: 200 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // %
      y: Math.random() * 100, // %
      size: Math.random() * 2 + 1,
    }));
    setStars(newStars);
  }, []);

  const handleStart = () => {
    if (isInitializing || isTerminating) return;
    setIsInitializing(true);
    playSound('transform'); // Initial sound
    
    // Start hyperspace jump
    setTimeout(() => {
      setIsTerminating(true);
      playSound('hover'); // Whoosh sound
      
      // Wait for the hyperspace warp to finish before entering the mainframe
      setTimeout(() => {
        onComplete('hero');
      }, 1500); 
    }, 400); // Small delay before warp starts
  };

  return (
    <div 
      className={`fixed inset-0 z-50 font-body flex items-center justify-center bg-background overflow-hidden cursor-pointer transition-opacity duration-[1500ms] ${isTerminating ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleStart}
    >
      {/* Hyperspace Starfield Container */}
      <div 
        className="absolute inset-0 z-[0] w-full h-full pointer-events-none origin-center transition-transform duration-[1500ms] ease-in"
        style={{ transform: isTerminating ? 'scale(15)' : 'scale(1)' }}
      >
        {stars.map((star) => {
          // Calculate angle from center (50%, 50%)
          const dx = star.x - 50;
          const dy = star.y - 50;
          const angle = Math.atan2(dy, dx) + Math.PI / 2; // Add 90deg because we stretch height

          return (
            <div
              key={star.id}
              className={`absolute bg-cyan-300 transition-all duration-[1500ms] ease-in`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: isTerminating ? `${star.size * 50}px` : `${star.size}px`, // Stretch drastically
                borderRadius: isTerminating ? '0px' : '50%',
                opacity: isTerminating ? 0.8 : 0.3,
                boxShadow: isTerminating ? '0 0 15px rgba(0,255,255,1)' : '0 0 2px rgba(0,255,255,0.3)',
                transform: `rotate(${angle}rad)`,
                transformOrigin: 'top center'
              }}
            />
          );
        })}
      </div>

      {/* Projection UI */}
      <div className={`relative z-10 flex flex-col items-center gap-6 pointer-events-auto transition-all duration-700 ${isInitializing ? 'scale-150 opacity-0 blur-md' : 'scale-100 opacity-100 blur-0'}`}>
        
        {/* Holographic scanning effect */}
        <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full animate-pulse -z-10"></div>
        
        <div className="font-label-caps text-[10px] text-cyan-400 tracking-[0.4em] animate-pulse drop-shadow-md">
          UPLINK_READY // AWAITING_COMMAND
        </div>
        
        <button
          onClick={(e) => { e.stopPropagation(); handleStart(); }}
          onMouseEnter={() => playSound('hover')}
          className="px-6 py-6 sm:px-10 border border-cyan-400 text-cyan-400 bg-background/60 backdrop-blur-md font-display text-xl sm:text-3xl md:text-4xl tracking-[0.2em] uppercase font-bold hover:bg-cyan-400 hover:text-background hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] transition-all duration-300 cursor-pointer"
          style={{ textShadow: isInitializing ? 'none' : '0 0 10px rgba(0,255,255,0.5)' }}
        >
          {isInitializing ? 'INITIATING_WARP_DRIVE...' : 'ENTER SWARAN TRON WORLD'}
        </button>
        
        <div className="font-body text-[9px] sm:text-[10px] text-cyan-400/60 tracking-[0.3em] uppercase drop-shadow-md">
          [CLICK_ANYWHERE_TO_INITIALIZE_SEQUENCE]
        </div>
      </div>

      <div className="scanline pointer-events-none opacity-20"></div>
    </div>
  );
};

export default AresBootScreen;