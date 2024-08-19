'use client';

import styled from 'styled-components';
import CreditCardsIcon from '../../../../public/icon/CreditCardsIcon';
import PayPalIcon from '../../../../public/icon/PayPalIcon';
import { Typography } from '@/primitives';
import { thisLocale } from '@/constants/projects';

interface PaymentMethodProps {
  thisMethod: 'paypal' | 'credit';
  activeMethod: 'paypal' | 'credit';
  handleMethod: (thisMethod: 'paypal' | 'credit') => void;
}

const PaymentMethod = ({ thisMethod, activeMethod, handleMethod }: PaymentMethodProps) => {
  const locale = thisLocale;
  return (
    <Root className='paymentMethod' onClick={() => handleMethod(thisMethod)}>
      <div className={activeMethod === thisMethod ? 'active' : 'inActive'}>
        {thisMethod === 'credit' && (
          <Typography
            style={{
              fontWeight: 700,
              fontSize: '14px',
              marginBottom: '5px',
            }}
          >
            {locale === 'en_US' ? ' Credit Card' : 'Carta di credito'}
          </Typography>
        )}
        {thisMethod === 'paypal' ? <PayPalIcon /> : <CreditCardsIcon />}
      </div>
    </Root>
  );
};

export default PaymentMethod;

const Root = styled.section`
  width: 50%;
`;
