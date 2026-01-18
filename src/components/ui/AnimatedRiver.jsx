import React, { useEffect, useRef } from 'react';

const AnimatedRiver = () => {
  const canvasRef = useRef(null);
  const timeRef = useRef(0);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const drawRiver = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const riverWidth = canvas.width * 0.6;
      const centerX = canvas.width / 2;

      ctx.beginPath();
      for (let y = 0; y <= canvas.height; y += 10) {
        const wave =
          Math.sin((y * 0.02) + timeRef.current) * 40 +
          Math.sin((y * 0.01) + timeRef.current * 0.5) * 20;

        const x = centerX + wave;
        if (y === 0) {
          ctx.moveTo(x - riverWidth / 2, y);
        } else {
          ctx.lineTo(x - riverWidth / 2, y);
        }
      }

      for (let y = canvas.height; y >= 0; y -= 10) {
        const wave =
          Math.sin((y * 0.02) + timeRef.current) * 40 +
          Math.sin((y * 0.01) + timeRef.current * 0.5) * 20;

        const x = centerX + wave;
        ctx.lineTo(x + riverWidth / 2, y);
      }

      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#00ff88');
      gradient.addColorStop(0.5, '#00aa55');
      gradient.addColorStop(1, '#003322');

      ctx.fillStyle = gradient;
      ctx.fill();

      timeRef.current += 0.03;
      animationRef.current = requestAnimationFrame(drawRiver);
    };

    drawRiver();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

export default AnimatedRiver;
