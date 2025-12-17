import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { cn } from '../../lib/utils';
import { X } from 'lucide-react';

import SciFiLayout from './SciFiLayout';

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
        scale: [0, 1.5], // Scale up large enough to cover screen
        opacity: [0, 1],
        duration: 400,
        easing: 'easeInExpo'
      })
      .add({
        targets: contentRef.current,
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 600,
        delay: 100 // Overlap slightly
      });
    }
  }, [activeSection]);

  if (!activeSection) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* 
         Green Flash Overlay 
         (The "Transformation" burst)
      */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-green-500 origin-center rounded-full pointer-events-none mix-blend-screen"
        style={{ transform: 'scale(0)' }}
      ></div>

      {/* Content Container (Full Screen Dialog) */}
      <div 
        ref={contentRef}
        className="relative w-full h-full bg-black text-green-500 opacity-0"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-green-500 hover:bg-green-500 hover:text-black transition-colors z-[60] cursor-pointer"
        >
          <X size={24} />
        </button>

        <SciFiLayout title={activeSection}>
           {/* Placeholder Content for now, passing children */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                <div className="p-6 border border-green-500/30 rounded-lg bg-green-900/10 backdrop-blur-md">
                    <h3 className="text-2xl font-bold mb-4 font-mono uppercase text-green-400">
                      // FILE: {activeSection}_DATA
                    </h3>
                    <p className="text-lg text-green-300/80 font-mono leading-relaxed">
                        Accessing Plumber Database... <br/>
                        Retrieved records for <span className="text-green-100 font-bold">{activeSection}</span>.
                    </p>
                    <div className="mt-4 h-32 bg-green-500/5 animate-pulse rounded border border-green-500/20"></div>
                </div>

                <div className="p-6 border border-green-500/30 rounded-lg bg-green-900/10 backdrop-blur-md">
                    <h3 className="text-2xl font-bold mb-4 font-mono uppercase text-green-400">
                      // STATUS: CLASSIFIED
                    </h3>
                    <p className="text-lg text-green-300/80 font-mono leading-relaxed">
                        Level 5 Clearance Required. <br/>
                        Decrypting additional modules...
                    </p>
                </div>
            </div>
        </SciFiLayout>
      </div>
    </div>
  );
};

export default SectionOverlay;
