'use client';

import { useState } from 'react';
import { keyframes, styled } from 'styled-components';
import Image from 'next/image';
import { imageLoader } from '@/utils/imageLoader';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  currentMainImage: string;
};

const MainImage = ({ currentMainImage }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [loading, setLoading] = useState(true);

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
    <ImageWrapper>
      {loading && <div className='styled' />}
      <Image
        src={currentMainImage}
        alt=''
        loading='lazy'
        fill
        style={{ objectFit: 'fill', borderRadius: '10px' }}
        onLoadingComplete={() => setLoading(false)}
        loader={imageLoader}
      />
    </ImageWrapper>
  );
};

export default MainImage;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const loadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  min-width: 328px;
  width: 60vw;
  height: 140vw;

  @media (min-width: 600px) {
    width: 400px;
    height: 600px;
  }

  .styled {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 100%);
    background-size: 200px 100%;
    animation: ${loadingAnimation} 4s infinite linear;
    border-radius: 20px;
    width: 100%;
    max-width: 600px;
  }
`;
