'use client'

import { Flex, Text } from '@radix-ui/themes'
import { memo } from 'react'
import styled from 'styled-components'

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  color: string
  text: string
  animationStyle: string
}

const MultiLineTypo = ({ color, text, animationStyle }: Props) => {
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
    <Root style={{ paddingInline: '20px' }} className={animationStyle}>
      <Text className={animationStyle}>{text}</Text>
    </Root>
  )
}

export default memo(MultiLineTypo)

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(Flex)`
  span {
    opacity: 0;
  }
`
