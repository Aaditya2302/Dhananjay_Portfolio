import { useEffect } from 'react'

const Lightbox = ({ isOpen, onClose, item }) => {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || !item) return null

  // Close when clicking outside content (on the overlay background)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Viewport Modal"
      className="fixed inset-0 w-full h-full bg-primary-navy-dark/95 z-[10000] flex justify-center items-center p-6 font-poppins"
      onClick={handleOverlayClick}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-bg-light hover:text-accent-gold text-[2rem] cursor-pointer transition-all duration-[200ms] focus:outline-none"
        aria-label="Close modal"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      {/* Lightbox Content Container */}
      <div className="max-w-[90%] max-h-[90%] flex flex-col items-center select-none pointer-events-none">
        {/* Placeholder Box representing visual moment */}
        <div className="w-[320px] h-[240px] md:w-[600px] md:h-[450px] bg-gradient-to-br from-primary-navy-light to-primary-navy-dark border-2 border-accent-gold rounded-xl flex flex-col justify-center items-center text-bg-light shadow-premium p-6">
          <i className={`${item.iconClass || 'fa-solid fa-trophy'} text-[4rem] text-accent-gold mb-6`}></i>
          <span className="font-montserrat font-bold text-center text-[1.1rem] md:text-[1.5rem] tracking-wide text-bg-light">
            {item.title}
          </span>
          <p className="text-accent-gold-light text-[0.8rem] md:text-[0.95rem] tracking-widest uppercase mt-3 font-semibold">
            {item.categoryLabel || item.category}
          </p>
        </div>
        
        {/* Caption beneath box */}
        <div className="text-bg-white mt-4 font-montserrat text-[1.15rem] font-semibold text-center leading-normal">
          {item.title}
        </div>
        <div className="text-accent-gold text-[0.8rem] tracking-[1px] uppercase mt-1">
          {item.categoryLabel || item.category}
        </div>
      </div>
    </div>
  )
}

export default Lightbox
