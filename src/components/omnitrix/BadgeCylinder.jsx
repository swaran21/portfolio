import React from 'react';
import { cn } from '../../lib/utils';

const BadgeCylinder = ({ isActive, children }) => {
  return (
    <div className="relative w-72 h-72 preserve-3d">
      {/* Front face - contains the Dial */}
      <div className="absolute inset-0 z-20">
        {children}
      </div>

      {/* Cylindrical sides (stack of layers) */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 rounded-full border-2 transition-colors duration-300",
            isActive 
              ? "border-green-500/20 bg-green-500/5" 
              : "border-zinc-700/30 bg-zinc-800/10"
          )}
          style={{
            transform: `translateZ(-${i * 2}px)`,
            background: `radial-gradient(circle, rgba(39, 39, 42, ${0.3 - i * 0.03}), rgba(0, 0, 0, ${0.5 - i * 0.05}))`
          }}
        ></div>
      ))}

      {/* Bottom cap */}
      <div 
        className="absolute inset-0 rounded-full bg-zinc-900 border border-zinc-700"
        style={{ transform: 'translateZ(-16px)' }}
      ></div>
    </div>
  );
};

export default BadgeCylinder;
