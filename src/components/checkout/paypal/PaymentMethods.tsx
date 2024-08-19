'use client';

import PaymentMethod from './PaymentMethod';

interface PaymentMethodsProps {
  activeMethod: 'paypal' | 'credit';
  handleMethod: (thisMethod: 'paypal' | 'credit') => void;
}

const PaymentMethods = ({ activeMethod, handleMethod }: PaymentMethodsProps) => {
  return (
    <section
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <PaymentMethod thisMethod='paypal' activeMethod={activeMethod} handleMethod={handleMethod} />
      <PaymentMethod thisMethod='credit' activeMethod={activeMethod} handleMethod={handleMethod} />
    </section>
  );
};

export default PaymentMethods;
