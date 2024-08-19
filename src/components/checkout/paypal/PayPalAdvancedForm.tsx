'use client';

import { THISPROJECT } from '@/constants/projects';
import { AppFlex, Button } from '@/primitives';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaLock } from 'react-icons/fa';
import ReactLoading from 'react-loading';

/**
 * props
 * _______________________________________________________________________________
 */
declare global {
  interface Window {
    gtag: any;
    getDevs: () => void;
    paypal: any;
  }
}

type Props = {
  resultCode: string;
  // handleClose: () => void;
  clientToken: string | undefined;
  currency: string | undefined;
  handleMethod: (thisMethod: 'paypal' | 'credit') => void;
};

const PayPalAdvancedForm = ({ clientToken, currency, handleMethod, resultCode }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?components=hosted-fields&client-id=${THISPROJECT.PAYPAL_CLIENT_ID}&currency=${currency}&intent=capture`;
    script.setAttribute('data-client-token', clientToken as string);
    script.setAttribute('id', 'paypal-advanced-script');
    script.async = true;
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      if (typeof window !== 'undefined') {
        if (window.paypal) {
          if (window.paypal.HostedFields.isEligible()) {
            let orderId = '';
            window.paypal.HostedFields.render({
              createOrder: function () {
                setIsLoading(true);
                return fetch(`${THISPROJECT.PAYPAL_BASE_URL}/order/create.php?code=${resultCode}&gwType=advanced`, {
                  method: 'post',
                })
                  .then(function (res) {
                    if (res.ok) return res.json();
                  })
                  .then(function (orderData) {
                    orderId = orderData.id;
                    return orderData.id;
                  });
              },
              styles: {
                input: {
                  padding: '0px 10px',
                },
              },
              fields: {
                number: {
                  selector: '#card-number',
                  placeholder: 'XXXX XXXX XXXX XXXX',
                },
                cvv: {
                  selector: '#cvv',
                  placeholder: 'CVV',
                },
                expirationDate: {
                  selector: '#expiration-date',
                  placeholder: 'MM/YY',
                },
              },
            }).then(function (cardFields: any) {
              document.querySelector('#card-form')!!.addEventListener('submit', (event) => {
                event.preventDefault();
                cardFields.submit().then(() => {
                  fetch(`${THISPROJECT.PAYPAL_BASE_URL}/order/capture.php?id=${orderId}`, {
                    method: 'post',
                  })
                    .then((res) => {
                      if (res.ok) return res.json();
                    })
                    .then((orderData) => {
                      if (orderData.success === 'true') return router.push(`/payment/success?code=${resultCode}`);
                      else if (orderData.success === 'false' && orderData.message) {
                        toast.error(String(orderData.message));
                        handleMethod('paypal');
                      } else router.push('/payment/cancel');
                    });
                });
              });
            });
          } else '';
        }
      }
    });
  }, []);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <form
      className='form'
      id='card-form'
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1px',
        justifyContent: 'space-between',
        marginBlock: '20px',
      }}
    >
      <div id='card-number' />
      <div id='expiration-date' />
      <div id='cvv' />
      <Button
        id='submit'
        className='submit-button'
        disabled={isLoading}
        variant='checkout'
        style={{ width: '100%', alignItems: 'center' }}
      >
        {isLoading ? (
          <AppFlex justify='center'>
            <ReactLoading color='#ffff' type='spin' width={20} height={20} />
          </AppFlex>
        ) : (
          <FaLock />
        )}
        BUY NOW
      </Button>
    </form>
  );
};

export default PayPalAdvancedForm;

/**
 * styled-component
 * _______________________________________________________________________________
 */
