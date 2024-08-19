'use client';

import { THISPROJECT } from '@/constants/projects';
import Image from 'next/image';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useRouter, useSelectedLayoutSegment, usePathname } from 'next/navigation';
import { useCountDownTimer, useWindowScrollPositions, useWindowSize } from '@/hooks';
import { useEffect, useState } from 'react';
import { AppFlex, Typography } from '@/primitives';
import { colors } from '@/theme';
import { IoIosNotifications } from 'react-icons/io';
import dynamic from 'next/dynamic';
import Menu from './Menu';
import QuestionProgressBar from './QuestionProgressBar';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { QUESTION } from '@/types/questions';

const Drawer = dynamic(() => import('react-modern-drawer').then((module) => module.default));

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  question: QUESTION;
};

const Header = ({ question }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname().split('/') as string[];
  const time = '600000';
  const [, { start, render }] = useCountDownTimer(Number(time), 1000, 'minutes');
  const { width } = useWindowSize();
  const isMobileView = width < 900;
  const { scrollY } = useWindowScrollPositions();
  const visible = isMobileView ? scrollY > 100 : !isMobileView && scrollY > 350;
  const direction = THISPROJECT.DEFAULT_LOCALE;
  const { push, back } = useRouter();
  const preAid = localStorage.getItem('aid');

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */
  const goBackwards = () => {
    push(`/question/aid=${preAid}&type=${question?.type}`);
  };

  const getContentBasedOnLayoutSegmen = (pathname: string | null) => {
    if (
      pathname &&
      pathname === 'question' &&
      Number(question?.currentQuestion) > 1 &&
      THISPROJECT.DEFAULT_LOCALE === 'fa_IR'
    ) {
      return (
        <div style={{ cursor: 'pointer' }}>
          <FaArrowRightLong onClick={back} />
        </div>
      );
    }

    if (
      pathname &&
      pathname === 'question' &&
      Number(question?.currentQuestion) > 1 &&
      THISPROJECT.DEFAULT_LOCALE === 'en_US'
    ) {
      return (
        <div
          onClick={back}
          style={{ cursor: 'pointer', width: '50px', height: '30px', display: 'flex', alignItems: 'center' }}
        >
          <FaArrowLeftLong />
        </div>
      );
    }
    if (pathname && pathname !== 'question') {
      return <GiHamburgerMenu onClick={() => setOpenMenu(!openMenu)} style={{ cursor: 'pointer' }} />;
    }
  };

  const handleButtonClick = () => {
    const plansSection = document.getElementById('plans');
    if (plansSection) {
      plansSection.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const toggleDrawer = () => {
    setOpenMenu((prevState) => !prevState);
  };

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    if (pathname[1] === 'checkout') {
      start();
    }
  }, []);

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Container>
      {getContentBasedOnLayoutSegmen(pathname[1])}
      <Image src={THISPROJECT.LOGO_URL} alt={'header-logo'} width={100} height={30} className='logo' priority />
      <Drawer
        open={openMenu}
        onClose={toggleDrawer}
        direction={direction === 'fa_IR' ? 'right' : 'left'}
        className='drawer-style'
      >
        <Menu />
      </Drawer>
      {pathname[1] === 'checkout' && (
        <ScrollBlock
          onClick={handleButtonClick}
          align='center'
          gap={'5px'}
          className='timerButton'
          visible={visible}
          ismobileview={String(isMobileView)}
          justify='flex-end'
        >
          <Typography variant='body2' tag='p' textcolor='#fff'>
            {render(time)}
          </Typography>
          <IoIosNotifications />
        </ScrollBlock>
      )}
      {Number(question?.currentQuestion) && question?.questionType !== 'parasite' && (
        <QuestionProgressBar allQuestions={question?.allQuestions} currentQuestion={question?.currentQuestion} />
      )}
    </Container>
  );
};

export default Header;

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
  z-index: 95;

  .logo {
    margin-inline: auto;
  }
`;

const ScrollBlock = styled(AppFlex)<{ visible: boolean; ismobileview: boolean | string }>`
  display: none;
  opacity: 0;
  transition: all 5s cubic-bezier(0.4, 0, 1, 1);
  background-color: ${colors.secondary};
  padding: 6px;
  border-radius: 8px;
  opacity: ${({ visible }) => visible && 1};
  display: ${({ visible }) => visible && 'flex'};
  padding-inline: 20px;
  cursor: pointer;

  p {
    color: #ffff00;

    @media (min-width: 900px) {
      color: #fff;
    }
  }

  svg {
    scale: 1;
    fill: #ffff00;

    @media (min-width: 900px) {
      fill: #fff;
    }
  }
`;
