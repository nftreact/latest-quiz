'use client';

import { Typography } from '@/primitives';
import { QUESTION } from '@/types/questions';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  question: QUESTION;
};

const Hint = ({ question }: Props) => {
  const { title, caption } = question.hint;

  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [opacity, setOpacity] = useState(0);
  const [translate, setTranslate] = useState('40px');

  /**
   * useEffect
   * _______________________________________________________________________________
   */
  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
      setTranslate('0');
    }, 2);
  }, []);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root opacity={opacity} translate={translate}>
      {title && (
        <Typography variant='h4' tag='p'>
          {title}
        </Typography>
      )}
      <Typography variant='subtitle2' tag='p'>
        {caption}
      </Typography>
    </Root>
  );
};

export default Hint;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section<{ opacity: number; translate: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f7f7f880;
  border-radius: 12px;
  padding: 24px 16px;
  border: 1px solid #eaeef2;
  z-index: 10;
  color: '#464646';

  opacity: ${(props) => props.opacity};
  transform: translateY(${(props) => props.translate});
  transition: opacity 1s, transform 1s;
`;
