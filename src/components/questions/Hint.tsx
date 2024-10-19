'use client'

import { styled } from 'styled-components'
import { Flex, Text } from '@radix-ui/themes'
import { QUESTION } from './type'
import useTransitionEffect from '@/hooks/useTransitionEffect'
import { typoVariant } from '@/theme/typo-varient'

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  question: QUESTION
}

const Hint = ({ question }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { opacity, translate } = useTransitionEffect()
  const { title, caption } = question.hint

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
    <Root direction={'column'} p={'24px 16px'} justify={'center'} opacity={opacity} translate={translate}>
      {title && <Text style={{ lineHeight: '22px' }}>{title}</Text>}
      <Text {...typoVariant.body2} style={{ lineHeight: '22px' }}>
        {caption}
      </Text>
    </Root>
  )
}

export default Hint

/**
 * styled-component
 * _______________________________________________________________________________
 */
const Root = styled(Flex)<{ opacity: number; translate: string }>`
  background-color: #f7f7f880;
  border-radius: 12px;
  border: 1px solid #eaeef2;
  z-index: 10;
  color: '#464646';
  height: max-content;

  opacity: ${(props) => props.opacity};
  transform: translateY(${(props) => props.translate});
  transition: opacity 1s, transform 1s;
`
