'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, ArrowUpRight, Sparkles, Tag } from 'lucide-react'
import Image from 'next/image'
import './FeaturedWork.css'

const FeaturedWork = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const sliderRef = useRef(null)

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollDelta, setScrollDelta] = useState(0)

  const projects = [
    {
      id: 1,
      name: 'Luxe Beauty Box',
      client: 'Cosmetics Brand',
      sector: 'Packaging',
      desc: 'Custom rigid box with soft-touch finish and gold foil.',
      image: '/sweden.jpg',
      badge1: 'Packaging',
      badge2: 'Premium',
      bgColor: 'linear-gradient(135deg, #F0F4FA 0%, #DCE5F0 100%)',
      accentColor: '#337CC7',
    },
    {
      id: 2,
      name: 'Retail Launch Display',
      client: 'Tech Company',
      sector: 'Advertising',
      desc: 'Retail display stand and window graphics for a product launch.',
      image: '/germany.jpg',
      badge1: 'Advertising',
      badge2: 'Retail',
      bgColor: 'linear-gradient(135deg, #FDF0F4 0%, #F5D0DC 100%)',
      accentColor: '#C62F60',
    },
    {
      id: 3,
      name: 'Corporate Rebrand Kit',
      client: 'B2B Enterprise',
      sector: 'Print',
      desc: 'Full print run of brochures, cards, and packaging for a rebrand.',
      image: '/newzealand.jpg',
      badge1: 'Print',
      badge2: 'Rebrand',
      bgColor: 'linear-gradient(135deg, #FDF8EE 0%, #F5E3C0 100%)',
      accentColor: '#E8AC49',
    },
    {
      id: 4,
      name: 'Luxe Beauty Box',
      client: 'Cosmetics Brand',
      sector: 'Packaging',
      desc: 'Custom rigid box with soft-touch finish and gold foil.',
      image: '/sweden.jpg',
      badge1: 'Packaging',
      badge2: 'Premium',
      bgColor: 'linear-gradient(135deg, #F0F4FA 0%, #DCE5F0 100%)',
      accentColor: '#337CC7',
    },
    {
      id: 5,
      name: 'Retail Launch Display',
      client: 'Tech Company',
      sector: 'Advertising',
      desc: 'Retail display stand and window graphics for a product launch.',
      image: '/germany.jpg',
      badge1: 'Advertising',
      badge2: 'Retail',
      bgColor: 'linear-gradient(135deg, #FDF0F4 0%, #F5D0DC 100%)',
      accentColor: '#C62F60',
    },
    {
      id: 6,
      name: 'Corporate Rebrand Kit',
      client: 'B2B Enterprise',
      sector: 'Print',
      desc: 'Full print run of brochures, cards, and packaging for a rebrand.',
      image: '/newzealand.jpg',
      badge1: 'Print',
      badge2: 'Rebrand',
      bgColor: 'linear-gradient(135deg, #FDF8EE 0%, #F5E3C0 100%)',
      accentColor: '#E8AC49',
    }
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        setCardsPerView(3)
      } else if (window.innerWidth > 767) {
        setCardsPerView(2)
      } else {
        setCardsPerView(1)
      }
      setCurrentIndex(0)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, projects.length - cardsPerView)

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
  }

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  const canNext = currentIndex < maxIndex
  const canPrev = currentIndex > 0

  // Touch and Mouse Drag Handlers
  const handleDragStart = (e) => {
    setIsDragging(true)
    setStartX(e.clientX || e.touches?.[0]?.clientX || 0)
    setScrollDelta(0)
  }

  const handleDragMove = (e) => {
    if (!isDragging) return
    const currentX = e.clientX || e.touches?.[0]?.clientX || 0
    const delta = currentX - startX
    setScrollDelta(delta)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    if (scrollDelta < -50 && canNext) {
      handleNext()
    } else if (scrollDelta > 50 && canPrev) {
      handlePrev()
    }
    setScrollDelta(0)
  }

  return (
    <section className="ppa-featured">
      <div className="container2">
        <div className="ppa-featured-top">
          <motion.div 
            className="ppa-featured-header"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ppa-featured-eyebrow-wrapper">
              <span className="ppa-featured-eyebrow-line"></span>
              <span className="ppa-featured-eyebrow">Featured work</span>
            </div>

            <h2 className="ppa-featured-title">
              A Look at What <span className="ppa-featured-title-accent">We Make.</span>
            </h2>

            <p className="ppa-featured-body">
              A few recent projects across print, packaging, and advertising. Every one 
              started as an idea and ended as something you can hold, open, or walk past 
              on the street.
            </p>

            <div className="ppa-featured-cta">
              <a href="/work" className="btn btn-primary ppa-featured-btn">
                See All Work <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

          {projects.length > cardsPerView && (
            <div className="ppa-featured-arrows">
              <button 
                className={`ppa-featured-arrow ${!canPrev ? 'disabled' : ''}`}
                onClick={handlePrev}
                disabled={!canPrev}
                aria-label="Previous"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                className={`ppa-featured-arrow ${!canNext ? 'disabled' : ''}`}
                onClick={handleNext}
                disabled={!canNext}
                aria-label="Next"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>

        <div 
          className="ppa-featured-slider-wrapper"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div 
            className="ppa-featured-slider"
            ref={sliderRef}
            style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="ppa-featured-card-wrapper"
              >
                <div className="ppa-featured-card" style={{ background: project.bgColor }}>
                  <div className="ppa-featured-card-top">
                    <div className="ppa-featured-card-badges">
                      <span className="ppa-featured-card-badge" style={{ background: `${project.accentColor}15`, color: project.accentColor, borderColor: `${project.accentColor}30` }}>
                        <Tag size={10} />
                        {project.badge1}
                      </span>
                      <span className="ppa-featured-card-badge" style={{ background: `${project.accentColor}10`, color: project.accentColor, borderColor: `${project.accentColor}20` }}>
                        <Sparkles size={10} />
                        {project.badge2}
                      </span>
                    </div>
                    <div className="ppa-featured-card-icon" style={{ background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}CC)` }}>
                      <ArrowUpRight size={18} color="#FFFFFF" />
                    </div>
                  </div>

                  <div className="ppa-featured-card-content">
                    <span className="ppa-featured-card-client" style={{ color: project.accentColor }}>
                      {project.client}
                    </span>
                    <h3 className="ppa-featured-card-title">
                      {project.name}
                    </h3>
                    <p className="ppa-featured-card-desc">
                      {project.desc}
                    </p>
                  </div>

                  <div className="ppa-featured-card-image-wrapper">
                    <Image 
                      src={project.image} 
                      alt={project.name}
                      className="ppa-featured-card-image"
                      width={400}
                      height={300}
                      unoptimized={true}
                    />
                    <div className="ppa-featured-card-image-overlay" style={{ background: `linear-gradient(180deg, transparent 0%, ${project.accentColor}15 100%)` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedWork