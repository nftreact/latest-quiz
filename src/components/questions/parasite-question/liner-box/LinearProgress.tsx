'use client';

import { Typography } from '@/primitives';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  delay: number;
  duration: number;
  maxValue: number;
  color: string;
  firstStep: number;
  secondtStep: number;
  thirdStep: number;
  onProgressCompleted: (value: boolean) => void;
};

const LinearProgress = ({
  color,
  delay,
  duration,
  maxValue,
  firstStep,
  secondtStep,
  thirdStep,
  onProgressCompleted,
}: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [progress, setProgress] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);

  /**
   * useEffect
   * _______________________________________________________________________________
   */
  useEffect(() => {
    setTimeout(() => setShouldStart(true), delay);
  }, [delay]);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    const sample = () => {
      setProgress((prevProgress) => prevProgress + 1);
    };

    if (progress < firstStep) {
      interval = setInterval(sample, 60);
    } else if (progress < secondtStep) {
      interval = setInterval(sample, 200);
    } else if (progress < thirdStep) {
      interval = setInterval(sample, 100);
    } else if (progress < 100) {
      interval = setInterval(sample, 40);
    }

    return () => {
      clearInterval(interval);
    };
  }, [delay, duration, maxValue, shouldStart, progress]);

  if (progress === 100) {
    onProgressCompleted(true);
  }

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
      <CircularProgressbarStyle
        color={color}
        value={Math.round(progress)}
        maxValue={maxValue}
        text={`${Math.round(progress)}%`}
      />
      <Typography style={{ minWidth: '40px' }} variant='body2' color=''>
        {`${Math.round(progress)}%`}
      </Typography>
    </Root>
  );
};

export default LinearProgress;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  span {
    display: none !important;
  }
`;

const CircularProgressbarStyle = styled(CircularProgressbar)<{ color: string }>`
  width: 100px;
  height: 100px;
  margin: auto;
  margin-block: 10px;

  & .CircularProgressbar-path {
    stroke: ${({ color }) => color && color} !important;
    transition: stroke-dashoffset 0.1s ease 0s;
  }

  & .CircularProgressbar-text {
    stroke: ${({ color }) => color && color} !important;
  }
`;
