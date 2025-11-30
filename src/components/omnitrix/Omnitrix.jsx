import React, { useState, useEffect, useRef } from 'react';
import Dial from './Dial';
import NavigationRing from './NavigationRing';
import anime from 'animejs/lib/anime.es.js';
import { cn } from '../../lib/utils';
import useSound from '../../hooks/useSound';

const Omnitrix = ({ onTransform }) => {
  const [isActive, setIsActive] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [masterControl, setMasterControl] = useState(false);
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  
  const omnitrixRef = useRef(null);
  const containerRef = useRef(null);
  const { playSound } = useSound();

  const sections = [
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
    { id: 'resume', label: 'Resume' },
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

  const handleMouseMove = (e) => {
    if (!isActive || isTransforming || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate angle from center to mouse
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    
    // Atan2 returns -PI to PI. We want 0 to 360 starting from top.
    // Standard atan2 is 0 at right (3 o'clock).
    // We want 0 at top (12 o'clock).
    let angle = Math.atan2(y, x) * (180 / Math.PI);
    
    // Adjust so 0 is at top (subtract -90 or add 90)
    angle = angle + 90;
    
    // Normalize to 0-360
    if (angle < 0) angle += 360;

    // Calculate index based on 5 sections (72 degrees each)
    // We want the "top" section to be centered around 0 degrees.
    // So section 0 is -36 to 36 degrees (or 324 to 36).
    // Let's shift angle by half a segment (36 degrees) so 0 starts at 0.
    const segmentAngle = 360 / sections.length;
    const index = Math.floor(((angle + segmentAngle / 2) % 360) / segmentAngle);
    
    if (index !== activeIndex) {
      setActiveIndex(index);
      playSound('tick');
    }
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
      onMouseMove={handleMouseMove}
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
      
      <NavigationRing isActive={isActive} activeIndex={activeIndex} masterControl={masterControl} />
      
      {/* Base Strap (Visual only) */}
      <div className="absolute w-full h-32 bg-gray-800 -z-10 transform -rotate-45 rounded-xl opacity-80"></div>
      <div className="absolute w-full h-32 bg-gray-800 -z-10 transform rotate-45 rounded-xl opacity-80"></div>
    </div>
  );
};

export default Omnitrix;
