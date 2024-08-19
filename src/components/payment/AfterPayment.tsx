'use client';

import { AppFlex, Typography } from '@/primitives';
import Image from 'next/image';
import paymentConfirmed from '../../../public/images/payment-confirmed.png';
import paymentRejected from '../../../public/images/payment-rejected.png';

/**
 * props
 * _______________________________________________________________________________
 */
interface AfterPaymentProps {
  status: 'cancel' | 'success';
  title: string;
  description: string;
}

const AfterPayment = ({ description, status, title }: AfterPaymentProps) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */
  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <AppFlex direction='column' align='center'>
      <Image
        alt='after payment icon'
        src={status === 'success' ? paymentConfirmed : paymentRejected}
        width={256}
        height={256}
        style={{ margin: 'auto', maxWidth: '100%' }}
        loader={loaderProp}
      />
      <Typography variant='h1'>{title}</Typography>
      <Typography
        variant='subtitle2'
        textalign='center'
        style={{ paddingInline: '16px' }}
        tag='p'
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </AppFlex>
  );
};

export default AfterPayment;

/**
 * styled-component
 * _______________________________________________________________________________
 */
