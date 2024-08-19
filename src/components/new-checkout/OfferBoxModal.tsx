'use client';

import { AppFlex, Typography } from '@/primitives';
import Image from 'next/image';
import styled from 'styled-components';
import { BackModal } from './plan/Plans';
import Modal from 'react-minimal-modal';
import { IoIosClose } from 'react-icons/io';
import Cookies from 'universal-cookie';
import { useEffect } from 'react';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  onCloseModal: any;
  open: boolean;
  data: BackModal;
  onClickButton: (value: boolean) => void;
};

const OfferBoxModal = ({ data, onClickButton, open, onCloseModal }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const cookie = new Cookies();
  const { buttonText, chartUrl, descriptionDown, descriptionUp, title, underChart } = data;

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    return () => {
      cookie.remove('isShowboxOffer');
    };
  }, []);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <ModalStyle open={open}>
      <CloseWrapper
        onClick={() => {
          onCloseModal();
        }}
      >
        <IoIosClose />
      </CloseWrapper>
      <Root direction='column' gap='10px' style={{ maxWidth: '500px' }}>
        <Typography textalign='center' fontSize={32} fontWeight={700}>
          {title}
        </Typography>
        <Typography fontSize={14} dangerouslySetInnerHTML={{ __html: descriptionUp }} />
        <AppFlex
          gap='10px'
          direction='column'
          style={{ position: 'relative', minHeight: '200px', minWidth: '300px', width: '100%' }}
        >
          <Image fill src={chartUrl} alt='' />
        </AppFlex>
        <Typography fontSize={12} style={{ color: '#767A86' }}>
          {underChart}
        </Typography>
        <Typography fontSize={16} dangerouslySetInnerHTML={{ __html: descriptionDown }} />
        <ButtonStyle onClick={() => onClickButton(false)} style={{ fontWeight: 700 }}>
          {buttonText}
        </ButtonStyle>
      </Root>
    </ModalStyle>
  );
};

export default OfferBoxModal;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(AppFlex)`
  padding: 20px;
  background-color: #fff;
  overflow: hidden !important;
`;

const ButtonStyle = styled.button`
  appearance: none;
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 16px;
  background-color: #3ad7ab;
  box-shadow: 0 0 #3ad7ab;
  color: #fff;
  margin-inline-start: auto;
  width: 100%;
  cursor: pointer;
`;

const CloseWrapper = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #eaeaea;
  position: absolute;
  top: 10px;
  left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    scale: 1.6;
  }
`;

const ModalStyle = styled(Modal)`
  && .modal__header {
    display: none !important;
  }

  &.modal__popup {
    margin-inline: 10px;

    @media (min-width: 500px) {
      max-width: max-content !important;
    }
  }

  & .modal__body {
    min-height: 200px;
  }
`;
