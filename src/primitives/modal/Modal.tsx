'use client';

import React, { ReactNode, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosCloseCircleOutline } from 'react-icons/io';

/**
 * props
 * _______________________________________________________________________________
 */
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  isShowCloseBtn?: boolean;
}

const Modal = ({ children, isOpen, onClose, isShowCloseBtn }: ModalProps) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    // Set overflow to hidden when the component mounts
    document.body.style.overflow = 'hidden';

    // Cleanup function to reset overflow when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <ModalOverlay onClick={onClose}>
      {isShowCloseBtn && (
        <div style={{ position: 'absolute', top: 15, left: 15, zIndex: 1000 }}>
          <IoIosCloseCircleOutline style={{ scale: 1.7 }} />
        </div>
      )}

      <ModalContainer
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation(), onClose();
        }}
      />
      {children}
    </ModalOverlay>
  );
};

export default Modal;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  svg {
    stroke: #fff;

    path {
      stroke: #fff;
    }
  }
`;

const ModalContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
`;
