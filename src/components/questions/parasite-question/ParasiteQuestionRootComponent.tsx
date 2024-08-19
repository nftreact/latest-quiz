'use client';

import { IconElementInputs, QUESTION } from '@/types/questions';
import Text from './Text';
import { AppFlex, Button, Typography } from '@/primitives';
import { useQuestionContext } from '@/providers';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { setCookies } from '@/utils/insdex';
import Cookies from 'universal-cookie';
import { useEffect, useId, useState } from 'react';
import MultiLinearProgress from './liner-box/MultiLinearProgress';
import { useRandomValue, useRandomValueMultiLoadingProgress } from '@/hooks';
import { CheckoutSlider } from '@/components/checkout';
import { getTextSize } from '@/utils/question/getTextSize';
import SummaryQuestionRoot from './summary-question/SummaryQuestionRoot';
import Result from '@/components/pre-checkout/result/Result';
import ParasitChart from './chart/ParasitChart';
import ParasitSingleChart from './chart/ParasitSingleChart';

const ParasiteImage = dynamic(() => import('./ParasiteImage'));
const ParasiteIcon = dynamic(() => import('./ParasiteIcon'));
const ParasiteLiner = dynamic(() => import('./liner-box/ParasiteLiner'));
const TransitionText = dynamic(() => import('./TransitionText'));
const TitleFade = dynamic(() => import('./title-fade/TitleFade'));

const LineChartProgressGoalWeight = dynamic(() => import('../parasite-question/chart/LineChartProgressGoalWeight'), {
  ssr: false,
});

const LineChartProgress = dynamic(() => import('../parasite-question/chart/LineChartProgress'), {
  ssr: false,
});

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  question: QUESTION;
};

const ParasiteQuestionRootComponent = ({ question }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { preAid, allQuestions, code, token, currentQuestion, type, questionType } = question as QUESTION;
  const { dispatch } = useQuestionContext();
  const cookie = new Cookies();
  const [opacity, setOpacity] = useState(0);
  const [translate, setTranslate] = useState('40px');
  const { firstStep, secondStep, thirdStep } = useRandomValue();
  const { first, forth, second, third } = useRandomValueMultiLoadingProgress();

  useEffect(() => {
    localStorage.removeItem('timer');
  }, []);

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
      setTranslate('0');
    }, 1);
  }, []);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const handleClick = () => {
    const aidStr = question.answers[0].aid;
    dispatch({
      type: 'UPDATE_QUESTIONS',
      payload: {
        aid: aidStr,
        type: type,
      },
    });

    const obj = {
      Authorization: token,
      type: type,
      code: code,
      preAid: preAid,
      currentQuestion: currentQuestion,
      allQuestions: allQuestions,
      questionType: questionType,
    };
    setCookies(obj, {}, cookie);
  };

  const renderElement = (element: { id: string; inputs: IconElementInputs | any }, index: number) => {
    switch (element.id) {
      case 'icon':
        return <ParasiteIcon key={'icon'} inputs={element.inputs} />;
      case 'title':
        return (
          <Text
            key={'title'}
            inputs={element.inputs}
            component='h1'
            variant='h2'
            textColor={question.parasite.textColor}
          />
        );
      case 'description':
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const id = useId();
        return (
          <Text
            key={`description${element.inputs.text}${id}`}
            inputs={element.inputs}
            variant='body2'
            component='p'
            textColor={question.parasite.textColor}
            questionType={questionType}
          />
        );
      case 'transitionText':
        return <TransitionText key={'transitionText'} inputs={element.inputs} />;
      case 'singleChart':
        if (type == 'fastfit') {
          return <ParasitSingleChart key={index} inputs={element?.inputs} />;
        } else {
          return <LineChartProgressGoalWeight key={index} inputs={element?.inputs} />;
        }
      case 'chart':
        if (type == 'fastfit') {
          return <ParasitChart key={'chart'} inputs={element?.inputs} />;
        } else {
          return <LineChartProgress key={index} inputs={element?.inputs} />;
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
        );
      case 'summery':
        return <SummaryQuestionRoot key={'sammery'} data={element.inputs} aid={question.parasite.aid} />;
      case 'loading':
        return (
          <ParasiteLiner
            firstStep={firstStep}
            secondtStep={secondStep}
            thirdStep={thirdStep}
            key={'loading'}
            inputs={element.inputs as any}
            thisAid={question.answers[0].aid}
          />
        );
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
          />
        );
      case 'comments':
        return (
          <CommentsWrapper style={{ width: '100%' }}>
            <CheckoutSlider horizontalComments={element.inputs} />
          </CommentsWrapper>
        );
      case 'image':
        return <ParasiteImage key={'image'} inputs={element.inputs} />;
      case 'video':
      // return <VideoPlayer inputs={element.inputs} />;
      case 'button':
        return (
          <Button variant='question' onClick={handleClick} position={'fixed'} key={'button'}>
            <Typography>{element?.inputs?.text}</Typography>
          </Button>
        );
      default:
        return null;
    }
  };

  const renderedElements = question?.parasite.elements.map((element, index) => renderElement(element, index));

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root opacity={opacity} translate={translate}>
      {renderedElements}
    </Root>
  );
};

export default ParasiteQuestionRootComponent;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section<{ opacity: number; translate: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: ${(props) => props.opacity};
  margin-bottom: ${(props) => props.translate};
  transition: opacity 1.5s, margin 1.5s;
  padding-top: 20px;
`;

const CommentsWrapper = styled.section`
  height: min-content;
  /* bottom: 0px;
  position: relative;
  margin-top: -60px;

  @media (min-width: 850px) {
    position: absolute;
    margin-top: 0;
  } */
`;
