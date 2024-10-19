'use client'

import { Grid, Text } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import MultiSelectedCard from './MultiSelectedCard'
import ReactLoading from 'react-loading'
import { Answer } from '@/types/questions'
import RadixButton from '@/primitives/RadixButton'
import { styled } from 'styled-components'

/**
 * props
 * _______________________________________________________________________________
 */

type Props = {
  items: Answer[]
  hasborderimage: boolean
}

const MultiSelect = ({ items, hasborderimage }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { colors } = global.config
  const { control, watch } = useFormContext()
  const [multiSelectedItems, setMultiSelectedItems] = useState([])

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */
  const handleMultiSelectItems = (itemId: string, setSelectedItems: any, selectedItems: string[]) => {
    const isSelected = selectedItems.includes(itemId)

    if (isSelected) {
      // If selected, remove it from the selectedItems array

      setSelectedItems((prevSelectedItems: string[]) => prevSelectedItems.filter((id) => id !== itemId))
    } else {
      // If not selected, add it to the selectedItems array

      setSelectedItems((prevSelectedItems: string[]) => [...prevSelectedItems, itemId])
    }
  }

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Grid gap={'16px'} style={{ width: hasborderimage ? '65%' : '100%' }}>
      {items.map((item, index) => {
        return (
          <MultiSelectedCard
            onClick={() => {
              handleMultiSelectItems(item.aid, setMultiSelectedItems, multiSelectedItems)
            }}
            key={index}
            answer={item}
            currentIndex={item.aid}
            multiSelectedItems={multiSelectedItems}
          />
        )
      })}
      <Controller
        name='aid'
        control={control}
        render={({ field }) => (
          <ButtonStyle
            style={{ position: 'fixed', bottom: '0px', zIndex: 100 }}
            size={'4'}
            variant='soft'
            type='submit'
            onClick={() => {
              const lastIndexAnswwers = items.length - 1
              const lastItem = items[lastIndexAnswwers]
              if (multiSelectedItems.length > 0) {
                field.onChange(multiSelectedItems.join(', '))
                setMultiSelectedItems([])
              } else {
                field.onChange(lastItem.aid)
                setMultiSelectedItems([])
              }
            }}
          >
            {watch('isLoading') ? (
              <ReactLoading type={'bubbles'} color={colors.background} height={'25px'} width={'25px'} />
            ) : (
              <Text>بعدی</Text>
            )}
          </ButtonStyle>
        )}
      />
    </Grid>
  )
}

export default MultiSelect

/**
 * styled-component
 * _______________________________________________________________________________
 */

const ButtonStyle = styled(RadixButton)`
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 450px;
  left: 50%;
`
