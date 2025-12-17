import React from 'react';
import { cn } from '../../lib/utils';

const BadgeCylinder = ({ children, isActive }) => {
  // We create a "stack" of rings to simulate a solid 3D metal object.
  // This is clearer and smoother than a polygon strip for a pure cylinder.
  const layers = Array.from({ length: 16 }); // 16 layers for ~16px thickness

  return (
    <div className="relative w-72 h-72 preserve-3d">
      
      {/* 1. The Volumetric Side Walls (simulated by stacking layers) */}
      <div className="absolute inset-0 preserve-3d pointer-events-none">
        {layers.map((_, i) => (
          <div 
            key={i}
            className="absolute inset-0 rounded-full border-[2px] border-[#27272a]"
            style={{
                // Darker metal color for the sides
                background: '#3f3f46', 
                transform: `translateZ(-${i * 1.5}px)`, // Stack backwards
                boxShadow: i === layers.length - 1 ? '0 30px 60px rgba(0,0,0,0.8)' : 'none' // Shadow only on bottom layer
            }}
          />
        ))}
      </div>

      {/* 2. The Back Plate (Bottom of the device) */}
      <div 
        className="absolute inset-0 rounded-full bg-[#18181b] flex items-center justify-center"
        style={{ transform: `translateZ(-${layers.length * 1.5}px) rotateY(180deg)` }}
      >
        <div className="w-1/2 h-1/2 rounded-full border-4 border-[#27272a] opacity-50"></div>
      </div>

      {/* 3. The Front Face (Container for the Dial) */}
      {/* This sits at Z=0, on top of the stack */}
      <div className="absolute inset-0 preserve-3d z-20">
         {children}
      </div>

    </div>
  );
};

export default BadgeCylinder;
