'use client';

import { THISPROJECT } from '@/constants/projects';
import { colors } from '@/theme';
import { ButtonHTMLAttributes, ReactNode, forwardRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import AppFlex from '../flex/AppFlex';

/**
 * props and typoes
 * _______________________________________________________________________________
 */
type buttonProps = {
  children: ReactNode;
  variant: 'question' | 'checkout';
  position?: 'fixed' | 'static';
  ref: any;
};

type ButtonTypes = buttonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef(({ position = 'static', variant, children, ...rest }: ButtonTypes, ref) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Constainer position={position}>
      <ButtonStyle variant={variant} position={position} {...rest}>
        {children}
      </ButtonStyle>
    </Constainer>
  );
});

export default Button;

Button.displayName = 'Button';

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Constainer = styled(AppFlex)<{ position: 'fixed' | 'static' }>`
  width: 100%;
  ${({ position }) =>
    position === 'fixed' &&
    css`
      /* padding-bottom: 5px; */
    `};

  @media (min-width: 600px) {
    /* padding-bottom: 5px; */
  }
`;

const ButtonStyle = styled.button<{ variant: 'question' | 'checkout'; position: 'fixed' | 'static' }>`
  border-style: none;
  appearance: none;
  font-size: 20px;
  font-weight: 600;
  padding: 9px 0;
  transition: color 0.3s, background-color 0.3s, box-shadow 0.3s;
  color: ${THISPROJECT.BUTTON_TEXT_COLOR};
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  z-index: 90;
  min-height: 50px;

  ${({ position }) =>
    position === 'fixed' &&
    css`
      position: fixed;
      bottom: 0;
      width: 95%;
      left: 50%;
      transform: translate(-50%, -50%);
    `};

  ${({ variant }) =>
    variant === 'question'
      ? css`
          background-color: ${colors.secondary};
          box-shadow: 0px 1px 1px 1px #e54c6a;

          &:hover {
            background-color: #e54c6a;
          }

          &:focus {
            outline: 1px solid ${colors.secondary};
          }
        `
      : css`
          background-color: ${colors.primary};
          box-shadow: 0px 1px 1px 1px #44b485;

          &:hover {
            background-color: #44b485;
          }

          &:focus {
            outline: 1px solid ${colors.primary};
          }
        `};

  &:disabled {
    background-color: #f5f5f5;
    box-shadow: none;
    color: #606060;
    cursor: not-allowed;
  }

  @media (min-width: 600px) {
    position: ${({ position }) => (position === 'fixed' ? 'fixed' : 'static')};
    width: 100%;
    max-width: 570px;
    margin-inline: auto;
  }
`;
