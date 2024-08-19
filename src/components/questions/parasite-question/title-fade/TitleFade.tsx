'use client';

import { TitleFadeBoxProps } from '@/types/questions';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { styled } from 'styled-components';
import TitleFadeItem from './TitleFadeItem';
import { useQuestionContext } from '@/providers';
import { getCookies } from '@/utils/insdex';

/**
 * props
 * _______________________________________________________________________________
 */

const TitleFade = ({ inputs, thisAid, isResult, nextPage, textColor }: TitleFadeBoxProps) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { dispatch } = useQuestionContext();
  const delay = 4000;
  const { push, replace } = useRouter();
  const inputsLength = inputs && inputs.texts?.length;
  const { type } = getCookies();

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const goNext = () => {
    if (isResult === 'true') {
      if (type === 'fastfit') {
        push(`${nextPage}`);
      } else {
        push(`/${nextPage}`);
      }
    } else {
      dispatch({
        type: 'UPDATE_QUESTIONS',
        payload: {
          aid: thisAid,
          type: type,
        },
      });
    }
  };

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    const timer = setTimeout(() => goNext(), delay * Number(inputsLength) + 300);
    return () => clearTimeout(timer);
  }, []);

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <TitleFadeWrapper>
      {inputs?.texts?.map((text, index) => {
        return <TitleFadeItem key={text + index} text={text} delay={index * delay} textColor={textColor} />;
      })}
    </TitleFadeWrapper>
  );
};

export default TitleFade;

/**
 * styled-component
 * _______________________________________________________________________________
 */

export const TitleFadeWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: absolute;
  top: calc(50% - 25px);
  left: 0;
`;
