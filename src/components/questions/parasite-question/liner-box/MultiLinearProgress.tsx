'use client';

import { AppFlex, Typography } from '@/primitives';
import { useQuestionContext } from '@/providers';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { styled } from 'styled-components';
import Cookies from 'universal-cookie';
import MultiLineTypo from './MultiLineTypo';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  data: any;
  aid: any;

  firstStep: number;
  secondtStep: number;
  thirdStep: number;
  forthStep: number;
};

type PROGRESS = {
  color: string;
  delay: string;
  hasButton: string;
  maxValue: string;
  text: string;
  texts: string;
  time: string;
  type: string;
};

const MultiLinearProgress = ({ data, aid, firstStep, secondtStep, thirdStep, forthStep }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [progressState, setProgressState] = useState<PROGRESS>(data[0]);
  const [progress, setProgress] = useState(0);
  const [animationStyle, setAnimationStyle] = useState('');
  const { dispatch } = useQuestionContext();
  const cookie = new Cookies();
  const type = cookie.get('type');

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    const handleProgressUpdate = () => {
      setProgress((prevProgress) => {
        if (prevProgress < firstStep) {
          return prevProgress + 1;
        } else if (prevProgress < secondtStep) {
          return prevProgress + 1;
        } else if (prevProgress < thirdStep) {
          return prevProgress + 1;
        } else if (prevProgress < forthStep) {
          return prevProgress + 1;
        } else if (prevProgress < 100) {
          return prevProgress + 1;
        }
        return prevProgress;
      });
    };

    if (progress === 2) {
      setAnimationStyle('titleFadeIn');
    }
    if (progress === 30) {
      setAnimationStyle('titleFadeOut');
    }
    if (progress === 37) {
      setProgressState(data[1]);
      setAnimationStyle('titleFadeIn');
    }
    if (progress === 53) {
      setAnimationStyle('titleFadeOut');
    }
    if (progress === 60) {
      setProgressState(data[2]);
      setAnimationStyle('titleFadeIn');
    }

    if (progress < firstStep) {
      interval = setInterval(handleProgressUpdate, 70);
    } else if (progress < secondtStep) {
      interval = setInterval(handleProgressUpdate, 200);
    } else if (progress < thirdStep) {
      interval = setInterval(handleProgressUpdate, 250);
    } else if (progress < forthStep) {
      interval = setInterval(handleProgressUpdate, 100);
    } else if (progress < 100) {
      interval = setInterval(handleProgressUpdate, 30);
    }

    if (progress === 100) {
      dispatch({
        type: 'UPDATE_QUESTIONS',
        payload: {
          aid: aid,
          type: type,
        },
      });
    }

    return () => clearInterval(interval);
  }, [progress]);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root direction='column' gap={'10px'} align='center'>
      <CircularProgressbarStyle
        color={'#2E9A9A'}
        value={Math.round(progress)}
        maxValue={100}
        text={`${Math.round(progress)}%`}
      />
      <MultiLineTypo color={progressState.color} text={progressState.text} animationStyle={animationStyle} />
    </Root>
  );
};

export default MultiLinearProgress;

/**
 * styled-component
 * _______________________________________________________________________________
 */
const Root = styled(AppFlex)`
  padding-block: 40px;

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
    animation: fade-in 2.5s forwards;
    opacity: 1;
  }

  .titleFadeOut {
    animation: fade-out 2.5s forwards;
    opacity: 0;
  }
`;

const CircularProgressbarStyle = styled(CircularProgressbar)<{ color: string }>`
  width: 150px;
  height: 150px;
  margin: auto;
  margin-block: 10px;

  & .CircularProgressbar-path {
    stroke: ${({ color }) => color && color} !important;
    transform: all 0.3s ease;
  }

  & .CircularProgressbar-text {
    stroke: ${({ color }) => color && color} !important;
  }
`;
