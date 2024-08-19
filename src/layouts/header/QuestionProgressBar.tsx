'use client';

import { THISPROJECT } from '@/constants/projects';
import { colors } from '@/theme';
import { getCookies } from '@/utils/insdex';

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
      <section
        style={{
          width: '100%',
          height: '4px',
          backgroundColor: '#eaeef2',
          position: 'absolute',
          bottom: -1,
          left: 0,
        }}
      />
      <section
        style={{
          width: `${(Number(currentQuestion) / Number(allQuestions)) * 100}%`,
          maxWidth: '100%',
          height: '4px',
          backgroundColor: colors.secondary,
          position: 'absolute',
          bottom: -1,
          ...(THISPROJECT.DEFAULT_LOCALE === 'fa_IR' ? { right: 0 } : { left: 0 }),
        }}
      />
    </>
  );
};

export default QuestionProgressBar;

/**
 * styled-component
 * _______________________________________________________________________________
 */
