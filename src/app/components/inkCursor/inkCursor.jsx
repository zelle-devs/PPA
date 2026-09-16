'use client';

import { useEffect, useRef } from 'react';
import styles from './InkCursor.module.css';

export default function InkSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const mouse = { x: -300, y: -300, isHovered: false };

    // Ink drops with variable lag to simulate viscosity
    const drops = [
      { x: -300, y: -300, baseR: 45, speed: 0.18, points: 10, phase: 0 },
      { x: -300, y: -300, baseR: 30, speed: 0.10, points: 8, phase: 2 },
      { x: -300, y: -300, baseR: 20, speed: 0.05, points: 7, phase: 4 },
      { x: -300, y: -300, baseR: 12, speed: 0.03, points: 6, phase: 5 }, // tiny trailing ink droplet
    ];

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const onMouseLeave = () => {
      mouse.isHovered = false;
      mouse.x = -300;
      mouse.y = -300;
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    let time = 0;

    // Organic deformed polygon draw karne ka helper
    const drawOrganicDrop = (drop) => {
      const angleStep = (Math.PI * 2) / drop.points;
      const coords = [];

      for (let i = 0; i < drop.points; i++) {
        const angle = i * angleStep;
        // Harmonic noise simulation for uneven organic edges
        const noise =
          Math.sin(angle * 3 + time * 2 + drop.phase) * 0.2 +
          Math.cos(angle * 2 - time * 1.5) * 0.15;
        const r = drop.baseR * (1 + noise);

        coords.push({
          x: drop.x + Math.cos(angle) * r,
          y: drop.y + Math.sin(angle) * r,
        });
      }

      // Draw smooth closed curved shape
      ctx.beginPath();
      ctx.moveTo(
        (coords[0].x + coords[drop.points - 1].x) / 2,
        (coords[0].y + coords[drop.points - 1].y) / 2
      );

      for (let i = 0; i < drop.points; i++) {
        const next = coords[(i + 1) % drop.points];
        const midX = (coords[i].x + next.x) / 2;
        const midY = (coords[i].y + next.y) / 2;
        ctx.quadraticCurveTo(coords[i].x, coords[i].y, midX, midY);
      }

      ctx.closePath();
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.03;

      if (mouse.isHovered || drops[3].x > -100) {
        drops.forEach((d) => {
          d.x += (mouse.x - d.x) * d.speed;
          d.y += (mouse.y - d.y) * d.speed;
        });

        ctx.save();
        ctx.filter = 'blur(14px)';
        ctx.fillStyle = '#ffffff';

        // Saare distorted drops draw hote hain aur canvas ka contrast filter inhein ink droplet bana deta hai
        drops.forEach((d) => drawOrganicDrop(d));

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.inkSection}>
      <canvas ref={canvasRef} className={styles.canvasLayer} />

      <div className={styles.contentLayer}>
        <h2 className={styles.heading}>LIQUID INK</h2>
        <p className={styles.subheading}>
          Organic ink drop cursor with inversion
        </p>
      </div>
    </section>
  );
}