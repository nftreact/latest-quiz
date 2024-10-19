'use client'

import { Flex, Grid, Text } from '@radix-ui/themes'
import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import styled from 'styled-components'
import { Answer } from '../../type'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import ReactLoading from 'react-loading'
import { typoVariant } from '@/theme'
import { createQueryString, filterObject } from '@/utils/insdex'
import RadixButton from '@/primitives/RadixButton'

/**
 * props
 * _______________________________________________________________________________
 */

type Props = {
  answer: Answer
}

const WeightGoal_fa = ({ answer }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const queryClient = useQueryClient()
  const { push } = useRouter()
  const { setValue, watch } = useFormContext()
  const {
    input_question: {
      weightGoal_fa: { error_message, max_height, min_height, unit, indicator },
    },
    colors,
  } = global.config
  const [error, setError] = useState('')
  const value = useWatch({ name: 'weight_goal_kg' })

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value
    const validInput = userInput.replace(/[^\d\u06F0-\u06F9]/g, '')

    const convertedInput = validInput.replace(/[\u06F0-\u06F9]/g, (char) => {
      return String.fromCharCode(char.charCodeAt(0) - 1728)
    })

    setValue('weight_goal_kg', Number(convertedInput))

    const error = validateHeight(convertedInput, min_height, max_height, error_message)
    setError(error as string)
  }

  const handleSubmit = () => {
    setValue('aid', answer.aid)
    const filteredParams = filterObject(watch())
    const parmas = createQueryString(filteredParams)
    push(`/question?${parmas}`)
    queryClient.invalidateQueries({ queryKey: ['question'] })
  }

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Grid gap={'24px'}>
      <Root errortext={Boolean(error)}>
        <Text style={{ color: Boolean(error) ? 'red' : '', fontSize: '14px' }}>{indicator}</Text>
        <input
          style={{ color: Boolean(error) ? 'red' : '' }}
          onChange={handleInputChange}
          value={value}
          type='text'
          autoFocus
        />
        {error && (
          <Text style={{ position: 'absolute', bottom: '-17px', right: '10px', color: 'red', fontSize: '10px' }}>
            {error}
          </Text>
        )}
      </Root>
      <RadixButton
        size={'4'}
        variant='soft'
        onClick={handleSubmit}
        disabled={Boolean(error) || !Boolean(value)}
        type='button'
      >
        {watch('isLoading') ? (
          <ReactLoading type={'bubbles'} color={colors.background} height={'25px'} width={'25px'} />
        ) : (
          answer.text
        )}
      </RadixButton>
    </Grid>
  )
}

export default WeightGoal_fa

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(Flex)<{ errortext: boolean }>`
  align-items: center;
  min-height: 46px;
  border-radius: 4px;
  padding-inline: 10px;
  position: relative;
  gap: 5px;
  border: ${({ errortext }) => (errortext ? `1.5px solid red` : '2px solid #02857A')};

  input {
    display: flex;
    height: 100%;
    flex: 1;
    all: unset;
    box-sizing: border-box;
    font-size: 14px;
  }
`

export const validateHeight = (
  value: string,
  min_height: string,
  max_height: string,
  errorMessage: string,
): string | null => {
  const numericValue = parseInt(value, 10)

  if (isNaN(numericValue)) {
    return errorMessage
  }

  if (numericValue < parseInt(min_height, 10)) {
    return errorMessage
  }

  if (numericValue > parseInt(max_height, 10)) {
    return errorMessage
  }

  return null
}
