'use client';

import { AppFlex } from '@/primitives';
import ResultOfProgram from './result-of-program/ResultOfProgram';
import WhatYouGet from './what-you-get/WhatYouGet';
import SuccessStories from './success-stories/SuccessStories';
import Plans from './plan/Plans';
import PeopleOftenAsk from './people often ask/PeopleOftenAsk';
import { DecodeBase64 } from '@/utils/insdex';
import OfferBoxModal from './OfferBoxModal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import dynamic from 'next/dynamic';
import { LoadingSkeletonSlider } from '../checkout';

const PlansRootComponent = dynamic(() => import('../new-checkout/PlansRootComponentNew'), {
  ssr: false,
  loading: () => <LoadingSkeletonSlider />,
});
const CheckoutSlider = dynamic(() => import('./checkout-slider/CheckoutSlider'), {
  ssr: false,
  loading: () => <LoadingSkeletonSlider />,
});
const MeetTheirGoals = dynamic(() => import('./meet-their-goals/MeetTheirGoals'), {
  ssr: false,
  loading: () => <LoadingSkeletonSlider />,
});

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  code?: string;
  Authorization?: string;
  data: any;
  project?: string;
  discount: string;
  offer: string;
  show?: string;
};

const PaymentRoot = ({ data, discount, offer, show, code, Authorization, project }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const plansData = data.items.filter((item: any) => item.key === 'plans')[0].content;
  const backModal = data.items.filter((item: any) => item.key === 'plans')[0].content.heroSection.backModal;
  const cookie = new Cookies();
  const { replace } = useRouter();
  const [openOfferBox, setIsOpenOfferBox] = useState(false);
  const discountDecode = DecodeBase64(discount);
  const offerDecode = DecodeBase64(offer as string);
  const offerCookie = cookie.get('offer');
  const discountCookie = cookie.get('discount');

  // window.addEventListener('popstate', () => {
  //   cookie.set('isShowboxOffer', 'true', {
  //     path: '/',
  //     maxAge: 36000,
  //   });
  // });

  useEffect(() => {
    if (project === 'chatfit') {
      cookie.set('code', code);
      cookie.set('Authorization', Authorization);
    }
  }, []);

  const getStatus = () => {
    if (discountDecode === 'true' && !offerDecode) {
      return 'dicounted';
    }

    if (discountDecode === 'false' && !offerDecode) {
      return 'regular';
    }

    if (discountDecode === 'false' && offerDecode === 'false') {
      return 'regular';
    }

    if (discountDecode === 'true' && offerDecode === 'true') {
      return 'offer';
    }
  };

  const status = getStatus();

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    // if (cookie.get('isShowboxOffer') === true) {
    //   if (discountCookie === true && offerCookie == false) {
    //     setIsOpenOfferBox(true);
    //   }
    // }
  }, [show]);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  useEffect(() => {}, [cookie, offerCookie, discountCookie]);

  const handleCloseOfferBox = () => {
    // if (discountDecode === 'true' && offer === undefined) {
    //   replace('/checkout/?discount=dHJ1ZQ==&offer=dHJ1ZQ==');
    //   const plansSection = document.getElementById('Root');
    //   if (plansSection) {
    //     plansSection.scrollIntoView({
    //       behavior: 'smooth',
    //     });
    //   }
    // }
    // cookie.remove('isShowboxOffer', {
    //   path: '/',
    // });
    // setIsOpenOfferBox(false);
  };

  const handleOfferFoxModal = () => {
    if (status === 'dicounted') {
      return setIsOpenOfferBox(true);
    }
  };

  const returnWhatYouGet = () => {
    if (offerDecode || discountDecode) {
      return (
        <WhatYouGet content={data.items[3].content} offer={offerDecode} discount={discountDecode} status={status} />
      );
    }
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <>
      <AppFlex
        id='Root'
        gap='30px'
        direction='column'
        style={{
          maxWidth: '550px',
          margin: 'auto',
          paddingBlock: '80px 40px',
          paddingInline: '16px',
          position: 'relative',
        }}
      >
        {status !== 'offer' && <ResultOfProgram content={data.items[0].content} />}
        {data.items[1].content.heroSection.plans.length > 0 && (
          <PlansRootComponent
            button={data?.button}
            plans={data?.plans}
            discountBar={status === 'dicounted' ? true : false}
            currency={data?.currency}
            clientToken={data?.clientToken}
          />
        )}
        {status !== 'offer' && <CheckoutSlider content={data.items[2].content} />}

        {returnWhatYouGet()}
        {<MeetTheirGoals content={data.items[6].content} />}
        {status !== 'offer' && <SuccessStories content={data.items[5].content} />}
        {offerDecode === 'false' || (offerDecode && <PeopleOftenAsk content={data.items[4].content} />)}
        {status === 'offer' && <SuccessStories content={data.items[5].content} />}
        {data.items[7].content.heroSection.plans.length > 0 && (
          <PlansRootComponent
            button={data?.button}
            plans={data?.plans}
            discountBar={status === 'dicounted' ? true : false}
            currency={data?.currency}
            clientToken={data?.clientToken}
          />
        )}
        {/* <OfferBoxModal
          data={backModal}
          onClickButton={handleCloseOfferBox}
          open={openOfferBox}
          onCloseModal={handleCloseOfferBox}
        /> */}
      </AppFlex>
    </>
  );
};

export default PaymentRoot;

/**
 * styled-component
 * _______________________________________________________________________________
 */
