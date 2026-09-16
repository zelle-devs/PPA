'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './MaskReveal.module.css';

const GLYPHS = {
  P: { d: 'M12.28 34.11L5.08 34.11L5.08 27.81L12.28 27.81Q13.67 27.81 14.53 27.16Q15.38 26.51 15.77 25.38Q16.16 24.24 16.16 22.80Q16.16 21.29 15.77 20.00Q15.38 18.70 14.53 17.92Q13.67 17.14 12.28 17.14L7.76 17.14L7.76 46.39L0 46.39L0 10.84L12.28 10.84Q15.92 10.84 18.54 12.38Q21.17 13.92 22.58 16.60Q24.00 19.29 24.00 22.75Q24.00 26.20 22.58 28.74Q21.17 31.27 18.54 32.69Q15.92 34.11 12.28 34.11Z', w: 24, yMin: 10.84 },
  O: { d: 'M25.98 25.90L25.98 31.57Q25.98 35.35 25.05 38.22Q24.12 41.09 22.40 43.02Q20.68 44.95 18.30 45.91Q15.92 46.88 13.04 46.88Q10.13 46.88 7.74 45.91Q5.35 44.95 3.61 43.02Q1.88 41.09 0.94 38.22Q0 35.35 0 31.57L0 25.90Q0 22.07 0.94 19.15Q1.88 16.24 3.60 14.29Q5.32 12.35 7.70 11.35Q10.08 10.35 12.99 10.35Q15.89 10.35 18.27 11.35Q20.65 12.35 22.38 14.29Q24.10 16.24 25.04 19.15Q25.98 22.07 25.98 25.90M18.19 31.57L18.19 25.85Q18.19 23.39 17.86 21.66Q17.53 19.92 16.87 18.82Q16.21 17.72 15.25 17.21Q14.28 16.70 12.99 16.70Q11.67 16.70 10.69 17.21Q9.72 17.72 9.07 18.82Q8.42 19.92 8.12 21.66Q7.81 23.39 7.81 25.85L7.81 31.57Q7.81 33.96 8.13 35.67Q8.45 37.38 9.11 38.45Q9.77 39.53 10.74 40.04Q11.72 40.55 13.04 40.55Q14.31 40.55 15.27 40.04Q16.24 39.53 16.88 38.45Q17.53 37.38 17.86 35.67Q18.19 33.96 18.19 31.57Z', w: 25.98, yMin: 10.35 },
  R: { d: 'M0 10.84L11.79 10.84Q15.36 10.84 17.92 12.06Q20.48 13.28 21.86 15.67Q23.24 18.07 23.24 21.58Q23.24 24.56 22.46 26.60Q21.68 28.64 20.26 29.98Q18.85 31.32 16.89 32.15L14.45 33.59L5.05 33.59L5.03 27.32L11.60 27.32Q12.92 27.32 13.77 26.71Q14.62 26.10 15.05 24.96Q15.48 23.83 15.48 22.27Q15.48 20.65 15.08 19.51Q14.67 18.36 13.88 17.75Q13.09 17.14 11.79 17.14L7.76 17.14L7.76 46.39L0 46.39L0 10.84M15.97 46.39L9.55 30.59L17.70 30.57L24.27 46.02L24.27 46.39L15.97 46.39Z', w: 24.27, yMin: 10.84 },
  T: { d: 'M16.26 10.84L16.26 46.39L8.52 46.39L8.52 10.84L16.26 10.84M24.98 10.84L24.98 17.14L0 17.14L0 10.84L24.98 10.84Z', w: 24.98, yMin: 10.84 },
  F: { d: 'M7.76 10.84L7.76 46.39L0 46.39L0 10.84L7.76 10.84M18.77 25.78L18.77 32.03L5.74 32.03L5.74 25.78L18.77 25.78M19.97 10.84L19.97 17.14L5.74 17.14L5.74 10.84L19.97 10.84Z', w: 19.97, yMin: 10.84 },
  L: { d: 'M20.07 40.11L20.07 46.39L5.20 46.39L5.20 40.11L20.07 40.11M7.76 10.84L7.76 46.39L0 46.39L0 10.84L7.76 10.84Z', w: 20.07, yMin: 10.84 },
  I: { d: 'M7.74 10.84L7.74 46.39L0 46.39L0 10.84L7.74 10.84Z', w: 7.74, yMin: 10.84 }
};

