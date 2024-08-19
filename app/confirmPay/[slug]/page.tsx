import PreCheckoutHeader from '@/components/pre-checkout/PreCheckoutHeader';
import { THISPROJECT } from '@/constants/projects';
import dynamic from 'next/dynamic';
import React from 'react';

const EnConfirmPay = dynamic(() => import('../../../src/components/confirm-pay/en-confirmPay/EnConfirmPay'));
const FaConfirmPay = dynamic(() => import('../../../src/components/confirm-pay/fa-confirmPay/FaConfirmPay'));

const page = ({ params }: { params: { slug: string } }) => {
  const locale = THISPROJECT.DEFAULT_LOCALE;

  const renderElement = () => {
    if (locale === 'fa_IR') return <FaConfirmPay />;
    if (locale === 'en_US') return <EnConfirmPay />;
  };
  return (
    <>
      <PreCheckoutHeader />
      {renderElement()}
    </>
  );
};

export default page;
