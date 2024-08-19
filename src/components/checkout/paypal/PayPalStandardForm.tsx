'use client';

import { THISPROJECT } from '@/constants/projects';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  resultCode: string;
  currency: string | undefined;
};

const PayPalStandardForm = ({ currency, resultCode }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { push } = useRouter();

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (document.getElementById('paypal-button-container')) {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${THISPROJECT.PAYPAL_CLIENT_ID}`;
        script.setAttribute('id', 'paypal-standard-script');
        script.async = true;
        document.body.appendChild(script);

        script.addEventListener('load', () => {
          (window as any).paypal
            .Buttons({
              style: {
                layout: 'horizontal',
                label: 'buynow',
              },
              createOrder: function (data: any, actions: any) {
                return fetch(`${THISPROJECT.PAYPAL_BASE_URL}/order/create.php?code=${resultCode}&gwType=standard`, {
                  method: 'post',
                })
                  .then(function (res) {
                    if (res.ok) return res.json();
                  })
                  .then(function (orderData) {
                    return orderData.id;
                  });
              },
              onApprove: function (data: any, actions: any) {
                return fetch(`${THISPROJECT.PAYPAL_BASE_URL}/order/capture.php?id=${data.orderID}`, { method: 'post' })
                  .then(function (res) {
                    if (res.ok) return res.json();
                  })
                  .then((orderData) => {
                    if (orderData.success === 'true') return push(`/payment/success?code=${resultCode}`);
                    push('/payment/cancel');
                  });
              },
            })
            .render('#paypal-button-container');
        });
      }
    }
  }, [currency, push, resultCode]);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <section style={{ paddingBlock: '20px' }}>
      <div id='paypal-button-container' />
    </section>
  );
};

export default PayPalStandardForm;

/**
 * styled-component
 * _______________________________________________________________________________
 */
