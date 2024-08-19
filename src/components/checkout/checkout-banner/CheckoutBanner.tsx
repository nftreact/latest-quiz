'use client';

import { AppFlex, Button, Typography } from '@/primitives';
import { CheckoutButton, CheckoutDiscountBar } from '@/types/checkout';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import { useCountDownTimer, useWindowScrollPositions, useWindowSize } from '@/hooks';
import { useEffect, useState } from 'react';
import { colors } from '@/theme';
import Star from '../../../../public/images/star.svg';
import Cookies from 'universal-cookie';



/**
 * props
 * _______________________________________________________________________________
 */
export interface CheckoutBannerProps {
  title: string;
  description: string;
  image: string;
  discountBar: CheckoutDiscountBar;
  button: CheckoutButton;
}

const CheckoutBanner = ({ button, description, discountBar, image, title }: CheckoutBannerProps) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const cookie = new Cookies();
  const { width } = useWindowSize();
  const isDesktop = width > 900;
  const isMobile = width < 600;
  const time = '600000';
  const [, { start, render, isStarted, reset }] = useCountDownTimer(Number(time), 1000, 'minutes');
  const { scrollY } = useWindowScrollPositions();
  const isTimerShowSticky = scrollY > 123;

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    localStorage.setItem('timer', String(render(time)));
  }, [render, start]);

  useEffect(() => {
    if (render(time) === '00:00') {
      cookie.set('discount', 'false');
    }
  }, [cookie, isStarted, start]);

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    cookie.set('discount', 'true');
  }, [cookie]);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };

  const handleButtonClick = () => {
    const plansSection = document.getElementById('plans');
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
    <Root>
      <Container>
        {/* RightSection */}

        <RightSection>
          <CheckoutTile>{title}</CheckoutTile>
          <Description>{description}</Description>

          {isStarted && (
            <MobileDiscountBar
              onClick={handleButtonClick}
              discountbar={discountBar}
              isTimerShowSticky={isTimerShowSticky}
            >
              <p className='title'>{discountBar.title}</p>
              <p className='timerColor'> {render(time)}</p>
            </MobileDiscountBar>
          )}
          {isStarted && (
            <DesktopDiscountBar discountbar={discountBar} gap={'10px'} align='center'>
              <p className='title'>{discountBar.title}</p>
              <p className='timerColor'> {render(time)}</p>
            </DesktopDiscountBar>
          )}

          {isDesktop && (
            <Button variant='checkout' className='checkoutButton' onClick={handleButtonClick}>
              <Typography>{button.text}</Typography>
            </Button>
          )}
        </RightSection>

        {/* LeftSection */}
        <LeftSection style={{ marginTop: !isStarted ? '20px' : '0px' }}>
          <Image
            fill
            alt='checkout banner image'
            style={{ maxWidth: isDesktop ? '590px' : '', marginRight: 'auto' }}
            src={image}
            loading='lazy'
            loader={loaderProp}
          />
        </LeftSection>

        <RatingContainer
          direction='column'
          gap={'10px'}
          align='center'
          isdesktop={'false'}
          style={{ display: isMobile ? 'none' : '' }}
        >
          <AppFlex gap={'17px'}>
            {Array(5)
              .fill({})
              .map((item, index) => {
                return <Image src={Star} key={index} alt='star' width={24} height={24} />;
              })}
          </AppFlex>
          <Typography variant='subtitle2'>{description}</Typography>
        </RatingContainer>
      </Container>
    </Root>
  );
};

export default CheckoutBanner;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(AppFlex)`
  max-width: 1200px;
  margin: auto;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-block: 80px 30px;
  min-height: 300px;
  width: 100%;
  position: relative;

  flex-direction: column;

  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 30px;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 900px) {
    width: 50%;
    padding-inline: 16px;
  }
`;
const LeftSection = styled.div`
  width: 100%;
  position: relative;
  height: 75vw;

  @media (min-width: 900px) {
    margin-top: 0;
    width: 45%;
    height: 400px;
  }
`;

const CheckoutTile = styled.h1`
  font-size: 24px;
  text-align: center;
  font-weight: 700;
  padding-inline: 16px;

  @media (min-width: 600px) {
    font-size: 36px;
    font-weight: 700;
  }

  @media (min-width: 900px) {
    text-align: right;
    font-size: 48px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  color: #090a0a;
  text-align: center;

  @media (min-width: 600px) {
    display: none;
  }
`;

const MobileDiscountBar = styled.div<{ discountbar: any; isTimerShowSticky: boolean }>`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding-block: 15px;
  background-color: ${({ discountbar }) => discountbar?.bgColor};
  font-size: 20px;
  margin-top: 15px;
  position: ${({ isTimerShowSticky }) => isTimerShowSticky && 'fixed'};
  left: 0;
  right: 0;
  top: 30px;
  z-index: 200;
  width: 100%;

  @media (min-width: 900px) {
    display: none;
  }

  .title {
    color: ${({ discountbar }) => discountbar?.titleColor};
  }

  .timerColor {
    color: ${({ discountbar }) => discountbar?.timerColor};
  }
`;

const DesktopDiscountBar = styled(AppFlex)<{ discountbar: any }>`
  display: none;

  @media (min-width: 900px) {
    display: flex;
    font-size: 32px;
  }

  .title {
    color: #000;
  }

  .timerColor {
    color: ${colors.secondary};
  }
`;

const RatingContainer = styled(AppFlex)<{ isdesktop: boolean | string; isMobile?: boolean }>`
  width: 230px;
  text-align: center;
  height: max-content;
  position: absolute;
  z-index: 1;
  background-color: #ffffffde;
  box-shadow: 0 2px 6px rgb(36 36 36 / 6%), 0 12px 24px rgb(36 36 36 / 30%);
  border-radius: 20px;
  padding: 20px 24px;
  bottom: ${({ isdesktop }) => (isdesktop === 'false' ? '60px' : '80px')};

  ${({ isdesktop }) =>
    isdesktop === 'false' &&
    css`
      top: 70%;
      left: '50%';
      right: calc(50% - 230px);
      transform: translate(-50%, -50%);
      z-index: 100;
    `}
`;
