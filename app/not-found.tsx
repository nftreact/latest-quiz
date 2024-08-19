'use client';

import Image from 'next/image';
import Link from 'next/link';
import NotFoundImage from '../public/images/404.webp';
import styled from 'styled-components';
import { Button } from '@/primitives';
import { THISPROJECT } from '@/constants/projects';
import Cookies from 'universal-cookie';
import Typography from '@/primitives/typography/Typography';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {};

const Custom404Page = ({}: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  const cookies = new Cookies();
  const type = cookies.get('type');

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
    <Container>
      <Image src={NotFoundImage} width={300} height={300} alt='404 image' loading='lazy' loader={loaderProp} />
      <Typography variant='h2' tag='h1'>
        {THISPROJECT.NOT_FOUND_TITLE}
      </Typography>
      <Typography textalign='center' variant='subtitle1' tag='p'>
        {THISPROJECT.NOT_FOUND_DESCRIPTION}
      </Typography>
      <LinkStyled href={`/question/aid=${THISPROJECT.FIRST_AID}&type=${type}`} passHref>
        <Button variant='question'>{THISPROJECT.NOT_FOUND_BUTTON_TEXT}</Button>
      </LinkStyled>
    </Container>
  );
};

export default Custom404Page;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-block: 70px;
  width: 100%;
  padding-inline: 16px;
`;

const LinkStyled = styled(Link)`
  display: flex;
  width: 100%;
  justify-content: center;
  max-width: 600px;

  text-align: center;
`;
