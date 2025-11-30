import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

const SectionOverlay = ({ activeSection, onClose }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (activeSection) {
      // Transformation Flash
      const tl = anime.timeline({
        easing: 'easeOutExpo',
      });

      tl.add({
        targets: overlayRef.current,
        scale: [0, 1],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInExpo'
      })
      .add({
        targets: contentRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: 200
      });
    }
  }, [activeSection]);

  if (!activeSection) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Green Flash Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-green-500 origin-center rounded-full pointer-events-auto"
        style={{ transform: 'scale(0)' }}
      ></div>

      {/* Content Container */}
      <div 
        ref={contentRef}
        className="relative w-full h-full bg-black/90 text-green-500 p-8 overflow-y-auto pointer-events-auto opacity-0"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 rounded-full border border-green-500 hover:bg-green-500 hover:text-black transition-colors z-50"
        >
          <X size={24} />
        </button>

        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-6xl font-bold mb-8 uppercase tracking-tighter">{activeSection}</h2>
          
          {/* Placeholder Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-green-500/30 rounded-lg bg-green-900/10">
              <h3 className="text-2xl font-bold mb-4">Content for {activeSection}</h3>
              <p className="text-lg text-green-400/80">
                This is where the content for the {activeSection} section will go.
                We will implement specific components for each section shortly.
              </p>
            </div>
            <div className="p-6 border border-green-500/30 rounded-lg bg-green-900/10">
              <h3 className="text-2xl font-bold mb-4">More Details</h3>
              <p className="text-lg text-green-400/80">
                Additional information and interactive elements will be placed here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOverlay;
