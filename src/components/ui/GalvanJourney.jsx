import React, { useEffect, useRef, useState } from 'react';
import AnimatedRiver from './AnimatedRiver';
import spaceImg from '../../images/space_starfield.png';
import planetImg from '../../images/galvanprimeplanet.png';
import towerImg from '../../images/asmuthtower.png';

const GalvanJourney = ({ onJourneyComplete }) => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
      const scrolled = containerRef.current.scrollTop;
      const progress = Math.min(100, (scrolled / scrollHeight) * 100);
      
      setScrollProgress(progress);

      // Complete journey at 100%
      if (progress >= 100) {
        setTimeout(() => {
          onJourneyComplete();
        }, 1000);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [onJourneyComplete]);

  // Calculate opacity and scale for each scene based on scroll progress
  const getSceneState = (start, end) => {
    if (scrollProgress < start) return { opacity: 0, scale: 1.2 };
    if (scrollProgress > end) return { opacity: 0, scale: 0.8 };
    
    const progress = (scrollProgress - start) / (end - start);
    const fadeInEnd = 0.3;
    const fadeOutStart = 0.7;
    
    let opacity = 1;
    if (progress < fadeInEnd) opacity = progress / fadeInEnd;
    if (progress > fadeOutStart) opacity = 1 - ((progress - fadeOutStart) / (1 - fadeOutStart));
    
    const scale = 1.2 - (progress * 0.4); // Zoom in effect
    
    return { opacity, scale };
  };

  const spaceState = getSceneState(0, 25);
  const planetState = getSceneState(20, 50);
  const riversState = getSceneState(45, 75);
  const towerState = getSceneState(70, 100);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-black overflow-y-scroll scrollbar-hide"
      style={{ height: '100vh' }}
    >
      {/* Scrollable content - 10x viewport height */}
      <div style={{ height: '1000vh' }}>
        
        {/* Fixed scenes container */}
        <div className="fixed inset-0 overflow-hidden">
          
          {/* Scene 1: Deep Space */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-all duration-1000"
            style={{ 
              opacity: spaceState.opacity,
              transform: `scale(${spaceState.scale})`
            }}
          >
            <img 
              src={spaceImg} 
              alt="Deep Space"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1/3 text-center pointer-events-none">
              <p className="text-green-400 text-3xl font-bold tracking-widest animate-pulse">
                JOURNEYING TO GALVAN PRIME
              </p>
            </div>
          </div>

          {/* Scene 2: Galvan Prime Planet */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-all duration-1000"
            style={{ 
              opacity: planetState.opacity,
              transform: `scale(${planetState.scale})`
            }}
          >
            <img 
              src={planetImg} 
              alt="Galvan Prime"
              className="w-auto h-[90vh] object-contain"
            />
            <div className="absolute bottom-1/4 text-center pointer-events-none">
              <p className="text-green-400 text-2xl font-bold tracking-wider">
                APPROACHING GALVAN PRIME
              </p>
            </div>
          </div>

          {/* Scene 3: Animated Green Rivers */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-all duration-1000"
            style={{ 
              opacity: riversState.opacity,
              transform: `scale(${riversState.scale})`
            }}
          >
            <AnimatedRiver />
            <div className="absolute bottom-1/4 text-center pointer-events-none z-10">
              <p className="text-green-400 text-2xl font-bold tracking-wider drop-shadow-[0_0_10px_rgba(0,255,136,0.8)]">
                FLYING OVER THE EMERALD RIVERS
              </p>
            </div>
          </div>

          {/* Scene 4: Asmuth's Tower */}
          <div 
            className="absolute inset-0 flex items-center justify-center transition-all duration-1000"
            style={{ 
              opacity: towerState.opacity,
              transform: `scale(${towerState.scale})`
            }}
          >
            <img 
              src={towerImg} 
              alt="Asmuth's Tower"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1/4 text-center pointer-events-none">
              <p className="text-green-400 text-2xl font-bold tracking-wider">
                ENTERING ASMUTH'S TOWER
              </p>
            </div>
          </div>

          {/* Progress indicator */}
          {scrollProgress < 100 && (
            <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
              <div className="flex flex-col items-center">
                <p className="text-green-400 text-sm font-mono mb-2">SCROLL TO CONTINUE</p>
                <svg className="w-6 h-6 text-green-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <div className="mt-4 w-64 h-2 bg-green-900/30 rounded-full">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${scrollProgress}%` }}
                  ></div>
                </div>
                <p className="text-green-500 text-xs font-mono mt-1">{Math.round(scrollProgress)}%</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
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

export default GalvanJourney;
