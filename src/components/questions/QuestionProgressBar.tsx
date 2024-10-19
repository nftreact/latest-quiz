'use client'

import { colors } from '@/theme'
import { Flex } from '@radix-ui/themes'
import { styled } from 'styled-components'

/**
 * props
 * _______________________________________________________________________________
 */

type Props = {
  questionType: string
  currentQuestion: string
  allQuestions: number
}

const QuestionProgressBar = ({ allQuestions, currentQuestion, questionType }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { locale } = global.config

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
    <Flex align={'center'} height={'25px'}>
      <Root questionType={questionType}>
        <Progress
          style={{
            width: `${(Number(currentQuestion) / Number(allQuestions)) * 100}%`,
            ...(locale === 'fa_IR' ? { right: 0 } : { left: 0 }),
          }}
        />
      </Root>
    </Flex>
  )
}

export default QuestionProgressBar

/**
 * styled-component
 * _______________________________________________________________________________
 */
const Root = styled(Flex)<{ questionType: string }>`
  display: ${({ questionType }) => (questionType === 'parasite' ? 'none' : 'flex')};
  background-color: #eaeef2;
  border-radius: 6px;
  height: 6px;
  position: relative;
  width: 97%;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
`

const Progress = styled.div`
  background-color: ${colors.secondary};
  position: absolute;
  height: 6px;
  border-radius: 6px;
  top: 0;
  transition: all 200ms cubic-bezier(0.4, 0, 1, 1);
`
