'use client';

import { AppFlex, Button, Modal, Typography } from '@/primitives';
import { CheckoutButton, PaymentModal, PlanItem, Plans } from '@/types/checkout';
import { styled } from 'styled-components';
import HortizonalListItem from './HortizonalListItem';
import Target from '../../../../public/images/target.png';
import Regime from '../../../../public/images/regime.png';
import VerticalListItem from './VerticalListItem';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { confirmFetcher } from '../checkout.services';
import { THISPROJECT, thisLocale } from '@/constants/projects';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import ReactLoading from 'react-loading';
import { useCountDownTimer } from '@/hooks';
import PaypalRoot from '../paypal/PaypalRoot';

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
  discountBar: discountBar;
  currency: string | undefined;
  clientToken: string | undefined;
}

const PlansRootComponent = ({ button, plans, currency, clientToken }: PlansContainerProps) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { push } = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(plans.items[0]?.planId);
  const [allPlansItems, setAllPlansItems] = useState<any>(plans.items[0]);
  const cookie = new Cookies();
  const Authorization = cookie.get('Authorization');
  const code = cookie.get('code');

  const time = '600000';
  const [, { start, render, isStarted, reset }] = useCountDownTimer(Number(time), 1000, 'minutes');
  const [openModal, setOpenModal] = useState(false);
  const locale = thisLocale;

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    start();
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
        discount: String(isStarted),
        plan: selectedPlan,
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

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root direction='column' align='center' gap={'30px'} id='plans'>
      <Typography variant='h1' tag='h1'>
        {plans.sectionTitle}
      </Typography>
      <AppFlex justify='space-between' gap={'20px'}>
        <HortizonalListItem
          title={plans.target.title}
          description={plans.target.description}
          image={plans.target.icon ?? Target}
        />
        <AppFlex gap={'15px'}>
          <Divider style={{ margin: 'auto' }} />
          <HortizonalListItem
            title={plans.regime.title}
            description={plans.regime.description}
            image={plans.regime.icon ?? Regime}
          />
        </AppFlex>
      </AppFlex>
      <AppFlex direction='column' gap={'20px'}>
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
              discounted={isStarted}
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
      {data?.resultLink && locale === 'en_US' && (
        <Modal isOpen={openModal} onClose={() => setOpenModal(true)}>
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
        </Modal>
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
  padding: 24px 16px;
  max-width: 600px;
  margin: auto;

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
