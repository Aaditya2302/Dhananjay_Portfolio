import { useState, useEffect } from 'react'

export default function useSticky(threshold = 50) {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsSticky(window.scrollY > threshold)
          ticking = false
        })
        ticking = true
      }
    }

    // Set initial sticky state
    setIsSticky(window.scrollY > threshold)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isSticky
}
