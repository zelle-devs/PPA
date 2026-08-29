'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Printer, Scissors, Box, Layers, Zap } from 'lucide-react'
import Image from 'next/image'
import './ProductionCapabilities.css'

const ProductionCapabilities = () => {
  const capabilities = [
    { id: 1, icon: Printer, title: 'Large Format Printing', desc: 'High-resolution printing for banners, posters, and displays.', color: '#337CC7' },
    { id: 2, icon: Zap, title: 'UV Printing', desc: 'Sharp graphics directly onto metal, wood, glass, acrylic.', color: '#C62F60' },
    { id: 3, icon: Box, title: 'Box Making', desc: 'Custom box manufacturing with precision cutting.', color: '#E8AC49' },
    { id: 4, icon: Scissors, title: 'High-Speed Cutting', desc: 'Automated cutting for accurate and fast production.', color: '#23366D' },
    { id: 5, icon: Layers, title: 'Color Matching', desc: 'Consistent color from first sheet to last.', color: '#586692' },
  ]

  const marqueeLogos = [
    '/icon.png', '/logo1.png', '/logo2.png', '/icon.png', '/logo1.png', '/logo2.png',
    '/icon.png', '/logo1.png', '/logo2.png', '/icon.png', '/logo1.png', '/logo2.png',
  ]

  return (
    <section className="ppa-capabilities">
      {/* Top Zigzag Marquee - Right to Left */}
<div className="ppa-capabilities-marquee ppa-capabilities-marquee-top">
  <div className="ppa-capabilities-marquee-track ppa-capabilities-track-rtl">
    {[...marqueeLogos, ...marqueeLogos].map((logo, index) => (
      <div key={index} className="ppa-capabilities-marquee-item">
        <Image src={logo} alt="Logo" width={70} height={70} unoptimized={true} className="ppa-capabilities-marquee-logo" />
        {/* <span className="ppa-capabilities-marquee-dot" style={{ background: index % 3 === 0 ? '#337CC7' : index % 3 === 1 ? '#C62F60' : '#E8AC49' }}></span> */}
      </div>
    ))}
  </div>
</div>

      {/* Main Content */}
      <div className="container2">
        <div className="ppa-capabilities-content">
          {/* Header */}
          <motion.div 
            className="ppa-capabilities-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ppa-capabilities-eyebrow-wrapper">
              <span className="ppa-capabilities-eyebrow-line"></span>
              <span className="ppa-capabilities-eyebrow">Production capabilities</span>
              <span className="ppa-capabilities-eyebrow-line"></span>
            </div>

            <h2 className="ppa-capabilities-title">
              Machines That Make It <span className="ppa-capabilities-title-accent">at Scale.</span>
            </h2>

            <p className="ppa-capabilities-body">
              We run large-format and advanced UV printers, box-making machines, and high-speed 
              cutting, with color matching that keeps every run consistent. UV printing puts sharp 
              graphics directly onto metal, wood, glass, acrylic, and finished products, and our 
              team handles wall printing, Panaflex, signage, and on-site fitting and installation. 
              Big ideas, backed by machines that can make them at scale.
            </p>

            <div className="ppa-capabilities-cta">
              <a href="/capabilities" className="btn btn-primary ppa-capabilities-btn">
                See Our Capabilities <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Zigzag Marquee - Left to Right */}
<div className="ppa-capabilities-marquee ppa-capabilities-marquee-bottom">
  <div className="ppa-capabilities-marquee-track ppa-capabilities-track-ltr">
    {[...marqueeLogos, ...marqueeLogos].map((logo, index) => (
      <div key={index} className="ppa-capabilities-marquee-item">
        <Image src={logo} alt="Logo" width={70} height={70} unoptimized={true} className="ppa-capabilities-marquee-logo" />
        {/* <span className="ppa-capabilities-marquee-dot" style={{ background: index % 3 === 0 ? '#E8AC49' : index % 3 === 1 ? '#C62F60' : '#337CC7' }}></span> */}
      </div>
    ))}
  </div>
</div>
    </section>
  )
}

export default ProductionCapabilities