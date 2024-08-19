'use client';

import { AppFlex, Typography } from '@/primitives';
import Image from 'next/image';

/**
 * props
 * _______________________________________________________________________________
 */
export interface PlansHortizonalListItemProps {
  image: string;
  title: string;
  description: string;
}

const HortizonalListItem = ({ description, image, title }: PlansHortizonalListItemProps) => {
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

  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <AppFlex gap={'10px'} align='flex-start'>
      <Image
        src={image}
        width={40}
        height={40}
        alt={title}
        style={{ borderRadius: '50px' }}
        loading='lazy'
        loader={loaderProp}
      />
      <AppFlex direction='column' gap={'5px'}>
        <Typography textcolor='#8490a1' fontSize={12} variant='subtitle2'>
          {title}
        </Typography>
        <Typography variant='subtitle2'>{description}</Typography>
      </AppFlex>
    </AppFlex>
  );
};

export default HortizonalListItem;

/**
 * styled-component
 * _______________________________________________________________________________
 */
