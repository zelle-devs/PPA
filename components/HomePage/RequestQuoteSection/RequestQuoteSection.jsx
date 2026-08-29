'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import './RequestQuoteSection.css'

const RequestQuoteSection = () => {
  const reduceMotion = useReducedMotion()

  return (
    <section className="rqs-section">
      {/* Dot Zig-Zag Pattern */}
      <div className="rqs-pattern" aria-hidden="true"></div>

      {/* Decorative Background Shapes */}
      <div className="rqs-bg-shapes" aria-hidden="true">
        <div className="rqs-shape rqs-shape-blue"></div>
        <div className="rqs-shape rqs-shape-magenta"></div>
        <div className="rqs-shape rqs-shape-yellow"></div>
      </div>

      <div className="container2">
        <div className="rqs-wrapper">
          {/* Left - Content */}
          <motion.div
            className="rqs-content"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rqs-eyebrow-wrapper">
              <span className="rqs-eyebrow-line"></span>
              <span className="rqs-eyebrow">Request a quote</span>
            </div>

            <h2 className="rqs-title">
              Ready to Start? <span className="rqs-title-accent">Let's Talk.</span>
            </h2>

            <p className="rqs-body">
              Tell us about your next print, packaging, or advertising job, and we 
              will send back a plan and a quote.
            </p>

            <div className="rqs-buttons">
              <a href="/contact" className="btn btn-primary rqs-btn-primary">
                Request a Quote <ArrowRight size={16} />
              </a>
              <a href="/work" className="btn btn-outline-blue rqs-btn-secondary">
                See Our Work <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>

          {/* Right - Abstract Visual */}
          <motion.div
            className="rqs-visual"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rqs-visual-inner">
              {/* Paper Sheet 1 - Blue */}
              <motion.div
                className="rqs-paper rqs-paper-1"
                animate={reduceMotion ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="rqs-paper-content">
                  <span className="rqs-paper-label" style={{ color: 'var(--color-accent-blue)' }}>PRINT</span>
                  <div className="rqs-paper-lines">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </motion.div>

              {/* Paper Sheet 2 - Magenta */}
              <motion.div
                className="rqs-paper rqs-paper-2"
                animate={reduceMotion ? {} : { y: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <div className="rqs-paper-content">
                  <span className="rqs-paper-label" style={{ color: 'var(--color-accent-magenta)' }}>PACK</span>
                  <div className="rqs-paper-lines">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </motion.div>

              {/* Paper Sheet 3 - Yellow */}
              <motion.div
                className="rqs-paper rqs-paper-3"
                animate={reduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="rqs-paper-content">
                  <span className="rqs-paper-label" style={{ color: 'var(--color-accent-yellow)' }}>ADVERTISE</span>
                  <div className="rqs-paper-lines">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </motion.div>

              {/* Register Marks */}
              <div className="rqs-register-mark rqs-register-top-left"></div>
              <div className="rqs-register-mark rqs-register-top-right"></div>
              <div className="rqs-register-mark rqs-register-bottom-left"></div>
              <div className="rqs-register-mark rqs-register-bottom-right"></div>

              {/* CMYK Dots */}
              <div className="rqs-cmyk-dots">
                <span className="rqs-cmyk-dot" style={{ background: 'var(--color-accent-blue)' }}></span>
                <span className="rqs-cmyk-dot" style={{ background: 'var(--color-accent-magenta)' }}></span>
                <span className="rqs-cmyk-dot" style={{ background: 'var(--color-accent-yellow)' }}></span>
              </div>

              {/* Curved Print Shape */}
              <div className="rqs-print-curve"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default RequestQuoteSection