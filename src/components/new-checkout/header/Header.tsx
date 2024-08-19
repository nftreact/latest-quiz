'use client';

import { AppFlex, Typography } from '@/primitives';
import { DecodeBase64 } from '@/utils/insdex';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import styled from 'styled-components';
import headerData from '../../../constants/checkout/checkout-header.json';
import { thisLocale } from '@/constants/projects';

const Timer = dynamic(() => import('./Timer'), {
  ssr: false,
});

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  discount: string;
  data: any;
  offer: string | undefined;
};

const CheckoutHeeader = ({ discount, data, offer }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const offerDecode = DecodeBase64(offer as string);
  const discountDecode = DecodeBase64(discount);
  const buttonText = 'RICEVI PIANO';

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  const handleButtonClick = () => {
    const plansSection = document.getElementById('plans');
    if (plansSection) {
      plansSection.scrollIntoView({
        behavior: 'smooth',
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
    <Root justify='space-between' align='center'>
      <AppFlex direction='column'>
        {discountDecode === 'true' && offerDecode !== 'true' && (
          <Typography style={{ color: '#252D48' }} variant='subtitle1' fontSize={10}>
            {headerData[thisLocale]['header']['discount-text-51']}
          </Typography>
        )}
        {offerDecode == 'true' && (
          <Typography style={{ color: '#252D48' }} variant='subtitle1' fontSize={10}>
            {headerData[thisLocale]['header']['discount-text-61']}
          </Typography>
        )}
        <Timer discount={discount} />
      </AppFlex>
      <ButtonStyle onClick={handleButtonClick} className='button-animation'>
        {headerData[thisLocale]['header']['button-text'].toUpperCase()}
      </ButtonStyle>
    </Root>
  );
};

export default CheckoutHeeader;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(AppFlex)`
  box-shadow: 0 4px 8px rgb(0 0 0 / 8%);
  padding: 10px;
  position: fixed;
  top: 0;
  min-height: 50px;
  right: 0;
  left: 0;
  background-color: #fff;
  z-index: 100;

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #3ad7ab;
    }

    70% {
      box-shadow: 0 0 0 10px rgba(78, 208, 154, 0);
    }

    100% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }

  @keyframes pulse-disabled {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.12);
    }

    70% {
      box-shadow: 0 0 0 10px rgba(78, 208, 154, 0);
    }

    100% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }

  .button-animation {
    animation: pulse 1.25s cubic-bezier(0.66, 0, 0, 1) infinite;
  }

  .button-animation:disabled {
    animation: pulse-disabled 1.25s cubic-bezier(0.66, 0, 0, 1) infinite;
  }
`;

const ButtonStyle = styled.button`
  font-size: 14px;
  font-weight: 600;
  padding: 16px 16px !important;
  appearance: none;
  border-radius: 9px;
  border: none;
  outline: none;
  background-color: #3ad7ab;
  box-shadow: 0 0 #3ad7ab;
  color: #fff;
  margin-inline-start: auto;
  cursor: pointer;
`;
