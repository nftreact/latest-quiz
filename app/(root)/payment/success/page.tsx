'use client';

import { AfterPayment } from '@/components/payment';
import { confirmPayPalFetcher } from '@/components/payment/payment.services';
import { THISPROJECT, thisLanguage } from '@/constants/projects';
import { AppFlex, Button, Typography } from '@/primitives';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const SuccessPayment = () => {
  const router = useSearchParams();
  const code = router.get('code');
  const language = thisLanguage;

  const { data, isFetching } = useQuery({
    queryKey: [code],
    queryFn: async () => {
      const res = await confirmPayPalFetcher(code as string);
      return res;
    },
    enabled: !!code,
  });

  useEffect(() => {
    if (data && data?.success === 'true') {
      const timeoutId = setTimeout(() => window.location.assign(data?.data?.panelLink), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{THISPROJECT.SITE_TITLE} | Successful Payment</title>
        <meta name='description' content={THISPROJECT.META_DESCRIPTION} />
      </Head>
      <AppFlex
        direction='column'
        align='center'
        justify='center'
        gap={'20px'}
        style={{
          minHeight: 'calc(100vh - 60px)',
          paddingInline: '16px',
        }}
      >
        <AfterPayment
          status='success'
          title={language === 'en' ? 'Thank you!' : language === 'it' ? 'Grazie!' : ''}
          description={
            language === 'en'
              ? `You will be redirected to your panel soon. You can also click on the button below to visit the panel.`
              : language === 'it'
              ? `Verrai reindirizzato al tuo pannello a breve. Puoi anche cliccare sul pulsante in basso per accedere direttamente.
          `
              : ''
          }
        />
        <Button
          onClick={() => (data && data?.success === 'true' ? window.location.assign(data?.data?.panelLink) : {})}
          variant='checkout'
        >
          <Typography>{language === 'en' ? 'Visit Panel' : language === 'it' ? 'Vai al pannello' : ''}</Typography>
        </Button>
      </AppFlex>
    </>
  );
};

export default SuccessPayment;
