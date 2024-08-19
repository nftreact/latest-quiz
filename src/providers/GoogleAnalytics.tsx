/* eslint-disable @next/next/inline-script-id */
'use client';

import { Fragment } from 'react';
import { THISPROJECT } from '@/constants/projects';
import Script from 'next/script';

const GoogleAnalytics = () => {
  return (
    <Fragment>
      <Script
        strategy='afterInteractive'
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${THISPROJECT.GOOGLE_ANALYTICS_ID}`}
      ></Script>
      <Script
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${THISPROJECT.GOOGLE_ANALYTICS_ID})
            `,
        }}
      />
    </Fragment>
  );
};

export default GoogleAnalytics;
