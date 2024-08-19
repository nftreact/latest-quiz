'use client';

import styled from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Typography } from '@/primitives';
import { colors } from '@/theme';

/**
 * props
 * _______________________________________________________________________________
 */

export interface PreCheckoutBannerProps {
  bgColor: string;
  text: string;
  image: string;
}

const PreCheckoutBanner = ({ bgColor, image, text }: PreCheckoutBannerProps) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [isShown, setIsShown] = useState(false);

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    setIsShown(true);
  }, []);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root bgcolor={bgColor}>
      <Container>
        <div className={`preCheckoutBannerTitle${isShown ? 'Shown' : ''} is-margin`}>
          <Divider />
          <Typography fontWeight={600} variant='h2' tag='h1' textcolor={colors.white}>
            {text}
          </Typography>
        </div>
        <ImageWrapper>
          <Image
            loader={loaderProp}
            fill
            src={image}
            objectFit='cover'
            loading='lazy'
            alt='pre checkout banner image'
          />
        </ImageWrapper>
      </Container>
    </Root>
  );
};

export default PreCheckoutBanner;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section<{ bgcolor: string }>`
  margin-bottom: 20px;
  display: flex;
  background-color: ${({ bgcolor }) => bgcolor && bgcolor};

  h1 {
    font-size: 20px;

    @media (min-width: 600px) {
      font-size: 28px;
    }
  }

  .is-margin {
    display: flex;
    align-items: center;
    gap: 13px;

    @media (min-width: 500px) {
      margin-top: 0;
    }
  }

  .preCheckoutBannerTitleShown {
    opacity: 1;
    transform: translate(0, 0);
    transition: all 1s ease-in;
  }

  .preCheckoutBannerTitle {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  max-width: 900px;
  margin: auto;
  padding-inline: 24px;

  @media (min-width: 768px) {
    padding-inline: 40px;
  }
`;

const Divider = styled.div`
  width: 6px;
  height: 45px;
  background-color: #fcba2f;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgb(42 56 107 / 20%);
`;

const ImageWrapper = styled.div`
  width: 180px;
  height: 180px;
  position: relative;

  @media (min-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;
