'use client';

import { THISPROJECT } from '@/constants/projects';
import Image from 'next/image';
import { styled } from 'styled-components';
import { FaArrowLeftLong } from 'react-icons/fa6';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {};

const QuestionHeader = ({}: Props) => {
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
    <Container style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid red' }}>
      <FaArrowLeftLong style={{ cursor: 'pointer' }} />
      <Image src={THISPROJECT.LOGO_URL} alt={'header-logo'} width={100} height={30} className='logo' priority />
      <p></p>
    </Container>
  );
};

export default QuestionHeader;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Container = styled.header`
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
