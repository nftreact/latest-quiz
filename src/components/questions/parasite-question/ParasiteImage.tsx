/* eslint-disable @next/next/no-img-element */
'use client';

import { Skeleton } from '@/shared';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

/**
 * props
 * _______________________________________________________________________________
 */
type props = {
  inputs: {
    link: string;
    textAlign: string;
  };
};

const WideImage = ({ inputs }: props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [loading, setLoading] = useState(true);
  const notDisplay = inputs?.link?.includes('young-coach');
  const isShowImage = inputs.link.includes('2022/11/45');

  const [opacity, setOpacity] = useState(0);
  const [translate, setTranslate] = useState('40px');

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
      setTranslate('0');
    }, 2);
  }, []);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */
  const handleImageLoad = () => {
    setLoading(false);
  };

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root>
      {/* {loading && <Skeleton />} */}
      <Image
        src={notDisplay || isShowImage ? '' : inputs.link}
        alt={notDisplay || isShowImage ? '' : 'wide image in quiz'}
        loading='lazy'
        onLoad={handleImageLoad}
        opacity={opacity}
        translate={translate}
      />
    </Root>
  );
};

export default WideImage;

/**
 * styled-component
 * _______________________________________________________________________________
 */
const Root = styled.section`
  position: relative;
  min-height: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-block: 30px;
`;

const Image = styled.img<{ opacity: number; translate: string }>`
  object-fit: cover;
  max-width: 100%;
  height: auto;
  margin: auto;
  border-radius: 18px;

  opacity: ${(props) => props.opacity};
  margin-top: ${(props) => props.translate};
  transition: opacity 2s, margin 1s;
`;
