'use client'
import { useEffect, useMemo, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowRight, Printer, Package, Megaphone } from 'lucide-react'
import Image from 'next/image'
import './WhatWeDo.css'

// ---- single source of truth for the wire's shape (drives BOTH the SVG path and the pin math) ----
const WIRE = {
  width: 1200,
  height: 150,
  p0: { x: 0, y: 25 },
  c1: { x: 300, y: 95 },
  p1: { x: 600, y: 95 },
  c2: { x: 900, y: 95 },
  p2: { x: 1200, y: 25 },
}

const WIRE_PATH = `M ${WIRE.p0.x} ${WIRE.p0.y} Q ${WIRE.c1.x} ${WIRE.c1.y} ${WIRE.p1.x} ${WIRE.p1.y} Q ${WIRE.c2.x} ${WIRE.c2.y} ${WIRE.p2.x} ${WIRE.p2.y}`
const WIRE_PATH_HIGHLIGHT = `M ${WIRE.p0.x} ${WIRE.p0.y - 2} Q ${WIRE.c1.x} ${WIRE.c1.y - 2} ${WIRE.p1.x} ${WIRE.p1.y - 2} Q ${WIRE.c2.x} ${WIRE.c2.y - 2} ${WIRE.p2.x} ${WIRE.p2.y - 2}`

