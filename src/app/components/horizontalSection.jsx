"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css"

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;

      const distance =
        track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -distance,

        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,

          start: "top top",
          end: `+=${distance}`,

          pin: true,
          scrub: 1,

          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="horizontal-section">
      <div ref={trackRef} className="horizontal-track">

        <div className="panel">01</div>
        <div className="panel">02</div>
        <div className="panel">03</div>
        <div className="panel">04</div>

      </div>
    </section>
  );
}