/* eslint-disable @next/next/no-img-element */
'use client'

import styled from 'styled-components'
import { QUESTION } from './type'
import useTransitionEffect from '@/hooks/useTransitionEffect'

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  question?: QUESTION
}

const ImageQuestionPage = ({ question }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const src = question?.borderImage
  const { opacity, translate } = useTransitionEffect()

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
    <Root opacity={opacity} translate={translate}>
      <img
        src={src}
        alt='quiz border image'
        style={{ maxWidth: '200px', objectFit: 'cover', height: 'auto' }}
        loading='lazy'
      />
    </Root>
  )
}

export default ImageQuestionPage

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.div<{ opacity: number; translate: string }>`
  position: fixed;
  bottom: -10px;
  left: 0px;
  z-index: -100;

  opacity: ${(props) => props.opacity};
  transform: translateY(${(props) => props.translate});
  transition: opacity 1s, transform 1s;

  @media (min-width: 600px) {
    left: calc(50% - 300px);
  }
`
