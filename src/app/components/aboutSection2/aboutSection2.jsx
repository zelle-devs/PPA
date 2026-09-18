"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

const CARDS_DATA = [
  {
    id: "print",
    title: "PRINT.",
    image: "/images/about/print.png",
    className: "card_row_1",
  },
  {
    id: "pack",
    title: "PACK.",
    image: "/images/about/pack.png",
    className: "card_row_1",
  },
  {
    id: "advertise",
    title: "ADVERTISE.",
    image: "/images/about/adv.png",
    className: "card_row_2",
  },
];

export default function AboutSection2() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".ast_card");

      // Initial States
      gsap.set(cards, {
        xPercent: 160,
        opacity: 0,
        scale: 0.95,
      });

      gsap.set(".meaning_ast_headings", { opacity: 0, y: 30 });
      gsap.set(".purpose_ast_main_heading", { opacity: 0, y: 40 });
      gsap.set(".details_para_ast", { opacity: 0, y: 30 });

      // Master Timeline pinned with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2600",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. First Scroll: Cards slide from extreme right to their grid positions
      tl.to(cards, {
        xPercent: 0,
        opacity: 1,
        scale: 1,
        duration: 1.6,
        stagger: 0.25,
        ease: "power3.out",
      });

      // 2. Second Scroll: Right-hand content reveals cleanly
      tl.to(".meaning_ast_headings", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "+=0.2");

      tl.to(".purpose_ast_main_heading", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      }, "-=0.3");

      tl.to(".details_para_ast", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.4");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about_section_two">
      <div className="about_inner_container">
        {/* Left Side: Staggered 2-row card grid */}
        <div className="ast_cards_grid">
          <div className="ast_cards_row_top">
            {CARDS_DATA.slice(0, 2).map((item) => (
              <div key={item.id} className={`ast_card ${item.className}`}>
                <div
                  className="ast_card_bg"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="ast_card_overlay" />
                <h3 className="ast_card_title">{item.title}</h3>
              </div>
            ))}
          </div>

          <div className="ast_cards_row_bottom">
            {CARDS_DATA.slice(2).map((item) => (
              <div key={item.id} className={`ast_card ${item.className}`}>
                <div
                  className="ast_card_bg"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="ast_card_overlay" />
                <h3 className="ast_card_title">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Narrative text */}
        <div className="ast_text_content">
          <div className="meaning_ast_headings">
            <span className="section_heading_badge">Core Philosophy</span>
            <h4 className="section_heading_03">Three Words, One Purpose</h4>
          </div>

          <h2 className="purpose_ast_main_heading">
            MAKE YOUR BRAND SHOW UP
          </h2>

          <p className="details_para_ast">
            We bring printing, packaging, and advertising together to create
            the tactile, visual assets businesses need to be seen, remembered,
            and taken seriously.
          </p>
        </div>
      </div>
    </section>
  );
}