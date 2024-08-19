'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styled from 'styled-components';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  data: string[];
};

const Slider = ({ data }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root>
      <MobileViewSlider
        initialSlide={1}
        navigation={true}
        centeredSlides={true}
        grabCursor={true}
        slidesPerView={'auto'}
        breakpoints={{
          500: {
            width: 500,
            slidesPerView: 3,
          },
        }}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Navigation]}
        className='mySwiper'
      >
        {data?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Image fill src={item} alt='image-slider' />
            </SwiperSlide>
          );
        })}
      </MobileViewSlider>

      <DesktopViewSlider
        modules={[Pagination, Navigation]}
        className='mySwiper'
        navigation={data.length < 4 ? false : true}
        slidesPerView={'auto'}
        breakpoints={{
          500: {
            width: 500,
            slidesPerView: 3,
          },
        }}
        spaceBetween={10}
        pagination={{
          clickable: data.length < 4 ? false : true,
        }}
      >
        {data?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Image fill src={item} alt='image-slider' />
            </SwiperSlide>
          );
        })}
      </DesktopViewSlider>
    </Root>
  );
};

export default Slider;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.div`
  height: 400px;
  width: 100%;

  & .swiper {
    width: 100%;
    height: 100%;
  }

  & .swiper-wrapper {
    transition-duration: 1000ms !important;
    transition-delay: 30ms !important;
    margin-top: -20px;
  }

  & .swiper-slide {
    position: relative;
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease;
  }

  & .swiper-pagination {
    bottom: -3px;
  }

  & .swiper-button-prev {
    width: 30px;
    font-size: 100px;
    top: 387px;
    scale: 0.45;
    color: #767a86;
    z-index: 100;
    display: none;

    @media (min-width: 500px) {
      display: flex;
    }
  }

  & .swiper-button-next {
    width: 30px;
    font-size: 100px;
    top: 387px;
    scale: 0.45;
    color: #767a86;
    width: 60px;
    z-index: 100;
    display: none;

    @media (min-width: 500px) {
      display: flex;
    }
  }

  & .swiper-pagination-bullet {
    background-color: #3ad7ab;
  }

  & .swiper-pagination-bullet-active {
    min-width: 20px;
    border-radius: 4px;
  }

  & .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const MobileViewSlider = styled(Swiper)`
  display: flex;

  & .swiper-slide {
    width: 170px;
    transform: scale(0.8);
  }

  & .swiper-slide-next {
    transform: scale(0.8);
  }

  & .swiper-slide-active {
    transform: scale(1);
  }

  @media (min-width: 500px) {
    display: none;
  }
`;

const DesktopViewSlider = styled(Swiper)`
  display: none;

  & .swiper-slide {
    transform: scale(0.85);
  }

  & .swiper-slide-next {
    transform: scale(1.1);
  }

  & .swiper-slide-active {
    transform: scale(0.85);
  }

  @media (min-width: 500px) {
    display: flex;
  }
`;
