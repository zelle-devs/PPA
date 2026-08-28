'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import './Footer.css';
import Image from 'next/image';
import Link from 'next/link';
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs';

const DEFAULT_COMPANIES = [
  { name: 'About PPA', href: '/company-one' },
  { name: 'Portfolio', href: '/company-two' },
  { name: 'Industries', href: '/company-three' },
  { name: 'Careers', href: '/company-four' },
];

const DEFAULT_LINKS = [
  { name: 'About', href: '/about' },
  { name: 'Capabilities', href: '/capabilities' },
  { name: 'Industries', href: '/industries' },
  { name: 'Approach', href: '/approach' },
  { name: 'Leadership', href: '/leadership' },
  { name: 'Careers', href: '/careers' },
];

const DEFAULT_SOCIALS = [
  { icon: BsLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: BsInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: BsFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: BsYoutube, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer({
  description = 'Print It. Pack It. Get It Seen.',
  companies = DEFAULT_COMPANIES,
  links = DEFAULT_LINKS,
  phone = '+92 21 111 254 111',
  email = 'hello@ppa.com',
  address = 'PPA House, Main Boulevard, Karachi 74900, Pakistan',
  socials = DEFAULT_SOCIALS,
}) {
  const year = new Date().getFullYear();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  return (
    <footer className="ppa-footer">
      {/* Top Border Line */}
      <div className="ppa-footer-top-border"></div>

      <div className="container2">
        <div className="ppa-footer-top">
          {/* Brand Column */}
          <div className="ppa-footer-col ppa-footer-brand">
            <Link href="/" className="ppa-footer-logo">
              <Image
                src="/logo2.png"
                alt="PPA Logo"
                width={150}
                height={50}
                className="ppa-footer-logo-image"
                unoptimized={true}
              />
            </Link>
            <p className="ppa-footer-desc">{description}</p>
            
            {/* Socials */}
            <div className="ppa-footer-socials">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="ppa-footer-social-btn" target="_blank" rel="noopener noreferrer">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Our Companies */}
          <div className="ppa-footer-col">
            <div className="ppa-footer-heading-wrapper" onClick={() => toggleSection('companies')}>
              <span className="ppa-footer-heading">Our Companies</span>
              <button className="ppa-footer-toggle">
                <ChevronDown size={16} className={`ppa-toggle-icon ${openSection === 'companies' ? 'open' : ''}`} />
              </button>
            </div>
            <ul className={`ppa-footer-list ${openSection === 'companies' ? 'open' : ''}`}>
              {companies.map((c) => (
                <li key={c.name || c}>
                  <Link href={c.href || '/companies'}>
                    <ChevronRight size={12} />
                    <span>{c.name || c}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="ppa-footer-col">
            <div className="ppa-footer-heading-wrapper" onClick={() => toggleSection('links')}>
              <span className="ppa-footer-heading">Quick Links</span>
              <button className="ppa-footer-toggle">
                <ChevronDown size={16} className={`ppa-toggle-icon ${openSection === 'links' ? 'open' : ''}`} />
              </button>
            </div>
            <ul className={`ppa-footer-list ${openSection === 'links' ? 'open' : ''}`}>
              {links.map((l) => (
                <li key={l.name || l}>
                  <Link href={l.href || '/'}>
                    <ChevronRight size={12} />
                    <span>{l.name || l}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="ppa-footer-col ppa-footer-contact">
            <div className="ppa-footer-heading-wrapper" onClick={() => toggleSection('contact')}>
              <span className="ppa-footer-heading">Get In Touch</span>
              <button className="ppa-footer-toggle">
                <ChevronDown size={16} className={`ppa-toggle-icon ${openSection === 'contact' ? 'open' : ''}`} />
              </button>
            </div>
            <ul className={`ppa-footer-contact-list ${openSection === 'contact' ? 'open' : ''}`}>
              <li>
                <Phone size={14} />
                <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
              </li>
              <li>
                <Mail size={14} />
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <MapPin size={14} />
                <span>{address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ppa-footer-bottom">
          <p className="ppa-footer-copyright">
            © {year} PPA. All rights reserved.
          </p>
          <div className="ppa-footer-bottom-links">
            <Link href="/privacy">Privacy Policy</Link>
            <span className="ppa-footer-dot">•</span>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}