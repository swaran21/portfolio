import React, { useEffect, useState, useRef } from 'react';

// Import alien images
import heatblastImg from '../../images/heatblast.png';
import fourarmsImg from '../../images/fourarms.png';
import xlr8Img from '../../images/xlr8.png';
import diamondheadImg from '../../images/diamondhead.png';
import humangasaurImg from '../../images/humangasaur.png';
import upgradeImg from '../../images/upgrade.png';
import greymatterImg from '../../images/greymatter.png';
import wildmuttImg from '../../images/wildmut.png';
import alienXImg from '../../images/alienX.png';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentAlien, setCurrentAlien] = useState(0);
  const containerRef = useRef(null);

  // Alien silhouettes data with actual images
  const aliens = [
    { name: 'HEATBLAST', image: heatblastImg },
    { name: 'FOUR ARMS', image: fourarmsImg },
    { name: 'XLR8', image: xlr8Img },
    { name: 'DIAMONDHEAD', image: diamondheadImg },
    { name: 'HUMUNGOUSAUR', image: humangasaurImg },
    { name: 'UPGRADE', image: upgradeImg },
    { name: 'GREY MATTER', image: greymatterImg },
    { name: 'WILDMUTT', image: wildmuttImg },
    { name: 'ALIEN X', image: alienXImg }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
      const scrolled = containerRef.current.scrollTop;
      const newProgress = Math.min(100, Math.round((scrolled / scrollHeight) * 100));
      
      setProgress(newProgress);

      // Change alien based on progress
      const alienIndex = Math.min(
        aliens.length - 1, 
        Math.floor((newProgress / 100) * aliens.length)
      );
      setCurrentAlien(alienIndex);

      // Complete when reaching 100%
      if (newProgress >= 100) {
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [onComplete, aliens.length]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black overflow-y-scroll scrollbar-hide"
      style={{ height: '100vh' }}
    >
      {/* Scrollable content - makes it 10x viewport height */}
      <div style={{ height: '1000vh' }}>
        
        {/* Fixed loading UI */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          
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

          {/* Alien Silhouettes Background */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {aliens.map((alien, index) => {
              const isActive = currentAlien === index;
              const isPast = currentAlien > index;
              
              return (
                <div
                  key={alien.name}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
                    isActive ? 'opacity-100' : isPast ? 'opacity-0' : 'opacity-0'
                  }`}
                >
                  {/* Actual Alien Image */}
                  <img 
                    src={alien.image} 
                    alt={alien.name}
                    className="w-auto h-[70vh] object-contain opacity-40 animate-pulse"
                    style={{ filter: 'drop-shadow(0 0 50px rgba(74, 222, 128, 0.5))' }}
                  />
                  
                  {/* Alien name */}
                  <div className="absolute bottom-1/4 text-center">
                    <p className="text-6xl font-black text-green-400/30 uppercase tracking-widest">
                      {alien.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 text-center">
            {/* Omnitrix Symbol */}
            <div className="mb-12 flex justify-center">
              <div className="relative w-32 h-32">
                {/* Rotating outer ring */}
                <div 
                  className="absolute inset-0 rounded-full border-4 border-green-500/30" 
                  style={{ 
                    animation: 'spin 3s linear infinite',
                    opacity: progress / 100
                  }}
                ></div>
                
                {/* Pulsing core */}
                <div 
                  className="absolute inset-4 rounded-full bg-green-500/20 border-2 border-green-500"
                  style={{ opacity: progress / 100 }}
                ></div>
                
                {/* Center hourglass */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-12 h-12 text-green-400" style={{ opacity: progress / 100 }}>
                    <path 
                      d="M20 10 L50 50 L20 90 M80 10 L50 50 L80 90" 
                      stroke="currentColor" 
                      strokeWidth="8" 
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="50" cy="50" r="6" fill="currentColor"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Boot Text */}
            <div className="mb-8">
              <p className="text-green-400 font-mono text-xl tracking-wider animate-pulse">
                {progress < 20 && 'INITIALIZING OMNITRIX OS...'}
                {progress >= 20 && progress < 40 && 'SCANNING DNA SAMPLES...'}
                {progress >= 40 && progress < 60 && 'LOADING ALIEN DATABASE...'}
                {progress >= 60 && progress < 80 && 'CALIBRATING HOLOGRAM...'}
                {progress >= 80 && progress < 100 && 'SYNCHRONIZING MASTER CONTROL...'}
                {progress === 100 && 'BOOT SEQUENCE COMPLETE'}
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

            {/* Scroll Indicator (only show if not at 100%) */}
            {progress < 100 && (
              <div className="mt-12 flex flex-col items-center animate-bounce pointer-events-auto">
                <p className="text-green-400/70 text-sm font-mono mb-2">SCROLL TO BOOT</p>
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            )}
          </div>
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
