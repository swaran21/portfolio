import React, { useEffect, useRef } from 'react';

const SpaceBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system
    const particles = [];
    const particleCount = 150;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinklePhase = Math.random() * Math.PI * 2;
      }

      update() {
        this.z -= this.speed;
        if (this.z <= 0) {
          this.reset();
          this.z = 1000;
        }
        this.twinklePhase += this.twinkleSpeed;
      }

      draw() {
        const scale = 1000 / (1000 - this.z);
        const x = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        const y = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        const radius = this.size * scale;

        if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
          return;
        }

        const twinkle = Math.sin(this.twinklePhase) * 0.3 + 0.7;
        const alpha = this.opacity * twinkle * (scale / 2);

        // Green-tinted particles
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
        gradient.addColorStop(0, `rgba(180, 255, 180, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(100, 255, 150, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(0, 255, 0, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId;

    const animate = () => {
      // Create dark space background with green tint
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );
      gradient.addColorStop(0, 'rgba(0, 10, 0, 1)');
      gradient.addColorStop(0.5, 'rgba(0, 5, 0, 1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      style={{ background: '#000000' }}
    />
  );
};

export default SpaceBackground;
