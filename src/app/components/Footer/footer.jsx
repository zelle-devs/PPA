"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const footer = footerRef.current;
      if (!footer) return;

      const inner = footer.querySelector(".footer_inner");
      const logo = footer.querySelector(".footer_logo");
      const address = footer.querySelector(".footer_address");
      const newsletterHeading = footer.querySelector(".footer_newsletter h2");
      const form = footer.querySelector(".newsletter_form");
      const agreement = footer.querySelector(".newsletter_agreement");
      const statement = footer.querySelector(".footer_statement");
      const phone = footer.querySelector(".footer_phone");
      const email = footer.querySelector(".footer_email");
      const socialLinks = gsap.utils.toArray(".social_links a");
      const navigationLinks = gsap.utils.toArray(".footer_navigation nav a");
      const wordMark = footer.querySelector(".wordMark_img");

      // Initial wordmark state
      gsap.set(wordMark, {
        scale: 0.85,
        opacity: 0.85,
      });

      // Scroll-driven scale animation
      gsap.to(wordMark, {
        scale: 1.25,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top 80%",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // Initial reveal states
      gsap.set(inner, {
        clipPath: "inset(100% 0% 0% 0%)",
      });

      gsap.set(
        [
          logo,
          address,
          newsletterHeading,
          form,
          agreement,
          statement,
          phone,
          email,
        ],
        {
          y: 45,
          opacity: 0,
        }
      );

      gsap.set([...socialLinks, ...navigationLinks], {
        y: 35,
        opacity: 0,
      });

      // Main footer reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 85%",
          toggleActions: "play none none reverse",
          once: true,
        },
      });

      tl.to(inner, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.3,
        ease: "power4.inOut",
      })
        .to(
          logo,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.75"
        )
        .to(
          address,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.55"
        )
        .to(
          newsletterHeading,
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.45"
        )
        .to(
          form,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.55"
        )
        .to(
          agreement,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          statement,
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
          },
          "-=1"
        )
        .to(
          phone,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.65"
        )
        .to(
          email,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "back.out(1.6)",
          },
          "-=0.3"
        )
        .to(
          navigationLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.45"
        );

      // Parallax effects
      gsap.to(".footer_brand", {
        y: -15,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(".footer_right", {
        y: 15,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      // Hover interactions
      socialLinks.forEach((link) => {
        const onEnter = () => {
          gsap.to(link, {
            y: -5,
            scale: 1.06,
            duration: 0.35,
            ease: "power3.out",
            overwrite: true,
          });
        };

        const onLeave = () => {
          gsap.to(link, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power3.out",
            overwrite: true,
          });
        };

        link.addEventListener("mouseenter", onEnter);
        link.addEventListener("mouseleave", onLeave);

        link._onEnter = onEnter;
        link._onLeave = onLeave;
      });

      navigationLinks.forEach((link) => {
        const onEnter = () => {
          gsap.to(link, {
            x: 8,
            duration: 0.4,
            ease: "power3.out",
            overwrite: true,
          });
        };

        const onLeave = () => {
          gsap.to(link, {
            x: 0,
            duration: 0.4,
            ease: "power3.out",
            overwrite: true,
          });
        };

        link.addEventListener("mouseenter", onEnter);
        link.addEventListener("mouseleave", onLeave);

        link._onEnter = onEnter;
        link._onLeave = onLeave;
      });

      return () => {
        socialLinks.forEach((link) => {
          if (link._onEnter) link.removeEventListener("mouseenter", link._onEnter);
          if (link._onLeave) link.removeEventListener("mouseleave", link._onLeave);
        });

        navigationLinks.forEach((link) => {
          if (link._onEnter) link.removeEventListener("mouseenter", link._onEnter);
          if (link._onLeave) link.removeEventListener("mouseleave", link._onLeave);
        });
      };
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="site_footer">
      <div className="footer_inner">
        {/* =====================================
            STATEMENT (Direct sibling so it can be ordered first on mobile)
        ===================================== */}
        <div className="footer_statement">
          <h2>
            From the first idea
            <br />
            to the final thing
            <br />
            your customer holds.
          </h2>
        </div>

        {/* =====================================
            LEFT / BRAND
        ===================================== */}
        <div className="footer_brand">
          <a href="/" className="footer_logo">
            <img src="/logo1.png" alt="Print, Pack & Advertising" />
          </a>

          <div className="footer_address">
            <p>PRINT, PACK & ADVERTISING</p>
            <p>House # C-66, Karimabad, Block 4, Federal B Area, Karachi ,Pakistan</p>
          </div>

          {/* NEWSLETTER */}
          <div className="footer_newsletter">
            <h2>
              Stay in the <span className="hide-on-mobile"><br /></span>loop.
            </h2>

            {/* <form className="newsletter_form">
              <input
                type="email"
                placeholder="Email"
                aria-label="Email address"
              />
              <button type="submit">
                Subscribe
                <span>●</span>
              </button>
            </form>

            <label className="newsletter_agreement">
              <span />
              <p>
                By subscribing, you agree to our{" "}
                <a href="/privacy-policy">privacy policy.</a>
              </p>
            </label> */}
          </div>
        </div>

        {/* =====================================
            RIGHT / CONTACT
        ===================================== */}
        <div className="footer_right">
          <div className="footer_contact">
            <a href="tel:+923105317868 " className="footer_phone">
              +92 310 5317868 
            </a>

            <a href="mailto:info@printpackadvertising.com" className="footer_email">
              <span className="email_icon">↗</span>
              info@printpackadvertising.com
            </a>

            {/* <div className="social_links">
              <a href="#">in</a>
            </div> */}
          </div>
        </div>

        {/* =====================================
            NAVIGATION
        ===================================== */}
        <div className="footer_navigation">
          <nav>
            <a href="/about">About</a>
            <a href="/services">Services</a>
            <a href="/portfolio">Portfolio</a>
            <a href="/contact">Contact</a>
          </nav>
        </div>

        {/* =====================================
            WORDMARK
        ===================================== */}
        <img
          className="wordMark_img"
          src="/wordmark2.png"
          alt="Brand Wordmark"
        />
      </div>
      <div className="cc_details">
        <div className="general_cc_details">
            © 2026 Print Pack Advertising. All Rights Reserved.
        </div>
        <div className="cc_details_dev">
          <img src="/zelle.png" alt="zelle" />
          Designed & Managed by <a href="https://zellesolutions.com" target="blank"> Zelle Solutions Pvt. Ltd</a>
        </div>
         {/* <div className="general_cc_details">
            <Link href={"#"}>Terms & Conditions</Link>
             <Link href={"#"}>Privacy Policy</Link>
        </div> */}
      </div>
    </footer>
  );
}