"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection({ data }) {
  const sectionRef = useRef(null);

  const bgImage =
    data?.image ||
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940&auto=format&fit=crop";

  const urgentPhone = data?.urgentPhone || "+92 310 5317868";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power4.out" },
      });

      introTl
        .from(".contact-image", {
          clipPath: "inset(0 100% 0 0)",
          duration: 1.6,
          ease: "power4.inOut",
        })
        .from(".contact-eyebrow", {
          yPercent: 100,
          opacity: 0,
          duration: 0.7,
        }, "-=1.2")
        .from(".contact-line-inner", {
          yPercent: 110,
          duration: 1,
          stagger: 0.1,
        }, "-=0.9")
        .from(".contact-description, .contact-actions", {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
        }, "-=0.7")
        .from(".contact-form", {
          opacity: 0,
          y: 60,
          scale: 0.95,
          clipPath: "inset(0 0 100% 0)",
          duration: 1.1,
          ease: "power4.out",
        }, "-=0.9")
        .from(".contact-form-group", {
          opacity: 0,
          y: 25,
          stagger: 0.07,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.6")
        .fromTo(
  ".contact-submit-btn",
  { opacity: 0, scale: 0.96, y: 15 },
  { opacity: 1, scale: 1, y: 0, duration: 0.5, clearProps: "all" },
  "-=0.3"
);

      gsap.to(".contact-image img", {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const sanitizedValue = value.replace(/[^0-9+\-()\s]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: sanitizedValue,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || "N/A",
      subject: formData.subject,
      message: formData.message,
      agree_pp: true,
    };

    try {
      const response = await fetch("https://ajgrouphqapi.zellehost.com/api/ppa-contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage(error.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="contact-section">
      <div className="contact-image">
       <picture>
  {/* Mobile: <= 768px */}
  <source
    media="(max-width: 768px)"
    srcSet={bgImage.replace(/(\.[^.]+)$/, "-mobile$1")}
  />

  {/* Tablet: 769px - 1000px */}
  <source
    media="(min-width: 769px) and (max-width: 1000px)"
    srcSet={bgImage.replace(/(\.[^.]+)$/, "-tablet$1")}
  />

  {/* Desktop: > 1000px */}
  <img
    src={bgImage}
    alt={data?.imageAlt || "Contact Section Background"}
  />
</picture>
      </div>

      <div className="contact-overlay" />
      <div className="contact-grid" />

      <div className="contact-container">
        <div className="contact-left">
          {data?.eyebrow && (
            <div className="contact-eyebrow-mask">
              <div className="contact-eyebrow">{data.eyebrow}</div>
            </div>
          )}
          <div className="contact-heading-mask">
            <h2 className="contact-line-inner">
              {data?.heading || "Let's connect."}
            </h2>
          </div>

          <p className="contact-description">
            {data?.description ||
              "Have a project in mind, a question about our process, or just want to say hello? We'd love to hear from you."}
          </p>

          {data?.socialLinks && data.socialLinks.length > 0 && (
            <div className="contact-actions">
              {data.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-action-btn"
                  aria-label={link.label || "Social Link"}
                >
                  {link.icon || <span>Icon</span>}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="contact-right">
          {isSubmitted ? (
            <div className="contact-form contact-success-card">
              <div className="check-circle">
                <svg className="checkmark" viewBox="0 0 52 52">
                  <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                  <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
              </div>

              <h3 className="success-title">Thank You!</h3>
              <p className="success-subtitle">
                Your message has been sent successfully. Our team will review your inquiry and get back to you shortly.
              </p>

              <div className="urgent-contact-box">
                <p className="urgent-title">Need an urgent response?</p>
                <p className="urgent-desc">
                  Call our direct line directly at{" "}
                  <a href={`tel:${urgentPhone.replace(/[^0-9+]/g, "")}`} className="urgent-phone-link">
                    {urgentPhone}
                  </a>
                </p>
              </div>

              <button
                type="button"
                className="contact-submit-btn contact-reset-btn"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    company: "",
                    subject: "",
                    message: "",
                  });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {errorMessage && (
                <div className="contact-error-banner">{errorMessage}</div>
              )}

              <div className="contact-form-group">
                <label htmlFor="fullName">Full Name*</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="email">Email Address*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label htmlFor="phone">Phone*</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="Company."
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contact-form-group">
                <label htmlFor="subject">Subject*</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-form-group">
                <label htmlFor="message">Message*</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="contact-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"} <span>→</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}