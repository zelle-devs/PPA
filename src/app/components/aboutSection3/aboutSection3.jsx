"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

const SLIDES_DATA = [
  {
    id: 1,
    title: "01. The finish.",
    img: "https://picsum.photos/500/700?random=1",
  },
  {
    id: 2,
    title: "02. The colour.",
    img: "https://picsum.photos/500/700?random=2",
  },
  {
    id: 3,
    title: "03. The Cut",
    img: "https://picsum.photos/500/700?random=3",
  },
  {
    id: 4,
    title: "04. The Material",
    img: "https://picsum.photos/500/700?random=4",
  },
  {
    id: 5,
    title: "05. The way it all comes together.",
    img: "https://picsum.photos/500/700?random=5",
  },
];

export default function AboutSection3() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray(".outputs_as3_slide");
      const totalSlides = slides.length;
      const rotations = [-5, -2, 1, 4, -3];

      const mm = gsap.matchMedia();

      // ====================================================
      // 1. DESKTOP VIEW (> 900px): Original Card Deck Drops
      // ====================================================
      mm.add("(min-width: 901px)", () => {
        slides.forEach((slide, i) => {
          gsap.set(slide, {
            opacity: 0,
            y: -60,
            scale: 0.8,
            rotation: rotations[i % rotations.length] * 2,
          });
        });

        gsap.set(".bottom_heading", { opacity: 0, y: 30 });

        const tlDesktop = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${totalSlides * 550}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        slides.forEach((slide, index) => {
          tlDesktop.to(slide, {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: rotations[index % rotations.length],
            duration: 1,
            ease: "back.out(1.4)",
          });
          tlDesktop.to({}, { duration: 0.2 });
        });

        tlDesktop.to(
          ".bottom_heading",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "+=0.2"
        );
      });

      // ====================================================
      // 2. MOBILE VIEW (<= 900px): Spacious Circular Wheel
      // ====================================================
      mm.add("(max-width: 900px)", () => {
        // 60 degrees ka wide angle taaki cards ek doosre ko overlap na karein
        const stepAngle = 60;

        // Initial setup: First card active aur clear, baki angle par placed aur transparent
        slides.forEach((slide, i) => {
          gsap.set(slide, {
            rotation: i * stepAngle,
            opacity: i === 0 ? 1 : 0.15,
            scale: i === 0 ? 1 : 0.85,
            zIndex: totalSlides - i,
          });
        });

        gsap.set(".bottom_heading", { opacity: 0, y: 20 });

        const tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${totalSlides * 650}`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Har scroll step par agla card center me turn karega
        for (let i = 0; i < totalSlides - 1; i++) {
          tlMobile
            .to(slides, {
              rotation: `-=${stepAngle}`,
              duration: 1,
              ease: "power2.inOut",
            })
            .to(
              slides[i],
              {
                opacity: 0.1,
                scale: 0.82,
                duration: 0.5,
                ease: "power1.out",
              },
              "<"
            )
            .to(
              slides[i + 1],
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power1.out",
              },
              "<"
            )
            .to({}, { duration: 0.25 }); // Pause for user focus
        }

        // Final closing text reveal
        tlMobile.to(
          ".bottom_heading",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="about_section_3">
      {/* Top Headings */}
      <div className="header_group">
        <h2 className="main_section_heading_02">NO ORDINARY OUTPUT</h2>
        <h3 className="main_section_heading_03">
          We believe the difference is in the details.
        </h3>
      </div>

      {/* Cards Display */}
      <div className="outputs_as3_slides">
        {SLIDES_DATA.map((item) => (
          <div key={item.id} className="outputs_as3_slide">
            <img src={item.img} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      {/* Bottom Final Line */}
      <h3 className="main_section_heading_03 bottom_heading">
        BECAUSE GOOD ENOUGH NEVER BUILT A GREAT BRAND.
      </h3>
    </div>
  );
}