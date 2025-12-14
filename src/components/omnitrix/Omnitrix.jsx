import React, { useState, useEffect, useRef } from 'react';
import Dial from './Dial';
import Hologram from './Hologram'; // Import Hologram
import anime from 'animejs/lib/anime.es.js';
import { cn } from '../../lib/utils';
import useSound from '../../hooks/useSound';
import { Code, User, Brain, Mail, FileText } from 'lucide-react'; // Import icons here

const Omnitrix = ({ onTransform }) => {
  const [isActive, setIsActive] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [masterControl, setMasterControl] = useState(false);
  
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const lastScrollTimeRef = useRef(0); // For scroll debounce
  
  const omnitrixRef = useRef(null);
  const containerRef = useRef(null);
  const { playSound } = useSound();

  const sections = [
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Brain },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'resume', label: 'Resume', icon: FileText },
  ];

  const handleMouseEnter = () => {
    if (!isTransforming) {
      setIsActive(true);
      playSound('hover');
      anime({
        targets: omnitrixRef.current,
        scale: 1.1,
        duration: 400,
        easing: 'easeOutElastic(1, .8)'
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isTransforming) {
      setIsActive(false);
      anime({
        targets: omnitrixRef.current,
        scale: 1,
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  };

  // Replace MouseMove with Wheel event for scrolling
  const handleWheel = (e) => {
    if (!isActive || isTransforming) return;

    const now = Date.now();
    // Debounce scroll to avoid rapid spinning
    if (now - lastScrollTimeRef.current < 250) return;
    lastScrollTimeRef.current = now;

    // Determine direction
    const direction = e.deltaY > 0 ? 1 : -1;
    
    // Update index (cycling)
    setActiveIndex((prev) => {
      let next = prev + direction;
      if (next >= sections.length) next = 0;
      if (next < 0) next = sections.length - 1;
      return next;
    });

    playSound('tick');
  };

  const handleClick = () => {
    // Master Control Logic
    const now = Date.now();
    if (now - lastClickTimeRef.current < 500) {
        clickCountRef.current += 1;
    } else {
        clickCountRef.current = 1;
    }
    lastClickTimeRef.current = now;

    if (clickCountRef.current >= 5 && !masterControl) {
        setMasterControl(true);
        playSound('transform'); // Play sound to indicate unlock
        // Visual cue for Master Control
        anime({
            targets: omnitrixRef.current,
            rotate: [0, 360, 0],
            duration: 1000,
            easing: 'easeInOutSine'
        });
        return;
    }

    if (isActive && !isTransforming) {
        setIsTransforming(true);
        playSound('transform');
        
        // Slam down animation
        anime({
            targets: omnitrixRef.current,
            scale: [1.1, 0.8],
            duration: 200,
            easing: 'easeInBack',
            complete: () => {
                onTransform(sections[activeIndex].id);
                // Reset after delay
                setTimeout(() => {
                    setIsTransforming(false);
                    setIsActive(false);
                }, 1000);
            }
        });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center justify-center w-64 h-64 md:w-96 md:h-96"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel} // Attach scroll handler
    >
      <div 
        ref={omnitrixRef}
        className={cn(
          "relative w-48 h-48 md:w-64 md:h-64 bg-gray-900 rounded-full border-4 border-gray-700 shadow-[0_0_50px_rgba(0,255,0,0.2)] transition-colors duration-500 z-20 cursor-pointer",
          isActive ? "shadow-[0_0_80px_rgba(0,255,0,0.4)] border-green-900" : "",
          masterControl ? "shadow-[0_0_100px_rgba(0,255,255,0.6)] border-cyan-500" : ""
        )}
        onClick={handleClick}
      >
        <Dial isActive={isActive} isTransforming={isTransforming} activeIndex={activeIndex} masterControl={masterControl} />
      </div>
      
      {/* Replaced NavigationRing with Hologram */}
      <Hologram 
        icon={sections[activeIndex].icon} 
        label={sections[activeIndex].label} 
        isActive={isActive && !isTransforming} 
        masterControl={masterControl}
      />
      
      {/* Base Strap (Visual only) */}
      <div className="absolute w-full h-32 bg-gray-800 -z-10 transform -rotate-45 rounded-xl opacity-80"></div>
      <div className="absolute w-full h-32 bg-gray-800 -z-10 transform rotate-45 rounded-xl opacity-80"></div>
    </div>
  );
};

export default Omnitrix;
