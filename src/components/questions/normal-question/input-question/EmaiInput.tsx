'use client';

import { thisLocale } from '@/constants/projects';
import { Button, Typography } from '@/primitives';
import { useQuestionContext } from '@/providers';
import { Answer } from '@/types/questions';
import { Encode, getCookies } from '@/utils/insdex';
import { isAnyValueNotEmpty } from '@/utils/question/isAnyValueNotEmpty';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  answer: Answer;
};

const EmailInput = ({ answer }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const locale = thisLocale;
  const { dispatch } = useQuestionContext();
  const { type } = getCookies();
  const isShowHint = isAnyValueNotEmpty(answer.hint as any);

  const { register, watch } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const handleClick = () => {
    dispatch({
      type: 'UPDATE_QUESTIONS',
      payload: {
        type: type,
        aid: answer.aid,
        email: watch('email') && Encode(watch('email')),
      },
    });
  };

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
    <Root>
      <InputContainer errortext={''} className='InputContainer' id='input-container'>
        <input
          placeholder={locale === 'en_US' ? 'Email Entry Field' : 'Campo di Inserimento Email'}
          {...register('email')}
          required
        />
      </InputContainer>
      {isShowHint && (
        <HintContainer>
          <p className='title-typo'>{answer.hint?.title}</p>
          <p className='desc-typo'>{answer.hint?.description}</p>
        </HintContainer>
      )}

      <Button
        onClick={handleClick}
        variant='question'
        disabled={!Boolean(watch('email'))}
        style={{ marginBlock: '40px' }}
      >
        <Typography fontWeight={500}>{answer.text}</Typography>‍
      </Button>
    </Root>
  );
};

export default EmailInput;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section``;

const InputContainer = styled.div<{ errortext: string | undefined }>`
  display: flex;
  align-items: center;
  gap: 5px;
  border: ${({ errortext }) => (errortext ? `1.5px solid red` : '2px solid #02857A')};
  height: 50px;
  border-radius: 4px;
  padding-inline: 8px;
  cursor: pointer;
  width: 100%;

  input {
    outline: none;
    height: 100%;
    border: none;
    font-size: 14px;
    color: ${({ errortext }) => (errortext ? `red` : '#000')};
    width: -webkit-fill-available;

    /* font-family */
  }

  p {
    color: ${({ errortext }) => (errortext ? `red` : '#000')};
    font-size: 14px;
  }

  svg {
    scale: 1.4;
    fill: red;
  }
`;

const HintContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: rgb(251, 251, 251);
  border: 1px solid #eaeef2;

  .title-typo {
    font-size: 12px;
  }

  .desc-typo {
    font-size: 10px;
  }
`;
