/* eslint-disable @next/next/no-img-element */
'use client';

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

const BorderImage = ({ question }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const src = question?.borderImage;
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
    <Container opacity={opacity} translate={translate}>
      <img
        src={src}
        alt='quiz border image'
        style={{ maxWidth: '200px', objectFit: 'cover', height: 'auto' }}
        loading='lazy'
      />
    </Container>
  );
};

export default BorderImage;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Container = styled.section<{ opacity: number; translate: string }>`
  position: fixed;
  bottom: -10px;
  left: 0px;
  z-index: -100;

  opacity: ${(props) => props.opacity};
  transition: opacity 2s;

  @media (min-width: 600px) {
    left: calc(50% - 300px);
  }
`;
