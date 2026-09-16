"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

// Helper function: Har character/letter ko separate span me split karega
const splitCharacters = (text, customClass = "") => {
  return text.split("").map((char, index) => {
    if (char === " ") {
      return (
        <span key={index} style={{ display: "inline-block", width: "0.3em" }}>
          &nbsp;
        </span>
      );
    }
    return (
      <span
        key={index}
        className={`scatter_char ${customClass}`}
        style={{
          display: "inline-block",
          willChange: "transform, opacity, filter",
        }}
      >
        {char}
      </span>
    );
  });
};

export default function AdvService() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray(".scatter_char");

      // 1. Initial State
      gsap.set(".sign_board_rightImage", {
        opacity: 0,
        scale: 0.92,
      });

      // Saare letters hawa me random 3D space me scatter rahenge
      chars.forEach((char) => {
        gsap.set(char, {
          opacity: 0,
          x: gsap.utils.random(-180, 180),
          y: gsap.utils.random(-220, 220),
          z: gsap.utils.random(-400, 300),
          rotation: gsap.utils.random(-80, 80),
          rotationX: gsap.utils.random(-90, 90),
          rotationY: gsap.utils.random(-90, 90),
          scale: gsap.utils.random(0.2, 2.2),
          filter: "blur(14px)",
        });
      });

      // 2. Timeline - Single fluid scroll flow (no pauses)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center+=100",
          end: "+=2400",
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Right image fade-in
      tl.to(".sign_board_rightImage", {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      });

      // Image ke aate hi characters hawa se smoothly combine honge
      tl.to(
        chars,
        {
          opacity: 1,
          x: 0,
          y: 0,
          z: 0,
          rotation: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.6,
          stagger: {
            each: 0.02,
            from: "random", // Random characters hawa se snap hote hue text banayenge
          },
          ease: "power3.out",
        },
        "<0.3" // "<0.3" ki wajah se animation seamless aik hi flow me merge ho kar execute hogi
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="service_portfolio_container">
      <div className="main_sign_board">
        <img src="/images/services/signboard.jpeg" alt="" />
      </div>

      <div className="signboard_content_continer">
        <img
          className="sign_board_rightImage"
          src="/images/services/board_img.png"
          alt=""
        />
        <div className="sign_board_content" style={{ perspective: "1200px" }}>
          <p>{splitCharacters("ADVERTISING SOLUTIONS")}</p>
          <h2>
            {splitCharacters("BRANDS")} <br />
            {splitCharacters("THAT")}{" "}
            <span style={{ color: "#D9BB88" }}>
              {splitCharacters("GET NOTICED.", "gold_char")}
            </span>
          </h2>
          <p>{splitCharacters("IDEAS | VISUALS | IMPACT | EVERYWHERE")}</p>
        </div>
      </div>
    </div>
  );
}