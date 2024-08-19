import React from 'react';
import NewGuarantee from '@/components/new-checkout/guarantee/Guarantee';
import CheckoutHeeader from '@/components/new-checkout/header/Header';
import { getNewCheckout } from '@/components/checkout/checkout.services';
import { cookies } from 'next/headers';
import { DecodeBase64 } from '@/utils/insdex';
import { redirect } from 'next/navigation';
import PaymentRoot from '@/components/new-checkout/PaymentRoot';

const Payment = async ({ searchParams }: { searchParams: { discount: string; offer: string } }) => {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization')?.value;
  const code = cookieStore.get('code')?.value;
  const userIpAddress = cookieStore.get('user-ip-address')?.value;
  const newdata = await getNewCheckout({ code: code, token: Authorization });
  const offertDecode = DecodeBase64(searchParams.offer);
  const guaranteeData = newdata?.items.filter((item: any) => item.key === 'guarantee')[0];

  if (newdata === undefined) {
    redirect(`/error`);
  }

  return (
    <>
      <CheckoutHeeader data={newdata} discount={searchParams.discount} offer={searchParams.offer} />
      <PaymentRoot data={newdata} discount={searchParams.discount} offer={searchParams.offer} />
      <NewGuarantee content={guaranteeData?.content} />
    </>
  );
};

export default Payment;
