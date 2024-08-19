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
import { colors } from '@/theme';
import { useState } from 'react';
import MainImage from './MainImage';
import dynamic from 'next/dynamic';
import { Autoplay } from 'swiper/modules';

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
  const [isOpen, setIsOpen] = useState(false);
  const [currentMainImage, setCurrentMainImage] = useState('');

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

  if (horizontalComments.items.length < 1) return;

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root direction='column' gap={'30px'}>
      {horizontalComments?.sectionTitle && (
        <Typography fontWeight={600} textalign='center' className='title'>
          {horizontalComments?.sectionTitle}
        </Typography>
      )}
      <Swiper
        modules={[Autoplay]}
        centeredSlides={true}
        grabCursor={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={20}
        slidesPerView={'auto'}
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
                  setIsOpen(true);
                  handleCurrentMainImage(item.mainImage);
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
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
  padding: 16px;
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
