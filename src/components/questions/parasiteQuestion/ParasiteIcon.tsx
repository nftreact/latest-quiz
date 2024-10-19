'use client'

import { styled } from 'styled-components'
import Image from 'next/image'
import { IconElementInputs } from '../type'

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  inputs: IconElementInputs
}

const ParasiteIcon = ({ inputs }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

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
    <Root>
      <ImageStyled src={inputs?.link} width={100} height={100} loading='eager' alt='parasite question main icon' />
      <ParasiteIconOverlay />
    </Root>
  )
}

export default ParasiteIcon

/**
 * styled-component
 * _______________________________________________________________________________
 */
const Root = styled.section`
  position: relative;
`

const ParasiteIconOverlay = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  background: white;
  opacity: 0.2;
  position: absolute;
  top: 2px;
`

export const ImageStyled = styled(Image)`
  border: 2px solid #ffffff42;
  border-radius: 155px;
`
