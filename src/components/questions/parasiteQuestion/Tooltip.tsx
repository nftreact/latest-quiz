'use client'

import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  extraStyles?: { [key: string]: string }
  text: string
  delay: number
  isLast: boolean
  latsTooltipText?: string
  borderColor?: string
}

const Tooltip = (props: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  const { extraStyles = {}, text, delay, isLast, borderColor = '#252d48', latsTooltipText = 'Expected Result' } = props

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <TooltipContainer style={{ ...extraStyles }} visible={visible}>
      <TooltipText>{text}</TooltipText>
      <TooltipArrow style={{ borderTop: `8px solid ${borderColor}` }} />
      {isLast && <TooltipResult>{latsTooltipText}</TooltipResult>}
    </TooltipContainer>
  )
}

export default Tooltip

/**
 * styled-component
 * _______________________________________________________________________________
 */

const TooltipContainer = styled.div<{ visible: boolean }>`
  position: absolute;
  z-index: 40;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #252d48;
  border-radius: 0.375rem;
  opacity: ${(props) => (props.visible ? '100%' : '0')};
  transition: opacity 0.5s;
  text-align: center;
  @media (prefers-color-scheme: dark) {
    background-color: #eee;
  }
`

const TooltipText = styled.span``

const TooltipArrow = styled.div`
  position: absolute;
  left: 50%;
  bottom: -0.5rem; /* -2 * 0.25rem */
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
`

const TooltipResult = styled.div`
  position: absolute;
  color: #252d48;
  left: 50%;
  transform: translateX(-50%);
  width: 3rem; /* 12 * 0.25rem */
  height: 2rem; /* 8 * 0.25rem */
  font-size: 0.75rem; /* text-xs */
  font-weight: bold;
  text-align: center;
  top: -2.5rem; /* -40px */

  &.dark {
    color: #eee;
  }
`