const WORD = ['P', 'O', 'R', 'T', 'F', 'O', 'L', 'I', 'O'];

export default function MaskRevealHero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animId;
    const rect = container.getBoundingClientRect();

    // 1. Text Canvas
    const textCanvas = document.createElement('canvas');
    const textCtx = textCanvas.getContext('2d');
    const pathCache = {};
    Object.keys(GLYPHS).forEach((k) => {
      pathCache[k] = new Path2D(GLYPHS[k].d);
    });

    const updateTextTexture = (w, h) => {
      textCanvas.width = w;
      textCanvas.height = h;
      textCtx.fillStyle = '#ffffff';
      textCtx.fillRect(0, 0, w, h);

      const letterSpacing = 2.5;
      const totalRawWidth = WORD.reduce((acc, char) => acc + GLYPHS[char].w, 0) + (WORD.length - 1) * letterSpacing;
      const scaleX = (w * 0.79) / totalRawWidth;
      const scaleY = scaleX * 1.2;

      textCtx.save();
      textCtx.translate((w - totalRawWidth * scaleX) / 2, h / 2 - (35.5 * scaleY) / 2);
      textCtx.scale(scaleX, scaleY);
      textCtx.fillStyle = '#000000';

      let currentX = 0;
      for (const char of WORD) {
        textCtx.save();
        textCtx.translate(currentX, -GLYPHS[char].yMin);
        textCtx.fill(pathCache[char]);
        textCtx.restore();
        currentX += GLYPHS[char].w + letterSpacing;
      }
      textCtx.restore();
    };
    updateTextTexture(rect.width, rect.height);

    // 2. Persistent Fluid Buffer Canvas
    const fluidCanvas = document.createElement('canvas');
    const fluidCtx = fluidCanvas.getContext('2d');
    fluidCanvas.width = rect.width;
    fluidCanvas.height = rect.height;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(rect.width, rect.height);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const textTexture = new THREE.CanvasTexture(textCanvas);
    const fluidTexture = new THREE.CanvasTexture(fluidCanvas);
    fluidTexture.minFilter = THREE.LinearFilter;
    fluidTexture.magFilter = THREE.LinearFilter;

    // Crystal Clear Water Shader (Procedural Distortion + Ultra-sharp cut)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTextTexture: { value: textTexture },
        uFluidTexture: { value: fluidTexture },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(rect.width, rect.height) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTextTexture;
        uniform sampler2D uFluidTexture;
        uniform float uTime;
        uniform vec2 uResolution;
        varying vec2 vUv;

        // Simplex/Perlin Noise for liquid turbulence
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                              0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                             -0.577350269189626,  // -1.0 + 2.0 * C.x
                              0.024390243902439); // 1.0 / 41.0
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec4 fluid = texture2D(uFluidTexture, vUv);
          
          // Only process where water exists
          if (fluid.a < 0.01) {
            vec4 textMask = texture2D(uTextTexture, vUv);
            gl_FragColor = vec4(textMask.rgb, 1.0);
            return;
          }

          // Liquid edge ripple calculation
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
          float noise = snoise(vUv * aspect * 14.0 + vec2(uTime * 1.5, -uTime * 1.2)) * 0.22;
          noise += snoise(vUv * aspect * 32.0 - vec2(uTime * 2.0)) * 0.10;

          // Pure sharp threshold (No blur!)
          float edgeValue = fluid.r + noise * fluid.a;
          float reveal = smoothstep(0.38, 0.42, edgeValue);

          // Refraction offset along liquid normals
          vec2 offset = vec2(
            snoise(vUv * 20.0 + uTime),
            snoise(vUv * 20.0 - uTime)
          ) * 0.02 * reveal;

          vec4 textMask = texture2D(uTextTexture, vUv + offset);

          // Alpha cutout for video reveal
          float alpha = 1.0 - reveal;

          // Thin liquid edge refraction highlight
          float edgeHighlight = smoothstep(0.36, 0.40, edgeValue) - smoothstep(0.42, 0.46, edgeValue);
          vec3 finalColor = mix(textMask.rgb, vec3(0.9, 0.95, 1.0), edgeHighlight * 0.4);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    // 4. Liquid Splat Particles
    const mouse = { x: -600, y: -600, prevX: -600, prevY: -600, isInside: false };
    const splats = [];
    let smoothSpeed = 0;
    let time = 0;

    const onMouseMove = (e) => {
      const b = container.getBoundingClientRect();
      mouse.x = e.clientX - b.left;
      mouse.y = e.clientY - b.top;
      mouse.isInside = true;
    };

    const onMouseLeave = () => {
      mouse.isInside = false;
      mouse.x = -600;
      mouse.y = -600;
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    const onResize = () => {
      const b = container.getBoundingClientRect();
      renderer.setSize(b.width, b.height);
      updateTextTexture(b.width, b.height);
      fluidCanvas.width = b.width;
      fluidCanvas.height = b.height;
      textTexture.needsUpdate = true;
      material.uniforms.uResolution.value.set(b.width, b.height);
    };
    window.addEventListener('resize', onResize);

    const render = () => {
      time += 0.03;
      material.uniforms.uTime.value = time;

      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      const speed = Math.hypot(dx, dy);
      smoothSpeed += (speed - smoothSpeed) * 0.25;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      const speedNorm = Math.min(smoothSpeed / 14, 3.5);
      const moveAngle = Math.atan2(dy, dx);

      // Spawn liquid sheet segments
      if (mouse.isInside && mouse.x > 0 && mouse.y > 0) {
        splats.push({
          x: mouse.x,
          y: mouse.y,
          vx: Math.cos(moveAngle) * (speedNorm * 1.5),
          vy: Math.sin(moveAngle) * (speedNorm * 1.5),
          radius: 10 + speedNorm * 8,  // Base radius aur speed multiplier dono kam
length: 25 + speedNorm * 25,
          angle: moveAngle,
          alpha: 1.0,
          decay: 0.006 // ~1.5 sec delay
        });

        // Spray tendrils on quick move
        if (speedNorm > 1.2) {
          const spread = (Math.random() - 0.5) * 1.8;
          splats.push({
            x: mouse.x,
            y: mouse.y,
            vx: Math.cos(moveAngle + spread) * (speedNorm * 3.0),
            vy: Math.sin(moveAngle + spread) * (speedNorm * 3.0),
            radius: 8 + Math.random() * 8,
            length: 15,
            angle: moveAngle + spread,
            alpha: 1.0,
            decay: 0.022
          });
        }
      }

      // Draw onto fluid canvas
      fluidCtx.clearRect(0, 0, fluidCanvas.width, fluidCanvas.height);

      for (let i = splats.length - 1; i >= 0; i--) {
        const s = splats[i];
        s.alpha -= s.decay;
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.94;
        s.vy *= 0.94;

        if (s.alpha <= 0) {
          splats.splice(i, 1);
          continue;
        }

        fluidCtx.save();
        fluidCtx.globalAlpha = s.alpha;
        fluidCtx.translate(s.x, s.y);
        fluidCtx.rotate(s.angle);

        // Solid core so shader gets crisp sharp density
        fluidCtx.fillStyle = '#ff0000';
        fluidCtx.beginPath();
        // Liquid splash tongue geometry
        fluidCtx.ellipse(s.length * 0.4, 0, s.length * 0.8, s.radius, 0, 0, Math.PI * 2);
        fluidCtx.fill();
        fluidCtx.restore();
      }

      fluidTexture.needsUpdate = true;
      renderer.render(scene, camera);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.container}>
      <video
        className={styles.videoBg}
        autoPlay
        loop
        muted
        playsInline
        src="/hero-bg.mp4"
      />
      <canvas ref={canvasRef} className={styles.maskCanvas} />
    </section>
  );
}