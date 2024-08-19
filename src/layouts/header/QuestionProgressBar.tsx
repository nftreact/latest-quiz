'use client';

import { THISPROJECT } from '@/constants/projects';
import { colors } from '@/theme';
import styled from 'styled-components';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  allQuestions: string | number;
  currentQuestion: string | number;
};

const QuestionProgressBar = ({ allQuestions, currentQuestion }: Props) => {
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
    <>
      <Root>
        <section
          style={{
            zIndex: 100,
            width: `${(Number(currentQuestion) / Number(allQuestions)) * 100}%`,
            maxWidth: '100%',
            height: '100%',
            backgroundColor: colors.secondary,
            position: 'absolute',
            margin: 'auto',
            borderRadius: '5px',
            transition: 'all 10ms ease',
            ...(THISPROJECT.DEFAULT_LOCALE === 'fa_IR' ? { right: 0 } : { left: 0 }),
          }}
        />
      </Root>
    </>
  );
};

export default QuestionProgressBar;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section`
  position: relative;
  height: 6px;
  width: 92%;
  margin: auto;
  border-radius: 5px;
  background-color: #e9ecef;
  z-index: 100;
  margin-top: 5px;

  @media (min-width: 500px) {
    width: 97%;
  }
`;
