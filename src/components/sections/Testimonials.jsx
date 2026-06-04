import { useState, useEffect, useRef } from 'react'
import { testimonialsData } from '../../data/testimonials'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalSlides = testimonialsData.length
  const timerRef = useRef(null)

  // Start auto-advance timer
  const startAutoSlide = () => {
    stopAutoSlide()
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, 6000)
  }

  // Clear timer
  const stopAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  useEffect(() => {
    startAutoSlide()
    return () => stopAutoSlide()
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    startAutoSlide() // Reset timer on manual action
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
    startAutoSlide() // Reset timer on manual action
  }

  const handleDotClick = (idx) => {
    setCurrentIndex(idx)
    startAutoSlide() // Reset timer on manual action
  }

  return (
    <section id="testimonials" className="bg-bg-light py-[60px] md:py-[100px] font-poppins overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-[60px] text-center">
          <span className="text-accent-gold uppercase text-[0.875rem] font-semibold tracking-[2px] mb-3 block">
            Referrals & Affiliations
          </span>
          <h2 className="text-[2.25rem] font-bold text-primary-navy font-montserrat relative pb-4 inline-block title-underline">
            What Leaders Say
          </h2>
        </div>

        {/* Carousel Outer Container */}
        <div className="relative max-w-[850px] mx-auto overflow-hidden">
          
          {/* Slider Row */}
          <div
            className="flex transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonialsData.map((item) => (
              <div key={item.id} className="w-full shrink-0 px-6 sm:px-[50px] select-none text-center flex flex-col items-center">
                <div className="text-[2.5rem] text-accent-gold mb-6 opacity-30">
                  <i className="fa-solid fa-quote-left"></i>
                </div>
                
                <p className="text-[1.05rem] md:text-[1.2rem] italic text-text-secondary leading-[1.7] mb-8 font-medium max-w-[700px]">
                  "{item.text}"
                </p>
                
                {/* Author Initials Bubble */}
                <div className="w-14 h-14 bg-primary-navy border-2 border-accent-gold rounded-full flex justify-center items-center text-bg-light font-montserrat font-bold text-[1.1rem] mb-4">
                  {item.authorInitials}
                </div>

                <h5 className="font-montserrat font-bold text-[1.1rem] text-primary-navy mb-1 leading-none">
                  {item.authorName}
                </h5>
                <span className="text-[0.8rem] font-medium text-text-secondary tracking-[0.5px]">
                  {item.authorTitle}
                </span>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-[40%] -translate-y-1/2 w-10 h-10 border border-primary-navy/10 rounded-full flex justify-center items-center text-primary-navy hover:bg-accent-gold hover:border-accent-gold hover:text-primary-navy-dark cursor-pointer transition-all duration-[200ms] z-10"
            aria-label="Previous Slide"
          >
            <i className="fa-solid fa-chevron-left text-[0.85rem]"></i>
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-[40%] -translate-y-1/2 w-10 h-10 border border-primary-navy/10 rounded-full flex justify-center items-center text-primary-navy hover:bg-accent-gold hover:border-accent-gold hover:text-primary-navy-dark cursor-pointer transition-all duration-[200ms] z-10"
            aria-label="Next Slide"
          >
            <i className="fa-solid fa-chevron-right text-[0.85rem]"></i>
          </button>

          {/* Navigation Dots */}
          <div className="flex justify-center items-center gap-3 mt-10">
            {testimonialsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`w-[10px] h-[10px] rounded-full cursor-pointer transition-all duration-[200ms] focus:outline-none ${
                  currentIndex === idx ? 'bg-accent-gold scale-[1.2] w-6' : 'bg-primary-navy/10 hover:bg-accent-gold/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Testimonials
