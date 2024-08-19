/* eslint-disable @next/next/next-script-for-ga */
'use client';

import { Fragment } from 'react';
import { THISPROJECT } from '@/constants/projects';

const pageview = (url: string) => {
  try {
    if (window) {
      window?.gtag('config', THISPROJECT.GOOGLE_ANALYTICS_ID, {
        page_path: url,
      });
    }
  } catch (error) {
    console.log('Error from the trackerPageView => ', error);
  }
};

const GoogleAnalytics = () => {
  return (
    <Fragment>
      <script
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'analytics_storage': 'denied'
                });
              `,
        }}
      />

      <script async src='https://www.googletagmanager.com/gtag/js?id=AW-958897314'></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-958897314')
            `,
        }}
      />
    </Fragment>
  );
};

export default GoogleAnalytics;
