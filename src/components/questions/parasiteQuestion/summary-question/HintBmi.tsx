'use client'

import { Flex, Text } from '@radix-ui/themes'
import styled from 'styled-components'

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  svgIcon: string
  title: string
  description: string
}

const HintBmi = ({ description, svgIcon, title }: Props) => {
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
    <Root gap='5px'>
      <Text>{svgIcon}</Text>
      <Flex direction='column'>
        <Text>{title}</Text>
        <Text>{description}</Text>
      </Flex>
    </Root>
  )
}

export default HintBmi

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(Flex)`
  background-color: #fdf4f5;
  padding: 8px 16px;
  border-radius: 12px;
`
