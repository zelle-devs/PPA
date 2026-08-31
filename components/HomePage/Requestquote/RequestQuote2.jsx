'use client'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import './Requestquote2.css'

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

const RequestQuote2 = ({
  eyebrow = defaultContent.eyebrow,
  headline = defaultContent.headline,
  body = defaultContent.body,
  primaryCta = defaultContent.primaryCta,
  secondaryCta = defaultContent.secondaryCta,
}) => {
  return (
    <section className="ppa-requestquote2">
      <div className="container2">
        <div className="ppa-requestquote2-grid">
          {/* Eyebrow + Headline */}
          <motion.div
            className="ppa-requestquote2-text"
            {...fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ppa-requestquote2-eyebrow-wrapper">
              <span className="ppa-requestquote2-eyebrow-line"></span>
              <span className="ppa-requestquote2-eyebrow">{eyebrow}</span>
            </div>
            <h2 className="ppa-requestquote2-title">
              <span className="ppa-requestquote2-title-light">{headline[0]}</span>
              <span className="ppa-requestquote2-title-accent">{headline[1]}</span>
            </h2>
          </motion.div>

          {/* Top-right image capsule */}
          <motion.div
            className="ppa-requestquote2-image-capsule ppa-requestquote2-image-capsule-lg"
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image 
              src="/pattern2.png" 
              alt="Print Production" 
              className="ppa-requestquote2-image"
              width={600}
              height={300}
              unoptimized={true}
            />
            {/* <div className="ppa-requestquote2-image-overlay"></div>
            <span className="ppa-requestquote2-image-label">Print Production</span> */}
          </motion.div>

          {/* Bottom-left image capsule */}
          <motion.div
            className="ppa-requestquote2-image-capsule ppa-requestquote2-image-capsule-sm"
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image 
              src="/pattern2.png" 
              alt="Packaging" 
              className="ppa-requestquote2-image"
              width={400}
              height={200}
              unoptimized={true}
            />
            {/* <div className="ppa-requestquote2-image-overlay"></div>
            <span className="ppa-requestquote2-image-label">Packaging</span> */}
          </motion.div>

          {/* Body copy + CTAs */}
          <motion.div
            className="ppa-requestquote2-action"
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="ppa-requestquote2-body">{body}</p>
            <div className="ppa-requestquote2-ctas">
              <a href={primaryCta.href} className="btn btn-primary ppa-requestquote2-btn-primary">
                {primaryCta.label} <ArrowRight size={16} />
              </a>
              <a href={secondaryCta.href} className="ppa-requestquote2-btn-secondary">
                {secondaryCta.label} <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default RequestQuote2