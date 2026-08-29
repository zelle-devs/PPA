'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';
import Image from 'next/image';
import Link from 'next/link';
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs';

const DEFAULT_COMPANY = [
  { name: 'About PPA', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Industries', href: '/industries' },
  { name: 'Careers', href: '/careers' },
];

const DEFAULT_SERVICES = [
  { name: 'Printing', href: '/services/printing' },
  { name: 'UV Printing & Personalization', href: '/services/uv-printing' },
  { name: 'Packaging', href: '/services/packaging' },
  { name: 'Advertising & Branding', href: '/services/advertising' },
  { name: 'Signage & Installation', href: '/services/signage' },
  { name: 'Capabilities', href: '/capabilities' },
];

const DEFAULT_EXPLORE = [
  { name: 'Process', href: '/process' },
  { name: 'Resources', href: '/resources' },
  { name: 'FAQs', href: '/faqs' },
  { name: 'Request a Quote', href: '/contact' },
];

const DEFAULT_SOCIALS = [
  { icon: BsLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: BsInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: BsFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: BsYoutube, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer({
  tagline = 'Print It. Pack It. Get It Seen.',
  company = DEFAULT_COMPANY,
  services = DEFAULT_SERVICES,
  explore = DEFAULT_EXPLORE,
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
      <div className="ppa-footer-top-border"></div>

      <div className="container2">
        <div className="ppa-footer-top">
          {/* Brand Column */}
          <div className="ppa-footer-col ppa-footer-brand">
            <Link href="/" className="ppa-footer-logo">
              <Image
                src="/logo2.png"
                alt="PPA Logo"
                width={130}
                height={40}
                className="ppa-footer-logo-image"
                unoptimized={true}
              />
            </Link>
            <p className="ppa-footer-tagline">{tagline}</p>
            
            <div className="ppa-footer-socials">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="ppa-footer-social-btn" target="_blank" rel="noopener noreferrer">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="ppa-footer-col">
            <div className="ppa-footer-heading-wrapper" onClick={() => toggleSection('company')}>
              <span className="ppa-footer-heading">Company</span>
              <button className="ppa-footer-toggle">
                <ChevronDown size={14} className={`ppa-toggle-icon ${openSection === 'company' ? 'open' : ''}`} />
              </button>
            </div>
            <ul className={`ppa-footer-list ${openSection === 'company' ? 'open' : ''}`}>
              {company.map((c) => (
                <li key={c.name}>
                  <Link href={c.href}>
                    <ChevronRight size={11} />
                    <span>{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="ppa-footer-col">
            <div className="ppa-footer-heading-wrapper" onClick={() => toggleSection('services')}>
              <span className="ppa-footer-heading">Services</span>
              <button className="ppa-footer-toggle">
                <ChevronDown size={14} className={`ppa-toggle-icon ${openSection === 'services' ? 'open' : ''}`} />
              </button>
            </div>
            <ul className={`ppa-footer-list ${openSection === 'services' ? 'open' : ''}`}>
              {services.map((s) => (
                <li key={s.name}>
                  <Link href={s.href}>
                    <ChevronRight size={11} />
                    <span>{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="ppa-footer-col">
            <div className="ppa-footer-heading-wrapper" onClick={() => toggleSection('explore')}>
              <span className="ppa-footer-heading">Explore</span>
              <button className="ppa-footer-toggle">
                <ChevronDown size={14} className={`ppa-toggle-icon ${openSection === 'explore' ? 'open' : ''}`} />
              </button>
            </div>
            <ul className={`ppa-footer-list ${openSection === 'explore' ? 'open' : ''}`}>
              {explore.map((e) => (
                <li key={e.name}>
                  <Link href={e.href}>
                    <ChevronRight size={11} />
                    <span>{e.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="ppa-footer-col ppa-footer-contact">
            <div className="ppa-footer-heading-wrapper" onClick={() => toggleSection('contact')}>
              <span className="ppa-footer-heading">Contact</span>
              <button className="ppa-footer-toggle">
                <ChevronDown size={14} className={`ppa-toggle-icon ${openSection === 'contact' ? 'open' : ''}`} />
              </button>
            </div>
            <ul className={`ppa-footer-contact-list ${openSection === 'contact' ? 'open' : ''}`}>
              <li>
                <MapPin size={13} />
                <span>{address}</span>
              </li>
              <li>
                <Phone size={13} />
                <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
              </li>
              <li>
                <Mail size={13} />
                <a href={`mailto:${email}`}>{email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ppa-footer-bottom">
          <p className="ppa-footer-copyright">
            © {year} Print, Pack & Advertising (PPA). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}