'use client'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import './Requestquote.css'

// Content lives here, separate from markup — swap copy or wire it to a CMS
// without touching the layout below.
const defaultContent = {
  eyebrow: 'Request a quote',
  headline: ['Ready to Start?', "Let's Talk."],
  body: 'Tell us about your next print, packaging, or advertising job, and we will send back a plan and a quote.',
  primaryCta: { label: 'Request a Quote', href: '/quote' },
  secondaryCta: { label: 'See Our Work', href: '/work' },
}

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
}

const RequestQuote = ({
  eyebrow = defaultContent.eyebrow,
  headline = defaultContent.headline,
  body = defaultContent.body,
  primaryCta = defaultContent.primaryCta,
  secondaryCta = defaultContent.secondaryCta,
}) => {
  return (
    <section className="ppa-requestquote">
      <div className="container">
        <div className="ppa-requestquote-grid">
          {/* Eyebrow + Headline */}
          <motion.div
            className="ppa-requestquote-text"
            {...fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ppa-requestquote-eyebrow-wrapper">
              <span className="ppa-requestquote-eyebrow-line"></span>
              <span className="ppa-requestquote-eyebrow">{eyebrow}</span>
            </div>
            <h2 className="ppa-requestquote-title">
              <span className="ppa-requestquote-title-light">{headline[0]}</span>
              <span className="ppa-requestquote-title-accent">{headline[1]}</span>
            </h2>
          </motion.div>

          {/* Top-right holographic capsule + play button */}
          <motion.div
            className="ppa-requestquote-capsule ppa-requestquote-capsule-lg"
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* <button type="button" className="ppa-requestquote-play" aria-label="Play showreel">
              <span className="ppa-requestquote-play-ring"></span>
              <Play size={18} fill="currentColor" strokeWidth={0} />
            </button> */}
          </motion.div>

          {/* Bottom-left swirl capsule */}
          <motion.div
            className="ppa-requestquote-capsule ppa-requestquote-capsule-sm"
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          ></motion.div>

          {/* Body copy + CTAs */}
          <motion.div
            className="ppa-requestquote-action"
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="ppa-requestquote-body">{body}</p>
            <div className="ppa-requestquote-ctas">
              <a href={primaryCta.href} className="btn btn-primary ppa-requestquote-btn-primary">
                {primaryCta.label} <ArrowRight size={16} />
              </a>
              <a href={secondaryCta.href} className="ppa-requestquote-btn-secondary">
                {secondaryCta.label} <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default RequestQuote