// solve a quadratic bezier for y at a given x (works for any control points)
function bezierYAtX(p0, c, p1, targetX) {
  const a = p0.x - 2 * c.x + p1.x
  const b = 2 * c.x - 2 * p0.x
  const cc = p0.x - targetX
  let t
  if (Math.abs(a) < 1e-6) {
    t = -cc / b
  } else {
    const disc = Math.sqrt(Math.max(b * b - 4 * a * cc, 0))
    const t1 = (-b + disc) / (2 * a)
    const t2 = (-b - disc) / (2 * a)
    t = t1 >= 0 && t1 <= 1 ? t1 : t2
  }
  t = Math.min(1, Math.max(0, t))
  return (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * c.y + t ** 2 * p1.y
}

// function getPinPercent(xFraction) {
//   const targetX = WIRE.width * xFraction
//   const y =
//     targetX <= WIRE.p1.x
//       ? bezierYAtX(WIRE.p0, WIRE.c1, WIRE.p1, targetX)
//       : bezierYAtX(WIRE.p1, WIRE.c2, WIRE.p2, targetX)
//   return {
//     left: (targetX / WIRE.width) * 100,
//     top: (y / WIRE.height) * 100,
//   }
// }

function getPinPercent(xFraction) {
  // Cards ko paas lane ke liye xFraction adjust karo
  const adjustedXFraction = xFraction * 0.85 + 0.075; // Cards center mein tight honge
  const targetX = WIRE.width * adjustedXFraction
  const y =
    targetX <= WIRE.p1.x
      ? bezierYAtX(WIRE.p0, WIRE.c1, WIRE.p1, targetX)
      : bezierYAtX(WIRE.p1, WIRE.c2, WIRE.p2, targetX)
  return {
    left: (targetX / WIRE.width) * 100,
    top: (y / WIRE.height) * 100,
  }
}

const services = [
  {
    id: 1,
    icon: Printer,
    title: 'Print',
    desc: 'Sharp, consistent printing across offset, digital, large-format, and advanced UV, including direct printing and personalization on products and materials.',
    image: '/sweden.jpg',
    color: '#337CC7',
    delay: 0.1,
  },
  {
    id: 2,
    icon: Package,
    title: 'Pack',
    desc: 'Custom packaging and cartons that protect your product and sell it on the shelf.',
    image: '/newzealand.jpg',
    color: '#C62F60',
    delay: 0.2,
  },
  {
    id: 3,
    icon: Megaphone,
    title: 'Advertise',
    desc: 'Branding, signage, acrylic, and displays that get your product seen, produced, fitted, and installed for stores and events.',
    image: '/germany.jpg',
    color: '#E8AC49',
    delay: 0.3,
  },
]

function HangingCard({ service, index, pin }) {
  const Icon = service.icon
  const reduceMotion = useReducedMotion()
  const cardRef = useRef(null)

  // gentle idle sway, like it's hanging in still air — each card slightly out of sync
  const idleRotate = useMotionValue(0)
  const idleY = useMotionValue(0)
  useEffect(() => {
    if (reduceMotion) return
    let frame
    const seed = index * 2.1
    const loop = (t) => {
      const s = t / 1000
    //   idleRotate.set(Math.sin(s * 0.55 + seed) * 1.3)
    //   idleY.set(Math.sin(s * 0.4 + seed) * 3)
    idleRotate.set(Math.sin(s * 1.2 + seed) * 1.5)  // 0.55 → 1.2 (2x faster)
  idleY.set(Math.sin(s * 0.9 + seed) * 3.5)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [idleRotate, idleY, index, reduceMotion])

  // cursor-driven pendulum swing
  const pointerTilt = useMotionValue(0)
  const pointerLift = useMotionValue(0)
//   const springTilt = useSpring(pointerTilt, { stiffness: 140, damping: 9, mass: 0.7 })
//   const springLift = useSpring(pointerLift, { stiffness: 160, damping: 14, mass: 0.6 })
const springTilt = useSpring(pointerTilt, { stiffness: 250, damping: 18, mass: 0.5 })
const springLift = useSpring(pointerLift, { stiffness: 280, damping: 20, mass: 0.4 })

  const rotate = useTransform([idleRotate, springTilt], ([i, p]) => i + p)
  const y = useTransform([idleY, springLift], ([i, p]) => i + p)

  const handlePointerMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    // pointerTilt.set(relX * 16)
    pointerTilt.set(relX * 22)
  }
//   const handlePointerEnter = () => pointerLift.set(-12)
const handlePointerEnter = () => pointerLift.set(0)
  const handlePointerLeave = () => {
    pointerTilt.set(0)
    pointerLift.set(0)
  }

  return (
    <div className="ppa-whatwedo-pin" style={{ '--pin-left': `${pin.left}%`, '--pin-top': `${pin.top}%` }}>
      <motion.div
        ref={cardRef}
        className="ppa-whatwedo-card"
        style={{ rotate, y }}
        initial={{ opacity: 0, y: -60 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ delay: service.delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <div className="ppa-whatwedo-clip">
          <div className="ppa-whatwedo-clip-top"></div>
          <div className="ppa-whatwedo-clip-rod"></div>
        </div>

        <div className="ppa-whatwedo-card-body">
          <div className="ppa-whatwedo-card-image-wrapper">
            <Image
              src={service.image}
              alt={service.title}
              className="ppa-whatwedo-card-image"
              width={300}
              height={200}
              unoptimized
            />
            <div
              className="ppa-whatwedo-card-image-overlay"
              style={{ background: `linear-gradient(180deg, transparent 0%, ${service.color}25 100%)` }}
            ></div>
            {/* <div
              className="ppa-whatwedo-card-icon"
              style={{ background: service.color, borderColor: service.color }}
            >
              <Icon size={20} color="#FFFFFF" strokeWidth={1.5} />
            </div> */}
          </div>

          <div className="ppa-whatwedo-card-content">
            <h3 className="ppa-whatwedo-card-title" style={{ color: service.color }}>
              {service.title}
            </h3>
            <p className="ppa-whatwedo-card-desc">{service.desc}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const WhatWeDo = () => {
  const pins = useMemo(
    () => services.map((_, i) => getPinPercent((2 * i + 1) / (2 * services.length))),
    []
  )

  return (
    <section className="ppa-whatwedo">
      <div className="">
        <motion.div
          className="ppa-whatwedo-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ppa-whatwedo-eyebrow-wrapper">
            <span className="ppa-whatwedo-eyebrow-line"></span>
            <span className="ppa-whatwedo-eyebrow">What we do</span>
            <span className="ppa-whatwedo-eyebrow-line"></span>
          </div>

          <h2 className="ppa-whatwedo-title">
            Print. <span className="ppa-whatwedo-title-accent-blue">Pack.</span>{' '}
            <span className="ppa-whatwedo-title-accent-magenta">Advertise.</span>
          </h2>

          <div className="ppa-whatwedo-cta">
            <a href="/services" className="btn btn-primary ppa-whatwedo-btn">
              See Our Services <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        <div className="ppa-whatwedo-wire-section">
          <div className="ppa-whatwedo-wire-stage">
            <div className="ppa-whatwedo-wire-glow"></div>

            <svg
              className="ppa-whatwedo-wire-svg"
              viewBox={`0 0 ${WIRE.width} ${WIRE.height}`}
              preserveAspectRatio="none"
            >
              <defs>
                {/* <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#337CC7" stopOpacity="0.5" />
                  <stop offset="20%" stopColor="#586692" stopOpacity="0.7" />
                  <stop offset="50%" stopColor="#969FBB" stopOpacity="0.9" />
                  <stop offset="80%" stopColor="#586692" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#337CC7" stopOpacity="0.5" />
                </linearGradient> */}
                <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
  <stop offset="0%" stopColor="#abaeb5" stopOpacity="0.8" />
  <stop offset="100%" stopColor="#abaeb5" stopOpacity="0.8" />
</linearGradient>

                {/* <linearGradient id="wireHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient> */}
                <linearGradient id="wireHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
</linearGradient>
              </defs>

              <path
                d={WIRE_PATH}
                fill="none"
                stroke="url(#wireGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="ppa-whatwedo-wire-path"
              />
              <path
                d={WIRE_PATH_HIGHLIGHT}
                fill="none"
                stroke="url(#wireHighlight)"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.6"
              />
            </svg>

            <div className="ppa-whatwedo-pins">
              {services.map((service, index) => (
                <HangingCard key={service.id} service={service} index={index} pin={pins[index]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhatWeDo

// 'use client'
// import { motion } from 'framer-motion'
// import { ArrowRight, Printer, Package, Megaphone } from 'lucide-react'
// import Image from 'next/image'
// import './WhatWeDo.css'

// const WhatWeDo = () => {
//   const services = [
//     {
//       id: 1,
//       icon: Printer,
//       title: 'Print',
//       desc: 'Sharp, consistent printing across offset, digital, large-format, and advanced UV, including direct printing and personalization on products and materials.',
//       image: '/print.jpg',
//       color: '#337CC7',
//       delay: 0.1,
//     },
//     {
//       id: 2,
//       icon: Package,
//       title: 'Pack',
//       desc: 'Custom packaging and cartons that protect your product and sell it on the shelf.',
//       image: '/pack.jpg',
//       color: '#C62F60',
//       delay: 0.2,
//     },
//     {
//       id: 3,
//       icon: Megaphone,
//       title: 'Advertise',
//       desc: 'Branding, signage, acrylic, and displays that get your product seen, produced, fitted, and installed for stores and events.',
//       image: '/advertise.jpg',
//       color: '#E8AC49',
//       delay: 0.3,
//     },
//   ]

//   return (
//     <section className="ppa-whatwedo">
//       <div className="">
//         {/* Top Content - Centered */}
//         <motion.div 
//           className="ppa-whatwedo-header"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-10%" }}
//           transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <div className="ppa-whatwedo-eyebrow-wrapper">
//             <span className="ppa-whatwedo-eyebrow-line"></span>
//             <span className="ppa-whatwedo-eyebrow">What we do</span>
//             <span className="ppa-whatwedo-eyebrow-line"></span>
//           </div>

//           <h2 className="ppa-whatwedo-title">
//             Print. <span className="ppa-whatwedo-title-accent-blue">Pack.</span> <span className="ppa-whatwedo-title-accent-magenta">Advertise.</span>
//           </h2>

//           <div className="ppa-whatwedo-cta">
//             <a href="/services" className="btn btn-primary ppa-whatwedo-btn">
//               See Our Services <ArrowRight size={16} />
//             </a>
//           </div>
//         </motion.div>

//         {/* Wire with Hanging Cards */}
//         <div className="ppa-whatwedo-wire-section">
//           {/* Wire Glow */}
//           <div className="ppa-whatwedo-wire-glow"></div>
          
//           {/* Premium Wire */}
//           <svg 
//             className="ppa-whatwedo-wire-svg" 
//             viewBox="0 0 1200 120" 
//             preserveAspectRatio="none"
//           >
//             <defs>
//               <linearGradient id="wireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" stopColor="#337CC7" stopOpacity="0.5" />
//                 <stop offset="20%" stopColor="#586692" stopOpacity="0.7" />
//                 <stop offset="50%" stopColor="#969FBB" stopOpacity="0.9" />
//                 <stop offset="80%" stopColor="#586692" stopOpacity="0.7" />
//                 <stop offset="100%" stopColor="#337CC7" stopOpacity="0.5" />
//               </linearGradient>
//               <linearGradient id="wireHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
//                 <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
//                 <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
//               </linearGradient>
//             </defs>
            
//             {/* Main wire */}
//             <path 
//               d="M 0 25 Q 300 95 600 95 Q 900 95 1200 25" 
//               fill="none" 
//               stroke="url(#wireGradient)" 
//               strokeWidth="5" 
//               strokeLinecap="round"
//               className="ppa-whatwedo-wire-path"
//             />
            
//             {/* Wire highlight (top edge) */}
//             <path 
//               d="M 0 23 Q 300 93 600 93 Q 900 93 1200 23" 
//               fill="none" 
//               stroke="url(#wireHighlight)" 
//               strokeWidth="2" 
//               strokeLinecap="round"
//               opacity="0.6"
//             />
//           </svg>

//           {/* Hanging Cards */}
//           <div className="ppa-whatwedo-cards">
//             {services.map((service, index) => {
//               const Icon = service.icon
//               return (
//                 <motion.div
//                   key={service.id}
//                   className={`ppa-whatwedo-card ppa-whatwedo-card-${index + 1}`}
//                   initial={{ opacity: 0, y: -80 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: "-10%" }}
//                   transition={{ 
//                     delay: service.delay, 
//                     duration: 0.8, 
//                     ease: [0.22, 1, 0.36, 1],
//                     type: 'spring',
//                     stiffness: 100,
//                     damping: 15,
//                   }}
//                   whileHover={{ 
//                     y: index === 1 ? 30 : 5,
//                     rotate: index === 0 ? -3 : index === 1 ? 0 : 3,
//                     transition: { 
//                       duration: 0.5, 
//                       ease: [0.22, 1, 0.36, 1] 
//                     }
//                   }}
//                 >
//                   {/* Clip connecting to wire */}
//                   <div className="ppa-whatwedo-clip">
//                     <div className="ppa-whatwedo-clip-top"></div>
//                     <div className="ppa-whatwedo-clip-rod"></div>
//                   </div>

//                   {/* Card Body */}
//                   <div className="ppa-whatwedo-card-body">
//                     {/* Image */}
//                     <div className="ppa-whatwedo-card-image-wrapper">
//                       <Image 
//                         src={service.image} 
//                         alt={service.title}
//                         className="ppa-whatwedo-card-image"
//                         width={300}
//                         height={200}
//                         unoptimized={true}
//                       />
//                       <div className="ppa-whatwedo-card-image-overlay" style={{ background: `linear-gradient(180deg, transparent 0%, ${service.color}20 100%)` }}></div>
//                       <div className="ppa-whatwedo-card-icon" style={{ background: `${service.color}`, borderColor: `${service.color}` }}>
//                         <Icon size={20} color="#FFFFFF" strokeWidth={1.5} />
//                       </div>
//                     </div>

//                     {/* Content */}
//                     <div className="ppa-whatwedo-card-content">
//                       <h3 className="ppa-whatwedo-card-title" style={{ color: service.color }}>
//                         {service.title}
//                       </h3>
//                       <p className="ppa-whatwedo-card-desc">
//                         {service.desc}
//                       </p>
//                     </div>
//                   </div>
//                 </motion.div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default WhatWeDo