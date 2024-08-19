'use client';

import { AppFlex, Typography } from '@/primitives';
import styled from 'styled-components';
import { GrRadialSelected } from 'react-icons/gr';
import { FaRegCircle } from 'react-icons/fa';
import { IoScaleSharp } from 'react-icons/io5';
import { AiFillSignal } from 'react-icons/ai';
import { DecodeBase64 } from '@/utils/insdex';
import { useEffect, useState } from 'react';
import Modal from 'react-minimal-modal';
import { IoIosClose } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import OfferBoxModal from '../OfferBoxModal';
import { useMutation } from '@tanstack/react-query';
import { confirmFetcher } from '@/components/checkout/checkout.services';
import { THISPROJECT } from '@/constants/projects';
import Cookies from 'universal-cookie';
import ReactLoading from 'react-loading';
import PaypalRoot from '@/components/checkout/paypal/PaypalRoot';
/**
 * props
 * _______________________________________________________________________________
 */
export type BackModal = {
  buttonText: string;
  chartUrl: string;
  descriptionDown: string;
  descriptionUp: string;
  title: string;
  underChart: string;
};

type Plans = {
  description: string;
  featured: string;
  featuredTitle: string;
  planId: string;
  id: number;
  timeUnit: string;
  title: string;
  discountPrice: {
    monthly: {
      unitSymbol: string;
      description: string;
      price: string;
      title: string;
      unit: string;
    };
    perDayPrice: {
      unitSymbol: string;
      price: string;
      text: string;
      unit: string;
    };
  };
  offerPrice: {
    monthly: {
      unitSymbol: string;
      description: string;
      price: string;
      title: string;
      unit: string;
    };
    perDayPrice: {
      unitSymbol: string;
      price: string;
      text: string;
      unit: string;
    };
  };
  regularPrice: {
    monthly: {
      unitSymbol: string;
      description: string;
      price: string;
      title: string;
      unit: string;
    };
    perDayPrice: {
      unitSymbol: string;
      price: string;
      text: string;
      unit: string;
    };
  };
};

type Props = {
  isShow: any;
  handleOfferFoxModal: any;
  unitSymbol: string;
  clientToken: string;
  currency: string;
  discount: string;
  offer: string | null | undefined;
  content: {
    title: string;
    heroSection: {
      credits: {
        icons: string;
        items: string[];
        title: string;
      };
      hint: string;
      backModal: BackModal;
      giftCard: {
        image: string;
        text: string;
      };
      plans: Plans[];
      button: {
        text: string;
        link: string;
      };
      fastingLevel: {
        icon: string;
        text: string;
        value: string;
      };
      targetWeight: {
        icon: string;
        text: string;
        value: string;
      };
      guarantee: {
        link: string;
        text: string;
      };
    };
  };
};

