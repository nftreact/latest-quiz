'use client';

import { AppFlex, Typography } from '@/primitives';
import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import PayPalStandardForm from './PayPalStandardForm';
import PayPalAdvancedForm from './PayPalAdvancedForm';
import PaymentMethods from './PaymentMethods';
import { IoIosClose } from 'react-icons/io';
import { thisLocale } from '@/constants/projects';
import { hasDecimal } from '@/utils/hasDecimal';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  unitSymbol?: string;
  off?: string | undefined | any;
  isNewCheckout?: boolean;
  paymentModal: any;
  priceUnit: string;
  currency: string | undefined;
  open: boolean;
  discounted: boolean;
  clientToken: string | undefined;
  resultCode: string;
  selectedPlanId: string;
  fullPrice: number;
  discountedPrice: number;
  handleCloseModal: (value: boolean) => void;
  price?: {
    reqularPrice: {
      price: any;
    };
    discountedPrice: {
      price: any;
    };
  };
};

const PaypalRoot = ({
  unitSymbol,
  price,
  paymentModal,
  priceUnit,
  clientToken,
  currency,
  discounted,
  discountedPrice,
  fullPrice,
  open,
  resultCode,
  selectedPlanId,
  isNewCheckout,
  off,
  handleCloseModal,
}: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  const [activeMethod, setActiveMethod] = useState<'paypal' | 'credit'>('paypal');
  const handleMethod = (thisMethod: 'paypal' | 'credit') => setActiveMethod(thisMethod);
  const locale = thisLocale;
  const dicountedPriceValue = price?.reqularPrice.price - price?.discountedPrice.price;
  const discontedValue =
    hasDecimal(dicountedPriceValue) === true ? dicountedPriceValue.toFixed(2) : dicountedPriceValue;

  /**
   * useEffect
   * _______________________________________________________________________________
   */
  useEffect(() => {
    return () => {
      if (document.getElementById('paypal-standard-script'))
        document.body.removeChild(document.getElementById('paypal-standard-script') as HTMLElement);
      if (document.getElementById('paypal-advanced-script'))
        document.body.removeChild(document.getElementById('paypal-advanced-script') as HTMLElement);
    };
  }, [activeMethod]);

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
      <CloseWrapper onClick={() => handleCloseModal(false)}>
        <IoIosClose />
      </CloseWrapper>
      <Typography textalign='center' className='title-typo'>
        {locale === 'en_US' ? ' Select Payment Method' : 'Seleziona il metodo di pagamento'}
      </Typography>
      <MobileViewPaypalMethods>
        <PaymentMethods activeMethod={activeMethod} handleMethod={handleMethod} />
      </MobileViewPaypalMethods>
      <Container>
        {/* SummeryWrapper  _______________________________________________________________________________*/}
        <SummeryWrapper>
          <Typography>{locale === 'en_US' ? 'Your Order Summary' : `Riepilogo dell'ordine`}</Typography>
          <AppFlex direction='column' style={{ width: '100%' }}>
            <AppFlex justify='space-between' style={{ width: '100%' }} align='center'>
              <Typography style={{ color: '#6c727a', fontSize: '14px' }}>{paymentModal?.target}</Typography>
              <Typography style={{ fontSize: '14px' }}>
                {price?.reqularPrice.price}
                {`  ${unitSymbol}  `}
              </Typography>
            </AppFlex>
            {discounted && (
              <AppFlex justify='space-between' align='center' style={{ width: '100%' }}>
                <Typography style={{ color: 'red', fontSize: '14px' }}>
                  {' '}
                  {`${off}   introductory offer discount`}
                </Typography>
                <Typography style={{ color: 'red', fontSize: '14px' }}>
                  {discontedValue}
                  {`  ${unitSymbol}  `}
                </Typography>
              </AppFlex>
            )}
          </AppFlex>

          <Divider isshow={true} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography style={{ fontSize: '18px' }}>{locale === 'en_US' ? 'total' : 'totale'}</Typography>
            <Typography style={{ fontSize: '18px' }}>{`${
              price?.discountedPrice.price ? price?.discountedPrice.price : price?.reqularPrice.price
            } ${`  ${unitSymbol}  `}`}</Typography>
          </div>
          {discounted && (
            <Typography textalign='right' style={{ color: 'red', fontSize: '12px', marginTop: '-13px' }}>
              {locale === 'en_US'
                ? `You just saved ${discontedValue} ${`  ${unitSymbol}  `} ${off}`
                : `Hai risparmiato il ${discontedValue} ${`  ${unitSymbol}  `} ${off}`}
            </Typography>
          )}
        </SummeryWrapper>
        <Divider isshow={false} />
        <VerticalDivider />
        {/* SelectedPlanWrapper  _______________________________________________________________________________*/}
        <SelectedPlanWrapper>
          <DesktopViewPaypalMethods>
            <PaymentMethods activeMethod={activeMethod} handleMethod={handleMethod} />
          </DesktopViewPaypalMethods>
          {activeMethod === 'paypal' ? (
            <PayPalStandardForm resultCode={resultCode} currency={currency} />
          ) : (
            <PayPalAdvancedForm
              key={activeMethod}
              resultCode={resultCode}
              clientToken={clientToken}
              currency={currency}
              handleMethod={handleMethod}
            />
          )}
        </SelectedPlanWrapper>
      </Container>
    </Root>
  );
};

export default memo(PaypalRoot);

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 40px 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  gap: 30px;

  .title-typo {
    font-size: 20px;
    font-weight: 600;
    @media (min-width: 900px) {
      font-size: 32px;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

const SummeryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 900px) {
    width: 45%;
  }
`;

const SelectedPlanWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 900px) {
    width: 45%;
  }
`;

const DesktopViewPaypalMethods = styled.div`
  display: none;

  @media (min-width: 900px) {
    display: block;
  }
`;

const MobileViewPaypalMethods = styled.div`
  display: block;

  @media (min-width: 900px) {
    display: none;
  }
`;

const CloseWrapper = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #eaeaea;
  position: absolute;
  top: 10px;
  left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    scale: 1.6;
  }
`;

const Divider = styled.div<{ isshow: boolean }>`
  width: 100%;
  height: 1px;
  background-color: #c4c7cf;
  margin-block: 10px;
  display: block;

  @media (min-width: 900px) {
    display: ${({ isshow }) => (isshow ? 'block' : 'none')};
  }
`;

const VerticalDivider = styled.div`
  display: none;

  @media (min-width: 900px) {
    display: block;
    height: auto;
    width: 1px;
    background-color: #c4c7cf;
  }
`;
