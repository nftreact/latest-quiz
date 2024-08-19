'use client';

import { THISPROJECT } from '@/constants/projects';
import styled, { css } from 'styled-components';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  units: string[];
  onUnitSelect: (value: string) => void;
  unitSelected: string;
};

const TabInput = ({ units, onUnitSelect, unitSelected }: Props) => {
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
    <Root>
      <BgWithTransition locale={THISPROJECT.DEFAULT_LOCALE} isselected={String(units[0] !== unitSelected)} />
      {units.map((item, index) => {
        return (
          <TabItem onClick={() => onUnitSelect(item)} key={index}>
            <p>{item}</p>
          </TabItem>
        );
      })}
    </Root>
  );
};

export default TabInput;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.div`
  display: flex;
  max-width: 250px;
  width: 100%;
  background-color: #e8e8e8;
  height: 45px;
  border-radius: 8px;
  margin: auto;
  gap: 10px;
  padding: 6px;
  position: relative;
`;

const TabItem = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  p {
    font-weight: 800;
  }
`;

const BgWithTransition = styled.div<{ isselected: boolean | string; locale: string }>`
  position: absolute;
  width: 50%;
  height: 75%;
  background-color: #fff;
  border-radius: 6px;
  transition: transform 0.5s ease;

  ${({ locale, isselected }) =>
    locale == 'en_US' && isselected === 'true'
      ? css`
          transform: translateX(90%);
        `
      : locale == 'en_US' &&
        isselected === 'false' &&
        css`
          transform: translateX(0%);
        `};

  ${({ locale, isselected }) =>
    locale == 'fa_IR' && isselected === 'true'
      ? css`
          transform: translateX(-92%);
        `
      : locale == 'fa_IR' &&
        isselected === 'false' &&
        css`
          transform: translateX(0%);
        `};
`;
