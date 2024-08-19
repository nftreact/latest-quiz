/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Button, Typography } from '@/primitives';
import { LoadingElementInputs } from '@/types/questions';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import LinearProgress from './LinearProgress';
import { useQuestionContext } from '@/providers';
import { getCookies } from '@/utils/insdex';
import { THISPROJECT, thisLanguage, thisLocale } from '@/constants/projects';
import { toast } from 'react-toastify';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  inputs: LoadingElementInputs;
  thisAid: string;
  firstStep: number;
  secondtStep: number;
  thirdStep: number;
};

const ParasiteLiner = ({ inputs, thisAid, firstStep, secondtStep, thirdStep }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { dispatch } = useQuestionContext();

  const { type } = getCookies();
  const [isEnableBtn, setIsEnableBtn] = useState(false);
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

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const handleButton = () => {
    if (!isEnableBtn) {
      toast.warning(toastText);
    } else {
      dispatch({
        type: 'UPDATE_QUESTIONS',
        payload: {
          aid: thisAid,
          type: type,
        },
      });
    }
  };

  const handleValueBtn = (value: boolean) => {
    setIsEnableBtn(value);
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  if (inputs.type === 'linear')
    return (
      <Root
        style={{
          direction: process.env.DEFAULT_LOCALE === 'fa_IR' ? 'ltr' : 'rtl',
        }}
      >
        <LinearProgress
          maxValue={Number(inputs.maxValue) ?? 100}
          delay={Number(inputs.delay) * 1000 ?? 0}
          duration={Number(inputs.time) * 1000}
          color={inputs.color}
          firstStep={firstStep}
          secondtStep={secondtStep}
          thirdStep={thirdStep}
          onProgressCompleted={handleValueBtn}
        />
        {inputs.text && (
          <Typography
            style={{
              textAlign: 'center',
              marginRight: '10px',
              direction: THISPROJECT.DEFAULT_LOCALE === 'fa_IR' ? 'rtl' : 'ltr',
            }}
            tag='p'
            variant='body1'
            dangerouslySetInnerHTML={{ __html: inputs.text }}
          />
        )}
        <ButtonStyle isEnableBtn={isEnableBtn} variant='question' onClick={handleButton} position='fixed'>
          <Typography color='#fff'>{language === 'en' ? 'Next' : language === 'it' ? 'Continua' : 'بعدی'}</Typography>
        </ButtonStyle>
      </Root>
    );
  return <></>;
};

export default ParasiteLiner;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ButtonStyle = styled(Button)<{ isEnableBtn: boolean }>`
  ${({ isEnableBtn }) =>
    !isEnableBtn &&
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
