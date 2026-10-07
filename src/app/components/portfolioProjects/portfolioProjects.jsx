"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "./projectsData";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

/* =========================================
   SLOTS: generated around an ellipse
   (one slot per image, any count)
   x / y = base position of the card's center,
   in % of screen width / height from the center.
   from = which edge it slides in from
   size = card width in px
========================================= */

const SIZES = [290, 260, 320];
const RADIUS_X = 42; // % of screen width from center
const RADIUS_Y = 40; // % of screen height from center

const buildSlots = (count) =>
  Array.from({ length: count }, (_, i) => {
    // start at top-left, go clockwise
    const angle = -Math.PI * 0.75 + (i / count) * Math.PI * 2;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // which edge it slides in from
    const from =
      Math.abs(cos) > Math.abs(sin)
        ? cos < 0
          ? "left"
          : "right"
        : sin < 0
        ? "top"
        : "bottom";

    return {
      x: cos * RADIUS_X,
      y: sin * RADIUS_Y,
      from,
      size: SIZES[i % SIZES.length],
    };
  });

/* =========================================
   CONTROLS
========================================= */

const FINAL_FACTOR = 0.75;
const OUTER_FACTOR = 1.25;
const SCROLL_PER_PROJECT = 250;

const SHADOW_LIFTED = "0px 50px 70px 0px rgba(0, 0, 0, 0.45)";
const SHADOW_RESTING = "0px 12px 24px 0px rgba(0, 0, 0, 0.4)";

