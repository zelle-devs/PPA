"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);


/* =========================================================
   BRAND STATEMENT DATA
========================================================= */

const statements = [
    {
        id: 1,
        title: "On shelves.",
        text: "We create print that gives your brand a physical presence people remember.",
        image: "/images/statement/on_shelf.png",
        imageAlt: "Print",
        rotate: -1.5,
    },

    {
        id: 2,
        title: "On walls.",
        text: "We turn packaging into an experience that speaks before the product does.",
        image: "/images/statement/on_wall.png",
        imageAlt: "Packaging",
        rotate: 1.2,
    },

    {
        id: 3,
        title: "In stores.",
        text: "We make your message impossible to ignore wherever your audience sees it.",
        image: "/images/statement/in_store.png",
        imageAlt: "Advertising",
        rotate: -1,
    },

    {
        id: 4,
        title: "At events.",
        text: "We turn packaging into an experience that speaks before the product does.",
        image: "/images/statement/at_events.png",
        imageAlt: "Packaging",
        rotate: 1.2,
    },

    {
        id: 5,
        title: "In customers' hands.",
        text: "We make your message impossible to ignore wherever your audience sees it.",
        image: "/images/statement/customer.png",
        imageAlt: "Advertising",
        rotate: -1,
    },
];


export default function BrandStatement() {

    const sectionRef = useRef(null);
    const cardsRef = useRef(null);


    useLayoutEffect(() => {

        const ctx = gsap.context(() => {

            const section = sectionRef.current;
            const cardsContainer = cardsRef.current;

            if (!section || !cardsContainer) {
                return;
            }


            const cards = gsap.utils.toArray(
                ".slide_from_the_bottom"
            );


            if (!cards.length) {
                return;
            }


            /* =================================================
               INITIAL STATE
            ================================================= */

            gsap.set(cards, {
                xPercent: -50,
                y: "110%",
                width: "80vw",
                scale: 0.96,
                rotation: 0,
                opacity: 1,
                transformOrigin: "center bottom",
            });


            /* =================================================
               HEADING INITIAL STATE
            ================================================= */

            gsap.set(
                ".brand_statement_heading",
                {
                    y: 0,
                }
            );


            /* =================================================
               MAIN SCROLL TIMELINE

               ONLY ONE SCROLLTRIGGER.

               This prevents the jerk/flicker.
            ================================================= */

            const tl = gsap.timeline({

                scrollTrigger: {

                    trigger: section,

                    start: "top top",

                    end: () =>
                        `+=${cards.length * 100}%`,

                    pin: true,

                    scrub: 1,

                    anticipatePin: 1,

                    invalidateOnRefresh: true,
                },
            });


            /* =================================================
               FIRST CARD
            ================================================= */

            const firstCard = cards[0];

            if (firstCard) {

                const rotation =
                    Number(
                        firstCard.dataset.rotation || 0
                    );


                tl.to(
                    firstCard,
                    {
                        xPercent: -50,

                        y: 0,

                        width: "80vw",

                        scale: 1,

                        rotation,

                        duration: 1,

                        ease: "none",
                    }
                );

            }


            /* =================================================
               REMAINING CARDS
            ================================================= */

            for (
                let index = 1;
                index < cards.length;
                index++
            ) {

                const previousCard =
                    cards[index - 1];

                const currentCard =
                    cards[index];


                const previousRotation =
                    Number(
                        previousCard.dataset.rotation || 0
                    );


                const currentRotation =
                    Number(
                        currentCard.dataset.rotation || 0
                    );


                /* =============================================
                   QUICK BOUNCE OF PREVIOUS CARD

                   IMPORTANT:

                   This is INSIDE the SAME timeline.

                   It does NOT change Y.

                   It does NOT hide the card.

                   It simply does:

                   80vw → 86vw → 80vw
                ============================================= */

                tl.to(
                    previousCard,
                    {
                        width: "86vw",

                        duration: 0.08,

                        ease: "power2.out",
                    }
                );


                tl.to(
                    previousCard,
                    {
                        width: "80vw",

                        duration: 0.08,

                        ease: "power2.inOut",
                    }
                );


                /* =============================================
                   MOVE PREVIOUS CARD BACK

                   This happens AFTER its bounce.
                ============================================= */

                tl.to(
                    previousCard,
                    {
                        xPercent: -50,

                        y:
                            -25 -
                            Math.max(
                                0,
                                index - 2
                            ) * 10,

                        scale:
                            0.975 -
                            Math.max(
                                0,
                                index - 2
                            ) * 0.01,

                        width: "80vw",

                        rotation: previousRotation,

                        duration: 0.3,

                        ease: "none",
                    }
                );


                /* =============================================
                   MOVE OLDER CARDS BACK

                   Keeps the stack visible.
                ============================================= */

                if (index > 1) {

                    for (
                        let depth = 0;
                        depth < index - 1;
                        depth++
                    ) {

                        const olderCard =
                            cards[depth];

                        const olderRotation =
                            Number(
                                olderCard.dataset.rotation || 0
                            );


                        tl.to(
                            olderCard,
                            {
                                xPercent: -50,

                                y:
                                    -45 -
                                    (
                                        index -
                                        depth -
                                        2
                                    ) * 10,

                                scale:
                                    0.95 -
                                    (
                                        index -
                                        depth -
                                        2
                                    ) * 0.01,

                                width: "80vw",

                                rotation:
                                    olderRotation,

                                duration: 0.2,

                                ease: "none",

                            },
                            "<"
                        );

                    }

                }


                /* =============================================
                   CURRENT CARD ENTERS

                   ALWAYS 80vw.

                   NO STRETCH WHILE ENTERING.
                ============================================= */

                tl.to(
                    currentCard,
                    {
                        xPercent: -50,

                        y: 0,

                        width: "80vw",

                        scale: 1,

                        rotation: currentRotation,

                        duration: 0.9,

                        ease: "none",
                    }
                );

            }


            /* =================================================
               FINAL HEADING MOVEMENT

               ONLY AFTER LAST CARD.

               NO OPACITY.
            ================================================= */

            tl.to(
                ".brand_statement_heading",
                {
                    y: "-42vh",

                    duration: 0.45,

                    ease: "none",
                }
            );


            /* =================================================
               RESIZE
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


        return () =>
            ctx.revert();

    }, []);


    return (

        <section
            ref={sectionRef}
            className="brand_statement"
        >

            {/* =================================================
               HEADING
            ================================================= */}

            <div
                className="brand_statement_heading"
            >

                <h2>
                    WE DON'T JUST
                    <br />
                    MAKE THINGS.
                </h2>

            </div>


            {/* =================================================
               CARDS
            ================================================= */}

            <div
                ref={cardsRef}
                className="slides_from_the_bottom"
            >

                {statements.map(
                    (statement, index) => (

                        <article
                            key={
                                statement.id ||
                                index
                            }

                            className="slide_from_the_bottom"

                            data-rotation={
                                statement.rotate || 0
                            }
                        >

                            <div
                                className="content_left_sftb"
                            >

                              


                                <div
                                    className="statement_text"
                                >

                                    <h2>
                                        WE MAKE BRANDS
                                        SHOW UP
                                    </h2>

                                    <h3>
                                        {
                                            statement.title
                                        }
                                    </h3>

                                </div>

                            </div>


                            <div
                                className="image_right_sftb"
                            >

                                <img
                                    src={
                                        statement.image
                                    }

                                    alt={
                                        statement.imageAlt ||
                                        statement.title
                                    }
                                />

                            </div>

                        </article>

                    )
                )}

            </div>

        </section>

    );
}