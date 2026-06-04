import { motion } from 'framer-motion'
import { exportTimelineSteps, exportSectors } from '../../data/exportData'

const ExportTimeline = () => {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1], // ease-premium
      },
    },
  }

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <section id="export" className="bg-primary-navy py-[60px] md:py-[100px] text-text-primary font-poppins overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Left Column: Title & Timeline steps */}
          <div>
            <motion.span className="text-accent-gold uppercase text-[0.875rem] font-semibold tracking-[2px] mb-3 block" variants={revealVariants}>
              Economic Expansion
            </motion.span>
            <motion.h2 className="text-[2.25rem] font-bold text-bg-white font-montserrat mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[3px] after:bg-accent-gold after:rounded-full" variants={revealVariants}>
              Start Export Business from Bihar
            </motion.h2>
            <motion.p className="text-text-secondary text-[1rem] leading-[1.7] mb-10" variants={revealVariants}>
              Bihar possesses a rich density of unique agricultural products, historical handicrafts, and therapeutic wellness products. Dhananjay Singh provides a structured transition methodology to transform micro-enterprises into active global exporters.
            </motion.p>

            {/* Timeline Flow */}
            <div className="flex flex-col gap-[30px] relative">
              {exportTimelineSteps.map((stepItem, idx) => (
                <motion.div
                  key={stepItem.step}
                  className="grid grid-cols-[50px_1fr] gap-5 relative after:content-[''] after:absolute after:left-[20px] after:top-[40px] after:w-[2px] after:h-[calc(100%-10px)] after:bg-accent-gold/30 after:z-[1] last:after:hidden"
                  variants={stepVariants}
                >
                  {/* Step Number Circle */}
                  <div className="w-10 h-10 bg-accent-gold text-primary-navy-dark rounded-full flex justify-center items-center font-bold font-montserrat z-[2]">
                    {stepItem.step}
                  </div>
                  {/* Step Content */}
                  <div className="flex flex-col">
                    <h4 className="text-bg-white font-montserrat font-bold text-[1.15rem] mb-1.5 leading-[1.3]">
                      {stepItem.title}
                    </h4>
                    <p className="text-text-secondary text-[0.9rem] leading-[1.5]">
                      {stepItem.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Key Export Sectors Card */}
          <motion.div variants={revealVariants} className="w-full lg:max-w-[480px] justify-self-center lg:justify-self-end">
            <div className="bg-primary-navy-light border-2 border-accent-gold rounded-2xl p-[40px] shadow-premium flex flex-col">
              <h3 className="font-montserrat font-bold text-[1.5rem] text-bg-white mb-8 border-b border-accent-gold/10 pb-4">
                Key Export Sectors in Bihar
              </h3>
              
              <div className="flex flex-col gap-6">
                {exportSectors.map((sector, idx) => (
                  <div key={idx} className="flex gap-4 items-start group">
                    <div className="w-10 h-10 border border-accent-gold/20 rounded-lg flex justify-center items-center text-[1.1rem] text-accent-gold group-hover:bg-accent-gold group-hover:text-primary-navy-dark transition-all duration-[200ms] shrink-0">
                      <i className={sector.icon}></i>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-bg-white text-[0.95rem] tracking-wide mb-0.5 font-poppins">
                        {sector.title}
                      </span>
                      <span className="text-[0.8rem] text-text-secondary leading-[1.4] font-poppins">
                        {sector.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, '#contact')}
                className="bg-accent-gold text-primary-navy-dark hover:bg-accent-gold-dark hover:text-bg-light px-8 py-3.5 rounded-full font-semibold text-[0.95rem] transition-all duration-[400ms] ease-premium shadow-[0_4px_14px_rgba(197,160,89,0.3)] w-full text-center mt-[30px] inline-block"
              >
                Get Mentorship Now
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ExportTimeline
