import { useState, useEffect } from 'react'

const FloatingActions = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowBackToTop(window.scrollY > 400)
          ticking = false
        })
        ticking = true
      }
    }

    // Set initial state
    setShowBackToTop(window.scrollY > 400)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="fixed bottom-[30px] right-[30px] flex flex-col gap-4 z-[999] font-poppins">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/910000000000?text=Hello%20Dhananjay%20ji,%20I%20would%20like%20to%20consult%20about..."
        target="_blank"
        rel="noopener noreferrer"
        className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#25D366] text-white text-[1.6rem] shadow-md hover:bg-[#20BA5A] hover:scale-[1.1] transition-all duration-[400ms] ease-premium whatsapp-btn-pulse cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* Back-to-Top Button */}
      <button
        onClick={scrollToTop}
        className={`w-[50px] h-[50px] rounded-full flex justify-center items-center bg-primary-navy border border-accent-gold text-accent-gold text-[1.1rem] shadow-md hover:bg-accent-gold hover:text-primary-navy-dark transition-all duration-[400ms] ease-premium cursor-pointer focus:outline-none ${
          showBackToTop ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
        }`}
        aria-label="Back to Top"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  )
}

export default FloatingActions