const Plans = ({ content, discount, offer, clientToken, currency, unitSymbol, handleOfferFoxModal, isShow }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  const cookie = new Cookies();
  const { heroSection, title } = content;
  const { button, fastingLevel, guarantee, targetWeight, backModal, giftCard, hint, credits } = heroSection;
  const initilaSelectedPlan = heroSection?.plans?.filter((item) => item.featured === 'true')[0];
  const [selectedPlan, setSelectedPlan] = useState<Plans>(initilaSelectedPlan);
  const [selectedPrice, setSelectedPrice] = useState<any>();
  const [selectedregularPrice, setSelectedregularPrice] = useState<any>(initilaSelectedPlan?.regularPrice?.monthly);
  const [openModal, setOpenModal] = useState(false);
  const { replace, push, refresh } = useRouter();
  const offerDecode = DecodeBase64(offer as string);
  const discountDecode = DecodeBase64(discount);
  const userIpAddress = cookie.get('user-ip-address');
  const Authorization = cookie.get('Authorization');
  const code = cookie.get('code');
  const isDiscount = offerDecode === 'true' || (discountDecode === 'true' && 'true');
  const off = offerDecode === 'true' ? '61%' : discountDecode === 'true' && '51%';
  const offerCookie = cookie.get('offer');

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

  const getPrice = (status: 'dicounted' | 'regular' | 'offer' | undefined) => {
    if (status === 'offer') {
      return selectedPlan.offerPrice.monthly;
    }
    if (status === 'dicounted') {
      return selectedPlan.discountPrice.monthly;
    }

    if (status === 'regular') {
      return selectedPlan.regularPrice.monthly;
    }
  };

  const status = getStatus();

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    if (status !== 'offer') {
      refresh();
    }
  }, []);

  useEffect(() => {
    cookie.set('noRedirect', 'true', {
      path: '/',
      maxAge: 1800,
    });

    if (status === 'regular') {
      cookie.set('offer', 'false', {
        path: '/',
        maxAge: 1800,
      });
      cookie.set('discount', 'false', {
        path: '/',
        maxAge: 1800,
      });
    }
    if (status === 'dicounted') {
      cookie.set('discount', 'true', {
        path: '/',
        maxAge: 1800,
      });
      cookie.set('offer', 'false', {
        path: '/',
        maxAge: 1800,
      });
    }

    if (status === 'offer') {
      cookie.set('offer', 'true', {
        path: '/',
        maxAge: 1800,
      });
    }
  }, [offerDecode, discountDecode]);

  useEffect(() => {
    setSelectedPrice(getPrice(status));
  }, [status, selectedPlan]);

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
   * hooks and methods
   * _______________________________________________________________________________
   */

  const { mutate, isLoading, data } = useMutation(
    () => {
      return confirmFetcher({
        Authorization: Authorization,
        code: code,
        discount: isDiscount as string,
        plan: selectedPlan.planId,
        userIpAddress,
        currency: '',
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

  const handleModalFeatcher = () => {
    setOpenModal(false);
    handleOfferFoxModal();
  };

  const handleButtonClick = () => {
    const plansSection = document.getElementById('Guarantee');
    if (plansSection) {
      plansSection.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <>
      {isShow && (
        <Root id='plans' gap='20px' align='center' direction='column'>
          {offerDecode === 'true' && (
            <GiftCardContainer
              gap='20px'
              align='center'
              justify='center'
              style={{ padding: '20px 30px', borderRadius: '10px', backgroundColor: '#FDECE8', width: '100%' }}
            >
              <Image width={70} height={70} alt='' src={giftCard.image} />
              <div dangerouslySetInnerHTML={{ __html: giftCard.text }} />
            </GiftCardContainer>
          )}
          <Typography textalign='center' className='typo' variant='h2' fontWeight={600} color='#252D48'>
            {title}
          </Typography>
          <AppFlex gap='20px'>
            <AppFlex direction='column' gap='5px'>
              <Typography style={{ color: '#767A86' }} fontSize={10} variant='subtitle2'>
                {targetWeight.text}
              </Typography>
              <AppFlex gap='5px' align='center'>
                <IoScaleSharp fill='#3AD7AB' />
                <Typography variant='subtitle1' fontWeight={600}>
                  {targetWeight.value}
                </Typography>
              </AppFlex>
            </AppFlex>
            <Divider />
            <AppFlex direction='column' gap='5px'>
              <Typography style={{ color: '#767A86' }} fontSize={10} variant='subtitle2'>
                {fastingLevel.text}
              </Typography>
              <AppFlex gap='5px' align='center'>
                <AiFillSignal fill='#3AD7AB' />
                <Typography variant='subtitle1' fontWeight={600}>
                  {fastingLevel.value}
                </Typography>
              </AppFlex>
            </AppFlex>
          </AppFlex>

          <AppFlex direction='column' gap='10px' style={{ width: '100%' }}>
            {heroSection?.plans?.map((item, index) => {
              return (
                <AppFlex
                  onClick={() => {
                    setSelectedregularPrice(item?.regularPrice.monthly);
                    setSelectedPlan(item);
                  }}
                  justify='space-between'
                  align='center'
                  style={{
                    position: 'relative',
                    border: `1px solid ${selectedPlan.id === index ? '#3AD7AB' : '#D6D7DB'}`,
                    boxShadow: `inset 0 0 0 1px ${selectedPlan.id === index ? '#3AD7AB' : '#D6D7DB'} `,
                    borderRadius: '8px',
                    width: '100%',
                    padding: '14px 10px',
                    paddingTop: item.featured === 'true' ? '38px ' : '8px',
                    minHeight: '90px',
                  }}
                  key={index}
                >
                  {item.featured === 'true' && (
                    <FeaturedFlag>
                      <Typography variant='subtitle2' fontWeight={600} style={{ color: '#fff' }}>
                        {item.featuredTitle}
                      </Typography>
                    </FeaturedFlag>
                  )}
                  {/* leftSection */}
                  <RightSectionContainer align='center' gap='5px'>
                    <AppFlex>
                      {selectedPlan.id === index ? (
                        <GrRadialSelectedStyle stroke='#3AD7AB' />
                      ) : (
                        <FaRegCircleSvgStyle selected={selectedPlan.id === index} />
                      )}
                    </AppFlex>
                    <AppFlex direction='column' gap='2px'>
                      <Typography fontWeight={700} variant='subtitle2'>
                        {item.title}
                      </Typography>
                      {item.description && (
                        <AppFlex
                          justify='center'
                          align='flex-end'
                          style={{
                            padding: '3px 7px',
                            width: 'fit-content',
                            borderRadius: '3px',
                            backgroundColor: selectedPlan.id === index ? '#7EB79D' : '#E9E4E2',
                          }}
                        >
                          <Typography
                            fontSize={8}
                            style={{ color: selectedPlan.id === index ? '#fff' : '#767A86', lineHeight: 1.5 }}
                            fontWeight={700}
                            variant='subtitle2'
                          >
                            {item.description}
                          </Typography>
                        </AppFlex>
                      )}
                      <AppFlex gap='10px'>
                        <Typography
                          fontWeight={500}
                          style={{
                            color: '#767A86',
                            textDecoration:
                              discountDecode === 'true' || offerDecode === 'true' ? 'line-through' : 'none',
                          }}
                          variant='subtitle2'
                        >
                          {`${item.regularPrice.monthly.unitSymbol} `}
                          {item.regularPrice.monthly.price}
                        </Typography>
                        {discountDecode === 'true' && offerDecode !== 'true' && (
                          <Typography fontWeight={500} style={{ color: '#767A86' }} variant='subtitle2'>
                            {`${item.discountPrice.monthly.unitSymbol} `}
                            {item.discountPrice.monthly.price}
                          </Typography>
                        )}
                        {offerDecode === 'true' && (
                          <Typography fontWeight={500} style={{ color: '#767A86' }} variant='subtitle2'>
                            {`  ${item.offerPrice.monthly.unitSymbol} `}
                            {item.offerPrice.monthly.price}
                          </Typography>
                        )}
                      </AppFlex>
                    </AppFlex>
                  </RightSectionContainer>

                  {/* rightSection */}
                  <AppFlex gap='5px'>
                    {discountDecode === 'true' && offerDecode !== 'true' && (
                      <Typography
                        fontSize={15}
                        fontWeight={500}
                        style={{
                          color: '#767A86',
                          textDecoration: discountDecode === 'true' ? 'line-through' : 'none',
                          textDecorationColor: '#FF4F64',
                          marginBlockStart: 'auto',
                        }}
                        variant='subtitle2'
                      >
                        {`${item.discountPrice.perDayPrice.unitSymbol} `}
                        {item.discountPrice.perDayPrice.price}
                      </Typography>
                    )}
                    {offerDecode === 'true' && (
                      <Typography
                        fontSize={15}
                        fontWeight={500}
                        style={{
                          color: '#767A86',
                          textDecoration: offerDecode === 'true' ? 'line-through' : 'none',
                          textDecorationColor: '#FF4F64',
                          marginBlockStart: 'auto',
                        }}
                        variant='subtitle2'
                      >
                        {`${item.offerPrice.perDayPrice.unitSymbol} `}
                        {item.offerPrice.perDayPrice.price}
                      </Typography>
                    )}
                    <AppFlex
                      gap='3px'
                      style={{
                        position: 'relative',
                        padding: '8px 10px',
                        borderRadius: '8px',
                        backgroundColor: selectedPlan.id === index ? '#FBF3F3' : '#F4F4F4',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '15px',
                          fontWeight: 600,
                          position: 'absolute',
                          top: '15px',
                          left: '2px',
                          color: '#7A7A7A',
                        }}
                      >
                        {item.regularPrice.monthly.unitSymbol}
                      </div>
                      <Typography fontSize={30} fontWeight={700} style={{ color: '#7A7A7A', lineHeight: 1 }}>
                        {item.regularPrice.perDayPrice.price.split('.')[0]}
                      </Typography>
                      <AppFlex direction='column'>
                        <Typography fontSize={14} fontWeight={700} style={{ color: '#7A7A7A' }}>
                          {item.regularPrice.perDayPrice.price.split('.')[1]}
                        </Typography>
                        <Typography fontSize={8} fontWeight={600} style={{ color: '#7A7A7A', lineHeight: 0 }}>
                          {item.regularPrice.perDayPrice.text}
                        </Typography>
                      </AppFlex>
                    </AppFlex>
                  </AppFlex>
                </AppFlex>
              );
            })}
          </AppFlex>

          <Typography
            onClick={handleButtonClick}
            style={{ textDecoration: 'underline' }}
            fontSize={18}
            fontWeight={700}
          >
            {guarantee.text}
          </Typography>
          <ButtonStyle
            onClick={() => {
              mutate();
            }}
            className='button-animation'
          >
            {isLoading ? (
              <AppFlex justify='center'>
                <ReactLoading color='#ffff' type='spin' width={25} height={25} />
              </AppFlex>
            ) : (
              <Typography fontWeight={600} variant='body2' style={{ color: '#fff' }}>
                {button.text}
              </Typography>
            )}
          </ButtonStyle>
          <Typography fontSize={12} textalign='center' style={{ color: '#767A86' }}>
            {hint}
          </Typography>

          {/* credits _______________________________________________________________________________________________________________________________________ */}
          {offerDecode === 'true' && (
            <AppFlex direction='column' gap='20px'>
              <div style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: credits.title }} />
              <AppFlex gap='20px'>
                {credits.items.map((item, index) => {
                  return (
                    <Image key={index} src={item} alt='' width={58} height={23} style={{ objectFit: 'contain' }} />
                  );
                })}
              </AppFlex>
            </AppFlex>
          )}

          {/* ModalStyle _______________________________________________________________________________________________________________________________________ */}
          {/* {data?.resultLink && (
            <ModalStyle
              open={openModal}
              onClose={() => {
                setOpenModal(false);
                // setIsOpenOfferBox(true);
              }}
            >
              <PaypalRoot
                unitSymbol={unitSymbol}
                off={off}
                price={{
                  discountedPrice: selectedPrice,
                  reqularPrice: selectedregularPrice,
                }}
                isNewCheckout={true}
                paymentModal={selectedPlan}
                priceUnit={currency}
                key={''}
                currency={currency}
                open={!!data?.resultLink}
                discounted={Boolean(off) === true ? true : false}
                clientToken={clientToken}
                resultCode={data?.resultLink}
                selectedPlanId={selectedPlan.planId}
                fullPrice={Number(selectedPrice!!.price.regular)}
                discountedPrice={Number(selectedPrice!!.price.discounted)}
                handleCloseModal={handleModalFeatcher}
              />
            </ModalStyle>
          )} */}
        </Root>
      )}
    </>
  );
};

export default Plans;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(AppFlex)`
  .typo {
    font-size: 22px;

    @media (min-width: 450px) {
      font-size: 32px;
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 #3ad7ab;
    }

    70% {
      box-shadow: 0 0 0 10px rgba(78, 208, 154, 0);
    }

    100% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }

  @keyframes pulse-disabled {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.12);
    }

    70% {
      box-shadow: 0 0 0 10px rgba(78, 208, 154, 0);
    }

    100% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }

  .button-animation {
    animation: pulse 1.25s cubic-bezier(0.66, 0, 0, 1) infinite;
  }

  .button-animation:disabled {
    animation: pulse-disabled 1.25s cubic-bezier(0.66, 0, 0, 1) infinite;
  }
`;

const Divider = styled.div`
  width: 1px;
  background-color: #767a86;
  height: auto;
  border-radius: 10px;
  opacity: 0.5;
`;

const FaRegCircleSvgStyle = styled(FaRegCircle)<{ selected: boolean }>`
  fill: ${({ selected }) => (!selected ? '#D6D7DB' : '#3AD7AB')};
  width: 22px !important;
  height: 22px !important;
`;

const GrRadialSelectedStyle = styled(GrRadialSelected)`
  width: 22px !important;
  height: 22px !important;
`;

const FeaturedFlag = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  height: 25px;
  right: 0;
  left: 0;
  background-color: #3ad7ab;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
`;

const ButtonStyle = styled.button`
  appearance: none;
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 16px;
  background-color: #3ad7ab;
  box-shadow: 0 0 #3ad7ab;
  color: #fff;
  margin-inline-start: auto;
  width: 100%;
  cursor: pointer;
`;

const ModalStyle = styled(Modal)`
  && .modal__header {
    display: none !important;
  }

  &.modal__popup {
    max-width: 1000px !important;
    width: -webkit-fill-available;
    margin-inline: 10px;
  }

  & .modal__body {
    min-height: 200px;
  }
`;

const CloseWrapper = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #eaeaea;
  position: absolute;
  top: 10px;
  left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    scale: 1.6;
  }
`;

const GiftCardContainer = styled(AppFlex)`
  span {
    font-size: 18px !important;
  }
  @media (min-width: 500px) {
    font-size: initial;
  }
`;

const RightSectionContainer = styled(AppFlex)`
  max-width: 135px;

  @media (min-width: 500px) {
    max-width: max-content;
  }
`;
