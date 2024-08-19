'use client';

import { resetAllCookies } from '@/utils/insdex';
import styled from 'styled-components';
import Image from 'next/image';
import { Button, Typography } from '@/primitives';
import Link from 'next/link';
import Error from '../../public/images/error.jpg';
import { menuItems } from '@/constants/projects';

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
  const support = menuItems[1].path;

  /**
   * useEffect
   * _______________________________________________________________________________
   */

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
          متاسفانه مشکلی پیش آمده لطفا دوباره امتحان نمایید
        </Typography>
        <ContentWrapper>
          <Button style={{ minWidth: '155px' }} variant='question'>
            <Link href={support}>
              <Typography textcolor='#fff' variant='body1'>
                پشتیانی
              </Typography>
            </Link>
          </Button>
          <Button style={{ minWidth: '155px' }} variant='question'>
            <Link href={`https://matchadiet.com`}>
              <Typography textcolor='#fff' variant='body1'>
                صفحه اصلی
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
