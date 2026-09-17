"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./style.css";

export default function ContactHero() {
    const [copied, setCopied] = useState(false);
    const heroRef = useRef(null);
    const email = "info@printpackadvertising.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: {
                    ease: "power4.out",
                },
            });

            // 1. Heading slide-up reveal
            tl.from(".main_hero_heading", {
                yPercent: 120,
                duration: 1.2,
                delay: 0.1,
            })
                // 2. Subheading smooth slide-up + fade
                .from(
                    ".hero_subheading",
                    {
                        y: 40,
                        opacity: 0,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "-=0.8"
                )
                // 3. Bottom contact details stagger reveal
                .from(
                    ".contact_info_block",
                    {
                        y: 35,
                        opacity: 0,
                        stagger: 0.15,
                        duration: 0.9,
                        ease: "power3.out",
                        clearProps: "all",
                    },
                    "-=0.6"
                );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="contact_hero">
            {/* Top Main Content */}
            <div className="contact_hero_top">
                <div className="hero_heading_mask">
                    <h1 className="main_hero_heading">GOT A QUESTION?</h1>
                </div>
                <div className="hero_subheading_mask">
                    <p className="hero_subheading">
                        Whether you want to know more about PPA, our services, or simply have something you'd like to ask
                    </p>
                </div>
            </div>

            {/* Bottom Information Row */}
            <div className="contact_hero_bottom">
                <div className="contact_info_block contact_primary">
                    <a href="tel:923105317868" className="phone_number">
                        +92 310 5317868
                    </a>
                    <div className="email_badge_wrapper">
                        <button
                            type="button"
                            className="copy_icon_btn"
                            onClick={handleCopy}
                            aria-label="Copy email address"
                        >
                            {copied ? (
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            ) : (
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                            )}
                        </button>
                        <a href={`mailto:${email}`} className="email_link">
                            {email}
                        </a>
                    </div>
                </div>

                <div className="contact_info_block">
                    <span className="info_label">Address</span>
                    <p className="info_text">
                        House # C-66, Karimabad, Block 4, Federal B Area,
                        <br />
                        Karachi ,Pakistan          </p>
                </div>

                <div className="contact_info_block">
                    <span className="info_label">Postal Code</span>
                    <p className="info_text">
                         75950
                    </p>
                </div>
            </div>
        </section>
    );
}