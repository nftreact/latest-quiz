'use client'

import React from 'react'
import { css, styled } from 'styled-components'
import Image from 'next/image'
import { Grid, Text } from '@radix-ui/themes'
import { FaCheck } from 'react-icons/fa6'
import { typoVariant } from '@/theme'
import { Answer } from '@/types/questions'

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  answer: Answer
  currentIndex: string
  multiSelectedItems: string[]
}
type rootType = Props & React.HTMLAttributes<HTMLButtonElement>

const MultiSelectedCard = React.forwardRef(({ answer, currentIndex, multiSelectedItems, ...rest }: rootType) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const isSelected = multiSelectedItems.includes(currentIndex)

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
    <Root isselectedroot={String(isSelected)} isDesc={Boolean(answer.description)} {...rest} type='button'>
      {answer?.image && (
        <ImageWrapper>
          <Image
            alt='select-image'
            src={answer.image}
            loading='lazy'
            fill
            style={{ position: 'absolute', bottom: 0, objectFit: 'contain' }}
          />
        </ImageWrapper>
      )}
      <Grid>
        <Text {...typoVariant.body1}>{answer.text}</Text>
        <Text {...typoVariant.body2}>{answer.description}</Text>
      </Grid>
      <SvgWrapper>
        <TickWrapper isselected={String(isSelected)}>{isSelected && <FaCheck />}</TickWrapper>
      </SvgWrapper>
    </Root>
  )
})

export default MultiSelectedCard

MultiSelectedCard.displayName = 'MultiSelectedCard'

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.button<{
  isselectedroot: string
  isDesc: boolean
}>`
  position: relative;
  border-radius: 15px;
  cursor: pointer;
  min-height: 75px;
  display: flex;
  align-items: center;
  padding-inline: 16px;
  border: none;

  &:hover {
    @media (min-width: 700px) {
      background-color: #fff7de;
    }
  }

  ${({ isselectedroot }) =>
    isselectedroot === 'true'
      ? css`
          box-shadow: 0 12px 24px rgb(43 49 57 / 8%), 0 4px 8px rgb(43 55 70 / 6%);
          border: 1px solid #edb600;
          background-color: #fff7de;
        `
      : css`
          background-color: #f5f5f5;
        `};
`

const ImageWrapper = styled.div`
  position: relative;
  min-width: 85px;
  min-height: 70px;
  height: 100%;
`

const TickWrapper = styled.div<{ isselected: boolean | string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: ${({ isselected }) => (isselected === 'true' ? '2px solid #edb600' : '2px solid #C2C2C2')};
`

const SvgWrapper = styled.div`
  margin-inline-start: auto;
  position: relative;

  svg {
    fill: #edb600;
    position: absolute;
    scale: 0.9;
  }
`
