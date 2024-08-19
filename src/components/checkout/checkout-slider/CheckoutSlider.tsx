/* eslint-disable @next/next/no-img-element */
'use client';

import { AppFlex, Typography } from '@/primitives';
import { horizontalComments, sliderItem } from '@/types/checkout';
import styled from 'styled-components';
import CardSlider from './CardSlider';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { colors } from '@/theme';
import { useEffect, useState } from 'react';
import MainImage from './MainImage';
import dynamic from 'next/dynamic';
import { useParams, useRouter } from 'next/navigation';

const Modal = dynamic(() => import('react-minimal-modal').then((item) => item.default));
/**
 * props
 * _______________________________________________________________________________
 */

type Props = {
  horizontalComments: horizontalComments;
};

const CheckoutSlider = ({ horizontalComments }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [isOpen, setIsOpen] = useState(window.location.hash === '#modal' ? true : false);
  const [currentMainImage, setCurrentMainImage] = useState('');
  const href = window.location.href;
  const params = useParams();
  const { push } = useRouter();
  const currentURL = window.location.href;
  const urlWithoutHash = currentURL.split('#')[0];

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const handleCurrentMainImage = (value: string) => {
    setCurrentMainImage(value);
  };

  useEffect(() => {
    if (window.location.hash) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [params]);

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root direction='column' gap={'30px'}>
      <Typography fontWeight={700} textalign='center' className='title'>
        {horizontalComments?.sectionTitle}
      </Typography>
      <Swiper
        effect='fade'
        fadeEffect={{
          crossFade: true,
        }}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={true}
        breakpoints={{
          600: {
            slidesPerView: 'auto',
          },
        }}
      >
        {horizontalComments?.items?.map((item: sliderItem, index) => {
          return (
            <SwiperSlide key={index}>
              <CardSlider
                card={item}
                onClick={() => {
                  push(`${href}#modal`);
                  handleCurrentMainImage(item.mainImage);
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Modal
        open={isOpen}
        onClose={() => {
          push(urlWithoutHash);
        }}
      >
        <MainImage currentMainImage={currentMainImage} />
      </Modal>
    </Root>
  );
};

export default CheckoutSlider;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(AppFlex)`
  padding: 24px 16px;
  max-width: 1200px;
  position: relative;
  margin: auto;

  & .swiper {
    max-width: 1200px !important;
    padding: 8px !important;
    position: relative !important;
    width: 100% !important;
  }

  & .swiper-slide {
    width: 100% !important;

    @media (min-width: 500px) {
      width: max-content !important;
    }
  }

  & .swiper-button-next:after {
    font-size: 25px !important;
    color: ${colors.primary};
    width: 100px;
    padding: 10px;
    border-radius: 8px;
    background-color: #f5f5f5;
  }

  & .swiper-button-prev:after {
    font-size: 25px !important;
    color: ${colors.primary};
    width: 100px;
    padding: 10px;
    border-radius: 8px;
    background-color: #f5f5f5;
  }

  .title {
    font-size: 24px;

    @media (min-width: 600px) {
      font-size: 32px !important;
    }
  }
`;
