'use client';

import { AppFlex, Button, Typography } from '@/primitives';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { sendPhoneNumber } from '../confirmPay.services';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import { digitsFaToEn } from '@persian-tools/persian-tools';
import ReactLoading from 'react-loading';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {};

const validationSchema = yup.object().shape({
  mobileNumber: yup.string(),
  // .matches(
  //   /^(0|0098|\+98)9([0۰-۵۹]|[۱-۹]\d|98)\d{7}$/,
  //   'Please enter your mobile number in the correct format (11 digits)',
  // )
  // .test({
  //   name: 'numeric-range',
  //   message: 'لطفا طبق الکو شماره مبایل خود را وارد کنید (شماره مبایل باید ۱۱ رفم باشد) ',
  //   test: (value) => {
  //     if (value) return value?.length >= 11;
  //   },
  // })
  // .required('لطفا شماره مبایل خود را وارد کنید'),
});

const ReceiveCode = ({}: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { push } = useRouter();
  const cookie = new Cookies();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  cookie.set('confirmPayCode', code);
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

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const handleNumericInput = (event: any) => {
    const input = event.target;
    const numericValue = input.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
    input.value = numericValue; // Update the input value
  };

  const { mutate, isLoading } = useMutation(
    () => {
      return sendPhoneNumber(Number(watch('mobileNumber')), hRef, token);
    },
    {
      onSuccess: (data) => {
        if (data.success === 'true') {
          cookie.set('phoneNumber', data.data.phoneNumber);
          toast.success(data.data.verifySubtitle);
          push(`/confirmPay/verificationcode?code=${code}`);
        }
        if (data.success === 'false') {
          toast.error(data.message);
        }
      },
      onError: (error) => console.log(error, 'error'),
    },
  );

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
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
          mutate();
        }}
        variant='checkout'
        position='fixed'
        disabled={!!errors.mobileNumber?.message || !watch('mobileNumber')}
      >
        {isLoading ? (
          <AppFlex justify='center'>
            <ReactLoading color='#ffff' type='spin' width={20} height={20} />
          </AppFlex>
        ) : (
          <Typography>تایید وادامه</Typography>
        )}
      </Button>
    </Root>
  );
};

export default ReceiveCode;

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
