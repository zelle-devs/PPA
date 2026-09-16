"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

export default function HPSecondSection() {
    const sectionRef = useRef(null);
    const rightTrackRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const isMobile = window.matchMedia("(max-width: 700px)").matches;

            /* =================================================
               LEFT HEADING & LINE
            ================================================= */
            gsap.from(".section_heading", {
                yPercent: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.to(".section_heading", {
                backgroundPosition: "200% center",
                duration: 7,
                ease: "none",
                repeat: -1,
            });

            gsap.from(".section_line", {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                },
            });

            /* =================================================
               SLIDES SETUP
            ================================================= */
            const slides = gsap.utils.toArray(".hss_slide");
            if (!slides.length) return;

            const getSlideHeight = () => slides[0].offsetHeight;
            const getTotalDistance = () => getSlideHeight() * (slides.length - 1);

            /* =================================================
               DESKTOP PINNING & ACTIVE TOGGLES
            ================================================= */
            if (!isMobile) {
                gsap.to(rightTrackRef.current, {
                    y: () => -getTotalDistance(),
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: () => `+=${window.innerHeight * 1.5}`,
                        pin: true,
                        scrub: 0.5,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => {
                            const activeIndex = Math.min(
                                slides.length - 1,
                                Math.floor(self.progress * slides.length)
                            );

                            slides.forEach((slide, index) => {
                                slide.classList.toggle("is-active", index === activeIndex);
                            });
                        },
                    },
                });
            }

            /* =================================================
               SLIDE 01 ANIMATION
            ================================================= */
            gsap.from(".section_description_1", {
                y: isMobile ? 20 : 35,
                opacity: 0,
                stagger: 0.08,
                duration: 0.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: slides[0],
                    start: isMobile ? "top 85%" : "top 75%",
                    toggleActions: "play none none reverse",
                },
            });

            /* =================================================
               SLIDE 02: INSTANT SNAPPY DUAL ANIMATION
            ================================================= */
            if (slides[1]) {
                // 1. Large headline: Snappy vertical pop
                gsap.from(slides[1].querySelectorAll(".section_description_2.large"), {
                    y: isMobile ? 25 : 45,
                    opacity: 0,
                    duration: 0.45,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: slides[1],
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                        fastScrollEnd: true,
                    },
                });

                // 2. Smaller body: Quick follow-up slide with minimal delay
                gsap.from(slides[1].querySelectorAll(".section_description_2:not(.large)"), {
                    x: isMobile ? -15 : -30,
                    opacity: 0,
                    duration: 0.45,
                    delay: 0.08,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: slides[1],
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                        fastScrollEnd: true,
                    },
                });
            }

            /* =================================================
               LABELS & METADATA
            ================================================= */
            slides.forEach((slide) => {
                const meta = slide.querySelectorAll(".slide_number, .slide_label");
                if (!meta.length) return;

                gsap.from(meta, {
                    y: 10,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: slide,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });
            });

            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="hompage_second_section">
            {/* LEFT SIDE */}
            <div className="left_side_section">
                <h2 className="section_heading">
                    ONE BRAND.
                    <br />
                    MANY TOUCHPOINTS.
                    <br />
                    ONE PARTNER.
                </h2>
            </div>

            {/* RIGHT SIDE */}
            <div className="right_side_slide">
                <div ref={rightTrackRef} className="right_slide_track">
                    {/* SLIDE 01 */}
                    <article className="hss_slide">
                        <div className="slide_content">
                            <p className="section_description_1 large">
                                Your business doesn't need another vendor who simply takes an order.
                            </p>
                            <p className="section_description_1">
                                You need someone who understands what you're trying to achieve — and knows how to turn it into something that works in the real world.
                            </p>
                        </div>
                        <span className="slide_label">THE PROBLEM</span>
                    </article>

                    {/* SLIDE 02 */}
                    <article className="hss_slide">
                        <div className="slide_content">
                            <p className="section_description_2 large">
                                Print, Pack & Advertising brings printing, packaging, advertising and display production together under one roof.
                            </p>
                            <p className="section_description_2">
                                One production partner. A lot less to coordinate.
                            </p>
                        </div>
                        <span className="slide_label">THE SOLUTION</span>
                    </article>
                </div>
            </div>
        </section>
    );
}