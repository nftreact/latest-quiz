'use client';

import { THISPROJECT } from '@/constants/projects';
import { Typography } from '@/primitives';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  text: string;
  delay: number;
  textColor: string;
};

const TitleFadeItem = ({ delay, text, textColor }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [shown, setShown] = useState(false);
  const [thisClass, setThisClass] = useState('');

  /**
   * useEffect
   * _______________________________________________________________________________
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShown(true);
      setThisClass('titleFadeIn');
    }, delay);

    const timer2 = setTimeout(() => setThisClass('titleFadeOut'), delay + 2000);

    const timer3 = setTimeout(() => setShown(false), delay + 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [delay]);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root>
      <Typography
        textalign='center'
        variant='h3'
        tag='p'
        textcolor={THISPROJECT.DEFAULT_LOCALE === 'fa_IR' ? '#fff' : textColor}
        className={thisClass}
        style={{ display: shown ? 'block' : 'none' }}
      >
        {text}
      </Typography>
    </Root>
  );
};

export default TitleFadeItem;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .titleFadeIn {
    animation: fade-in 2s forwards;
    opacity: 1;
  }

  .titleFadeOut {
    animation: fade-out 2s forwards;
    opacity: 0;
  }
`;
