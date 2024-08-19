'use client';

import { AppFlex, Button, Typography } from '@/primitives';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';
import { styled } from 'styled-components';
import Cookies from 'universal-cookie';
import * as yup from 'yup';
import { sendPhoneNumber } from '../confirmPay.services';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { THISPROJECT } from '@/constants/projects';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {};

const validationSchema = yup.object().shape({
  mobileNumber: yup
    .string()
    .test({
      name: 'numeric-range',
      message: 'Please enter your mobile number',
      test: (value) => {
        if (value) return value?.length >= 11;
      },
    })
    .required('Please enter your mobile number'),
});

const EnRecevieCode = ({}: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { push } = useRouter();
  const cookie = new Cookies();
  const token = cookie.get('Authorization');
  const hRef = window.location.href;

  const {
    register,
    reset,
    watch,

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

  const { mutate, isLoading } = useMutation(
    () => {
      return sendPhoneNumber(Number(watch('mobileNumber')), hRef, token);
    },
    {
      onSuccess: (data) => {
        if (data.success === 'true') {
          cookie.set('phoneNumber', data.data.phoneNumber);
          toast.success(data.data.verifySubtitle);
          push('/confirmPay/verificationcode');
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
        Enter the mobile number
      </Typography>
      <InputContainer errorTesxt={errors.mobileNumber?.message} className='InputContainer'>
        <input type='number' value={watch('mobileNumber')} {...register('mobileNumber')} />
        {errors.mobileNumber?.message && <IoMdInformationCircleOutline />}
      </InputContainer>
      <TextError>{errors.mobileNumber?.message}</TextError>
      <Button
        onClick={() => {
          mutate();
        }}
        variant='question'
        position='fixed'
        disabled={!!errors.mobileNumber?.message || !watch('mobileNumber')}
      >
        {isLoading ? (
          <AppFlex justify='center'>
            <ReactLoading color='#ffff' type='spin' width={20} height={20} />
          </AppFlex>
        ) : (
          <Typography>submit</Typography>
        )}
      </Button>
    </Root>
  );
};

export default EnRecevieCode;

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
  direction: ${THISPROJECT.DEFAULT_LOCALE === 'fa_IR' ? 'rtl' : 'ltr'};

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
  border: ${({ errorTesxt }) => (errorTesxt ? `1.5px solid red` : '1.5px solid #a8a8a8')};
  height: 50px;
  border-radius: 4px;
  padding-inline: 8px;
  cursor: pointer;

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
  bottom: 35px;
  font-size: 10px;
  color: red;
`;
