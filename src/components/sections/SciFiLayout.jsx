import React from 'react';
import { cn } from '../../lib/utils';
import Scanline from '../ui/Scanline';

const SciFiLayout = ({ children, title, className }) => {
  return (
    <div className={cn("relative w-full h-full flex flex-col overflow-hidden", className)}>
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
            backgroundImage: `
                linear-gradient(to right, rgba(74, 222, 128, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(74, 222, 128, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-green-500 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-green-500 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-green-500 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-green-500 rounded-br-lg"></div>

      {/* Header */}
      <div className="relative z-10 p-8 border-b border-green-500/30 flex items-center justify-between bg-green-900/10 backdrop-blur-sm">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-green-500 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
            {title}
        </h2>
        <div className="flex flex-col items-end text-green-400/60 text-xs font-mono">
            <span>SYS.VER.10.0</span>
            <span>SECURE CONNECTION</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 p-8 overflow-y-auto scrollbar-hide">
        {children}
      </div>

      {/* Decorative Footer Line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
      
      {/* Scanlines Overlay */}
      <Scanline />
    </div>
  );
};

export default SciFiLayout;
