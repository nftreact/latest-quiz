'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { AppFlex, Typography } from '@/primitives';
import { THISPROJECT, menuItems } from '@/constants/projects';

/**
 * props
 * _______________________________________________________________________________
 */

const Menu = () => {
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
      <AppFlex direction='column' align='center' gap={"10px"} style={{ marginTop: '20px' }}>
        {menuItems?.map(({ name, path }) => (
          <Link href={path} target='_blank' key={name}>
            <Typography variant='body2'>{name}</Typography>
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
