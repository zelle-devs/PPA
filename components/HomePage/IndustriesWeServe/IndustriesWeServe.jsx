'use client'
import { motion } from 'framer-motion'
import { ArrowRight, ShoppingBag, UtensilsCrossed, Building2, Hotel, HeartPulse, CalendarDays, Sparkles } from 'lucide-react'
import Image from 'next/image'
import './IndustriesWeServe.css'

const IndustriesWeServe = () => {
  const industries = [
    {
      id: 1,
      name: 'Retail & E-commerce',
      image: '/sweden.jpg',
      icon: ShoppingBag,
      color: '#337CC7',
      column: 1,
      size: 'small', // 30%
    },
    {
      id: 2,
      name: 'Food & Beverage',
      image: '/uk.jpg',
      icon: UtensilsCrossed,
      color: '#C62F60',
      column: 1,
      size: 'large', // 70%
    },
    {
      id: 3,
      name: 'Corporate & B2B',
      image: '/turkey.jpg',
      icon: Building2,
      color: '#E8AC49',
      column: 2,
      size: 'xsmall', // 20%
    },
    {
      id: 4,
      name: 'Hospitality',
      image: '/germany.jpg',
      icon: Hotel,
      color: '#23366D',
      column: 2,
      size: 'xlarge', // 60%
    },
    {
      id: 5,
      name: 'Healthcare',
      image: '/australia.jpg',
      icon: HeartPulse,
      color: '#586692',
      column: 2,
      size: 'xsmall', // 20%
    },
    {
      id: 6,
      name: 'Events & Exhibitions',
      image: '/newzealand.jpg',
      icon: CalendarDays,
      color: '#969FBB',
      column: 3,
      size: 'large', // 70%
    },
    {
      id: 7,
      name: 'D2C Brands',
      image: '/malaysia.jpg',
      icon: Sparkles,
      color: '#337CC7',
      column: 3,
      size: 'small', // 30%
    },
  ]

  // Group by column
  const columns = [
    industries.filter(i => i.column === 1),
    industries.filter(i => i.column === 2),
    industries.filter(i => i.column === 3),
  ]

  return (
    <section className="ppa-industries">
      <div className="container2">
        {/* Header - Centered */}
        <motion.div 
          className="ppa-industries-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ppa-industries-eyebrow-wrapper">
            <span className="ppa-industries-eyebrow-line"></span>
            <span className="ppa-industries-eyebrow">Industries we serve</span>
            <span className="ppa-industries-eyebrow-line"></span>
          </div>

          <h2 className="ppa-industries-title">
            We Work Across <span className="ppa-industries-title-accent">Many Sectors.</span>
          </h2>

          <p className="ppa-industries-body">
            From new D2C brands to full corporate rollouts, we print, pack, and promote 
            for teams in many fields. Whatever you make, we help it get noticed and remembered.
          </p>

          <div className="ppa-industries-cta">
            <a href="/industries" className="btn btn-primary ppa-industries-btn">
              See Industries <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        {/* Masonry Grid */}
        
        <div className="ppa-industries-masonry">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className={`ppa-industries-column ppa-industries-col-${colIndex + 1}`}>
              {column.map((industry, index) => {
                const Icon = industry.icon
                return (
                  <motion.div
                    key={industry.id}
                    className={`ppa-industries-card ppa-industries-card-${industry.size}`}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-8%' }}
                    transition={{ 
                      delay: 0.1 * (colIndex + index), 
                      duration: 0.7, 
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                  >
                    <div className="ppa-industries-card-inner">
                      <Image 
                        src={industry.image} 
                        alt={industry.name}
                        className="ppa-industries-card-image"
                        width={400}
                        height={500}
                        unoptimized={true}
                      />
                      <div className="ppa-industries-card-overlay" style={{ background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.8) 100%)` }}></div>
                      
                      {/* Color accent glow */}
                      <div className="ppa-industries-card-glow" style={{ background: `radial-gradient(circle at 50% 50%, ${industry.color}30 0%, transparent 60%)` }}></div>
                      
                      {/* Icon Badge */}
                      <div className="ppa-industries-card-icon" style={{ background: `linear-gradient(135deg, ${industry.color}, ${industry.color}CC)`, borderColor: industry.color }}>
                        <Icon size={20} color="#FFFFFF" strokeWidth={1.5} />
                      </div>

                      {/* Name - Bottom */}
                      <div className="ppa-industries-card-name-wrapper">
                        <span className="ppa-industries-card-name-line" style={{ background: industry.color }}></span>
                        <h3 className="ppa-industries-card-name">
                          {industry.name}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>
       
      </div>
    </section>
  )
}

export default IndustriesWeServe