"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Equipment() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      const panels = gsap.utils.toArray(".equipment-panel");

      gsap.to(panels, {
        yPercent: -100 * (panels.length - 1),

        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * panels.length}`,

          pin: true,
          scrub: 1,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="equipment">
      <div className="equipment-track">

        <div className="equipment-panel">
          <h2>Fiber Laser</h2>
        </div>

        <div className="equipment-panel">
          <h2>Press Brake</h2>
        </div>

        <div className="equipment-panel">
          <h2>CNC Machining</h2>
        </div>

      </div>
    </section>
  );
}