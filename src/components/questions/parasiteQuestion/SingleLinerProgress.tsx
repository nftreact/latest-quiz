/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Text } from '@radix-ui/themes'
import { useState, useMemo, memo } from 'react'
import styled, { css } from 'styled-components'
import { toast } from 'react-toastify'
import LinearProgress from './LinearProgress'

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  inputs: any
  thisAid: string
  firstStep: number
  secondtStep: number
  thirdStep: number
  onProgressCompleted: () => void
}

const SingleLinerProgress = ({ inputs, firstStep, secondtStep, thirdStep, onProgressCompleted }: Props) => {
  /**
   * state
   * _______________________________________________________________________________
   */
  const [isEnableBtn, setIsEnableBtn] = useState(false)
  const { locale } = global.config

  /**
   * memoized toast message
   * _______________________________________________________________________________
   */
  const toastText = useMemo(() => {
    switch (locale) {
      case 'en':
        return 'Matcha AI is analyzing your condition, please wait.'
      case 'it':
        return `L'intelligenza artificiale Matcha sta analizzando la tua situazione, attendi.`
      default:
        return 'هوش مصنوعی ماچا در حال تحلیل شرایط شماست، لطفا منتظر بمانید'
    }
  }, [locale])

  /**
   * handle button click
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  if (inputs?.type === 'linear') {
    return (
      <Root dir={locale === 'fa_IR' ? 'rtl' : 'ltr'}>
        <LinearProgress
          maxValue={Number(inputs.maxValue) ?? 100}
          delay={(Number(inputs.delay) ?? 0) * 1000}
          duration={(Number(inputs.time) ?? 0) * 1000}
          color={inputs.color}
          firstStep={firstStep}
          secondtStep={secondtStep}
          thirdStep={thirdStep}
          onProgressCompleted={onProgressCompleted}
        />
        {inputs?.text && <TextContainer dangerouslySetInnerHTML={{ __html: inputs.text }} />}
      </Root>
    )
  }

  return null
}

export default memo(SingleLinerProgress)

/**
 * styled-components
 * _______________________________________________________________________________
 */

const Root = styled.section<{ dir: string }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  direction: ${({ dir }) => dir};
`

const TextContainer = styled(Text)`
  text-align: center;
  margin-right: 10px;
  direction: inherit;
`
