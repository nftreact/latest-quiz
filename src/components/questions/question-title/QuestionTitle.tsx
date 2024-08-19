'use client';
import Typography from '@/primitives/typography/Typography';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  title?: string;
};

const QuestionTitle = ({ title }: Props) => {
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
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root tag='h1' variant={'h2'} textalign='center' opacity={opacity} translate={translate} fontWeight={600}>
      {title}
    </Root>
  );
};

export default QuestionTitle;
/**
 * styled-component
 * _______________________________________________________________________________
 */
const Root = styled(Typography)<{ opacity: number; translate: string }>`
  opacity: ${(props) => props.opacity};
  transform: translateY(${(props) => props.translate});
  transition: opacity 1s, transform 1s;
`;
