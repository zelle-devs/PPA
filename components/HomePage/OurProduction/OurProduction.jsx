'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import './OurProduction.css'

const OurProduction = () => {
  const collageImages = [
    { id: 1, src: '/uk.jpg', alt: 'Print Production', label: 'Print Production' },
    { id: 2, src: '/turkey.jpg', alt: 'Packaging Design', label: 'Packaging Design' },
    { id: 3, src: '/newzealand.jpg', alt: 'Advertising Campaign', label: 'Advertising' },
    { id: 4, src: '/australia.jpg', alt: 'Brand Materials', label: 'Brand Materials' },
    { id: 5, src: '/sweden.jpg', alt: 'Quality Control', label: 'Quality Control' },
    { id: 6, src: '/malaysia.jpg', alt: 'Advertising Campaign', label: 'Advertising' },
  ]

  return (
    <section className="ppa-section2">
      <div className="container2">
        <div className="ppa-section2-wrapper">
          {/* Left Content */}
          <motion.div 
            className="ppa-section2-content"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div 
              className="ppa-section2-eyebrow-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="ppa-section2-eyebrow-line"></span>
              <span className="ppa-section2-eyebrow">Your brand, our production</span>
            </motion.div>

            <motion.h2 
              className="ppa-section2-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Your Brand. <span className="ppa-section2-title-accent">Our Production.</span>
            </motion.h2>

            <motion.p 
              className="ppa-section2-body"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              You bring the brand and the idea. We bring the machines, the materials, 
              and the team to make it real, at any scale. One partner for printing, 
              packaging, and advertising, so nothing gets lost between vendors.
            </motion.p>

            <motion.div 
              className="ppa-section2-cta"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="/approach" className="btn btn-primary ppa-section2-btn">
                How We Work <ArrowRight size={16} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Collage - Diagonal Staircase */}
          <div className="ppa-section2-collage">
            {collageImages.map((image, index) => (
              <motion.div
                key={image.id}
                className={`ppa-section2-card ppa-section2-card-${index + 1}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ 
                  delay: 0.15 * index, 
                  duration: 0.7, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                whileHover={{ 
                  y: -20, 
                  zIndex: 10,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
              >
                <div className="ppa-section2-card-inner">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="ppa-section2-card-img"
                  />
                  
                  {/* Arrow Line - Card se bahar niklegi */}
                  <div className="ppa-section2-arrow-line"></div>
                  
                  {/* Tooltip - Card ke bahar */}
                  <div className="ppa-section2-tooltip">
                    {image.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurProduction