import React, { useState, useEffect, useRef } from 'react';
import Dial from './Dial';
import Hologram from './Hologram';
import BadgeCylinder from './BadgeCylinder';
import anime from 'animejs/lib/anime.es.js';
import useSound from '../../hooks/useSound';
import { Code, User, Brain, Mail, FileText } from 'lucide-react';

const Omnitrix = ({ onTransform }) => {
  const [isActive, setIsActive] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [masterControl, setMasterControl] = useState(false);
  
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  
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

  // Initial Prop Tilt
  useEffect(() => {
    anime.set(omnitrixRef.current, {
        rotateX: 20,
        rotateY: -20,
        scale: 0.9
    });
  }, []);

  const handleMouseEnter = () => {
    if (!isTransforming) {
      setIsActive(true);
      playSound('hover');
      anime({
        targets: omnitrixRef.current,
        scale: 1,
        // Perfection: Perpendicular to the viewer
        rotateX: 0,
        rotateY: 0,
        duration: 800,
        easing: 'easeOutElastic(1, .8)'
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isTransforming) {
      setIsActive(false);
      anime({
        targets: omnitrixRef.current,
        scale: 0.9,
        rotateX: 20,
        rotateY: -20,
        duration: 600,
        easing: 'easeOutQuad'
      });
    }
  };

  const handleWheel = (e) => {
    if (!isActive || isTransforming) return;

    const now = Date.now();
    if (now - lastScrollTimeRef.current < 250) return;
    lastScrollTimeRef.current = now;

    const direction = e.deltaY > 0 ? 1 : -1;
    
    setActiveIndex((prev) => {
      let next = prev + direction;
      if (next >= sections.length) next = 0;
      if (next < 0) next = sections.length - 1;
      return next;
    });

    playSound('tick');
  };

  const handleClick = () => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 500) {
        clickCountRef.current += 1;
    } else {
        clickCountRef.current = 1;
    }
    lastClickTimeRef.current = now;

    if (clickCountRef.current >= 5 && !masterControl) {
        setMasterControl(true);
        playSound('transform');
        anime({
            targets: omnitrixRef.current,
            rotateZ: [0, 360, 0],
            duration: 1000,
            easing: 'easeInOutSine'
        });
        return;
    }

    if (isActive && !isTransforming) {
        setIsTransforming(true);
        playSound('transform');
        
        anime({
            targets: omnitrixRef.current,
            scale: [1, 0.8],
            duration: 200,
            easing: 'easeInBack',
            complete: () => {
                onTransform(sections[activeIndex].id);
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
      className="relative flex items-center justify-center w-full h-full perspective-[1500px] overflow-visible"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
    >
      <div 
        ref={omnitrixRef}
        className="relative preserve-3d cursor-pointer"
        onClick={handleClick}
      >
        <BadgeCylinder isActive={isActive}>
            <Dial isActive={isActive} isTransforming={isTransforming} activeIndex={activeIndex} masterControl={masterControl} />
        </BadgeCylinder>
        
        {/* Hologram - Outside Cylinder to float independent of stacks, but inside tilt container */}
        <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(20px)' }}>
             <Hologram 
                icon={sections[activeIndex].icon} 
                label={sections[activeIndex].label} 
                isActive={isActive && !isTransforming} 
                masterControl={masterControl}
            />
        </div>
      </div>
    </div>
  );
};

export default Omnitrix;
