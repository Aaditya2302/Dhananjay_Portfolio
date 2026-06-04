import { useState, useEffect } from 'react'

export default function useCounter(ref, end, duration = 1800) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let started = false

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !started) {
          started = true
          
          let startTimestamp = null
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp
            const elapsed = timestamp - startTimestamp
            const progress = Math.min(elapsed / duration, 1)
            
            // Calculate step value
            setCount(Math.floor(progress * end))
            
            if (progress < 1) {
              window.requestAnimationFrame(step)
            } else {
              setCount(end)
            }
          }
          window.requestAnimationFrame(step)
          
          // Disconnect observer after count starts so it runs exactly once
          observer.unobserve(element)
        }
      },
      { threshold: 0.2 } // Triggers when 20% of element is in view
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, end, duration])

  return count
}
