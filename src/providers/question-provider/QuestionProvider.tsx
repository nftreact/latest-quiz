'use client';

import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionAction, QuestionContextProps, QuestionProviderProps, Questions } from './question-provider.type';
import styled from 'styled-components';
import { objectToQueryString } from '@/utils/insdex';
import Cookies from 'universal-cookie';

const initialQuestions: Questions = {
  aid: '',
  height_cm: '',
  height_ft: '',
  height_in: '',
  weight_current_kg: '',
  weight_current_lbs: '',
  weight_goal_lbs: '',
  weight_goal_kg: '',
  type: '',
  calendar: '',
  email: '',
  allQuestions: '',
  currentQuestion: '',
  };

/**
 * Create the context
 * _______________________________________________________________________________
 */

const QuestionContext = createContext<QuestionContextProps>({
  questions: initialQuestions,
  dispatch: () => {},
});

/**
 * Create the reducer function
 * _______________________________________________________________________________
 */
const questionReducer = (state: Questions, action: QuestionAction): Questions => {
  switch (action.type) {
    case 'UPDATE_QUESTIONS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const QuestionProvider = ({ children, bgColor, questions: allQuestions }: QuestionProviderProps) => {
  /**
   * cosnt and variables
   * _______________________________________________________________________________
   */
  const cookie = new Cookies();
  const [questions, dispatch] = useReducer(questionReducer, initialQuestions);
  const { push } = useRouter();

  useEffect(() => {
    cookie.remove('noRedirect', {
      path: '/',
    });

    cookie.remove('offer', {
      path: '/',
    });

    cookie.remove('discount', {
      path: '/',
    });

    cookie.remove('isShowboxOffer', {
      path: '/',
    });
  }, []);

  /**
   * useEffect
   * _______________________________________________________________________________
   */
  useEffect(() => {
    const params = objectToQueryString(questions as any);

    if (params) {
      push(`/question/${params}`);
    }
  }, [questions]);

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <QuestionContext.Provider value={{ questions, dispatch }}>
      <Root bgcolor={bgColor}>
        <Container bgcolor={bgColor}>{children}</Container>
      </Root>
    </QuestionContext.Provider>
  );
};

export default QuestionProvider;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section<{ bgcolor?: string }>`
  position: absolute;
  inset: 0;
  bottom: 0;
  min-height: 100vh;
  background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : '')};
  padding-top: 55px;
`;

const Container = styled.div<{ bgcolor?: string }>`
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-block: 10px 24px;
  padding-inline: 16px;
  padding-bottom: 70px;
  background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : '')};
`;

export const useQuestionContext = (): QuestionContextProps => useContext(QuestionContext);
