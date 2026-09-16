'use client'

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: "01",
    badge: "PRINT THAT GETS NOTICED & REMEMBERED",
    title: "Put it on paper.\nMake it count.",
    description:
      "Whatever the format, your print is part of your brand. We make sure it looks the part.",
    offerings: [
      "Business cards",
      "Brochures",
      "Catalogues",
      "Corporate stationery",
      "Marketing material",
      "Large-format graphics",
    ],
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    testimonial: {
      quote:
        "“Flawless finishes and textures that immediately set our physical brand apart.”",
      author: "James Martin",
      role: "Creative Director",
    },
  },
  {
    id: "02",
    badge: "PROTECT IT. PRESENT IT.",
    title: "What's inside matters.\nSo does what's outside.",
    description:
      "A box isn't just a box. It's the first thing someone sees, touches, and remembers. We turn packaging into part of the product experience.",
    offerings: [
      "Product Packaging",
      "Custom Mailers",
      "Rigid Gift Boxes",
      "Eco-friendly Sleeves",
      "Embossed Finishes",
      "Unboxing Inserts",
    ],
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
    testimonial: {
      quote:
        "“Our unboxing experience became an instant social media hit. Sales spiked by 35%.”",
      author: "Sarah Lin",
      role: "Head of Product",
    },
  },
  {
    id: "03",
    badge: "BIG, BOLD, PHYSICAL.",
    title: "It should look the part.\nMake it count.",
    description:
      "From signage and displays to outdoor advertising and event installations, we turn your identity into something people can actually see.",
    offerings: [
      "Storefront signage",
      "Wall graphics",
      "Retail displays",
      "Billboards",
      "Event installations",
      "Wayfinding & Signs",
    ],
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
    testimonial: {
      quote:
        "“High-visibility outdoor displays that captured the city’s attention from day one.”",
      author: "Marcus Vance",
      role: "Brand Director",
    },
  },
];

export default function ServicesContainerSection() {
  const containerRef = useRef(null);
  const slidesWrapperRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray(".service_container_section_slide");

    // Pin duration barhane ke liye multiplier brha dein (e.g. 150% ya 200%)
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: containerRef.current,
    start: "top top",
    end: () => `+=${slides.length * 150}%`, // Scroll length barha di
    pin: true,
    scrub: 1,
    anticipatePin: 1,
  },
});

slides.forEach((slide, index) => {
  if (index === 0) return;

  // 1. Pehle card screen par stay karega (Hold / Delay)
  tl.to({}, { duration: 0.5 }); // Yeh delay/pause create karega

  // 2. Uske baad agla card stack hoga
  tl.fromTo(
    slide,
    {
      yPercent: 100,
      opacity: 0.85,
    },
    {
      yPercent: 0,
      opacity: 1,
      ease: "power2.out",
      duration: 1,
    },
    `slide-${index}`
  ).to(
    slides[index - 1],
    {
      scale: 0.94 - index * 0.02,
      opacity: 0.4,
      filter: "blur(2px)",
      ease: "power2.out",
      duration: 1,
    },
    `slide-${index}`
  );
});
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="services_container_section" ref={containerRef}>
      <div className="services_stack_wrapper" ref={slidesWrapperRef}>
        {servicesData.map((service, index) => (
          <div
            key={service.id}
            className="service_container_section_slide"
            style={{ zIndex: index + 1 }}
          >
            {/* Left Content Card */}
            <div className="service_content_card">
              <div className="service_card_top">
                <div className="service_badge">
                  <span className="badge_icon">✦</span>
                  <span>{service.badge}</span>
                </div>
                <span className="slide_number">{service.id}</span>
              </div>

              <div className="service_main_text">
                <h2 className="service_title">
                  {service.title.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i === 0 && <br />}
                    </React.Fragment>
                  ))}
                </h2>
                <p className="service_description">{service.description}</p>
              </div>

              <div className="service_offerings_block">
                <span className="offerings_label">What we offer</span>
                <div className="offerings_chips">
                  {service.offerings.map((item, idx) => (
                    <span key={idx} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <button type="button" className="service_cta_btn">
                Get Started
              </button>
            </div>

            {/* Right Media Card */}
            <div className="service_media_card">
              <img
                src={service.image}
                alt={service.title}
                className="service_media_img"
              />

              {/* Floating Glassmorphic Card */}
              <div className="floating_glass_card">
                <div className="glass_stars">★★★★★</div>
                <p className="glass_quote">{service.testimonial.quote}</p>
                <div className="glass_author">
                  <span className="author_avatar"></span>
                  <div className="author_info">
                    <strong>{service.testimonial.author}</strong>
                    <small>{service.testimonial.role}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}