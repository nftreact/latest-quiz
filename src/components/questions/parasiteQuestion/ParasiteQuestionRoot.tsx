/* eslint-disable @next/next/no-img-element */
'use client'

import { styled } from 'styled-components'
import { IconElementInputs, QUESTION } from '../type'
import { Flex, Grid, Text } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ReactLoading from 'react-loading'
import ParasiteIcon from './ParasiteIcon'
import MultiLinearProgress from './MultiLinearProgress'
import SingleLinerProgress from './SingleLinerProgress'
import TransitionText from './TransitionText'
import TitleFade from './TitleFade'
import LineChartProgress from './LineChartProgress'
import SummaryQuestionRoot from './summary-question/SummaryQuestionRoot'
import ParasitSingleChart from './ParasitSingleChart'
import ParasitChart from './ParasitChart'
import LineChartProgressGoalWeight from './LineChartProgressGoalWeight'
import { useSearchParams } from 'next/navigation'
import Cookies from 'universal-cookie'
import { useRandomValue, useRandomValueMultiLoadingProgress } from '@/hooks'
import useTransitionEffect from '@/hooks/useTransitionEffect'
import { setCookies } from '@/utils/insdex'
import ErrorBoundary from '@/shared/ErrorBoundry'
import RadixButton from '@/primitives/RadixButton'
import Slider from '@/shared/Slider'

/**
 * props
 * _______________________________________________________________________________
 */

type Props = {
  question: QUESTION
}

const ParasiteQuestionRoot = ({ question }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const cookie = new Cookies()
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const [isDisabledBtn, setIsDisabledBtn] = useState(true)
  const [isShowBtn, setIsShowBtn] = useState(
    question.parasite.elements.some(
      (element) => element.id === 'loading' || element.id === 'multiLoading' || element.id === 'summery',
    ),
  )
  const { firstStep, secondStep, thirdStep } = useRandomValue()
  const { first, forth, second, third } = useRandomValueMultiLoadingProgress()
  const { colors } = global.config
  const { opacity, translate } = useTransitionEffect()
  const { control, watch } = useFormContext()

  const handleDisplayBtn = () => {
    setIsShowBtn(
      question.parasite.elements.some(
        (element) => element.id === 'loading' || element.id === 'multiLoading' || element.id === 'summery',
      ),
    )
    setIsDisabledBtn(false)
  }

  /**
   * useEffect
   * _______________________________________________________________________________
   */
  useEffect(() => {
    if (question.parasite.elements[0].id === 'summery') {
      setIsDisabledBtn(false)
    }
    if (!isDisabledBtn) {
      setIsDisabledBtn(true)
    }
    setIsShowBtn(
      question.parasite.elements.some(
        (element) => element.id === 'loading' || element.id === 'multiLoading' || element.id === 'summery',
      ),
    )
  }, [question])

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const renderElement = (element: { id: string; inputs: IconElementInputs | any }, index: number) => {
    switch (element.id) {
      case 'icon':
        return <ParasiteIcon key={'icon'} inputs={element.inputs} />
      case 'title':
        return (
          <Text
            style={{
              textAlign: element.inputs.textAlign,
              color: question.parasite.textColor,
            }}
            key={'title'}
            dangerouslySetInnerHTML={{ __html: element.inputs.text }}
          />
        )
      case 'description':
        return (
          <Text
            key={`description${element.inputs.text}`}
            dangerouslySetInnerHTML={{ __html: element.inputs.text }}
            style={{
              textAlign: element.inputs.textAlign,
              color: question.parasite.textColor,
            }}
          />
        )
      case 'transitionText':
        return <TransitionText key={'transitionText'} inputs={element.inputs} />
      case 'singleChart':
        if (type == 'fastfit') {
          return <ParasitSingleChart key={index} inputs={element?.inputs} />
        } else {
          return <LineChartProgressGoalWeight key={index} inputs={element?.inputs} />
        }
      case 'chart':
        if (type == 'fastfit') {
          return (
            <ErrorBoundary>
              <ParasitChart key={index} inputs={element?.inputs} />
            </ErrorBoundary>
          )
        } else {
          return (
            <ErrorBoundary>
              <LineChartProgress key={index} inputs={element?.inputs} />
            </ErrorBoundary>
          )
        }
      case 'titleFade':
        return (
          <TitleFade
            key={'TitleFade'}
            inputs={element.inputs}
            thisAid={question.parasite.aid}
            isResult={question.isResult}
            nextPage={question.nextPage}
            textColor={question.parasite.textColor}
          />
        )
      case 'summery':
        return <SummaryQuestionRoot key={'sammery'} data={element.inputs} aid={question.parasite.aid} />
      case 'loading':
        return (
          <SingleLinerProgress
            firstStep={firstStep}
            secondtStep={secondStep}
            thirdStep={thirdStep}
            key={'loading'}
            inputs={element.inputs as any}
            thisAid={question.answers[0].aid}
            onProgressCompleted={() => {
              handleDisplayBtn()
            }}
          />
        )

      case 'multiLoading':
        return (
          <MultiLinearProgress
            data={element.inputs}
            aid={question.answers[0].aid}
            key={index}
            firstStep={first}
            secondtStep={second}
            thirdStep={third}
            forthStep={forth}
            hasDisableBtn
            onProgressCompleted={() => {
              handleDisplayBtn()
            }}
          />
        )
      case 'comments':
        return <Slider horizontalComments={element.inputs} />
      case 'image':
        return (
          <Flex justify={'center'}>
            <img src={element.inputs.link} alt='' style={{ width: '100%' }} />
          </Flex>
        )

      case 'video':
      // return <VideoPlayer inputs={element.inputs} />;
      case 'button':
        return (
          <Controller
            name='aid'
            control={control}
            render={({ field }) => (
              <RadixButton
                size={'4'}
                variant='soft'
                onClick={() => {
                  field.onChange(question.answers[0].aid)
                  setIsShowBtn(false)
                  setIsDisabledBtn(false)
                }}
              >
                {watch('isLoading') ? (
                  <ReactLoading type={'bubbles'} color={colors.background} height={'25px'} width={'25px'} />
                ) : (
                  element?.inputs?.text
                )}
              </RadixButton>
            )}
          />
        )
      default:
        return null
    }
  }

  const renderedElements = question?.parasite.elements.map((element, index) => renderElement(element, index))

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root gap={'24px'} opacity={opacity} translate={translate} overflow={'hidden'}>
      {renderedElements}
      {isShowBtn && (
        <Controller
          name='aid'
          control={control}
          render={({ field }) => (
            <RadixButton
              variant='soft'
              size={'4'}
              disabled={isDisabledBtn}
              onClick={() => {
                field.onChange(question.answers[0].aid)
              }}
            >
              {watch('isLoading') ? (
                <ReactLoading type={'bubbles'} color={colors.background} height={'25px'} width={'25px'} />
              ) : (
                question.answers[0]?.text
              )}
            </RadixButton>
          )}
        />
      )}
    </Root>
  )
}

export default ParasiteQuestionRoot

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
  height: fit-content;
  padding-bottom: 24px;
`

// return (
//   <Flex justify={'center'}>
//     <CircularProgress
//       onCompleted={() => setIsShowButton({ ...isShowButton, disabled: false })}
//       size={150}
//       strokeWidth={12}
//       duration={element.inputs.time}
//       color={element.inputs.color}
//     />
//   </Flex>
// )
// break
