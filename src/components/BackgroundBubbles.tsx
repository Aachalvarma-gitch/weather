import { useEffect, useRef } from 'react'

export default function BackgroundBubbles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Clear existing bubbles
    container.innerHTML = ''

    for (let i = 0; i < 15; i++) {
      const b = document.createElement('div')
      b.className = 'bubble'
      const size = Math.random() * 80 + 20
      b.style.width = size + 'px'
      b.style.height = size + 'px'
      b.style.left = Math.random() * 100 + '%'
      b.style.animationDuration = Math.random() * 15 + 10 + 's'
      b.style.animationDelay = Math.random() * 10 + 's'
      container.appendChild(b)
    }

    return () => {
      container.innerHTML = ''
    }
  }, [])

  return <div className="bg-animation" ref={containerRef}></div>
}
