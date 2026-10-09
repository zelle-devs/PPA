"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "./projectsData";
import Lightbox from "./Lightbox";
import "./style.css"; // lightbox styles live here
import "./mobile.css";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioProjectsMobile() {
  const sectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [lightbox, setLightbox] = useState(null); // { p: projectIndex, i: imageIndex }

  useEffect(() => setMounted(true), []);

  const openLightbox = (p, i) => setLightbox({ p, i });
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const changeImage = useCallback(
    (i) => setLightbox((lb) => (lb ? { ...lb, i } : lb)),
    []
  );

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Mobile only
    mm.add(
      "(max-width: 768px)",
      () => {
        const items = gsap.utils.toArray(".ppm_project");

        items.forEach((item) => {
          const track = item.querySelector(".ppm_track");
          const bar = item.querySelector(".ppm_progress_fill");
          if (!track) return;

          // How far the images need to move sideways
          const getDistance = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          /* ---------- TITLE + DESCRIPTION REVEAL ---------- */

          gsap.from(item.querySelectorAll(".ppm_title, .ppm_description"), {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              once: true,
            },
          });

          /* ---------- PIN + SCROLL IMAGES SIDEWAYS ---------- */

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top top",
              end: () =>
                `+=${Math.max(getDistance(), window.innerHeight * 0.6)}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(track, { x: () => -getDistance(), ease: "none", duration: 1 }, 0);

          if (bar) {
            tl.fromTo(
              bar,
              { scaleX: 0 },
              { scaleX: 1, ease: "none", duration: 1 },
              0
            );
          }

          // Short hold on the last image before the next client comes
          tl.to({}, { duration: 0.2 });
        });
      },
      sectionRef
    );

    return () => mm.revert();
  }, []);

  const activeProject = lightbox ? projects[lightbox.p] : null;

  return (
    <>
      <section ref={sectionRef} className="ppm_section">
        {projects.map((project, p) => (
          <article
            key={project.id}
            className="ppm_project"
            style={{ backgroundImage: `url(${project.mob_bg_img})` }}
          >
            {/* LOGO + HEADING */}
            <div className="ppm_title">
              <img
                src={project.logo_img}
                alt={`${project.heading} logo`}
                className="ppm_logo"
              />
              <h2 className="ppm_heading">{project.heading}</h2>
            </div>

            {/* DESCRIPTION */}
            <p className="ppm_description">{project.description}</p>

            {/* IMAGES: moved sideways by scroll, tap to open gallery */}
            <div className="ppm_scroller">
              <div className="ppm_track">
                {project.images.map((image, i) => (
                  <div
                    key={image}
                    className="ppm_card"
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${project.heading} image ${i + 1}`}
                    onClick={() => openLightbox(p, i)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openLightbox(p, i);
                      }
                    }}
                  >
                    <img
                      src={image}
                      alt={`${project.heading} project image ${i + 1}`}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* COUNTER + PROGRESS */}
            <div className="ppm_footer">
              <span className="ppm_counter">
                {String(p + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <div className="ppm_progress">
                <div className="ppm_progress_fill" />
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* GALLERY on <body> so the pinned section can't break position:fixed */}
      {mounted &&
        activeProject &&
        createPortal(
          <Lightbox
            project={activeProject}
            index={lightbox.i}
            onClose={closeLightbox}
            onChange={changeImage}
          />,
          document.body
        )}
    </>
  );
}