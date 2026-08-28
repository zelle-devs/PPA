'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Printer, Package, Megaphone, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import './PrintingPackagingAdvertising.css'

const sections = [
  {
    id: 1,
    eyebrow: 'Printing',
    title: 'Printing Built for Business.',
    desc: 'Commercial, digital, offset, and large-format printing under one roof. From a small corporate run to a high-volume campaign, we keep color consistent from the first sheet to the last.',
    cta: 'Explore Printing',
    image: '/sweden.jpg',
    color: '#337CC7',
    icon: Printer,
    features: ['Offset Printing', 'Digital Printing', 'Large Format', 'UV Printing'],
    position: 'left',
  },
  {
    id: 2,
    eyebrow: 'Packaging',
    title: 'Packaging That Feels Premium.',
    desc: 'Custom boxes finished to feel premium, from soft-touch coatings to metallic foil and magnetic lids. We design and build packaging that protects your product and makes it worth picking up.',
    cta: 'Explore Packaging',
    image: '/germany.jpg',
    color: '#C62F60',
    icon: Package,
    features: ['Custom Boxes', 'Foil Stamping', 'Soft-Touch Coating', 'Magnetic Lids'],
    position: 'right',
  },
  {
    id: 3,
    eyebrow: 'Advertising and branding',
    title: 'Advertising That Turns Heads.',
    desc: 'Displays, signage, and branded materials that put your product in front of people, indoors and out, at retail, events, and exhibitions.',
    cta: 'Explore Advertising',
    image: '/newzealand.jpg',
    color: '#E8AC49',
    icon: Megaphone,
    features: ['Signage', 'Acrylic Displays', 'Brand Materials', 'Event Installations'],
    position: 'left',
  },
]

const PrintingPackagingAdvertising = () => {
  return (
    <section className="ppa-ppa">
      <div className="container2">
        {/* Vertical Stepper */}
        <div className="ppa-ppa-stepper">
          {/* Center Line */}
          <div className="ppa-ppa-stepper-line"></div>
          <div className="ppa-ppa-stepper-line-glow"></div>

          {sections.map((section, index) => {
            const Icon = section.icon
            const isLeft = section.position === 'left'

            return (
              <div key={section.id} className={`ppa-ppa-row ${isLeft ? 'is-left' : 'is-right'}`}>
                {/* Stepper Node */}
                <div className="ppa-ppa-node" style={{ borderColor: section.color, background: `${section.color}15` }}>
                  <div className="ppa-ppa-node-inner" style={{ background: `linear-gradient(135deg, ${section.color}, ${section.color}CC)` }}>
                    <Icon size={20} color="#FFFFFF" strokeWidth={1.5} />
                  </div>
                  <span className="ppa-ppa-node-pulse" style={{ background: section.color }}></span>
                </div>

                {/* Card */}
                <motion.div
                  className="ppa-ppa-card"
                  initial={{ opacity: 0, x: isLeft ? -80 : 80, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8 }}
                >
                  <div className="ppa-ppa-card-inner" style={{ borderTop: `4px solid ${section.color}` }}>
                    {/* Image Section */}
                    <div className={`ppa-ppa-card-image-wrapper ${!isLeft ? 'image-right' : ''}`}>
                      <Image 
                        src={section.image} 
                        alt={section.title}
                        className="ppa-ppa-card-image"
                        width={400}
                        height={300}
                        unoptimized={true}
                      />
                    </div>

                    {/* Content Section */}
                    <div className="ppa-ppa-card-content">
                      <div className="ppa-ppa-card-eyebrow-wrapper">
                        <span className="ppa-ppa-card-eyebrow-line" style={{ background: section.color }}></span>
                        <span className="ppa-ppa-card-eyebrow" style={{ color: section.color }}>
                          {section.eyebrow}
                        </span>
                      </div>

                      <h3 className="ppa-ppa-card-title">
                        {section.title}
                      </h3>

                      <p className="ppa-ppa-card-desc">
                        {section.desc}
                      </p>

                      {/* Features */}
                      <div className="ppa-ppa-card-features">
                        {section.features.map((feature) => (
                          <div key={feature} className="ppa-ppa-card-feature">
                            <CheckCircle size={14} style={{ color: section.color }} />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <a href="#" className="ppa-ppa-card-cta" style={{ color: section.color }}>
                        {section.cta} <ArrowRight size={15} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PrintingPackagingAdvertising