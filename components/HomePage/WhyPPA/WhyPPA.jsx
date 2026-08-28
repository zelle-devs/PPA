'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Handshake, Factory, Sparkles, Zap } from 'lucide-react'
import Image from 'next/image'
import './WhyPPA.css'

const WhyPPA = () => {
  const reasons = [
    {
      id: 1,
      icon: Handshake,
      title: 'One Partner, Three Arms',
      desc: 'One partner across all three arms, so your brand stays consistent from print to pack to display.',
      color: '#337CC7',
    },
    {
      id: 2,
      icon: Factory,
      title: 'Real Machines In-House',
      desc: 'Real machines in-house, so we control the quality and the speed.',
      color: '#C62F60',
    },
    {
      id: 3,
      icon: Sparkles,
      title: 'Tactile Quality',
      desc: 'Tactile quality you can feel, from soft-touch finishes to foil and raised detail.',
      color: '#E8AC49',
    },
    {
      id: 4,
      icon: Zap,
      title: 'Fast Turnarounds',
      desc: 'Fast turnarounds for agencies and brands working to a deadline.',
      color: '#23366D',
    },
  ]

  const masonryImages = [
    { id: 1, src: '/sweden.jpg', alt: 'Print Production', color: '#337CC7', height: 'tall' },
    { id: 2, src: '/germany.jpg', alt: 'Packaging', color: '#C62F60', height: 'short' },
    { id: 3, src: '/newzealand.jpg', alt: 'Advertising', color: '#E8AC49', height: 'medium' },
  ]

  return (
    <section className="ppa-whyppa">
      <div className="container2">
        {/* Header - Centered */}
        <motion.div 
          className="ppa-whyppa-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ppa-whyppa-eyebrow-wrapper">
            <span className="ppa-whyppa-eyebrow-line"></span>
            <span className="ppa-whyppa-eyebrow">Why PPA</span>
            <span className="ppa-whyppa-eyebrow-line"></span>
          </div>

          <h2 className="ppa-whyppa-title">
            Creative and Production, <span className="ppa-whyppa-title-accent">Under One Roof.</span>
          </h2>

          <p className="ppa-whyppa-body">
            Most brands juggle a designer, a printer, and a packaging vendor, then hope 
            it all lines up. With PPA, it is one team and one set of machines, from 
            idea to delivery.
          </p>

          <div className="ppa-whyppa-cta">
            <a href="/why-ppa" className="btn btn-primary ppa-whyppa-btn">
              Why PPA <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

        {/* Content - Left Reasons + Right Masonry */}
        <div className="ppa-whyppa-content">
          {/* Left - Reasons */}
          <div className="ppa-whyppa-reasons">
            {reasons.map((reason, index) => {
              const Icon = reason.icon
              return (
                <motion.div
                  key={reason.id}
                  className="ppa-whyppa-reason"
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-8%' }}
                  transition={{ 
                    delay: 0.1 * index, 
                    duration: 0.7, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  whileHover={{ x: 8 }}
                >
                  <div className="ppa-whyppa-reason-icon" style={{ background: `linear-gradient(135deg, ${reason.color}15, ${reason.color}05)`, borderColor: `${reason.color}30` }}>
                    <Icon size={22} color={reason.color} strokeWidth={1.5} />
                  </div>
                  <div className="ppa-whyppa-reason-content">
                    <h3 className="ppa-whyppa-reason-title" style={{ color: reason.color }}>
                      {reason.title}
                    </h3>
                    <p className="ppa-whyppa-reason-desc">
                      {reason.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right - 3 Image Masonry */}
          <div className="ppa-whyppa-masonry">
            {/* Image 1 - Tall */}
            <motion.div
              className="ppa-whyppa-masonry-card ppa-whyppa-card-tall"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
            >
              <div className="ppa-whyppa-masonry-card-inner">
                <Image src={masonryImages[0].src} alt={masonryImages[0].alt} className="ppa-whyppa-masonry-img" width={400} height={500} unoptimized={true} />
                <div className="ppa-whyppa-masonry-overlay" style={{ background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.75) 100%)` }}></div>
                <div className="ppa-whyppa-masonry-label-wrapper">
                  <span className="ppa-whyppa-masonry-label-line" style={{ background: masonryImages[0].color }}></span>
                  <span className="ppa-whyppa-masonry-label">{masonryImages[0].alt}</span>
                </div>
              </div>
            </motion.div>

            {/* Middle Column - 2 Images stacked */}
            <div className="ppa-whyppa-masonry-middle">
              <motion.div
                className="ppa-whyppa-masonry-card ppa-whyppa-card-short"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10 }}
              >
                <div className="ppa-whyppa-masonry-card-inner">
                  <Image src={masonryImages[1].src} alt={masonryImages[1].alt} className="ppa-whyppa-masonry-img" width={400} height={300} unoptimized={true} />
                  <div className="ppa-whyppa-masonry-overlay" style={{ background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.75) 100%)` }}></div>
                  <div className="ppa-whyppa-masonry-label-wrapper">
                    <span className="ppa-whyppa-masonry-label-line" style={{ background: masonryImages[1].color }}></span>
                    <span className="ppa-whyppa-masonry-label">{masonryImages[1].alt}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="ppa-whyppa-masonry-card ppa-whyppa-card-medium"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -10 }}
              >
                <div className="ppa-whyppa-masonry-card-inner">
                  <Image src={masonryImages[2].src} alt={masonryImages[2].alt} className="ppa-whyppa-masonry-img" width={400} height={400} unoptimized={true} />
                  <div className="ppa-whyppa-masonry-overlay" style={{ background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.75) 100%)` }}></div>
                  <div className="ppa-whyppa-masonry-label-wrapper">
                    <span className="ppa-whyppa-masonry-label-line" style={{ background: masonryImages[2].color }}></span>
                    <span className="ppa-whyppa-masonry-label">{masonryImages[2].alt}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyPPA

// 'use client'
// import { motion } from 'framer-motion'
// import { ArrowRight, Handshake, Factory, Sparkles, Zap, CheckCircle } from 'lucide-react'
// import Image from 'next/image'
// import './WhyPPA.css'

// const WhyPPA = () => {
//   const reasons = [
//     {
//       id: 1,
//       icon: Handshake,
//       title: 'One Partner, Three Arms',
//       desc: 'One partner across all three arms, so your brand stays consistent from print to pack to display.',
//       color: '#337CC7',
//     },
//     {
//       id: 2,
//       icon: Factory,
//       title: 'Real Machines In-House',
//       desc: 'Real machines in-house, so we control the quality and the speed.',
//       color: '#C62F60',
//     },
//     {
//       id: 3,
//       icon: Sparkles,
//       title: 'Tactile Quality',
//       desc: 'Tactile quality you can feel, from soft-touch finishes to foil and raised detail.',
//       color: '#E8AC49',
//     },
//     {
//       id: 4,
//       icon: Zap,
//       title: 'Fast Turnarounds',
//       desc: 'Fast turnarounds for agencies and brands working to a deadline.',
//       color: '#23366D',
//     },
//   ]

//   const masonryImages = [
//     { id: 1, src: '/sweden.jpg', alt: 'Print Production', color: '#337CC7', height: 'large' },
//     { id: 2, src: '/germany.jpg', alt: 'Packaging', color: '#C62F60', height: 'small' },
//     { id: 3, src: '/newzealand.jpg', alt: 'Advertising', color: '#E8AC49', height: 'medium' },
//     { id: 4, src: '/uk.jpg', alt: 'Brand Materials', color: '#23366D', height: 'small' },
//     { id: 5, src: '/australia.jpg', alt: 'Quality Control', color: '#586692', height: 'medium' },
//   ]

//   return (
//     <section className="ppa-whyppa">
//       <div className="container2">
//         {/* Header - Centered */}
//         <motion.div 
//           className="ppa-whyppa-header"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-10%" }}
//           transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <div className="ppa-whyppa-eyebrow-wrapper">
//             <span className="ppa-whyppa-eyebrow-line"></span>
//             <span className="ppa-whyppa-eyebrow">Why PPA</span>
//             <span className="ppa-whyppa-eyebrow-line"></span>
//           </div>

//           <h2 className="ppa-whyppa-title">
//             Creative and Production, <span className="ppa-whyppa-title-accent">Under One Roof.</span>
//           </h2>

//           <p className="ppa-whyppa-body">
//             Most brands juggle a designer, a printer, and a packaging vendor, then hope 
//             it all lines up. With PPA, it is one team and one set of machines, from 
//             idea to delivery.
//           </p>

//           <div className="ppa-whyppa-cta">
//             <a href="/why-ppa" className="btn btn-primary ppa-whyppa-btn">
//               Why PPA <ArrowRight size={16} />
//             </a>
//           </div>
//         </motion.div>

//         {/* Content - Left Reasons + Right Masonry */}
//         <div className="ppa-whyppa-content">
//           {/* Left - Reasons */}
//           <div className="ppa-whyppa-reasons">
//             {reasons.map((reason, index) => {
//               const Icon = reason.icon
//               return (
//                 <motion.div
//                   key={reason.id}
//                   className="ppa-whyppa-reason"
//                   initial={{ opacity: 0, x: -60 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true, margin: '-8%' }}
//                   transition={{ 
//                     delay: 0.1 * index, 
//                     duration: 0.7, 
//                     ease: [0.22, 1, 0.36, 1] 
//                   }}
//                   whileHover={{ x: 8 }}
//                 >
//                   <div className="ppa-whyppa-reason-icon" style={{ background: `linear-gradient(135deg, ${reason.color}15, ${reason.color}05)`, borderColor: `${reason.color}30` }}>
//                     <Icon size={24} color={reason.color} strokeWidth={1.5} />
//                   </div>
//                   <div className="ppa-whyppa-reason-content">
//                     <h3 className="ppa-whyppa-reason-title" style={{ color: reason.color }}>
//                       {reason.title}
//                     </h3>
//                     <p className="ppa-whyppa-reason-desc">
//                       {reason.desc}
//                     </p>
//                   </div>
//                 </motion.div>
//               )
//             })}
//           </div>

//           {/* Right - Masonry Images */}
//           <div className="ppa-whyppa-masonry">
//             {/* Column 1 */}
//             <div className="ppa-whyppa-masonry-col">
//               <motion.div
//                 className="ppa-whyppa-masonry-card ppa-whyppa-card-large"
//                 initial={{ opacity: 0, y: 60 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: '-8%' }}
//                 transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//                 whileHover={{ y: -8 }}
//               >
//                 <Image src={masonryImages[0].src} alt={masonryImages[0].alt} className="ppa-whyppa-masonry-img" width={400} height={500} unoptimized={true} />
//                 <div className="ppa-whyppa-masonry-overlay" style={{ background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)` }}></div>
//                 <span className="ppa-whyppa-masonry-label" style={{ borderLeft: `3px solid ${masonryImages[0].color}` }}>
//                   {masonryImages[0].alt}
//                 </span>
//               </motion.div>

//               <motion.div
//                 className="ppa-whyppa-masonry-card ppa-whyppa-card-small"
//                 initial={{ opacity: 0, y: 60 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: '-8%' }}
//                 transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//                 whileHover={{ y: -8 }}
//               >
//                 <Image src={masonryImages[3].src} alt={masonryImages[3].alt} className="ppa-whyppa-masonry-img" width={400} height={300} unoptimized={true} />
//                 <div className="ppa-whyppa-masonry-overlay" style={{ background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)` }}></div>
//                 <span className="ppa-whyppa-masonry-label" style={{ borderLeft: `3px solid ${masonryImages[3].color}` }}>
//                   {masonryImages[3].alt}
//                 </span>
//               </motion.div>
//             </div>

//             {/* Column 2 */}
//             <div className="ppa-whyppa-masonry-col">
//               <motion.div
//                 className="ppa-whyppa-masonry-card ppa-whyppa-card-medium"
//                 initial={{ opacity: 0, y: 60 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: '-8%' }}
//                 transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//                 whileHover={{ y: -8 }}
//               >
//                 <Image src={masonryImages[1].src} alt={masonryImages[1].alt} className="ppa-whyppa-masonry-img" width={400} height={350} unoptimized={true} />
//                 <div className="ppa-whyppa-masonry-overlay" style={{ background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)` }}></div>
//                 <span className="ppa-whyppa-masonry-label" style={{ borderLeft: `3px solid ${masonryImages[1].color}` }}>
//                   {masonryImages[1].alt}
//                 </span>
//               </motion.div>

//               <motion.div
//                 className="ppa-whyppa-masonry-card ppa-whyppa-card-medium"
//                 initial={{ opacity: 0, y: 60 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: '-8%' }}
//                 transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//                 whileHover={{ y: -8 }}
//               >
//                 <Image src={masonryImages[4].src} alt={masonryImages[4].alt} className="ppa-whyppa-masonry-img" width={400} height={350} unoptimized={true} />
//                 <div className="ppa-whyppa-masonry-overlay" style={{ background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)` }}></div>
//                 <span className="ppa-whyppa-masonry-label" style={{ borderLeft: `3px solid ${masonryImages[4].color}` }}>
//                   {masonryImages[4].alt}
//                 </span>
//               </motion.div>
//             </div>

//             {/* Column 3 */}
//             <div className="ppa-whyppa-masonry-col">
//               <motion.div
//                 className="ppa-whyppa-masonry-card ppa-whyppa-card-small"
//                 initial={{ opacity: 0, y: 60 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: '-8%' }}
//                 transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//                 whileHover={{ y: -8 }}
//               >
//                 <Image src={masonryImages[2].src} alt={masonryImages[2].alt} className="ppa-whyppa-masonry-img" width={400} height={300} unoptimized={true} />
//                 <div className="ppa-whyppa-masonry-overlay" style={{ background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)` }}></div>
//                 <span className="ppa-whyppa-masonry-label" style={{ borderLeft: `3px solid ${masonryImages[2].color}` }}>
//                   {masonryImages[2].alt}
//                 </span>
//               </motion.div>

//               <motion.div
//                 className="ppa-whyppa-masonry-card ppa-whyppa-card-large"
//                 initial={{ opacity: 0, y: 60 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: '-8%' }}
//                 transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//                 whileHover={{ y: -8 }}
//               >
//                 <Image src={masonryImages[3].src} alt={masonryImages[3].alt} className="ppa-whyppa-masonry-img" width={400} height={500} unoptimized={true} />
//                 <div className="ppa-whyppa-masonry-overlay" style={{ background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)` }}></div>
//                 <span className="ppa-whyppa-masonry-label" style={{ borderLeft: `3px solid ${masonryImages[3].color}` }}>
//                   {masonryImages[3].alt}
//                 </span>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default WhyPPA