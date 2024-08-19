'use client';

import { THISPROJECT, thisLanguage } from '@/constants/projects';
import RootLayout from '@/layouts/RootLayout';
import { AppFlex, Button, Typography } from '@/primitives';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { AfterPayment } from '@/components/payment';

const CancelPayment = () => {
  const { push } = useRouter();

  const language = thisLanguage;

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
          title={language === 'en' ? 'Oops!!!' : language === 'it' ? 'Oops!!!' : ''}
          description={
            language === 'en'
              ? 'Something went wrong during payment. You can press the button below to return to checkout page.'
              : language === 'it'
              ? `Si è verificato un problema durante il pagamento. Puoi cliccare sul pulsante in basso per tornare alla pagina di checkout.`
              : ''
          }
        />
        <Button onClick={() => push('/checkout')} variant='checkout'>
          <Typography>{language === 'en' ? 'Visit Checkout' : language === 'it' ? 'tornare alla pagina di checkout' : ''}</Typography>
        </Button>
      </AppFlex>
    </>
  );
};

export default CancelPayment;
