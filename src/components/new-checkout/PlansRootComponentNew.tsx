'use client';

import { AppFlex, Button, Typography } from '@/primitives';
import { CheckoutButton, PaymentModal, PlanItem, Plans } from '@/types/checkout';
import { styled } from 'styled-components';
import Target from '../../../public/images/target.png';
import Regime from '../../../public/images/regime.png';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { THISPROJECT } from '@/constants/projects';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import ReactLoading from 'react-loading';
import { useCountDownTimer } from '@/hooks';
import Modal from 'react-minimal-modal';
import dynamic from 'next/dynamic';
import { confirmFetcher } from '../checkout/checkout.services';
import HortizonalListItem from '../checkout/plans/HortizonalListItem';
import PaypalRoot from '../checkout/paypal/PaypalRoot';
import VerticalListItem from '../checkout/plans/VerticalListItem';

/**
 * props
 * _______________________________________________________________________________
 */
type discountBar = {
  bgColor: string;
  time: string;
  timerColor: string;
  title: string;
  titleColor: string;
};

interface PlansContainerProps {
  plans: Plans;
  button: CheckoutButton;
  discountBar: discountBar | any;
  currency: string | undefined;
  clientToken: string | undefined;
}

const PlansRootComponent = ({ button, plans, currency, clientToken, discountBar }: PlansContainerProps) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { push } = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<any>();
  const [allPlansItems, setAllPlansItems] = useState<any>();
  const cookie = new Cookies();
  const Authorization = cookie.get('Authorization');
  const code = cookie.get('code');
  const userIpAddress = cookie.get('user-ip-address');

  const time = '600000';
  const [, { start, render, isStarted, reset }] = useCountDownTimer(Number(time), 1000, 'minutes');
  const [openModal, setOpenModal] = useState(false);

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    // start();
    const defaultPlan = plans.items.filter((item) => item.featured === 'true');
    setSelectedPlan(defaultPlan.length === 0 ? plans.items[0]?.planId : defaultPlan[0].planId);
    setAllPlansItems(defaultPlan.length === 0 ? plans.items[0] : defaultPlan[0]);
  }, []);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const handleCloseModal = (value: boolean) => {
    setOpenModal(value);
  };

  const { mutate, isLoading, data } = useMutation(
    () => {
      return confirmFetcher({
        Authorization: Authorization,
        code: code,
        discount: discountBar ? 'true' : 'false',
        plan: selectedPlan,
        currency: currency as string,
        userIpAddress,
      });
    },
    {
      onSuccess: (data) => {
        if (data.resultLink && THISPROJECT.DEFAULT_LOCALE === 'fa_IR') push(data.resultLink);
        else if (data.resultLink) {
          setOpenModal(true);
          return data.resultLink;
        }
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = 'hidden';
    }

    const html = document.querySelector('html');
    if (html) {
      html.style.overflow = openModal ? 'hidden' : 'auto';
    }

    return () => {};
  }, [openModal]);

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root direction='column' align='center' gap={'30px'} id='plans'>
      <Typography variant='h1' tag='h1' fontWeight={600} style={{ textAlign: 'center' }}>
        {plans.sectionTitle}
      </Typography>
      <AppFlex justify='space-between' gap={'20px'}>
        <HortizonalListItem
          title={plans.target.title}
          description={plans.target.description}
          image={plans.target.icon ?? Target}
        />
        <Divider style={{ margin: 'auto' }} />
        <HortizonalListItem
          title={plans.regime.title}
          description={plans.regime.description}
          image={plans.regime.icon ?? Regime}
        />
      </AppFlex>
      <AppFlex direction='column' gap={'20px'} style={{ width: '100%' }}>
        {plans?.items.map((item, i) => {
          return (
            <VerticalListItem
              onClick={() => {
                setAllPlansItems(item);
                setSelectedPlan(item.planId);
              }}
              index={item.planId}
              thisPlan={item}
              key={i}
              discounted={discountBar}
              selectedPlan={selectedPlan}
            />
          );
        })}
      </AppFlex>
      <Button variant='checkout' className='checkoutButton' onClick={() => mutate()}>
        {isLoading ? (
          <AppFlex justify='center'>
            <ReactLoading color='#ffff' type='spin' width={25} height={25} />
          </AppFlex>
        ) : (
          <Typography>{button.text}</Typography>
        )}
      </Button>
      {data?.resultLink && (
        <ModalStyle open={openModal} onClose={() => setOpenModal(true)}>
          <PaypalRoot
            paymentModal={plans?.paymentModal[selectedPlan]}
            priceUnit={allPlansItems!!.price.unit}
            key={currency}
            currency={currency}
            open={!!data?.resultLink}
            discounted={isStarted}
            clientToken={clientToken}
            resultCode={data?.resultLink}
            selectedPlanId={selectedPlan}
            fullPrice={Number(allPlansItems!!.price.regular)}
            discountedPrice={Number(allPlansItems!!.price.discounted)}
            handleCloseModal={handleCloseModal}
          />
        </ModalStyle>
      )}
    </Root>
  );
};

export default PlansRootComponent;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(AppFlex)`
  padding: 24px 0px;
  max-width: 600px;
  margin: auto;
  overflow: hidden;

  @media (min-width: 768px) {
    border: 1px solid #dfe3eb;
    border-radius: 14px;
  }
`;

const Divider = styled(AppFlex)`
  width: 2px;
  height: 50px;
  background-color: #dfe3eb;
`;

const ModalStyle = styled(Modal)`
  && .modal__header {
    display: none !important;
  }

  & .modal__popup {
    max-width: 1000px !important;
  }
`;
