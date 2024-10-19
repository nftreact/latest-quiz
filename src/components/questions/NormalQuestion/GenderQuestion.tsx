'use client'

import { Text } from '@radix-ui/themes'
import Image from 'next/image'
import { styled } from 'styled-components'
import { Answer } from '../type'
import { Controller, useFormContext } from 'react-hook-form'
import { colors, typoVariant } from '@/theme'

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  answers: Answer[]
}

const GenderQuestion = ({ answers }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { control } = useFormContext()

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root>
      <Controller
        name='aid'
        control={control}
        defaultValue={answers[0]?.aid || ''}
        render={({ field }) => (
          <>
            {answers?.map((item, index) => {
              return (
                <ItemContainer
                  key={index}
                  type='submit'
                  onClick={() => {
                    field.onChange(item.aid)
                  }}
                >
                  <ContentBorder />
                  <Image
                    src={item.image}
                    loading='lazy'
                    fill
                    alt='gender-image'
                    style={{ objectFit: 'contain' }}
                    sizes='(max-width: 768px) 100vw, 33vw'
                  />
                  <BottomSection>
                    <Text {...typoVariant.title2} style={{ color: colors.white }}>{item.text}</Text>
                    <CircleOutlined />
                  </BottomSection>
                </ItemContainer>
              )
            })}
          </>
        )}
      />
    </Root>
  )
}

export default GenderQuestion

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.div`
  gap: 20px;
  justify-content: space-between;
  display: flex;

  @media (min-width: 600px) {
    justify-content: center;
    gap: 40px;
  }
`

export const ItemContainer = styled.button`
  width: 50%;
  min-width: 130px;
  min-height: 270px;
  max-height: 450px;
  height: 90vw;
  position: relative;
  cursor: pointer;
  border: none;
  background-color: inherit;
`

export const ContentBorder = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  height: 67%;
  bottom: 0;
  border: 2px solid red;
  border-radius: 8px;
`

export const BottomSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 47px;
  background-color: ${colors.secondary};
  position: absolute;
  bottom: 0;
  border-radius: 0px 0px 8px 8px;
  padding-inline: 16px;
`

const CircleOutlined = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 2px solid ${colors.white};

  @media (min-width: 430px) {
    width: 20px;
    height: 20px;
  }
`
