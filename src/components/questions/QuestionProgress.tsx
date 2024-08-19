'use client';

import { THISPROJECT } from '@/constants/projects';
import { AppFlex } from '@/primitives';
import { colors } from '@/theme/colors';
import { memo } from 'react';
import { styled } from 'styled-components';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  allQuestions?: string | number;
  currentQuestion?: string | number;
  questionType: string;
};

const QuestionProgress = ({ allQuestions, currentQuestion, questionType }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  const locale = THISPROJECT.DEFAULT_LOCALE;

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
    <Root questionType={questionType} style={{ border: '1px solid red' }}>
      <Progress
        style={{
          width: `${(Number(currentQuestion) / Number(allQuestions)) * 100}%`,
          ...(locale === 'fa_IR' ? { right: 0 } : { left: 0 }),
        }}
      />
    </Root>
  );
};

export default memo(QuestionProgress);

/**
 * styled-component
 * _______________________________________________________________________________
 */
const Root = styled.section<{ questionType: string }>`
  display: ${({ questionType }) => (questionType === 'parasite' ? 'none' : 'flex')};
  border: 1px solid red;
  background-color: #eaeef2;
  border-radius: 6px;
  height: 6px;
  position: relative;
  width: 97%;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
`;

const Progress = styled.div`
  background-color: ${colors.secondary};
  position: absolute;
  height: 6px;
  border-radius: 6px;
  top: 0;
  transition: all 500ms cubic-bezier(0.4, 0, 1, 1);
`;
