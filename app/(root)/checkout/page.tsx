import {
  CheckoutBanner,
  Guarantee,
  LoadingSkeletonPlans,
  WhatYouGet,
  LoadingSkeletonSlider,
} from '@/components/checkout';
import { getCheckout } from '@/components/checkout/checkout.services';
import { CheckoutResult } from '@/types/checkout';
import { cookies } from 'next/headers';
import React from 'react';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import { PreCheckoutHeader } from '@/components/pre-checkout';
import NewSlider from '@/shared/new-checkout/NewSlider';
import NewComments from '@/shared/new-checkout/NewComments';


const CheckoutFooter = dynamic(() => import('@/components/checkout/checkout-footer/CheckoutFooter'));
const Comments = dynamic(() => import('@/components/checkout/checkout-comments/Comments'));
const Faq = dynamic(() => import('@/components/checkout/faq/Faq'));
const CheckoutSlider = dynamic(() => import('@/components/checkout/checkout-slider/CheckoutSlider'), {
  ssr: false,
  loading: () => <LoadingSkeletonSlider />,
});
const PlansRootComponent = dynamic(() => import('@/components/checkout/plans/PlansRootComponent'), {
  ssr: false,
  loading: () => <LoadingSkeletonPlans />,
});

const CheckoutPage = async () => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization')?.value;
  const code = cookieStore.get('code')?.value;
  const {
    banner,
    discountBar,
    wyg,
    plans,
    button,
    comments,
    faq,
    guarantee,
    footer,
    horizontalComments,
    currency,
    clientToken,
  } = (await getCheckout({
    Authorization,
    code,
  })) as CheckoutResult;

  if (plans?.items?.length < 1 || plans === undefined) {
    redirect('/error');
  }

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <>
      <PreCheckoutHeader />
      <CheckoutBanner
        title={banner?.title}
        description={banner?.description}
        image={banner?.image}
        discountBar={discountBar}
        button={button}
      />
      <WhatYouGet sectionTitle={wyg?.sectionTitle} wyg={wyg?.items} video={wyg?.video} />
      <PlansRootComponent
        button={button}
        plans={plans}
        discountBar={discountBar}
        currency={currency}
        clientToken={clientToken}
      />
      <NewSlider horizontalComments={horizontalComments} />
      <NewComments sectionTitle={comments.sectionTitle} comments={comments.items} />
      <Faq faq={faq?.items} backgroundImage={faq?.backgroundImage} sectionTitle={faq?.sectionTitle} />
      {guarantee && <Guarantee title={guarantee?.guaranteeTitle} description={guarantee?.guaranteeDescription} />}
      <CheckoutFooter button={button} description={footer.description} />
    </>
  );
};

export default CheckoutPage;
