'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import "./style.css"

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    tag: 'OXYGEN GYM',
    title: 'Where taste meets meaning.',
    image: '/images/projects/image7.jpg',
    layout: 'column-left',
    parallaxSpeed: 0.12,
  },
  {
    id: 2,
    tag: 'OXYGEN GYM',
    title: 'A living instrument for reading territory.',
    image: '/images/projects/image3.jpg',
    layout: 'column-right',
    parallaxSpeed: -0.15,
  },
  {
    id: 3,
    tag: 'OXYGEN GYM',
    title: 'Seize the unexpected: the invisible, made visible.',
    image: '/images/projects/image2.jpg',
    layout: 'full-span',
    parallaxSpeed: 0.08,
  },
    {
    id: 4,
    tag: 'OXYGEN GYM',
    title: 'Where taste meets meaning.',
    image: '/images/projects/image11.jpg',
    layout: 'column-left',
    parallaxSpeed: 0.12,
  },
  {
    id: 5,
    tag: 'OXYGEN GYM',
    title: 'A living instrument for reading territory.',
    image: '/images/projects/image5.jpg',
    layout: 'column-right',
    parallaxSpeed: -0.15,
  },
  {
    id: 6,
    tag: 'OXYGEN GYM',
    title: 'Seize the unexpected: the invisible, made visible.',
    image: '/images/projects/image14.jpg',
    layout: 'full-span',
    parallaxSpeed: 0.08,
  },
     {
    id: 7,
    tag: 'SOGO',
    title: 'Where taste meets meaning.',
    image: '/images/projects/image13.png',
    layout: 'column-left',
    parallaxSpeed: 0.12,
  },
  {
    id: 8,
    tag: 'ENGRO',
    title: 'A living instrument for reading territory.',
    image: '/images/projects/image10.png',
    layout: 'column-right',
    parallaxSpeed: -0.15,
  },
  {
    id: 9,
    tag: 'APKI SAHULAT',
    title: 'Seize the unexpected: the invisible, made visible.',
    image: '/images/projects/image6.png',
    layout: 'full-span',
    parallaxSpeed: 0.08,
  },
];

export default function ProjectShowcase() {
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. Parallax and Reveal Animations
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');

      cards.forEach((card) => {
        const imageWrapper = card.querySelector('.project-media-inner');
        const textWrapper = card.querySelector('.project-header');
        const speed = parseFloat(card.dataset.speed) || 0.1;

        // Subtle vertical parallax movement on image container
        gsap.to(imageWrapper, {
          y: () => speed * 250,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Entrance fade & slide-up for titles
        gsap.fromTo(
          textWrapper,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <section className="showcase-section" ref={containerRef}>
      <div className="showcase-grid">
        {projects.map((project) => (
          <article
            key={project.id}
            className={`project-card ${project.layout}`}
            data-speed={project.parallaxSpeed}
          >
            <header className="project-header">
              <span className="project-tag">{project.tag}</span>
              <h2 className="project-title">{project.title}</h2>
            </header>

            <div className="project-media-frame">
              <div className="project-media-inner">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="project-image"
                  priority={project.id === 1}
                />
                <button className="project-badge" aria-label="Explore Project">
                  <span>EXPLORE</span>
                  <span className="badge-arrow">→</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}