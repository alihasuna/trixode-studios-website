import { useState, useEffect } from 'react'

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const checkMobile = () => {
      if (typeof window === 'undefined') return false
      
      const userAgent = navigator.userAgent
      
      // Enhanced mobile detection including tablets
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ||
                    /iPad/i.test(userAgent) ||
                    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
                    /Tablet|PlayBook|Silk/i.test(userAgent) ||
                    (window.innerWidth <= 1024 && 'ontouchstart' in window)
      
      setIsMobile(mobile)
    }

    checkMobile()
    
    const handleResize = () => {
      if (typeof window === 'undefined') return
      
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                    /iPad/i.test(navigator.userAgent) ||
                    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
                    /Tablet|PlayBook|Silk/i.test(navigator.userAgent) ||
                    (window.innerWidth <= 1024 && 'ontouchstart' in window)
      setIsMobile(mobile)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Only add mouse tracking on desktop (non-touch devices)
    if (!isMobile && !('ontouchstart' in window)) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
      window.addEventListener("mousemove", handleMouseMove)
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener('resize', handleResize)
      }
    }
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobile])

  return { mousePosition, isMobile, isClient }
} 