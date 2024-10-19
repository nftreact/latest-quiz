'use client';

import { sendPhoneNumber, sendVerificationCode } from '@/components/confirm-pay/confirmPay.services';
import { useCountDownTimer } from '@/hooks';
import { AppFlex, Button, Typography } from '@/primitives';
import { digitsFaToEn } from '@persian-tools/persian-tools';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdInformationCircleOutline, IoMdLock } from 'react-icons/io';
import { MdOutlineModeEdit } from 'react-icons/md';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { styled } from 'styled-components';
import Cookies from 'universal-cookie';

type Props = {};

const ConfirmPAyPage = (props: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const time = '120000';
  const cookie = new Cookies();
  const token = cookie.get('Authorization');
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const [step, setStep] = useState<'verificationcode' | 'recivecode'>('recivecode');
  const [userData, setUserData] = useState({
    phNumber: '',
  });
  const hRef = window.location.href;
  const [, { start, render, isStarted, reset: resetCount, pause }] = useCountDownTimer(Number(time), 1000, 'minutes');

  const {
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobileNumber: '',
      VerificationCode: '',
    },
    mode: 'onChange',
  });

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */
  const handleNumericInput = (event: any) => {
    const input = event.target;
    const numericValue = input.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
    input.value = numericValue; // Update the input value
  };

  const { mutate: sendCodeMutate, isLoading: loadingMutate } = useMutation(
    (variables: { mobileNumber: string }) => {
      return sendPhoneNumber(Number(step === 'recivecode' ? watch('mobileNumber') : userData.phNumber), hRef, token);
    },
    {
      onSuccess: (data) => {
        if (data.success === 'true') {
          setStep('verificationcode');
          setUserData({ phNumber: data.data.phoneNumber });
          cookie.set('phoneNumber', data.data.phoneNumber);
          toast.success(data.data.verifySubtitle);
          if (step === 'verificationcode') {
            start();
          }
        }
        if (data.success === 'false') {
          toast.error(data.message);
        }
      },
      onError: (error) => console.log(error, 'error'),
    },
  );

  const { mutate, isLoading } = useMutation(
    (variables: { mobileNumber: string; verificationCode: string; code: string | null }) => {
      return sendVerificationCode(userData.phNumber, watch('VerificationCode') as string, code as string, hRef);
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

  const handleResetCode = () => {
    sendCodeMutate({ mobileNumber: userData.phNumber });
  };

  /**
   * useEffect
   * _______________________________________________________________________________
   */
  useEffect(() => {
    reset();
    if (step === 'recivecode') {
      pause();
    }
    if (step === 'verificationcode') {
      start();
    }
  }, [step]);

  /**
   * template
   * _______________________________________________________________________________
   */

  return (
    <>
      {step === 'recivecode' ? (
        <Root errorTesxt={errors?.mobileNumber?.message}>
          <Typography textalign='center' fontWeight={700}>
            شماره موبایل خود را وارد کنید
          </Typography>
          <InputContainer errorTesxt={errors.mobileNumber?.message} className='InputContainer'>
            <input
              placeholder='مثال : ۰۹۱۲۰۰۰۰۰۰۰'
              {...register('mobileNumber', {
                onChange(event) {
                  setValue('mobileNumber', digitsFaToEn(event.target.value.slice(0, 11)));
                  handleNumericInput(event);
                },
              })}
            />
            {errors.mobileNumber?.message && <IoMdInformationCircleOutline />}
          </InputContainer>
          <TextError>{errors.mobileNumber?.message}</TextError>
          <Button
            onClick={() => {
              sendCodeMutate({ mobileNumber: watch('mobileNumber') as string });
            }}
            variant='checkout'
            position='fixed'
            disabled={!!errors.mobileNumber?.message || !watch('mobileNumber')}
          >
            {loadingMutate ? (
              <AppFlex justify='center'>
                <ReactLoading color='#ffff' type='spin' width={20} height={20} />
              </AppFlex>
            ) : (
              <Typography>تایید وادامه</Typography>
            )}
          </Button>
        </Root>
      ) : (
        step === 'verificationcode' && (
          <Root errorTesxt={errors?.VerificationCode?.message}>
            <AppFlex direction='column' align='center' gap={'10px'}>
              <Typography variant='body1' textalign='center' fontWeight={700}>
                کد تایید را وارد کنید
              </Typography>
              <Typography variant='subtitle2'>{`کد 5 رقمی به شماره ${userData.phNumber} ارسال شده است.`}</Typography>
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
                  onClick={() => setStep('recivecode')}
                >
                  ویرایش شماره موبایل
                </Typography>
              </AppFlex>
            </EditAndResetTimer>
            <Button
              onClick={() => {
                mutate({
                  verificationCode: watch('VerificationCode') as string,
                  mobileNumber: userData.phNumber,
                  code: code,
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
        )
      )}
    </>
  );
};

export default ConfirmPAyPage;

const Root = styled.section<{ errorTesxt: string | undefined }>`
  padding-inline: 16px;
  position: relative;
  padding-block: 100px 40px;
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  direction: rtl;

  input {
    ::placeholder {
      opacity: 50%;
    }
  }

  & .InputContainer:focus-within {
    border: ${({ errorTesxt }) => (errorTesxt ? `1.5px solid red` : '2px solid #02857a')};
  }
`;

const InputContainer = styled.div<{ errorTesxt: string | undefined }>`
  display: flex;
  align-items: center;
  gap: 5px;
  border: ${({ errorTesxt }) => (errorTesxt ? `1.5px solid red` : '1.5px solid #02857a')};
  height: 50px;
  border-radius: 4px;
  padding-inline: 8px;
  cursor: pointer;

  input {
    outline: none;
    height: 100%;
    width: 100%;
    border: none;
    font-size: 16px;
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
  bottom: 35px;
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
