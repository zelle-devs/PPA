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
                FLOATING NAVBAR
            ========================================= */}

            <header className="site_navbar">

                <a
                    href="/"
                    className="nav_logo"
                >
                    <img
                        src="/logo1.png"
                        alt="PPA"
                    />
                </a>


                {/* DESKTOP NAVIGATION */}

                <nav className="nav_links">

                    <a href="/about">
                        About
                    </a>

                    <a href="/services">
                        Services
                    </a>

                    <a href="/portfolio">
                        Portfolio
                    </a>

                    <a href="/contact">
                        Contact
                    </a>

                </nav>


                {/* MOBILE MENU BUTTON */}

                <button
                    className="mobile_menu_btn"
                    onClick={() => {
                        setMenuOpen(true)
                    }}
                    type="button"
                    aria-label="Open menu"
                >
                    Menu
                </button>

            </header>


            {/* =========================================
                MOBILE MENU OVERLAY
            ========================================= */}

            <div
                className={`mobile_menu_overlay ${
                    menuOpen ? "is-open" : ""
                }`}
                onClick={closeMenu}
            />


            {/* =========================================
                MOBILE SIDE MENU
            ========================================= */}

            <aside
                className={`mobile_side_menu ${
                    menuOpen ? "is-open" : ""
                }`}
            >

                <div className="mobile_menu_top">

                    <a
                        href="/"
                        className="mobile_menu_logo"
                        onClick={closeMenu}
                    >
                        <img
                            src="/logo1.png"
                            alt="PPA"
                        />
                    </a>


                    <button
                        className="mobile_close_btn"
                        onClick={closeMenu}
                        aria-label="Close menu"
                    >
                        Close
                    </button>

                </div>


                <nav className="mobile_nav_links">

                    <a
                        href="/about"
                        onClick={closeMenu}
                    >
                        {/* <span>01</span> */}
                        About
                    </a>

                    <a
                        href="/services"
                        onClick={closeMenu}
                    >
                        {/* <span>02</span> */}
                        Services
                    </a>

                    <a
                        href="/portfolio"
                        onClick={closeMenu}
                    >
                        {/* <span>03</span> */}
                        Portfolio
                    </a>

                    <a
                        href="/contact"
                        onClick={closeMenu}
                    >
                        {/* <span>04</span> */}
                        Contact
                    </a>

                </nav>


                <div className="mobile_menu_footer">
                    <span>PPA</span>
                    <span>Print · Pack · Advertising</span>
                </div>

            </aside>
        </>
    );
}