'use client';

import { AppFlex, Button, Typography } from '@/primitives';
import { useQuestionContext } from '@/providers';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { css, styled } from 'styled-components';
import Cookies from 'universal-cookie';
import MultiLineTypo from './MultiLineTypo';
import { thisLanguage } from '@/constants/projects';
import { toast } from 'react-toastify';

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
  hasDisableBtn?: boolean;
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

const MultiLinearProgress = ({ data, aid, firstStep, secondtStep, thirdStep, forthStep, hasDisableBtn }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [progressState, setProgressState] = useState<PROGRESS>(data[0]);
  const [progress, setProgress] = useState(0);
  const [isEnableBtn, setIsEnableBtn] = useState(true);
  const [animationStyle, setAnimationStyle] = useState('');
  const { dispatch } = useQuestionContext();
  const cookie = new Cookies();
  const type = cookie.get('type');

  const language = thisLanguage;
  const toastText =
    language === 'en'
      ? 'Matcha AI is analyzing your condition, please wait.'
      : language === 'it'
      ? `L'intelligenza artificiale Matcha sta analizzando la tua situazione, attendi.`
      : 'هوش مصنوعی ماچا در حال تحلیل شرایط شماست، لطفا منتظر بمانید';

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
      if (hasDisableBtn) {
        setIsEnableBtn(false);
      } else {
        dispatch({
          type: 'UPDATE_QUESTIONS',
          payload: {
            aid: aid,
            type: type,
          },
        });
      }
    }

    return () => clearInterval(interval);
  }, [progress]);

  const handleButton = () => {
    if (isEnableBtn) {
      toast.warning(toastText);
    } else {
      dispatch({
        type: 'UPDATE_QUESTIONS',
        payload: {
          aid: aid,
          type: type,
        },
      });
    }
  };

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
      <ButtonStyle isEnableBtn={isEnableBtn} variant='question' onClick={handleButton} position='fixed'>
        <Typography color='#fff'>{language === 'en' ? 'Next' : language === 'it' ? 'Continua' : 'بعدی'}</Typography>
      </ButtonStyle>
    </Root>
  );
};

export default MultiLinearProgress;

/**
 * styled-component
 * _______________________________________________________________________________
 */
const Root = styled(AppFlex)`
  padding-block: 10px 20px;

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
  width: 160px;
  height: 160px;
  margin: auto;
  /* margin-block: 10px; */

  @media (min-width: 800px) {
    width: 170px;
    height: 170px;
  }

  & .CircularProgressbar-path {
    stroke: ${({ color }) => color && color} !important;
    transform: all 0.3s ease;
  }

  & .CircularProgressbar-text {
    stroke: ${({ color }) => color && color} !important;
  }
`;

const ButtonStyle = styled(Button)<{ isEnableBtn: boolean }>`
  ${({ isEnableBtn }) =>
    isEnableBtn &&
    css`
      background-color: #f5f5f5;
      box-shadow: none;
      color: #606060;

      &:focus {
        background-color: #f5f5f5;
        border: none;
        outline: none;
      }

      &:hover {
        background-color: #f5f5f5;
        border: none;
        outline: none;
      }
    `};
`;
