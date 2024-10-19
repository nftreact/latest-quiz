import { useState, useEffect } from 'react'

interface TransitionState {
  opacity: number
  translate: string
}

const useTransitionEffect = (delay: number = 10): TransitionState => {
  const [transition, setTransition] = useState<TransitionState>({
    opacity: 0,
    translate: '3px',
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransition({
        opacity: 1,
        translate: '0',
      })
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return transition
}

export default useTransitionEffect
