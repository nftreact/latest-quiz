'use client';

import { resetAllCookies } from '@/utils/insdex';
import styled from 'styled-components';
import Image from 'next/image';
import { Button, Typography } from '@/primitives';
import Link from 'next/link';
import Error from '../../../public/images/error.jpg';
import { THISPROJECT, thisLanguage } from '@/constants/projects';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {};

const Custom500page = ({}: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  const coockies = new Cookies();

  const language = thisLanguage;

  const fa_Data = {
    support: {
      supportBtn: 'پشتیانی',
      link: 'https://matchadiet.com/contact-us',
    },
    homeBtn: {
      homeBtn: 'صفحه اصلی',
      link: THISPROJECT.LANDING,
    },
    hintText: 'متاسفانه مشکلی پیش آمده لطفا دوباره امتحان نمایید',
    title: ' Internal Server Error (500)',
  };

  const en_data = {
    support: {
      supportBtn: 'Support',
      link: 'https://api.whatsapp.com/message/WYNW6GK4O5PLJ1?autoload=1&app_absent=0',
    },
    homeBtn: {
      homeBtn: 'Back to Home',
      link: THISPROJECT.LANDING,
    },
    hintText: 'Unfortunately, something went wrong. Please try again.',
    title: ' Internal Server Error (500)',
  };

  const it_data = {
    support: {
      supportBtn: 'Supporto',
      link: 'https://api.whatsapp.com/message/WYNW6GK4O5PLJ1?autoload=1&app_absent=0',
    },
    homeBtn: {
      homeBtn: 'Indietro alla Home',
      link: THISPROJECT.LANDING,
    },
    hintText: 'Mi dispiace, si è verificato un problema. Riprova.',
    title: ' Internal Server Error (500)',
  };

  const data = language === 'ir' ? fa_Data : language === 'en' ? en_data : it_data;
  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    coockies.set('noRedirect', 'false', {
      path: '/',
    });
  }, []);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */
  resetAllCookies();
  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root>
      <Container>
        <ImageWrapper>
          <Image objectFit='cover' src={Error} alt='erro-page-image' fill loader={loaderProp} />
        </ImageWrapper>
        <Typography variant='h1' tag='h1' textalign='center'>
          Internal Server Error (500)
        </Typography>
        <Typography textalign='center' variant='body1' tag='p'>
          {data.hintText}
        </Typography>
        <ContentWrapper>
          <Button style={{ minWidth: '170px' }} variant='question'>
            <Link href={'https://api.whatsapp.com/message/WYNW6GK4O5PLJ1?autoload=1&app_absent=0'}>
              <Typography textcolor='#fff' variant='body1'>
                {data.support.supportBtn}
              </Typography>
            </Link>
          </Button>
          <Button style={{ minWidth: '170px' }} variant='question'>
            <Link href={THISPROJECT.LANDING}>
              <Typography textcolor='#fff' variant='body1'>
                {data.homeBtn.homeBtn}
              </Typography>
            </Link>
          </Button>
        </ContentWrapper>
      </Container>
    </Root>
  );
};

export default Custom500page;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section`
  display: flex;
  justify-content: center;
  padding-block: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  max-width: 600px;
  padding: 24px;
`;

const ImageWrapper = styled.div`
  position: relative;
  min-height: 400px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
