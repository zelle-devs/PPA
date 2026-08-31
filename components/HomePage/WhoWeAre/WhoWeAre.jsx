'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, FileText, Box, Megaphone, ChevronRight, Folder } from 'lucide-react'
import Image from 'next/image'
import './WhoWeAre.css'

const GRAVITY = 0.6;
const FRICTION = 0.985;
const WALL_BOUNCE = 0.35;
const MOUSE_REPEL_RADIUS = 140;
const MOUSE_REPEL_STRENGTH = 3.4;

const WhoWeAre = () => {
  const [activeFile, setActiveFile] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [ballsInitialized, setBallsInitialized] = useState(false)
  
  const stageRef = useRef(null)
  const ballElRefs = useRef([])
  const physicsRef = useRef([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef(null)
  const isInView = useInView(stageRef, { once: true, margin: "-10%" })

  const companyLogos = [
    { id: 1, name: 'Logo 1', src: '/icon.png', color: '#337CC7' },
    { id: 2, name: 'Logo 2', src: '/logo1.png', color: '#C62F60' },
    { id: 3, name: 'Logo 3', src: '/logo2.png', color: '#E8AC49' },
    { id: 4, name: 'Logo 4', src: '/icon.png', color: '#337CC7' },
    { id: 5, name: 'Logo 5', src: '/logo1.png', color: '#C62F60' },
    { id: 6, name: 'Logo 6', src: '/logo2.png', color: '#E8AC49' },
     { id: 7, name: 'Logo 1', src: '/icon.png', color: '#337CC7' },
    { id: 8, name: 'Logo 2', src: '/logo1.png', color: '#C62F60' },
    { id: 9, name: 'Logo 3', src: '/logo2.png', color: '#E8AC49' },
    { id: 10, name: 'Logo 4', src: '/icon.png', color: '#337CC7' },
  ]

  const folderFiles = [
    { id: 1, icon: FileText, title: 'Print Production', desc: 'High-precision printing for every scale', color: '#337CC7' },
    { id: 2, icon: Box, title: 'Packaging Design', desc: 'Premium packaging that sells your brand', color: '#C62F60' },
    { id: 3, icon: Megaphone, title: 'Advertising', desc: 'Get your brand seen everywhere', color: '#E8AC49' },
  ]

  // Initialize balls when visible
  useEffect(() => {
    if (isInView && !ballsInitialized) {
      setIsVisible(true)
      setBallsInitialized(true)
    }
  }, [isInView, ballsInitialized])

  // Physics loop
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !isVisible) return

const getBallSize = () => {
  if (window.innerWidth <= 350) return 40
  if (window.innerWidth <= 479) return 50
  if (window.innerWidth <= 767) return 70
  return 100
}
   const initBalls = () => {
  const rect = stage.getBoundingClientRect()
  const size = getBallSize()

  const isMobile = window.innerWidth <= 767

  physicsRef.current = companyLogos.map((_, i) => ({
    x: size / 2 + Math.random() * Math.max(rect.width - size, 1),

    y: isMobile
      ? rect.height + size + i * 25
      : -(size + i * 50 + Math.random() * 50),

    vx: (Math.random() - 0.5) * 1.5,
    vy: 0,
  }))
}

    initBalls()

    const loop = () => {
      const rect = stage.getBoundingClientRect()
      const size = getBallSize()
      const r = size / 2
      const data = physicsRef.current
      const mouse = mouseRef.current

      for (let i = 0; i < data.length; i++) {
        const b = data[i]
        b.vy += GRAVITY

        // Mouse repel
        const dx = b.x - mouse.x
        const dy = b.y - mouse.y
        const dist = Math.hypot(dx, dy) || 0.0001
        const range = MOUSE_REPEL_RADIUS + r
        if (dist < range) {
          const force = (1 - dist / range) * MOUSE_REPEL_STRENGTH
          b.vx += (dx / dist) * force
          b.vy += (dy / dist) * force
        }

        b.vx *= FRICTION
        b.vy *= FRICTION
        b.x += b.vx
        b.y += b.vy

        // Wall collisions
        if (b.x - r < 0) {
          b.x = r
          b.vx *= -WALL_BOUNCE
        }
        if (b.x + r > rect.width) {
          b.x = rect.width - r
          b.vx *= -WALL_BOUNCE
        }
        if (b.y + r > rect.height) {
          b.y = rect.height - r
          b.vy *= -WALL_BOUNCE
          if (Math.abs(b.vy) < 0.4) b.vy = 0
        }
      }

      // Ball-to-ball collision
      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          const a = data[i]
          const b = data[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.hypot(dx, dy) || 0.0001
          const minDist = r * 2
          if (dist < minDist) {
            const overlap = (minDist - dist) / 2
            const nx = dx / dist
            const ny = dy / dist
            a.x -= nx * overlap
            a.y -= ny * overlap
            b.x += nx * overlap
            b.y += ny * overlap

            const relVX = b.vx - a.vx
            const relVY = b.vy - a.vy
            const relSpeed = relVX * nx + relVY * ny
            if (relSpeed < 0) {
              const impulse = relSpeed * 0.5
              a.vx += impulse * nx
              a.vy += impulse * ny
              b.vx -= impulse * nx
              b.vy -= impulse * ny
            }
          }
        }
      }

      // Update DOM
      for (let i = 0; i < data.length; i++) {
        const el = ballElRefs.current[i]
        if (el) {
          const b = data[i]
          el.style.transform = `translate3d(${b.x - r}px, ${b.y - r}px, 0)`
        }
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    const handleResize = () => initBalls()
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [isVisible, companyLogos.length])

  const handlePointerMove = (e) => {
    const rect = stageRef.current.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const handlePointerLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 }
  }

  const ActiveIcon = folderFiles[activeFile].icon

  return (
    <section className="ppa-whoweare">
      <div className="container2">
        <div className="ppa-whoweare-wrapper">
          {/* Left Section */}
          <div className="ppa-whoweare-left">
            <motion.div 
              className="ppa-whoweare-content"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="ppa-whoweare-eyebrow-wrapper">
                <span className="ppa-whoweare-eyebrow-line"></span>
                <span className="ppa-whoweare-eyebrow">Who we are</span>
              </div>

              <h2 className="ppa-whoweare-title">
                A Production Partner, <br/><span className="ppa-whoweare-title-accent">Not Just a Printer.</span>
              </h2>

              <p className="ppa-whoweare-body">
                PPA is a B2B production and brand execution house. We design your brand, 
                print it clean, package it to sell, and help it get seen. Some jobs are 
                a single run of flyers. Some are a full product launch, from the box to 
                the billboard. We own the work end to end.
              </p>

              <div className="ppa-whoweare-cta">
                <a href="/about" className="btn btn-primary ppa-whoweare-btn">
                  About PPA <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>

            {/* Ball Pit */}
            <div 
              className="ppa-whoweare-logos" 
              ref={stageRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
            >
              {companyLogos.map((logo, i) => (
                <div
                  key={logo.id}
                  ref={(el) => (ballElRefs.current[i] = el)}
                  className="ppa-whoweare-ball"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    borderColor: `${logo.color}40`,
                  }}
                >
                  <div className="ppa-whoweare-ball-inner" style={{ background: `radial-gradient(circle at 30% 30%, ${logo.color}25, #FFFFFF)` }}>
                    <Image 
                      src={logo.src} 
                      alt={logo.name} 
                      className="ppa-whoweare-ball-img" 
                      width={100} 
                      height={100} 
                      unoptimized={true}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

         {/* Right Section - Desktop Folder */}
<motion.div 
  className="ppa-whoweare-right"
  initial={{ opacity: 0, x: 60 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-10%" }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
>
  <div className="ppa-folder-container">
    <div className="ppa-folder-icon" style={{ minHeight: `${120 + folderFiles.length * 60}px` }}>
      {/* Folder Tab on top */}
      <div className="ppa-folder-tab-top">
        <Folder size={14} />
        <span>PPA Files</span>
      </div>

      {/* Folder Back */}
      <div className="ppa-folder-back"></div>

      {/* Folder Body */}
<div className="ppa-folder-body">
  {/* Files peeking out */}
  <div className="ppa-folder-files-peek">
    {folderFiles.map((file, index) => {
      const FileIcon = file.icon
      return (
        <motion.button
          key={file.id}
          className={`ppa-folder-file-peek ${activeFile === index ? 'active' : ''}`}
          onClick={() => setActiveFile(index)}
          whileTap={{ scale: 0.95 }}
        >
          <div className="ppa-folder-file-peek-icon" style={{ background: `${file.color}15` }}>
            <FileIcon size={16} color={file.color} strokeWidth={1.5} />
          </div>
          <span className="ppa-folder-file-peek-name">{file.title}</span>
          <ChevronRight size={14} className="ppa-folder-file-peek-arrow" />
        </motion.button>
      )
    })}
  </div>
</div>

      {/* Folder Front Flap */}
      <div className="ppa-folder-flap"></div>

      {/* Active File Display - Popup on top */}
      <div className="ppa-folder-active-display" key={activeFile}>
        <div 
          className="ppa-folder-active-display-icon" 
          style={{ 
            background: `${folderFiles[activeFile].color}15`, 
            borderColor: `${folderFiles[activeFile].color}30` 
          }}
        >
          <ActiveIcon size={24} color={folderFiles[activeFile].color} strokeWidth={1.5} />
        </div>
        <h3 className="ppa-folder-active-display-title" style={{ color: folderFiles[activeFile].color }}>
          {folderFiles[activeFile].title}
        </h3>
        <p className="ppa-folder-active-display-desc">
          {folderFiles[activeFile].desc}
        </p>
      </div>
    </div>
  </div>
</motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre