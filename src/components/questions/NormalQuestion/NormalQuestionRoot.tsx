'use client'

import { Grid, Text } from '@radix-ui/themes'
import { styled } from 'styled-components'
import { QUESTION } from '../type'
import GenderQuestion from './GenderQuestion'
import SingleSelect from './select-question/single-select/SingleSelect'
import HeightInput_fa from './input-question/HeightInput_fa'
import WeightGoal_fa from './input-question/WeightGoal_fa'
import WeightCurrent_fa from './input-question/WeightCurrent_fa'
import MultiSelect from './select-question/multi-select/MultiSelect'
import { typoVariant } from '@/theme'
import CalendarQuestion from './CalendarQuestion'
import { useEffect } from 'react'
import Cookies from 'universal-cookie'
import useTransitionEffect from '@/hooks/useTransitionEffect'
import { setCookies } from '@/utils/insdex'

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  question: QUESTION
}

const NormalQuestionRoot = ({ question }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const cookie = new Cookies()
  const hasborderImage = Boolean(question?.borderImage)
  const { opacity, translate } = useTransitionEffect()

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    const obj = {
      Authorization: question.token,
      type: question.type,
      code: question.code,
    }
    setCookies(obj, {}, cookie)
  }, [])

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const renderElement = () => {
    switch (question?.questionType) {
      case 'singleSelect':
        return <SingleSelect hasborderimage={hasborderImage} key={'singleSelect'} items={question?.answers} />
      case 'multiSelect':
        return <MultiSelect hasborderimage={hasborderImage} key={'MultiSelect'} items={question?.answers} />
      case 'genderSelection':
        return <GenderQuestion key={2} answers={question.answers} />
      case 'Calendar':
        return <CalendarQuestion key={3} answer={question.answers[0]} error={''} />
      case 'inputQuestion':
        if (question.inputQuestion === 'height') {
          return <HeightInput_fa answer={question?.answers[0]} />
        }
        if (question.inputQuestion === 'weightCurrent') {
          return <WeightCurrent_fa answer={question?.answers[0]} />
        }
        if (question.inputQuestion === 'weightGoal') {
          return <WeightGoal_fa answer={question?.answers[0]} />
        }
    }
  }

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root gap={'24px'} opacity={opacity} translate={translate} overflow={'hidden'}>
      <Text align={'center'} {...typoVariant.title1} dangerouslySetInnerHTML={{ __html: question.text as string }} />
      <Text align={'center'} dangerouslySetInnerHTML={{ __html: question.description as string }} />
      {renderElement()}
    </Root>
  )
}

export default NormalQuestionRoot

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(Grid)<{ opacity: number; translate: any }>`
  opacity: ${(props) => props.opacity};
  margin-top: ${(props) => props.translate};
  transition: opacity 0.5s, margin 0.5s;
  overflow-x: hidden;
  width: 100%;
  height: max-content;
`
