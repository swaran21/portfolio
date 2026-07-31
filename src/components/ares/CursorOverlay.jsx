import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CursorOverlay = ({ theme }) => {
  const cursorRef = useRef(null);
  const coreRef = useRef(null);
  
  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Select all interactive elements to show a "hover" state if desired
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [cursor-pointer]');
    
    const onMouseEnter = () => {
      gsap.to(cursorRef.current, { scale: 1.5, duration: 0.3 });
      gsap.to(coreRef.current, { scale: 0.5, duration: 0.3 });
    };
    
    const onMouseLeave = () => {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
      gsap.to(coreRef.current, { scale: 1, duration: 0.3 });
    };

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
      // Force hide cursor on elements that might have their own cursor style
      el.style.cursor = 'none';
    });

    const onMouseMove = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power3.out'
      });
      gsap.to(coreRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'power3.out'
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = 'auto';
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
        el.style.cursor = '';
      });
    };
  }, []);

  const color = theme === 'blue' ? 'rgba(0, 238, 252, 0.6)' : 'rgba(255, 42, 42, 0.6)';
  const shadow = theme === 'blue' ? '0 0 8px rgba(0, 238, 252, 0.8)' : '0 0 8px rgba(255, 42, 42, 0.8)';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Rings */}
      <div 
        ref={cursorRef} 
        className="absolute top-0 left-0 w-8 h-8 -ml-4 -mt-4 border border-solid rounded-full animate-[spin_4s_linear_infinite]"
        style={{ borderColor: color, boxShadow: shadow }}
      >
        <div className="absolute inset-1 border border-dashed rounded-full animate-[spin_3s_linear_infinite_reverse]" style={{ borderColor: color }}></div>
      </div>
      {/* Inner Core */}
      <div 
        ref={coreRef} 
        className="absolute top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-current rounded-full"
        style={{ color: theme === 'blue' ? '#00eefc' : '#ff2a2a', boxShadow: shadow }}
      ></div>
    </div>
  );
};

export default CursorOverlay;
