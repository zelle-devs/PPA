'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, FileText, PenTool, Package, Factory, Sparkles, Truck } from 'lucide-react'
import Image from 'next/image'
import './FromDesignToDelivery.css'

const GRAVITY = 0.5;
const FRICTION = 0.985;
const WALL_BOUNCE = 0.35;
const MOUSE_REPEL_RADIUS = 120;
const MOUSE_REPEL_STRENGTH = 3;

const FromDesignToDelivery = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [ballsInitialized, setBallsInitialized] = useState(false)
  
  const stageRef = useRef(null)
  const ballElRefs = useRef([])
  const physicsRef = useRef([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef(null)
  const isInView = useInView(stageRef, { once: true, margin: "-10%" })

  const steps = [
    { id: 1, icon: FileText, title: 'Brief', desc: 'We learn your brand, product, and goal.', color: '#337CC7' },
    { id: 2, icon: PenTool, title: 'Design', desc: 'We design the print, pack, or display.', color: '#C62F60' },
    { id: 3, icon: Package, title: 'Sample', desc: 'We make a physical sample you can see and feel.', color: '#E8AC49' },
    { id: 4, icon: Factory, title: 'Production', desc: 'We print and build the full run.', color: '#337CC7' },
    { id: 5, icon: Sparkles, title: 'Finishing', desc: 'We add foil, texture, and special finishes.', color: '#C62F60' },
    { id: 6, icon: Truck, title: 'Delivery', desc: 'We pack it up and get it to you on time.', color: '#E8AC49' },
  ]

const marqueeItems = [
  { text: 'PRINT', logo: '/icon.png', color: '#337CC7' },
  { text: 'PACK', logo: '/logo1.png', color: '#C62F60' },
  { text: 'ADVERTISE', logo: '/logo2.png', color: '#E8AC49' },
  { text: 'DESIGN', logo: '/icon.png', color: '#23366D' },
  { text: 'DELIVER', logo: '/logo1.png', color: '#586692' },
  { text: 'CREATE', logo: '/logo2.png', color: '#969FBB' },
]

  const ballLogos = [
  { id: 1, src: '/icon.png', color: '#337CC7' },
  { id: 2, src: '/logo1.png', color: '#C62F60' },
  { id: 3, src: '/logo2.png', color: '#E8AC49' },
  { id: 4, src: '/icon.png', color: '#23366D' },
  { id: 5, src: '/logo1.png', color: '#586692' },
  { id: 6, src: '/logo2.png', color: '#969FBB' },
  { id: 7, src: '/icon.png', color: '#337CC7' },
  { id: 8, src: '/logo1.png', color: '#C62F60' },
  { id: 9, src: '/logo2.png', color: '#E8AC49' },
  { id: 10, src: '/icon.png', color: '#23366D' },
]

  // Initialize balls
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

    const getBallSize = () => 120

    const initBalls = () => {
      const rect = stage.getBoundingClientRect()
      const size = getBallSize()
      physicsRef.current = ballLogos.map((_, i) => ({
        x: size/2 + Math.random() * Math.max(rect.width - size, 1),
        y: -(size + i * 40 + Math.random() * 40),
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

        if (b.x - r < 0) { b.x = r; b.vx *= -WALL_BOUNCE; }
        if (b.x + r > rect.width) { b.x = rect.width - r; b.vx *= -WALL_BOUNCE; }
        if (b.y + r > rect.height) {
          b.y = rect.height - r
          b.vy *= -WALL_BOUNCE
          if (Math.abs(b.vy) < 0.4) b.vy = 0
        }
      }

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
          }
        }
      }

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
  }, [isVisible, ballLogos.length])

  const handlePointerMove = (e) => {
    const rect = stageRef.current.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const handlePointerLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 }
  }

  return (
    <section className="ppa-fdtd">
      <div className="container2">
        {/* Header */}
        <motion.div 
          className="ppa-fdtd-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ppa-fdtd-eyebrow-wrapper">
            <span className="ppa-fdtd-eyebrow-line"></span>
            <span className="ppa-fdtd-eyebrow">How it works</span>
            <span className="ppa-fdtd-eyebrow-line"></span>
          </div>

          <h2 className="ppa-fdtd-title">
            From <span className="ppa-fdtd-title-accent">Design</span> to Delivery.
          </h2>

          <p className="ppa-fdtd-body">
            A clear path from a rough idea to a finished product, with a physical sample 
            before we ever run the full job. You see and approve the work at every step.
          </p>

          <div className="ppa-fdtd-cta">
            <a href="/process" className="btn btn-primary ppa-fdtd-btn">
              See Our Process <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        {/* Main Container with Background Image */}
        <motion.div
          className="ppa-fdtd-main"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background Image */}
          <div className="ppa-fdtd-bg">
            <Image src="/bg-pattern.png" alt="Background" className="ppa-fdtd-bg-img" width={1200} height={600} unoptimized={true} />
            {/* <div className="ppa-fdtd-overlay" style={{ background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.1)' }}></div> */}
          </div>

         {/* Marquee Top */}
<div className="ppa-fdtd-marquee">
  <div className="ppa-fdtd-marquee-track">
    {[...marqueeItems, ...marqueeItems].map((item, index) => (
      <div key={index} className="ppa-fdtd-marquee-item">
        <span className="ppa-fdtd-marquee-text" style={{ color: item.color }}>
          {item.text}
        </span>
        {item.logo && (
          <Image 
            src={item.logo} 
            alt={item.text} 
            className="ppa-fdtd-marquee-logo"
            width={50} 
            height={50} 
            unoptimized={true}
          />
        )}
        <span className="ppa-fdtd-marquee-dot" style={{ background: item.color }}></span>
      </div>
    ))}
  </div>
</div>

          {/* Ball Pit Container */}
          <div 
            className="ppa-fdtd-ballpit" 
            ref={stageRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            {ballLogos.map((logo, i) => (
              <div
                key={logo.id}
                ref={(el) => (ballElRefs.current[i] = el)}
                className="ppa-fdtd-ball"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  borderColor: `${logo.color}50`,
                }}
              >
                <div className="ppa-fdtd-ball-inner" style={{ background: `radial-gradient(circle at 30% 30%, ${logo.color}20, #FFFFFF)` }}>
                  <Image src={logo.src} alt="Logo" className="ppa-fdtd-ball-img" width={60} height={60} unoptimized={true} />
                </div>
              </div>
            ))}
          </div>

          {/* Steps - Right Side */}
          <div className="ppa-fdtd-steps">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.id}
                  className="ppa-fdtd-step"
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ delay: 0.1 * index, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: -6 }}
                >
                  <div className="ppa-fdtd-step-icon" style={{ background: `${step.color}20`, borderColor: `${step.color}40` }}>
                    <Icon size={16} color={step.color} strokeWidth={1.5} />
                  </div>
                  <div className="ppa-fdtd-step-content">
                    <span className="ppa-fdtd-step-number" style={{ color: step.color }}>
                      {String(step.id).padStart(2, '0')}
                    </span>
                    <h4 className="ppa-fdtd-step-title">{step.title}</h4>
                    <p className="ppa-fdtd-step-desc">{step.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FromDesignToDelivery