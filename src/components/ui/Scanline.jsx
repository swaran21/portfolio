import React from 'react';

const Scanline = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[60] opacity-10 mix-blend-overlay">
      <div className="w-full h-full animate-scanline bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]"></div>
    </div>
  );
};

export default Scanline;