export default function PortFolioProjects() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop only: on mobile this whole animation is never created
    mm.add(
      "(min-width: 769px)",
      () => {
        const section = sectionRef.current;
        if (!section) return;

        const groups = gsap.utils.toArray(".ppj_group");
        const texts = gsap.utils.toArray(".ppj_center");
        const bgs = gsap.utils.toArray(".ppj_bg");
        if (!groups.length) return;

        const vw = (n) => (window.innerWidth * n) / 100;
        const vh = (n) => (window.innerHeight * n) / 100;

        const finalX = (slot) => vw(slot.x * FINAL_FACTOR);
        const finalY = (slot) => vh(slot.y * FINAL_FACTOR);
        const outerX = (slot) => vw(slot.x * FINAL_FACTOR * OUTER_FACTOR);
        const outerY = (slot) => vh(slot.y * FINAL_FACTOR * OUTER_FACTOR);

        const edgeX = (slot, card) => () => {
          if (slot.from === "left") return -(window.innerWidth / 2 + card.offsetWidth);
          if (slot.from === "right") return window.innerWidth / 2 + card.offsetWidth;
          return outerX(slot);
        };

        const edgeY = (slot, card) => () => {
          if (slot.from === "top") return -(window.innerHeight / 2 + card.offsetHeight);
          if (slot.from === "bottom") return window.innerHeight / 2 + card.offsetHeight;
          return outerY(slot);
        };

        // Only the first project's text and background start visible
        gsap.set(texts.slice(1), { autoAlpha: 0, y: 30 });
        gsap.set(bgs.slice(1), { autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${groups.length * SCROLL_PER_PROJECT}%`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        groups.forEach((group, p) => {
          const cards = gsap.utils.toArray(group.querySelectorAll(".ppj_card"));
          const slots = buildSlots(cards.length);
          const text = texts[p];
          const bg = bgs[p];
          const isFirst = p === 0;
          const isLast = p === groups.length - 1;
          const startLabel = `project${p}`;

          if (isFirst) {
            tl.addLabel(startLabel, 0);
          } else {
            tl.addLabel(startLabel, `exit${p - 1}+=0.5`);
          }

          /* ---------- BACKGROUND CROSSFADE ---------- */
          // Starts as soon as the previous project begins leaving

          if (!isFirst && bg) {
            tl.to(
              bg,
              { autoAlpha: 1, duration: 1, ease: "none" },
              `exit${p - 1}`
            );
          }

          /* ---------- TEXT IN ---------- */

          if (isFirst) {
            tl.from(
              text.querySelector(".ppj_description"),
              { y: 20, autoAlpha: 0, duration: 0.6, ease: "power2.out" },
              startLabel
            );
          } else {
            tl.to(
              text,
              { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
              startLabel
            );
          }

          /* ---------- PHASE 1: CARDS SLIDE IN ---------- */

          const exitXs = [];
          const exitYs = [];

          cards.forEach((card, i) => {
            const slot = slots[i];
            const startX = edgeX(slot, card);
            const startY = edgeY(slot, card);

            exitXs.push(startX);
            exitYs.push(startY);

            gsap.set(card, { xPercent: -50, yPercent: -50, autoAlpha: 1 });

            tl.fromTo(
              card,
              {
                x: startX,
                y: startY,
                rotation: gsap.utils.random(-30, 30),
                scale: 1.1,
                boxShadow: SHADOW_LIFTED,
              },
              {
                x: () => outerX(slot),
                y: () => outerY(slot),
                rotation: gsap.utils.random(-10, 10),
                scale: 1,
                boxShadow: SHADOW_RESTING,
                duration: 1,
                ease: "power2.out",
              },
              `${startLabel}+=${0.3 + i * 0.12}`
            );
          });

          /* ---------- PHASE 2: CARDS MOVE INWARD ---------- */

          tl.to(cards, {
            x: (i) => finalX(slots[i]),
            y: (i) => finalY(slots[i]),
            duration: 1,
            ease: "power2.inOut",
          });

          tl.to({}, { duration: 0.6 });

          /* ---------- EXIT (not for the last project) ---------- */

          if (!isLast) {
            const exitLabel = `exit${p}`;
            tl.addLabel(exitLabel);

            tl.to(
              cards,
              {
                x: (i) => exitXs[i](),
                y: (i) => exitYs[i](),
                rotation: () => gsap.utils.random(-30, 30),
                scale: 1.1,
                boxShadow: SHADOW_LIFTED,
                duration: 1,
                ease: "power2.in",
                stagger: 0.04,
              },
              exitLabel
            );

            tl.to(
              text,
              { autoAlpha: 0, y: -30, duration: 0.5, ease: "power2.in" },
              exitLabel
            );
          }
        });

        tl.to({}, { duration: 0.5 });
      },
      sectionRef
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="portfolio_projects_section">
      {/* LIQUID GLASS SVG FILTER (invisible, used by CSS) */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="ppj-glass-distortion"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.008"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale="120"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* BACKGROUNDS: one per project, stacked and crossfaded */}
      <div className="ppj_bgs" aria-hidden="true">
        {projects.map((project) => (
          <div
            key={project.id}
            className="ppj_bg"
            style={{ backgroundImage: `url(${project.desk_bg_img })` }}
          />
        ))}
      </div>

      {/* CARDS: one group per project, one card per image */}
      {projects.map((project) => {
        const projectSlots = buildSlots(project.images.length);
        return (
          <div key={project.id} className="ppj_group">
            {project.images.map((src, i) => (
              <div
                key={i}
                className="ppj_card"
                style={{ "--w": `${projectSlots[i].size}px` }}
              >
                <img
                  src={src}
                  alt={`${project.label} project image ${i + 1}`}
                />
              </div>
            ))}
          </div>
        );
      })}

      {/* TEXT: one liquid glass panel per project */}
      {projects.map((project) => (
        <div key={project.id} className="ppj_center">
          <div className="ppj_lable_logo">
            <img
              src={project.logo_img}
              alt={`${project.heading} logo`}
              className="ppj_logo_img"
            />
            <h2 className="ppj_heading">{project.heading}</h2>
          </div>
          <p className="ppj_description">{project.description}</p>
        </div>
      ))}
    </section>
  );
}