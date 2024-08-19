import React from 'react';
import CheckoutProvider from '../checkout/CheckoutProvider';
import CheckoutHeeader from '../new-checkout/header/Header';
import PaymentRoot from '../new-checkout/PaymentRoot';
import NewGuarantee from '@/components/new-checkout/guarantee/Guarantee';
import { cookies } from 'next/headers';
import { DecodeBase64 } from '@/utils/insdex';
import { getFastfitPreCheckout } from '@/utils/getCheckout';
import { getNewCheckout } from '../checkout/checkout.services';

type Props = {
  discount: string;
  offer: string;
  show: string;
  Authorization?: string;
  code?: string;
  type?: string;
  project?: string;
};

const FastfitPreCheckout = async ({ discount, offer, show, Authorization, code, project, type }: Props) => {
  const cookieStore = cookies();
  const offerDecode = DecodeBase64(offer as string);
  const discountDecode = DecodeBase64(discount);
  const fastfitCheckout = await getNewCheckout({ code: code, token: Authorization });
  const guaranteeData = fastfitCheckout?.items.filter((item: any) => item.key === 'guarantee')[0];

  if (!fastfitCheckout) return <h1>loading</h1>;

  return (
    <>
      <CheckoutProvider discount={discountDecode} offer={offerDecode}>
        <CheckoutHeeader data={fastfitCheckout} discount={discount} offer={offer} />
        <PaymentRoot
          data={fastfitCheckout}
          discount={discount}
          offer={offer}
          show={show}
          code={code}
          Authorization={Authorization}
          project={project}
        />
        <NewGuarantee content={guaranteeData?.content} footer={fastfitCheckout} />
      </CheckoutProvider>
    </>
  );
};

export default FastfitPreCheckout;
