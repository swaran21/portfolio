import React, { useRef, useEffect } from 'react';

/**
 * Magnetic — wraps any element so it subtly pulls toward the cursor
 * when hovered nearby, and springs back on leave.
 *
 *   <Magnetic strength={0.35}><button>…</button></Magnetic>
 */
const Magnetic = ({ children, strength = 0.35, className = '' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let active = false;

    const animate = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      if (active || Math.abs(current.x) > 0.1 || Math.abs(current.y) > 0.1) {
        raf = requestAnimationFrame(animate);
      } else {
        el.style.transform = '';
        raf = 0;
      }
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(animate); };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      target.x = (e.clientX - (r.left + r.width / 2)) * strength;
      target.y = (e.clientY - (r.top + r.height / 2)) * strength;
      active = true;
      kick();
    };
    const onLeave = () => {
      target = { x: 0, y: 0 };
      active = false;
      kick();
    };

    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave, { passive: true });
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block', willChange: 'transform' }}>
      {children}
    </span>
  );
};

export default Magnetic;
