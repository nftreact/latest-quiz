'use client';

import { AppFlex, Button, Typography } from '@/primitives';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { sendPhoneNumber, sendVerificationCode } from '../confirmPay.services';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCountDownTimer } from '@/hooks';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { MdOutlineModeEdit } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { IoMdLock } from 'react-icons/io';
import { digitsFaToEn } from '@persian-tools/persian-tools';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {};

const validationSchema = yup.object().shape({
  VerificationCode: yup.string(),
  // .test({
  //   name: 'numeric-range',
  //   message: 'لطفا طبق الکو کد خود را وارد کنید (کد شامل ۵ رقم میباشد) ',
  //   test: (value) => {
  //     if (value) return value?.length >= 5;
  //   },
  // })
  // .min(5)
  // .max(5, 'لطفا طبق الکو کد خود را وارد کنید (کد شامل ۵ رقم میباشد) ')
  // .required('لطفا شماره مبایل خود را وارد کنید'),
});

const Verification = ({}: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  const { push } = useRouter();
  const cookie = new Cookies();
  const searchParams = useSearchParams();
  const confirmPayCode = searchParams.get('code');
  const phoneNumber = cookie.get('phoneNumber');
  const time = '120000';
  const [isValidReset, setIsValidReset] = useState(false);
  const [, { start, render, isStarted }] = useCountDownTimer(Number(time), 1000, 'minutes');
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
    (variables: { mobileNumber: string; verificationCode: string; code: string | null }) => {
      return sendVerificationCode(phoneNumber, watch('VerificationCode') as string, confirmPayCode as string, hRef);
    },
    {
      onSuccess: (data) => {
        if (data.success === 'true') {
          toast.success(data.data.verifySubtitle);
          window.location.assign(data?.data?.resultLink);
        }
        if (data.success === 'true' && data.message === '404') {
          toast.success(data.message);
        }
        if (data.success === 'false') {
          toast.error(data.message);
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  const { mutate: reciveCode } = useMutation(
    (variables: { mobileNumber: string }) => {
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
    reciveCode({ mobileNumber: phoneNumber });
  };

  const handleNumericInput = (event: any) => {
    const input = event.target;
    const numericValue = input.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
    input.value = numericValue; // Update the input value
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root errorTesxt={errors?.VerificationCode?.message}>
      <AppFlex direction='column' align='center' gap={'10px'}>
        <Typography variant='body1' textalign='center' fontWeight={700}>
          کد تایید را وارد کنید
        </Typography>
        <Typography variant='subtitle2'>{`کد 5 رقمی به شماره ${phoneNumber} ارسال شده است.`}</Typography>
      </AppFlex>
      <InputContainer errorTesxt={errors.VerificationCode?.message} className='InputContainer'>
        <input
          placeholder='مثال : ۹۲۴۵۴'
          {...register('VerificationCode', {
            onChange(event) {
              setValue('VerificationCode', digitsFaToEn(event.target.value.slice(0, 5)));
              handleNumericInput(event);
            },
          })}
        />
        {errors.VerificationCode?.message && <IoMdInformationCircleOutline />}
      </InputContainer>
      <TextError>{errors.VerificationCode?.message}</TextError>

      {/* EditAndResetTimer */}
      <EditAndResetTimer direction='column' gap={'10px'}>
        <AppFlex>
          <IoMdLock fill='#AAB3C0' />
          <ResetTmeBtn disabled={isStarted} className='typo' onClick={handleResetCode}>
            درخواست مجدد ارسال کد
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
            ویرایش شماره موبایل
          </Typography>
        </AppFlex>
      </EditAndResetTimer>
      <Button
        onClick={() => {
          mutate({
            verificationCode: watch('VerificationCode') as string,
            mobileNumber: phoneNumber,
            code: confirmPayCode,
          });
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
          <Typography variant='subtitle1'>مشاهده برنامه</Typography>
        )}
      </Button>
    </Root>
  );
};

export default Verification;

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
  direction: rtl;

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
  right: 25px;
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
