"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    subTitle: "PRINT",
    title: "Make Every Sheet Count.",
    image: "/images/services/print.png",
    mobimage: "/images/services/service_1_mob.png",
    imageAlt: "Printing",
    description: "",
    cta: "",
    ctaLink: "",
  },
  {
    id: 2,
    subTitle: "PACK",
    title: "Don't Just Protect The Product. PRESENT IT.",
    image: "/images/services/pack.png",
    mobimage: "/images/services/service_2_mob.png",
    imageAlt: "Packaging",
    description: "",
    cta: "",
    ctaLink: "",
  },
  {
    id: 3,
    subTitle: "ADVERTISING",
    title: "If People Can See It, It Should Look The Part.",
    image: "/images/services/adv.png",
    mobimage: "/images/services/service_3_mob.png",
    imageAlt: "Advertising",
    description: "",
    cta: "EXPLORE SERVICES",
    ctaLink: "/services",
  },
];

export default function ServicesIntro() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;

      if (!section || !track) return;

      const slides = gsap.utils.toArray(".slide_si");

      const getDistance = () => {
        if (!slides.length) return 0;
        return track.scrollWidth - section.clientWidth + 40;
      };

      /* =================================================
         HORIZONTAL SCROLL TIMELINE
      ================================================= */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance() + window.innerHeight * 0.8}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Move track horizontally
      tl.to(track, {
        x: () => -getDistance(),
        ease: "none",
        duration: 2,
      });

      // 2. Hold at the end
      tl.to({}, { duration: 1 });

      /* =================================================
         MAIN SECTION HEADING REVEAL
      ================================================= */
      gsap.from(".section_heading_01", {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      /* =================================================
         SLIDE SCALE, HEADING & CTA ANIMATIONS
      ================================================= */
      slides.forEach((slide) => {
        const image = slide.querySelector(".slide_si_image");
        const heading = slide.querySelector(".sub_section_heading");
        const ctaBtn = slide.querySelector(".services_explore");

        // Scale animation on the image
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.15 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: tl,
                start: "left right",
                end: "center center",
                scrub: 1.2,
              },
            }
          );
        }

        // Sequence: Heading appears first -> CTA button appears after
        if (heading || ctaBtn) {
          const contentTl = gsap.timeline({
            scrollTrigger: {
              trigger: slide,
              containerAnimation: tl,
              start: "left 75%",
              toggleActions: "play none none reverse",
            },
          });

          if (heading) {
            contentTl.from(heading, {
              y: 60,
              opacity: 0,
              duration: 0.8,
              ease: "power4.out",
            });
          }

          if (ctaBtn) {
            contentTl.from(
              ctaBtn,
              {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
              },
              "-=0.2" // Starts right as the heading finishes
            );
          }
        }
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="services_intro">
      <header className="services_intro_header">
        <div className="section_heading_01">
          EVERYTHING YOUR BRAND NEEDS TO SHOW UP
        </div>
      </header>

      <div className="slides_si">
        <div ref={trackRef} className="slides_si_track">
          {services.map((service, index) => {
            const serviceNumber = String(index + 1).padStart(2, "0");

            return (
              <article className="slide_si" key={service.id || index}>
                <div className="slide_si_media">
                  <picture className="slide_si_picture">
                    {service.mobimage && (
                      <source
                        media="(max-width: 1000px)"
                        srcSet={service.mobimage}
                      />
                    )}
                    <img
                      src={service.image}
                      alt={service.imageAlt || service.title}
                      className="slide_si_image"
                    />
                  </picture>
                  <div className="slide_si_overlay" />
                </div>
                <div className="slide_si_content">
                  <span className="slide_index">
                    {serviceNumber} / {service.subTitle}
                  </span>

                  <h3 className="sub_section_heading">{service.title}</h3>

                  {service.description && (
                    <p className="slide_si_description">{service.description}</p>
                  )}

                  {service.cta && (
                    <button
                      type="button"
                      className="services_explore"
                      onClick={() => {
                        if (service.ctaLink) {
                          window.location.href = service.ctaLink;
                        }
                      }}
                    >
                      {service.cta} <span>→</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}