'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Printer, Package, Megaphone, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import './PrintingPackagingAdvertising2.css'

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

const PrintingPackagingAdvertising2 = () => {
  return (
    <section className="ppa-ppa2">
      <div className="container2">
        {sections.map((section, index) => {
          const Icon = section.icon
          const isLeft = section.position === 'left'

          return (
            <div key={section.id} className={`ppa-ppa2-row ${isLeft ? 'is-left2' : 'is-right2'}`}>
              {/* Image Side */}
              <motion.div
                className="ppa-ppa2-image-side"
                initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="ppa-ppa2-image-wrapper" style={{ borderTop: `4px solid ${section.color}` }}>
                  <Image 
                    src={section.image} 
                    alt={section.title}
                    className="ppa-ppa2-image"
                    width={600}
                    height={400}
                    unoptimized={true}
                  />
                  <div className="ppa-ppa2-image-overlay" style={{ background: `linear-gradient(135deg, ${section.color}20 0%, transparent 60%)` }}></div>
                  
                  {/* Icon Badge */}
                  <div className="ppa-ppa2-icon-badge" style={{ background: `linear-gradient(135deg, ${section.color}, ${section.color}CC)`, borderColor: section.color }}>
                    <Icon size={28} color="#FFFFFF" strokeWidth={1.5} />
                  </div>
                </div>
              </motion.div>

              {/* Content Side */}
              <motion.div
                className="ppa-ppa2-content-side"
                initial={{ opacity: 0, x: isLeft ? 80 : -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="ppa-ppa2-eyebrow-wrapper">
                  <span className="ppa-ppa2-eyebrow-line" style={{ background: section.color }}></span>
                  <span className="ppa-ppa2-eyebrow" style={{ color: section.color }}>
                    {section.eyebrow}
                  </span>
                </div>

                <h3 className="ppa-ppa2-title">
                  {section.title}
                </h3>

                <p className="ppa-ppa2-desc">
                  {section.desc}
                </p>

                {/* Features */}
                <div className="ppa-ppa2-features">
                  {section.features.map((feature) => (
                    <div key={feature} className="ppa-ppa2-feature">
                      <CheckCircle size={15} style={{ color: section.color }} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a href="#" className="ppa-ppa2-cta" style={{ color: section.color }}>
                  {section.cta} <ArrowRight size={15} />
                </a>
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default PrintingPackagingAdvertising2