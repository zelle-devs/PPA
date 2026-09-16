"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ data }) {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const section = heroRef.current;

    if (!section || !data) return;

    const ctx = gsap.context(() => {
      /* =====================================================
         INTRO ANIMATION
      ===================================================== */

      const intro = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      /* EYEBROW */

      intro.from(".hero-eyebrow", {
        yPercent: 100,
        duration: 0.7,
      });

      /* MAIN HEADING */

      intro.from(
        ".hero-line-inner",
        {
          yPercent: 110,
          duration: 1,
          stagger: 0.12,
        },
        "-=0.25"
      );

      /* REAL STATEMENT */

      intro.from(
        ".hero-real-inner",
        {
          yPercent: 110,
          duration: 1.15,
          ease: "power4.out",
        },
        "-=0.55"
      );

      /* IMAGE */

      intro.from(
        ".hero-image",
        {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.4,
          ease: "power4.inOut",
        },
        "-=0.7"
      );

      /* IMAGE ZOOM */

      intro.from(
        ".hero-image img",
        {
          scale: 1.15,
          duration: 1.5,
          ease: "power3.out",
        },
        "<"
      );


      /* =====================================================
         SCROLL SEQUENCE
      ===================================================== */

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,

          start: "top top",

          end: "+=900",

          pin: true,

          scrub: 1,

          anticipatePin: 1,

          invalidateOnRefresh: true,
        },
      });


      /* =====================================================
         HEADING
      ===================================================== */

      scrollTl.to(
        ".hero-heading",
        {
          y: "-18vh",

          scale: 0.88,

          duration: 1,

          ease: "none",
        },
        0
      );


      /* =====================================================
         IMAGE CONTAINER
      ===================================================== */

      scrollTl.to(
        ".hero-image",
        {
          y: "8vh",

          scale: 1.08,

          duration: 1,

          ease: "none",
        },
        0
      );


      /* =====================================================
         IMAGE ITSELF
      ===================================================== */

      scrollTl.to(
        ".hero-image img",
        {
          scale: 1.02,

          duration: 1,

          ease: "none",
        },
        0
      );


      /* =====================================================
         EYEBROW
      ===================================================== */

      scrollTl.to(
        ".hero-eyebrow",
        {
          opacity: 0,

          y: -30,

          duration: 0.5,

          ease: "none",
        },
        0
      );


      /* =====================================================
         REAL STATEMENT
      ===================================================== */

      scrollTl.to(
        ".hero-real",
        {
          y: "-10vh",

          duration: 1,

          ease: "none",
        },
        0
      );


      /* =====================================================
         BOTTOM CONTENT
      ===================================================== */

      scrollTl.to(
        ".hero-bottom",
        {
          y: 60,

          opacity: 0,

          duration: 0.7,

          ease: "none",
        },
        0
      );

    }, section);

    return () => ctx.revert();
  }, [data]);


  /* =======================================================
     SAFETY
  ======================================================= */

  if (!data) {
    return null;
  }


  return (
    <section
      ref={heroRef}
      className="hero"
    >

      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      {/* =====================================================
    BACKGROUND IMAGE
===================================================== */}

      <div className="hero-image">
        <picture>
          {/* Serves image with '-mobile' inserted before extension on screens <= 768px */}
          <source
            media="(max-width: 768px)"
            srcSet={data.image?.replace(/(\.[^.]+)$/, "-mobile$1")}
          />
          {/* Default / Desktop image */}
          <img
            src={data.image}
            alt={data.imageAlt || data.eyebrow || ""}
          />
        </picture>
      </div>


      {/* =====================================================
          OVERLAY
      ===================================================== */}

      <div className="hero-overlay" />


      {/* =====================================================
          GRID
      ===================================================== */}

      <div className="hero-grid" />


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="hero-container">

        {/* =================================================
            EYEBROW
        ================================================= */}

        {data.eyebrow && (
          <div className="hero-eyebrow-mask">

            <div className="hero-eyebrow">
              {data.eyebrow}
            </div>

          </div>
        )}


        {/* =================================================
            HEADING
        ================================================= */}

        <div className="hero-heading">

          {/* FIRST LINE */}

          {data.heading?.line1 && (
            <div className="hero-line-mask">

              <div className="hero-line-inner">
                {data.heading.line1}
              </div>

            </div>
          )}


          {/* SECOND LINE */}

          {data.heading?.line2 && (
            <div className="hero-line-mask">

              <div className="hero-line-inner">
                {data.heading.line2}
              </div>

            </div>
          )}


          {/* REAL STATEMENT */}

          {data.heading?.real && (
            <div className="hero-real-mask">

              <div className="hero-real-inner">
                {data.heading.real}
              </div>

            </div>
          )}

        </div>


        {/* =================================================
            BOTTOM CONTENT
        ================================================= */}

        <div className="hero-bottom">

          {data.description && (
            <p
              className="hero-description"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          )}


          <div className="hero-footer">

            {data.buttons?.length > 0 && (
              <div className="hero-buttons">

                {data.buttons.map((button, index) => (
                  <a
                    key={index}
                    href={button.href}
                    className={`hero-button ${button.variant === "secondary"
                      ? "hero-button-secondary"
                      : "hero-button-primary"
                      }`}
                  >

                    {button.label}

                    {button.icon && (
                      <span>
                        {button.icon}
                      </span>
                    )}

                  </a>
                ))}

              </div>
            )}

          </div>

        </div>

      </div>


      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      {data.showScroll !== false && (
        <div className="hero-scroll">

          <span>
            {data.scrollText || "SCROLL"}
          </span>

          <div />

        </div>
      )}

    </section>
  );
}