'use client';

import { AppFlex, Typography } from '@/primitives';
import Image from 'next/image';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  image: string;
  items: {
    icon: string;
    label: string;
    value: string;
  }[];
};

const UserInfo = ({ image, items }: Props) => {
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
    <AppFlex style={{ paddingInline: '20px' }} justify='space-between' align='center'>
      <AppFlex direction='column' gap='10px'>
        {items.map((item, inedex) => {
          return (
            <AppFlex key={inedex} gap='10px' align='center'>
              <Image src={item.icon} alt='' width={24} height={24} />
              <AppFlex direction='column'>
                <Typography fontSize={12} color='#767A86' fontWeight={300}>
                  {item.label}
                </Typography>
                <Typography color='#252D48' fontSize={16} fontWeight={600}>
                  {item.value}
                </Typography>
              </AppFlex>
            </AppFlex>
          );
        })}
      </AppFlex>
      <div style={{ minHeight: '180px', width: '130px', position: 'relative' }}>
        <Image alt='userInfo-image' fill src={image} style={{ objectFit: 'scale-down' }} />
      </div>
    </AppFlex>
  );
};

export default UserInfo;

/**
 * styled-component
 * _______________________________________________________________________________
 */
