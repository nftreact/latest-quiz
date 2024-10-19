'use client'

import { Text } from '@radix-ui/themes'
import { styled } from 'styled-components'

/**
 * props
 * _______________________________________________________________________________
 */
interface TransitionTextElementInputs {
  texts: string[]
}
type Props = {
  inputs: TransitionTextElementInputs
}

const TransitionText = ({ inputs }: Props) => {
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
    <Container>
      {inputs.texts.map((text, index) => (
        <TitleFadeWrapper key={text + index} className={index === 0 ? 'TransitionText1' : 'TransitionText2'}>
          <Text>{text}</Text>
        </TitleFadeWrapper>
      ))}
    </Container>
  )
}

export default TransitionText

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Container = styled.section`
  position: relative;
  text-align: center;
  width: 100%;
  height: 30px;
  margin-block: 10px;

  @keyframes slide-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(-100%);
    }
  }

  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .TransitionText1 {
    animation: slide-out 5s forwards;
  }

  .TransitionText2 {
    animation: slide-in 5s forwards;
  }
`

const TitleFadeWrapper = styled.section`
  position: absolute;
  width: 100%;
  left: 0px;
  top: 0px;
  height: 100%;
`
