'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { AppFlex, Typography } from '@/primitives';
import { THISPROJECT } from '@/constants/projects';

/**
 * props
 * _______________________________________________________________________________
 */

const Menu = () => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const menu = THISPROJECT.MENU_ITEMS as any;

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
    <AppFlex align='center' direction='column' style={{ paddingBlock: '16px' }}>
      <Link href='/'>
        <Image
          src={THISPROJECT.LOGO_URL as string}
          alt='logo'
          width={100}
          height={30}
          style={{ margin: '15px' }}
          loading='lazy'
        />
      </Link>
      <Divider />
      <AppFlex direction='column' align='center' gap={'10px'} style={{ marginTop: '20px' }}>
        {menu[0]?.map((item: any, iindex: number) => (
          <Link href={item.path} target='_blank' key={iindex}>
            <Typography variant='body2'>{item.name}</Typography>
          </Link>
        ))}
      </AppFlex>
    </AppFlex>
  );
};

export default Menu;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Divider = styled.div`
  width: 90%;
  background-color: #000;
  opacity: 20%;
  padding-top: 1px;
`;
