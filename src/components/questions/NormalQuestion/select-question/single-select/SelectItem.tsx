'use client'

import styled, { css } from 'styled-components'
import Image from 'next/image'
import React from 'react'
import { Text } from '@radix-ui/themes'
import { typoVariant } from '@/theme'

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  image: string
  title: string
  description: string
}

type rootType = Props & React.HTMLAttributes<HTMLButtonElement>

const SelectItem = React.forwardRef(({ description, image, title, ...rest }: rootType) => {
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
    <Root {...rest}>
      {image && (
        <ImageWrapper>
          <Image
            alt='select-image'
            src={image}
            loading='lazy'
            fill
            style={{ position: 'absolute', bottom: 0, objectFit: 'contain' }}
          />
        </ImageWrapper>
      )}
      <div style={{ display: 'grid' }}>
        <Text {...typoVariant.body2}>{title}</Text>
        <Text {...typoVariant.body2}>{description}</Text>
      </div>
    </Root>
  )
})

export default SelectItem

SelectItem.displayName = 'SelectItem'

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.button`
  position: relative;
  border-radius: 15px;
  cursor: pointer;
  min-height: 75px;
  display: flex;
  align-items: center;
  padding-inline: 16px;
  background-color: #f5f5f5;
  border: none;

  

  &:hover {
    @media (min-width: 700px) {
      background-color: #fff7de;
    }
  }

  &:focus {
    box-shadow: 0 12px 24px rgb(43 49 57 / 8%), 0 4px 8px rgb(43 55 70 / 6%);
    border: 1px solid #edb600;
    background-color: #fff7de;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  min-width: 85px;
  height: 70px;
`
