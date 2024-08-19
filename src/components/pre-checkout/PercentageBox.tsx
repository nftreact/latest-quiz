'use client';

import { AppFlex, Typography } from '@/primitives';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Image from 'next/image';
import { colors } from '@/theme';
import Info from '../../../public/images/info.png';
import { useWindowScrollPositions } from '@/hooks';

/**
 * props
 * _______________________________________________________________________________
 */
export interface PercentageBoxProps {
  thisValue: number;
  description: string;
  showBox: boolean;
  afterText: string | undefined | null;
}

const PercentageBox = ({ afterText, description, showBox, thisValue }: PercentageBoxProps) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useWindowScrollPositions();

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    if (scrollY > 950) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [scrollY]);

  useEffect(() => {
    if (showBox) {
      const timer = setInterval(() => setValue((preValue) => (preValue >= thisValue ? thisValue : preValue + 1)), 100);
      return () => clearInterval(timer);
    }
  }, [showBox, thisValue]);

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
    <Container
      direction='column'
      className={`resultBox${showBox ? 'Shown' : ''}`}
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 3s' }}
    >
      <ImageWrapper align='center' justify='center'>
        <Image alt='info-svg-icon' src={Info} width={12} height={12} loader={loaderProp} />
      </ImageWrapper>
      <AppFlex align='center' direction='column'>
        <Typography textcolor={colors.secondary} fontSize={88} fontWeight={600}>
          {value}
          <Typography textcolor={colors.secondary} fontSize={44} fontWeight={600} tag='span'>
            {!afterText && typeof afterText !== 'string' && '%'}
            {afterText && afterText}
          </Typography>
        </Typography>
        <Typography variant='subtitle2'>{description}</Typography>
      </AppFlex>
    </Container>
  );
};

export default PercentageBox;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Container = styled(AppFlex)`
  border-radius: 12px;
  background-color: white;
  padding: 24px 16px;
  box-shadow: 0 2px 6px rgb(22 42 65 / 6%), 0 12px 24px rgb(7 21 37 / 8%);
  position: relative;
  overflow: hidden;
  margin-bottom: 100px;
`;

const ImageWrapper = styled(AppFlex)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #a3b3c6;
`;
