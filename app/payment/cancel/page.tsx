'use client';

import { THISPROJECT } from '@/constants/projects';
import RootLayout from '@/layouts/RootLayout';
import { AppFlex, Button, Typography } from '@/primitives';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { AfterPayment } from '@/components/payment';

const CancelPayment = () => {
  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>{THISPROJECT.SITE_TITLE} | Rejected Payment</title>
        <meta name='description' content={THISPROJECT.META_DESCRIPTION} />
      </Head>
      <AppFlex
        direction='column'
        justify='center'
        align='center'
        gap={'20px'}
        style={{
          minHeight: 'calc(100vh - 60px)',
          paddingInline: '16px',
        }}
      >
        <AfterPayment
          status='cancel'
          title='Oops!'
          description='Something went wrong during payment. You can press the button below to return to checkout page.'
        />
        <Button onClick={() => push('/checkout')} variant='checkout'>
          <Typography>Visit Checkout</Typography>
        </Button>
      </AppFlex>
    </>
  );
};

export default CancelPayment;
