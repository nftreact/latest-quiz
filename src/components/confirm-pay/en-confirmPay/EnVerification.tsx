'use client';

import { AppFlex, Button, Typography } from '@/primitives';
import { useMutation } from '@tanstack/react-query';
import { IoMdInformationCircleOutline, IoMdLock } from 'react-icons/io';
import { MdOutlineModeEdit } from 'react-icons/md';
import { styled } from 'styled-components';
import { sendPhoneNumber, sendVerificationCode } from '../confirmPay.services';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { useCountDownTimer } from '@/hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReactLoading from 'react-loading';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {};

const validationSchema = yup.object().shape({
  VerificationCode: yup
    .string()
    .test({
      name: 'numeric-range',
      message: 'Please enter the sent code',
      test: (value) => {
        if (value) return value?.length >= 5;
      },
    })
    .min(5)
    .max(5, 'Please enter the sent code')
    .required('Please enter the sent code'),
});

const EnVerification = ({}: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { push } = useRouter();
  const cookie = new Cookies();
  const phoneNumber = cookie.get('phoneNumber');
  const time = '120000';
  const [isValidReset, setIsValidReset] = useState(false);
  const [, { start, render, isStarted }] = useCountDownTimer(Number(time), 1000, 'minutes');
  const code = cookie.get('code');
  const hRef = window.location.href;
  const token = cookie.get('Authorization');

  const {
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  /**
   * useEffect
   * _______________________________________________________________________________
   */
  useEffect(() => {
    start();
  }, [isValidReset]);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const { mutate, isLoading } = useMutation(
    () => {
      return sendVerificationCode(phoneNumber, watch('VerificationCode'), code, hRef);
    },
    {
      onSuccess: (data) => {
        if (data.success === 'true') {
          toast.success(data.data.verifySubtitle);
        }
        if (data.success === 'false') {
          toast.error(data.message);
        }
      },
      onError: (error) => console.log(error, 'error'),
    },
  );

  const { mutate: reciveCode } = useMutation(
    () => {
      return sendPhoneNumber(Number(phoneNumber), hRef, token);
    },
    {
      onSuccess: (data) => {
        if (data.success === 'true') {
          cookie.set('phoneNumber', data.data.phoneNumber);
          toast.success(data.data.verifySubtitle);
          start();
        }
        if (data.success === 'false') {
          toast.error(data.message);
        }
      },
      onError: (error) => console.log(error, 'error'),
    },
  );

  const handleResetCode = () => {
    reciveCode();
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root errorTesxt={errors?.VerificationCode?.message}>
      <AppFlex direction='column' align='center' gap={'10px'}>
        <Typography variant='body1' textalign='center' fontWeight={700}>
          Enter Auth Code
        </Typography>
        {/* <Typography variant='subtitle2'>{`The 5-digit code has been sent to the number ${phoneNumber}.`}</Typography> */}
      </AppFlex>
      <InputContainer errorTesxt={errors.VerificationCode?.message} className='InputContainer'>
        <input type='number' value={watch('VerificationCode')} {...register('VerificationCode')} />
        {errors.VerificationCode?.message && <IoMdInformationCircleOutline />}
      </InputContainer>
      <TextError>{errors.VerificationCode?.message}</TextError>

      {/* EditAndResetTimer */}
      <EditAndResetTimer direction='column' gap={'10px'}>
        <AppFlex>
          <IoMdLock fill='#AAB3C0' />
          <ResetTmeBtn disabled={isStarted} className='typo' onClick={handleResetCode}>
            Re-send code request{' '}
          </ResetTmeBtn>
          <Typography textcolor='#AAB3C0' className='typo'>
            {render(time)}
          </Typography>
        </AppFlex>
        <AppFlex align='center'>
          <MdOutlineModeEdit fill='red' />
          <Typography
            className='typo edit-btn'
            variant='subtitle2'
            textcolor='red'
            onClick={() => push('/confirmPay/recivecode')}
          >
            Edit mobile number
          </Typography>
        </AppFlex>
      </EditAndResetTimer>
      <Button
        onClick={() => {
          mutate();
        }}
        variant='question'
        position='fixed'
        disabled={!!errors.VerificationCode?.message || !watch('VerificationCode')}
      >
        {isLoading ? (
          <AppFlex justify='center'>
            <ReactLoading color='#ffff' type='spin' width={20} height={20} />
          </AppFlex>
        ) : (
          <Typography variant='subtitle1'>View the program</Typography>
        )}
      </Button>
    </Root>
  );
};

export default EnVerification;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section<{ errorTesxt: string | undefined }>`
  padding-inline: 16px;
  position: relative;
  padding-block: 100px 40px;
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  direction: ltr;

  & .InputContainer:focus-within {
    border: ${({ errorTesxt }) => (errorTesxt ? `1.5px solid red` : '2px solid #02857a')};
  }
`;

const InputContainer = styled.div<{ errorTesxt: string | undefined }>`
  display: flex;
  align-items: center;
  gap: 5px;
  border: ${({ errorTesxt }) => (errorTesxt ? `1.5px solid red` : '1.5px solid #a8a8a8')};
  height: 50px;
  border-radius: 4px;
  padding-inline: 8px;
  cursor: pointer;
  direction: ltr;

  input {
    outline: none;
    height: 100%;
    width: 100%;
    border: none;
    font-size: 14px;
    color: ${({ errorTesxt }) => (errorTesxt ? `red` : '#000')};
  }

  p {
    color: ${({ errorTesxt }) => (errorTesxt ? `red` : '#000')};
    font-size: 14px;
  }

  svg {
    scale: 1.4;
    fill: red;
  }
`;

const TextError = styled.p`
  position: absolute;
  bottom: 140px;
  font-size: 10px;
  color: red;
`;

const EditAndResetTimer = styled(AppFlex)`
  padding-block: 20px;
  .typo {
    font-size: 12px;
    margin-right: 5px;
  }

  .edit-btn {
    cursor: pointer;
  }
`;

const ResetTmeBtn = styled.button`
  border-style: none;
  appearance: none;
  background-color: #fff;
  cursor: pointer;

  &:disabled {
    box-shadow: none;
    cursor: not-allowed;
  }
`;
