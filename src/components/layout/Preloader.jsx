import { useState, useEffect } from 'react'

const Preloader = () => {
  const [visible, setVisible] = useState(true)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const handleLoad = () => {
      // Trigger fade out
      setFade(true)
      // Unmount after animation finishes (800ms)
      const timer = setTimeout(() => {
        setVisible(false)
      }, 800)
      return () => clearTimeout(timer)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      // Safety fallback in case load event already fired or delayed too long
      const fallbackTimer = setTimeout(handleLoad, 2500)

      return () => {
        window.removeEventListener('load', handleLoad)
        clearTimeout(fallbackTimer)
      }
    }
  }, [])

  if (!visible) return null

  return (
    <div
      role="status"
      aria-label="Loading page content"
      className={`fixed inset-0 bg-primary-navy-dark z-[10000] flex flex-col justify-center items-center transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
        fade ? 'opacity-0 invisible pointer-events-none' : 'opacity-100 visible'
      }`}
    >
      <div className="font-montserrat text-bg-light text-[2.5rem] font-extrabold mb-6 tracking-[2px]">
        DS <span className="text-accent-gold font-normal">Leadership</span>
      </div>
      <div className="w-[50px] h-[50px] border-[3px] border-accent-gold/10 border-t-accent-gold rounded-full preloader-spinner"></div>
    </div>
  )
}

export default Preloader
