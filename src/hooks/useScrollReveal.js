import { useState, useEffect } from 'react'

export default function useScrollReveal(ref, threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, threshold])

  return isVisible
}
