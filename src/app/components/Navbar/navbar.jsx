"use client";

import React, { useState } from "react";
import "./style.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* =========================================
          FLOATING NAVBAR (LEFT)
      ========================================= */}
      <header className="site_navbar">
        <a href="/" className="nav_logo">
          <img src="/logo1.png" alt="PPA" />
        </a>

        {/* DESKTOP NAVIGATION */}
        <nav className="nav_links">
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/portfolio">Portfolio</a>
          <a href="/contact">Contact</a>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className="mobile_menu_btn"
          onClick={() => setMenuOpen(true)}
          type="button"
          aria-label="Open menu"
        >
          Menu
        </button>
      </header>

      {/* =========================================
          SEPARATE FLOATING BUTTON (RIGHT)
      ========================================= */}
      <a href="/consultation" className="floating_right_btn">
        Request a Quote
      </a>

      {/* =========================================
          MOBILE MENU OVERLAY
      ========================================= */}
      <div
        className={`mobile_menu_overlay ${menuOpen ? "is-open" : ""}`}
        onClick={closeMenu}
      />

      {/* =========================================
          MOBILE SIDE MENU
      ========================================= */}
      <aside className={`mobile_side_menu ${menuOpen ? "is-open" : ""}`}>
        <div className="mobile_menu_top">
          <a href="/" className="mobile_menu_logo" onClick={closeMenu}>
            <img src="/logo1.png" alt="PPA" />
          </a>

          <button
            className="mobile_close_btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            Close
          </button>
        </div>

        {/* QUOTE ACTION ROW (BEFORE ABOUT, RIGHT-ALIGNED) */}
       
        <nav className="mobile_nav_links">
          <a href="/about" onClick={closeMenu}>About</a>
          <a href="/services" onClick={closeMenu}>Services</a>
          <a href="/portfolio" onClick={closeMenu}>Portfolio</a>
          <a href="/contact" onClick={closeMenu}>Contact</a>
        </nav>
         <div className="mobile_quote_wrapper">
          <a
            href="/consultation"
            className="mobile_quote_btn"
            onClick={closeMenu}
          >
            Request a Quote
          </a>
        </div>


        <div className="mobile_menu_footer">
          <span>PPA</span>
          <span>Print · Pack · Advertising</span>
        </div>
      </aside>
    </>
  );
}