'use client'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Users, Package, TrendingUp, Headset } from 'lucide-react'
import Image from 'next/image'
import './B2BSolutions.css'

const B2BSolutions = () => {
  const points = [
    {
      id: 1,
      icon: Package,
      title: 'One Supplier, Simpler Ordering',
      desc: 'One supplier instead of three, so ordering is simpler.',
      color: '#337CC7',
    },
    {
      id: 2,
      icon: CheckCircle,
      title: 'Consistent Brand Handling',
      desc: 'Your brand handled the same way on every job.',
      color: '#C62F60',
    },
    {
      id: 3,
      icon: TrendingUp,
      title: 'Volume Pricing That Scales',
      desc: 'Volume pricing that improves as you scale.',
      color: '#E8AC49',
    },
    {
      id: 4,
      icon: Headset,
      title: 'A Named Account Contact',
      desc: 'A named contact who knows your account.',
      color: '#23366D',
    },
  ]

  return (
    <section className="ppa-b2b">
      <div className="container2">
        <div className="ppa-b2b-wrapper">
          {/* Left Section - Header + Image */}
          <div className="ppa-b2b-left">
            {/* Header - Left Aligned */}
            <motion.div 
              className="ppa-b2b-header"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="ppa-b2b-eyebrow-wrapper">
                <span className="ppa-b2b-eyebrow-line"></span>
                <span className="ppa-b2b-eyebrow">B2B solutions</span>
              </div>

              <h2 className="ppa-b2b-title">
                One Partner for <span className="ppa-b2b-title-accent">the Whole Job.</span>
              </h2>

              <p className="ppa-b2b-body">
                For agencies, brands, corporate teams, and organizations, PPA replaces 
                a whole list of specialized vendors with one complete production ecosystem. 
                Print, packaging, advertising, UV printing, signage, and installation on 
                one contract, one invoice, and one team that already knows your brand. 
                One partner. Multiple capabilities. From concept to completion.
              </p>
            </motion.div>

            {/* Vertical Rectangle Image */}
            <motion.div
              className="ppa-b2b-image-wrapper"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
            >
              <Image 
                src="/sweden.jpg" 
                alt="B2B Solutions"
                className="ppa-b2b-image"
                width={400}
                height={500}
                unoptimized={true}
              />
              <div className="ppa-b2b-image-overlay" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(35,54,109,0.4) 100%)' }}></div>
              <div className="ppa-b2b-image-badge">
                <Users size={24} color="#FFFFFF" strokeWidth={1.5} />
              </div>
            </motion.div>
          </div>

          {/* Right Section - Points List */}
          <div className="ppa-b2b-right">
            {/* Points */}
            <div className="ppa-b2b-points">
              {points.map((point, index) => {
                const Icon = point.icon
                return (
                  <motion.div
                    key={point.id}
                    className="ppa-b2b-point"
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-8%' }}
                    transition={{ 
                      delay: 0.1 * index, 
                      duration: 0.7, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    whileHover={{ x: 10 }}
                  >
                    {/* Connector Line */}
                    {index < points.length - 1 && (
                      <div className="ppa-b2b-point-line"></div>
                    )}
                    
                    {/* Number */}
                    <span className="ppa-b2b-point-number" style={{ color: point.color }}>
                      {String(point.id).padStart(2, '0')}
                    </span>
                    
                    {/* Icon */}
                    <div className="ppa-b2b-point-icon" style={{ background: `${point.color}15`, borderColor: `${point.color}30` }}>
                      <Icon size={22} color={point.color} strokeWidth={1.5} />
                    </div>
                    
                    {/* Content */}
                    <div className="ppa-b2b-point-content">
                      <h4 className="ppa-b2b-point-title">{point.title}</h4>
                      <p className="ppa-b2b-point-desc">{point.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA */}
            <motion.div
              className="ppa-b2b-cta"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="/contact" className="btn btn-primary ppa-b2b-btn">
                Talk to Us <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default B2BSolutions