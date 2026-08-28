'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation'
import './Navbar.css'

const Navbar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/portfolio', label: 'Our Portfolio' },
    // { href: '/capabilities', label: 'Capabilities' },
    // { href: '/industries', label: 'Industries' },
    // { href: '/approach', label: 'Approach' },
    // { href: '/leadership', label: 'Leadership' },
    // { href: '/careers', label: 'Careers' },
  ]

  const closeSidebar = () => setIsOpen(false)

  return (
    <>
      <motion.nav 
        className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar-container">
          {/* Logo */}
          <Link href="/" className="navbar-logo" onClick={closeSidebar}>
            <Image 
              src="/logo2.png"
              alt="PPA Logo" 
              className="navbar-logo-img"
              width={180}
              height={60}
              priority
              quality={100}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-menu">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              
              return (
                <motion.div
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.9 + index * 0.07,
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                >
                  <Link 
                    href={link.href}
                    className={`navbar-link ${isActive ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Right Actions */}
          <div className="navbar-actions">
            <Link href="/contact" className="btn btn-primary navbar-cta">
              Get Started
            </Link>
            
            <button 
              className="navbar-toggle"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={closeSidebar}
      />

      {/* Mobile Sidebar */}
      <div className={`navbar-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <Link href="/" className="navbar-logo" onClick={closeSidebar}>
            <Image 
              src="/logo2.png"
              alt="PPA Logo" 
              className="navbar-logo-img"
              width={140}
              height={50}
              priority
              quality={100}
            />
          </Link>
          <button 
            className="sidebar-close"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="sidebar-links">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={closeSidebar}
              >
                {link.label}
              </Link>
            )
          })}

          <Link 
            href="/contact" 
            className="btn btn-primary sidebar-cta"
            onClick={closeSidebar}
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar