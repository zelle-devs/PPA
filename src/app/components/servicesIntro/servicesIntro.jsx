"use client";

import React, {
    useLayoutEffect,
    useRef,
} from "react";

import gsap from "gsap";
import {
    ScrollTrigger,
} from "gsap/ScrollTrigger";

import "./style.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   SERVICES DATA
   ========================================================= */

const services = [
    {
        id: 1,

        subTitle: "PRINT",

        title: "Make Every Sheet Count.",

        image: "/images/services/print.png",

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

            const section =
                sectionRef.current;

            const track =
                trackRef.current;


            if (!section || !track) {
                return;
            }


            /* =================================================
               HORIZONTAL DISTANCE
            ================================================= */

            const getDistance = () => {

                return Math.max(
                    0,
                    track.scrollWidth -
                        section.clientWidth
                );

            };


            /* =================================================
               HORIZONTAL SCROLL
            ================================================= */

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


            /* =================================================
               MAIN HEADING REVEAL
            ================================================= */

            gsap.from(
                ".section_heading_01",
                {

                    y: 50,

                    opacity: 0,

                    duration: 1.1,

                    ease: "power4.out",

                    scrollTrigger: {

                        trigger: section,

                        start: "top 80%",

                        once: true,
                    },
                }
            );


            /* =================================================
               SLIDE ANIMATIONS
            ================================================= */

            const slides =
                gsap.utils.toArray(
                    ".slide_si"
                );


            slides.forEach((slide) => {

                const image =
                    slide.querySelector(
                        ".slide_si_image"
                    );


                const heading =
                    slide.querySelector(
                        ".sub_section_heading"
                    );


                if (!image || !heading) {
                    return;
                }


                /* =================================================
                   IMAGE INTERNAL SCALE

                   IMPORTANT:

                   The slide stays 100vw.

                   Only the IMAGE scales:

                   1.15 → 1

                   This creates the internal zoom-out effect.
                ================================================= */

                gsap.fromTo(

                    image,

                    {
                        scale: 1.15,
                    },

                    {
                        scale: 1,

                        ease: "none",

                        scrollTrigger: {

                            trigger: slide,

                            start: "left right",

                            end: "left 20%",

                            scrub: 1.2,

                            invalidateOnRefresh: true,
                        },
                    }
                );


                /* =================================================
                   TEXT REVEAL
                ================================================= */

                gsap.from(
                    heading,
                    {

                        y: 60,

                        opacity: 0,

                        duration: 0.9,

                        ease: "power4.out",

                        scrollTrigger: {

                            trigger: slide,

                            start: "left 75%",

                            toggleActions:
                                "play none none reverse",
                        },
                    }
                );

            });


            /* =================================================
               REFRESH ON RESIZE
            ================================================= */

            const refresh = () => {

                ScrollTrigger.refresh();

            };


            window.addEventListener(
                "resize",
                refresh
            );


            return () => {

                window.removeEventListener(
                    "resize",
                    refresh
                );

            };

        }, sectionRef);


        return () => {

            ctx.revert();

        };

    }, []);


    return (

        <section
            ref={sectionRef}
            className="services_intro"
        >


            {/* =================================================
               HEADER
            ================================================= */}

            <header
                className="services_intro_header"
            >

                <div
                    className="section_heading_01"
                >
                    EVERYTHING YOUR BRAND NEEDS TO SHOW UP
                    
                </div>


                {/* <div
                    className="services_intro_meta"
                >

                    <span>
                        {String(
                            services.length
                        ).padStart(2, "0")}{" "}
                        SERVICES
                    </span>

                    <span>
                        WHAT WE DO
                    </span>

                </div> */}

            </header>


            {/* =================================================
               SLIDER
            ================================================= */}

            <div className="slides_si">

                <div
                    ref={trackRef}
                    className="slides_si_track"
                >


                    {services.map(
                        (
                            service,
                            index
                        ) => {

                            const serviceNumber =
                                String(
                                    index + 1
                                ).padStart(
                                    2,
                                    "0"
                                );


                            return (

                                <article
                                    className="slide_si"
                                    key={
                                        service.id ||
                                        index
                                    }
                                >


                                    {/* =================================
                                       IMAGE
                                    ================================= */}

                                    <div
                                        className="slide_si_media"
                                    >

                                        <img
                                            src={
                                                service.image
                                            }

                                            alt={
                                                service.imageAlt ||
                                                service.title
                                            }

                                            className="slide_si_image"
                                        />


                                        <div
                                            className="slide_si_overlay"
                                        />

                                    </div>


                                    {/* =================================
                                       CONTENT
                                    ================================= */}

                                    <div
                                        className="slide_si_content"
                                    >


                                        <span
                                            className="slide_index"
                                        >
                                            {serviceNumber}
                                            {" / "}
                                            {service.subTitle}
                                        </span>


                                        <h3
                                            className="sub_section_heading"
                                        >
                                            {
                                                service.title
                                            }
                                        </h3>


                                        {/* =================================
                                           OPTIONAL DESCRIPTION
                                        ================================= */}

                                        {service.description && (

                                            <p
                                                className="slide_si_description"
                                            >
                                                {
                                                    service.description
                                                }
                                            </p>

                                        )}


                                        {/* =================================
                                           OPTIONAL CTA
                                        ================================= */}

                                        {service.cta && (

                                            <button
                                                type="button"
                                                className="services_explore"
                                                onClick={() => {

                                                    if (
                                                        service.ctaLink
                                                    ) {

                                                        window.location.href =
                                                            service.ctaLink;

                                                    }

                                                }}
                                            >

                                                {
                                                    service.cta
                                                }

                                                <span>
                                                    →
                                                </span>

                                            </button>

                                        )}

                                    </div>

                                </article>

                            );

                        }
                    )}

                </div>

            </div>

        </section>

    );
}