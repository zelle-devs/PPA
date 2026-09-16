"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFrameSequence({
  frames = [],
  headingMain = "PUT IT ON PAPER.",
  headingSub = "MAKE IT COUNT.",
  tag = "CAPABILITIES",
  items = [],
  leadText = "Whatever the format, your print is part of your brand.",
  leadHighlight = "We make sure it looks the part.",
  calloutTitle = "PRINT THAT GETS NOTICED.",
  calloutSub = "AND REMEMBERED.",
  bgColor = "#f4f1ea",
  scaleFactor = 0.52,
}) {
  const containerRef = useRef(null);
  const pinTargetRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const activeFrameRef = useRef(0);

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];

    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvasW = Math.round(rect.width * dpr);
    const canvasH = Math.round(rect.height * dpr);

    if (canvas.width !== canvasW || canvas.height !== canvasH) {
      canvas.width = canvasW;
      canvas.height = canvasH;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const containerRatio = rect.width / rect.height;

    let baseW, baseH;
    if (imgRatio > containerRatio) {
      baseW = rect.width;
      baseH = baseW / imgRatio;
    } else {
      baseH = rect.height;
      baseW = baseH * imgRatio;
    }

    const finalW = baseW * scaleFactor;
    const finalH = baseH * scaleFactor;
    const posX = (rect.width - finalW) / 2;
    const posY = (rect.height - finalH) / 2;

    ctx.drawImage(img, posX, posY, finalW, finalH);
  };

  useEffect(() => {
    const container = containerRef.current;
    const pinTarget = pinTargetRef.current;
    if (!container || !pinTarget || !frames.length) return;

    let isDestroyed = false;

    const loadImages = Promise.all(
      frames.map((src, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            imagesRef.current[index] = img;
            resolve(img);
          };
          img.onerror = () => resolve(null);
          img.src = src;
        });
      })
    );

    const ctx = gsap.context(() => {
      loadImages.then(() => {
        if (isDestroyed) return;

        drawFrame(0);

        const headingMainEl = pinTarget.querySelector(".paper_heading_main");
        const headingSubEl = pinTarget.querySelector(".paper_heading_sub");
        const canvasEl = canvasRef.current;
        const listColEl = pinTarget.querySelector(".paper_list_col");
        const listItemsEl = pinTarget.querySelectorAll(".paper_list_item");
        
        // Alag-alag element references
        const leadPEl = pinTarget.querySelector(".paper_lead_p");
        const calloutBoxEl = pinTarget.querySelector(".paper_callout_box");

        gsap.set([headingMainEl, headingSubEl], { opacity: 1, x: 0 });
        gsap.set(canvasEl, { opacity: 0, scale: 0.85 });
        gsap.set(listColEl, { opacity: 0, x: -70 });
        gsap.set(listItemsEl, { opacity: 0, x: -20 });
        
        // Dono ko alag se hidden aur shifted rakhein
        gsap.set(leadPEl, { opacity: 0, x: 60 });
        gsap.set(calloutBoxEl, { opacity: 0, x: 60 });

        const frameObj = { frame: 0 };
        const midPoint = Math.floor((frames.length - 1) / 2);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            pin: pinTarget,
            pinSpacing: false,
            scrub: 1,
            invalidateOnRefresh: true,
            onRefresh: () => drawFrame(activeFrameRef.current),
          },
        });

        // 1. Text splits out & Canvas appears
        tl.to(headingMainEl, { x: -220, opacity: 0, duration: 1.5, ease: "power1.inOut" }, 0)
          .to(headingSubEl, { x: 220, opacity: 0, duration: 1.5, ease: "power1.inOut" }, 0)
          .to(canvasEl, { opacity: 1, scale: 1, duration: 1.2, ease: "power1.out" }, 0.2);

        // 2. Frame 0 -> Midpoint + Left Column items
        tl.to(frameObj, {
          frame: midPoint,
          duration: 3.5,
          ease: "none",
          onUpdate: () => {
            const currentIdx = Math.round(frameObj.frame);
            if (currentIdx !== activeFrameRef.current) {
              activeFrameRef.current = currentIdx;
              drawFrame(currentIdx);
            }
          },
        }, 1.5);

        tl.to(listColEl, { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" }, 2.5)
          .to(listItemsEl, { opacity: 1, x: 0, stagger: 0.15, duration: 1, ease: "power2.out" }, 3);

        // 3. Pehle Scroll Step par: Lead Paragraph show hoga
        tl.to(leadPEl, { opacity: 1, x: 0, duration: 2, ease: "power2.out" }, 4.5);

        // 4. Midpoint -> End Frames chalenge
        tl.to(frameObj, {
          frame: frames.length - 1,
          duration: 3.5,
          ease: "none",
          onUpdate: () => {
            const currentIdx = Math.round(frameObj.frame);
            if (currentIdx !== activeFrameRef.current) {
              activeFrameRef.current = currentIdx;
              drawFrame(currentIdx);
            }
          },
        }, 5.5);

        // 5. Agle Scroll Step par: Callout Box show hoga
        tl.to(calloutBoxEl, { opacity: 1, x: 0, duration: 2, ease: "power2.out" }, 7.5);

        // 6. Hold Pause taake user aaram se read kar sake
        tl.to({}, { duration: 2.5 });

        ScrollTrigger.refresh();
      });
    }, containerRef);

    const onResize = () => drawFrame(activeFrameRef.current);
    window.addEventListener("resize", onResize);

    return () => {
      isDestroyed = true;
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [frames]);

  return (
    <div ref={containerRef} className="scroll_frame_wrapper" style={{ backgroundColor: bgColor }}>
      <section ref={pinTargetRef} className="scroll_frame_section" style={{ backgroundColor: bgColor }}>
        <canvas ref={canvasRef} className="scroll_frame_canvas" />

        <div className="paper_header_block">
          <h2 className="paper_heading_main">{headingMain}</h2>
          <h3 className="paper_heading_sub">{headingSub}</h3>
        </div>

        <div className="paper_content_layout">
          <div className="paper_list_col">
            <span className="paper_tag">{tag}</span>
            <ul className="paper_items_list">
              {items.map((item, idx) => (
                <li key={idx} className="paper_list_item">
                  <span className="item_bullet">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="paper_statement_col">
            <p className="paper_lead_p">
              {leadText}
              <br />
              <strong>{leadHighlight}</strong>
            </p>

            <div className="paper_callout_box">
              <h4 className="paper_callout_title">
                {calloutTitle}
                <br />
                <span>{calloutSub}</span>
              </h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}