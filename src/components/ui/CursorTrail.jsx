import React, { useEffect, useState } from 'react';

const CursorTrail = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const particle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };

      setParticles(prev => [...prev.slice(-20), particle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Remove old particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.filter(p => Date.now() - p.id < 1000));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {particles.map((particle, index) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-green-400"
          style={{
            left: particle.x,
            top: particle.y,
            transform: 'translate(-50%, -50%)',
            opacity: 1 - (index / particles.length),
            boxShadow: '0 0 10px rgba(74, 222, 128, 0.8)',
            animation: 'particleFade 1s ease-out forwards'
          }}
        />
      ))}

      <style>{`
        @keyframes particleFade {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CursorTrail;
