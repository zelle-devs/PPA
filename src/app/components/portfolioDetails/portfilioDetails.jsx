"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================
   PORTFOLIO DATA
========================================= */

const portfolioCards = [
    {
        id: 1,
        image: "/images/projects/project1.png",
        category: "PRINT / BRANDING",
        alt: "Print and branding project",
    },
    {
        id: 2,
        image: "/images/projects/project2.png",
        category: "PACKAGING",
        alt: "Packaging project",
    },
    {
        id: 3,
        image: "/images/projects/project3.png",
        category: "SIGNAGE",
        alt: "Signage project",
    }
];


export default function PortfolioDetailsHome() {

    const sectionRef = useRef(null);
    const trackRef = useRef(null);


    useLayoutEffect(() => {

        const ctx = gsap.context(() => {

            const section = sectionRef.current;
            const track = trackRef.current;

            if (!section || !track) return;


            /* =========================================
               CALCULATE HORIZONTAL DISTANCE
            ========================================= */

            const getDistance = () => {

                return Math.max(
                    0,
                    track.scrollWidth -
                    section.clientWidth
                );

            };


            /* =========================================
               HORIZONTAL SCROLL
            ========================================= */

            gsap.to(track, {

                x: () => -getDistance(),

                ease: "none",

                scrollTrigger: {

                    trigger: section,

                    start: "top top",

                    end: () =>
                        `+=${getDistance()}`,

                    pin: true,

                    scrub: 1,

                    anticipatePin: 1,

                    invalidateOnRefresh: true,
                },

            });


            /* =========================================
               INTRO TEXT
            ========================================= */

            gsap.from(
                ".pshp_intro_content",
                {

                    x: 80,

                    opacity: 0,

                    duration: 1.2,

                    ease: "power4.out",

                    scrollTrigger: {

                        trigger: section,

                        start: "top 75%",

                        once: true,

                    },

                }
            );


            /* =========================================
               CARD IMAGE PARALLAX
            ========================================= */

            const cards =
                gsap.utils.toArray(
                    ".portfolio_card"
                );


            cards.forEach((card) => {

                const image =
                    card.querySelector(
                        ".portfolio_card_image"
                    );


                if (!image) return;


                gsap.fromTo(

                    image,

                    {
                        scale: 1.12,
                    },

                    {
                        scale: 1,

                        ease: "none",

                        scrollTrigger: {

                            trigger: card,

                            start: "left right",

                            end: "right left",

                            scrub: 1.5,

                        },

                    }

                );

            });


            /* =========================================
               VIEW WORK BUTTON
            ========================================= */

            gsap.from(
                ".portfolio_work_button",
                {

                    y: 30,

                    opacity: 0,

                    duration: 0.8,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: section,

                        start: "top 60%",

                        once: true,

                    },

                }
            );


        }, sectionRef);


        return () => ctx.revert();

    }, []);


    return (

        <section
            ref={sectionRef}
            className="portfolio_section_hp"
        >

            <div
                ref={trackRef}
                className="portfolio_track"
            >

                {/* =================================
                    INTRO PANEL
                ================================= */}

                <div className="portfolio_intro">

                    <div className="pshp_intro_content">


                        <h2 className="section_heading_01">
                            IDEAS ARE EASY.
                        </h2>


                        <h2 className="section_heading_02">
                            MAKING THEM LOOK GOOD
                            IN THE REAL WORLD
                            IS OUR JOB.
                        </h2>

                    </div>

                </div>


                {/* =================================
                    DYNAMIC PORTFOLIO CARDS
                ================================= */}

                {portfolioCards.map((card) => (

                    <article
                        key={card.id}
                        className="portfolio_card"
                    >

                        <div className="portfolio_card_media">

                            <img
                                src={card.image}
                                alt={card.alt}
                                className="portfolio_card_image"
                            />

                        </div>


                        <div className="portfolio_card_info">

                            <span>
                                {String(card.id).padStart(2, "0")}
                            </span>


                            <span>
                                {card.category}
                            </span>

                        </div>

                    </article>

                ))}


                {/* =================================
                    VIEW WORK
                ================================= */}

                <div className="portfolio_end">

                    <button
                        className="portfolio_work_button"
                    >

                        VIEW OUR WORK

                        <span>
                            →
                        </span>

                    </button>

                </div>

            </div>

        </section>

    );
}