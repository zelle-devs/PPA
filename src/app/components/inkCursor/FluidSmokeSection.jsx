'use client';

import { useEffect, useRef } from 'react';
import styles from './FluidSmoke.module.css';

export default function FluidSmokeSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    // Load webgl-fluid dynamically to support Next.js SSR
    import('webgl-fluid').then((WebGLFluid) => {
      if (!isMounted || !canvasRef.current) return;

      // PPA Brand Ribbon colors (Cyan, Magenta/Pink, Yellow/Gold)
      const brandColors = [
        { r: 0.0, g: 0.6, b: 1.0 },   // Cyan
        { r: 0.9, g: 0.0, b: 0.4 },   // Magenta
        { r: 1.0, g: 0.74, b: 0.0 },  // Yellow/Gold
      ];

      WebGLFluid.default(canvasRef.current, {
        IMMEDIATE: true,
        TRIGGER: 'hover',
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 2.2,     // Controls how long the smoke trail stays visible
        VELOCITY_DISSIPATION: 0.98,   // Liquid glide persistence
        PRESSURE: 0.8,
        PRESSURE_ITERATIONS: 20,
        CURL: 32,                     // Produces the smoke spirals and eddies
        SPLAT_RADIUS: 0.3,            // Thickness of the ink splash
        SPLAT_FORCE: 6000,
        SHADING: true,
        COLORFUL: false,              // Keep locked to your brand palette
        COLOR: brandColors[0],
        COLOR_UPDATE_SPEED: 10,
        PAUSED: false,
        BACK_COLOR: { r: 0, g: 0, b: 0 },
        TRANSPARENT: true,            // Allows pure white background to show
        BLOOM: true,                  // Soft luminous ink glow
        BLOOM_ITERATIONS: 6,
        BLOOM_RESOLUTION: 256,
        BLOOM_INTENSITY: 0.4,
        BLOOM_THRESHOLD: 0.6,
        SUNRAYS: false,
      });

      // Alternates between Cyan, Pink, and Gold splats while moving
      let colorIdx = 0;
      const onMove = () => {
        colorIdx = (colorIdx + 1) % brandColors.length;
        if (window.fluid && window.fluid.setOptions) {
          window.fluid.setOptions({ COLOR: brandColors[colorIdx] });
        }
      };

      const canvas = canvasRef.current;
      canvas.addEventListener('mousemove', onMove);

      return () => {
        canvas.removeEventListener('mousemove', onMove);
      };
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className={styles.fluidContainer}>
      {/* 1. WebGL Fluid simulation layer */}
      <canvas ref={canvasRef} className={styles.fluidCanvas} />

      {/* 2. Text layer that shifts color wherever ink smoke touches */}
      <div className={styles.textWrapper}>
        <h1 className={styles.heading}>PORTFOLIO</h1>
      </div>
    </section>
  );
}