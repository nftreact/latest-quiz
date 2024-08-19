'use client';

import { AppFlex, Typography } from '@/primitives';
import { styled } from 'styled-components';
import Image from 'next/image';

/**
 * props
 * _______________________________________________________________________________
 */
export interface WygItem {
  icon: string;
  title: string;
  description: string;
}

const WygCard = ({ description, icon, title }: WygItem) => {
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
    <AppFlex gap={'15px'} align='flex-start'>
      <ImageWrapper justify='center' align='center'>
        <Image src={icon} alt='wyg-card-icon' width={56} height={56} loading='lazy' />
      </ImageWrapper>
      <AppFlex direction='column' gap={'3px'}>
        <Typography fontSize={18} style={{ fontWeight: 800 }} textcolor='#000'>
          {title}
        </Typography>
        <Typography style={{ lineHeight: '25px' }} fontSize={14} variant='body2' textcolor='#6C727A'>
          {description}
        </Typography>
      </AppFlex>
    </AppFlex>
  );
};

export default WygCard;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const ImageWrapper = styled(AppFlex)`
  width: 70px;
  height: 70px;
  border-radius: 15px;
  background-color: rgb(243, 243, 243);
`;
