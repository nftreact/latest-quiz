'use client';

import Menu from '@/layouts/header/Menu';
import { AppFlex, Typography } from '@/primitives';
import { colors } from '@/theme';
import dynamic from 'next/dynamic';
import { styled } from 'styled-components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useCountDownTimer, useWindowScrollPositions, useWindowSize } from '@/hooks';
import { THISPROJECT } from '@/constants/projects';
import { IoIosNotifications } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';

const Drawer = dynamic(() => import('react-modern-drawer').then((module) => module.default));

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {};

const PreCheckoutHeader = ({}: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname().split('/') as string[];
  const direction = THISPROJECT.DEFAULT_LOCALE;

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    return () => {
      localStorage.removeItem('defaultUnit');
    };
  }, []);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const toggleDrawer = () => {
    setOpenMenu((prevState) => !prevState);
  };

  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Container>
      <GiHamburgerMenu onClick={() => setOpenMenu(!openMenu)} style={{ cursor: 'pointer' }} />
      <Image
        loader={loaderProp}
        src={THISPROJECT.LOGO_URL}
        alt={'header-logo'}
        width={100}
        height={30}
        className='logo'
        priority
      />
      <Drawer
        open={openMenu}
        onClose={toggleDrawer}
        direction={direction === 'fa_IR' ? 'right' : 'left'}
        className='drawer-style'
      >
        <Menu />
      </Drawer>
    </Container>
  );
};

export default PreCheckoutHeader;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Container = styled.div`
  position: fixed;
  width: 100%;
  padding: 8px 16px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  z-index: 99;
  overflow: hidden;

  .logo {
    margin-inline: auto;
  }
`;
