'use client';

import { QUESTION } from '@/types/questions';
import { setCookies } from '@/utils/insdex';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Cookies from 'universal-cookie';
import EmailInput from './input-question/EmaiInput';
import { Decode, DecodeBase64, Encode, parseQueryParams } from '@/utils/insdex';

const GenderQuestion = dynamic(() => import('./GenderQuestion'));
const SelectQuestion = dynamic(() => import('./select-question/SelectQuestion'));
const CalendarQuestion = dynamic(() => import('./CalendarQuestion'));
const InputQuestion = dynamic(() => import('./input-question/InputQuestion'));

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  question?: QUESTION;
};

const NormalQuestionRootComponent = ({ question }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const hasborderImage = Boolean(question?.borderImage);
  const cookie = new Cookies();
  const [opacity, setOpacity] = useState(0);
  const [translate, setTranslate] = useState('40px');

  //

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
      setTranslate('0');
    }, 500);
  }, []);

  useEffect(() => {
    const obj = {
      Authorization: question?.token,
      type: question?.type,
      code: question?.code,
      preAid: question?.preAid,
      currentQuestion: question?.currentQuestion,
      allQuestions: question?.allQuestions,
      questionType: question?.questionType,
    };

    setCookies(obj, {}, cookie);
  }, []);

  useEffect(() => {
    if (Number(question?.currentQuestion) < 4) {
      localStorage.removeItem('defaultUnit');
    }
  }, [question?.currentQuestion]);

  useEffect(() => {
    localStorage.removeItem('timer');
  }, []);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const renderElement = () => {
    switch (question?.questionType) {
      case 'singleSelect':
      case 'multiSelect':
        return (
          <SelectQuestion
            key={1}
            questionType={question?.questionType}
            answers={question?.answers}
            hasborderImage={String(hasborderImage)}
          />
        );
      case 'genderSelection':
        return <GenderQuestion key={2} answers={question.answers} />;
      case 'Calendar':
        return <CalendarQuestion key={3} answer={question.answers[0]} error={''} />;
      case 'inputQuestion':
        if (question.inputQuestion !== 'email') {
          return <InputQuestion answer={question.answers[0]} questionType={question?.inputQuestion} />;
        } else if (question.inputQuestion === 'email') {
          return <EmailInput answer={question.answers[0]} />;
        }
      default:
        return null;
    }
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root opacity={opacity} translate={translate}>
      {renderElement()}
    </Root>
  );
};

export default NormalQuestionRootComponent;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section<{ opacity: number; translate: any }>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-block: 15px;

  opacity: ${(props) => props.opacity};
  margin-top: ${(props) => props.translate};
  transition: opacity 0.5s, margin 0.5s;
`;
