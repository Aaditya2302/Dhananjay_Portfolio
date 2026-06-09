import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { servicesData } from '../../data/services'

const CARD_WIDTH = 370   // px — visible card width
const CARD_GAP   = 30    // px — gap between cards
const STEP       = CARD_WIDTH + CARD_GAP

const Services = () => {
  const total = servicesData.length

  // Extended track: [clone-of-last, ...real cards, clone-of-first]
  // Real cards live at indices 1 … total  (1-based offset)
  const extended = [servicesData[total - 1], ...servicesData, servicesData[0]]

  // Start pointing at the first *real* card (index 1 in extended)
  const [current, setCurrent]       = useState(1)
  const [animated, setAnimated]     = useState(true)   // false = instant snap

  const handleScrollTo = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const goNext = useCallback(() => {
    setAnimated(true)
    setCurrent(prev => prev + 1)
  }, [])

  const goPrev = useCallback(() => {
    setAnimated(true)
    setCurrent(prev => prev - 1)
  }, [])

  // After a spring animation lands on a *clone* position, do an instant snap
  // to the real equivalent, then immediately re-enable animation.
  const handleAnimationComplete = useCallback(() => {
    if (current === total + 1) {
      // Landed on clone-of-first → snap to real first (index 1)
      setAnimated(false)
      setCurrent(1)
    } else if (current === 0) {
      // Landed on clone-of-last → snap to real last (index `total`)
      setAnimated(false)
      setCurrent(total)
    }
  }, [current, total])

  // Re-enable animation one paint cycle after the instant snap
  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true))
      )
      return () => cancelAnimationFrame(id)
    }
  }, [animated])

  const xOffset = -current * STEP

  // Which real card (0-indexed) is currently shown — for dot highlight
  const activeDot =
    current === 0         ? total - 1 :
    current === total + 1 ? 0         :
    current - 1

  // Card fade-in variants
  const cardVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
  }

  return (
    <section id="services" className="bg-bg-light py-[60px] md:py-[100px] font-poppins overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6">

        {/* Section Heading */}
        <div className="mb-[60px] text-center">
          <span className="text-accent-gold uppercase text-[0.875rem] font-semibold tracking-[2px] mb-3 block">
            Consulting Services
          </span>
          <h2 className="text-[2.25rem] font-bold text-primary-navy font-montserrat relative pb-4 inline-block title-underline">
            Areas of Expertise
          </h2>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative">

          {/* Overflow-hidden viewport */}
          <div className="overflow-hidden cursor-grab active:cursor-grabbing select-none">
            <motion.div
              className="flex"
              style={{ gap: CARD_GAP }}
              animate={{ x: xOffset }}
              transition={
                animated
                  ? { type: 'spring', stiffness: 300, damping: 35 }
                  : { duration: 0 }
              }
              onAnimationComplete={handleAnimationComplete}
              drag="x"
              dragConstraints={{ left: -(STEP * (extended.length - 1)), right: 0 }}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                const threshold = STEP / 3
                if      (info.offset.x < -threshold) goNext()
                else if (info.offset.x >  threshold) goPrev()
              }}
            >
              {extended.map((service, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  className="bg-bg-white border border-primary-navy/5 rounded-2xl p-[40px] shadow-sm hover:shadow-lg transition-all duration-[400ms] ease-premium hover:-translate-y-2 hover:border-accent-gold group flex flex-col items-start flex-shrink-0"
                  style={{ width: CARD_WIDTH }}
                >
                  {/* Icon */}
                  <div className="w-[60px] h-[60px] bg-primary-navy/5 rounded-xl flex justify-center items-center text-[1.5rem] text-primary-navy group-hover:bg-primary-navy group-hover:text-accent-gold transition-all duration-[300ms] mb-[24px]">
                    <i className={service.icon}></i>
                  </div>

                  <h4 className="font-montserrat font-bold text-[1.3rem] text-primary-navy mb-[16px] leading-[1.3]">
                    {service.title}
                  </h4>

                  <p className="text-text-secondary text-[0.95rem] leading-[1.6] mb-[24px] flex-grow">
                    {service.description}
                  </p>

                  <a
                    href={service.linkHref}
                    onClick={(e) => handleScrollTo(e, service.linkHref)}
                    className="text-primary-navy group-hover:text-accent-gold font-semibold text-[0.9rem] flex items-center gap-2 group-hover:gap-3 transition-all duration-[200ms]"
                  >
                    {service.linkText}{' '}
                    <i className="fa-solid fa-arrow-right-long text-[0.8rem] transition-transform"></i>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center items-center gap-[10px] mt-[36px]">
            {servicesData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setAnimated(true); setCurrent(idx + 1) }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`rounded-full transition-all duration-300 focus:outline-none ${
                  idx === activeDot
                    ? 'w-[28px] h-[8px] bg-accent-gold'
                    : 'w-[8px] h-[8px] bg-primary-navy/20 hover:bg-primary-navy/50'
                }`}
              />
            ))}
          </div>

          {/* Prev Arrow — always enabled (infinite loop) */}
          <button
            onClick={goPrev}
            aria-label="Previous service"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-[44px] h-[44px] rounded-full bg-bg-white border border-primary-navy/10 shadow-md flex items-center justify-center text-primary-navy hover:bg-primary-navy hover:text-accent-gold transition-all duration-[250ms] focus:outline-none"
          >
            <i className="fa-solid fa-chevron-left text-[0.85rem]"></i>
          </button>

          {/* Next Arrow — always enabled (infinite loop) */}
          <button
            onClick={goNext}
            aria-label="Next service"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-[44px] h-[44px] rounded-full bg-bg-white border border-primary-navy/10 shadow-md flex items-center justify-center text-primary-navy hover:bg-primary-navy hover:text-accent-gold transition-all duration-[250ms] focus:outline-none"
          >
            <i className="fa-solid fa-chevron-right text-[0.85rem]"></i>
          </button>
        </div>

      </div>
    </section>
  )
}

export default Services
