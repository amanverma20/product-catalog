import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  onIntersect: () => void
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '100px',
  onIntersect
}: UseIntersectionObserverProps) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting) {
          onIntersect()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(target)

    return () => {
      observer.unobserve(target)
    }
  }, [threshold, rootMargin, onIntersect])

  return { targetRef, isIntersecting }
}