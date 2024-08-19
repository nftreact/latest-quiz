'use client';

import { Answer } from '@/types/questions';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import { Typography } from '@/primitives';
import React from 'react';
import { FaCheck } from 'react-icons/fa6';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  answer: Answer;
  selectedItem: string;
  currentIndex: string;
  questionType: string;
  multiSelectedItems: string[];
};

type rootType = Props & React.HTMLAttributes<HTMLDivElement>;

const SelectItem = React.forwardRef(
  ({ answer, currentIndex, selectedItem, questionType, multiSelectedItems, ...rest }: rootType) => {
    /**
     * const and variables
     * _______________________________________________________________________________
     */
    const isSelected =
      questionType == 'singleSelect' ? selectedItem === currentIndex : multiSelectedItems.includes(currentIndex);

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
      <Root isselectedroot={String(isSelected)} isDesc={Boolean(answer.description)} {...rest}>
        {answer?.image && (
          <ImageWrapper>
            <Image alt='select-image' src={answer.image} loading='lazy' fill style={{ objectFit: 'contain' }} />
          </ImageWrapper>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Typography tag='p' variant='subtitle1'>
            {answer.text}
          </Typography>
          <Typography tag='p' variant='subtitle2'>
            {answer.description}
          </Typography>
        </div>
        {questionType !== 'singleSelect' && (
          <SvgWrapper>
            <TickWrapper isselected={String(isSelected)}>{isSelected && <FaCheck />}</TickWrapper>
          </SvgWrapper>
        )}
      </Root>
    );
  },
);

export default SelectItem;

SelectItem.displayName = 'SelectItem';

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.div<{
  isselectedroot: string;
  isDesc: boolean;
}>`
  border-radius: 15px;
  cursor: pointer;
  min-height: 75px;
  display: flex;
  align-items: center;
  padding-inline: 16px;
  gap: 5px;

  &:hover {
    @media (min-width: 700px) {
      background-color: #fff7de;
    }
  }

  ${({ isDesc }) =>
    isDesc
      ? css`
          padding-block: 10px;
        `
      : css`
          padding-block: 0;
        `};

  ${({ isselectedroot }) =>
    isselectedroot === 'true'
      ? css`
          box-shadow: 0 12px 24px rgb(43 49 57 / 8%), 0 4px 8px rgb(43 55 70 / 6%);
          border: 1px solid #edb600;
          background-color: #fff7de;
        `
      : css`
          background-color: #f5f5f5;
        `};
`;

const ImageWrapper = styled.div`
  position: relative;
  min-width: 80px;
  min-height: 70px;
`;

const TickWrapper = styled.div<{ isselected: boolean | string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: ${({ isselected }) => (isselected === 'true' ? '2px solid #edb600' : '2px solid #C2C2C2')};
`;

const Wrapper = styled.section`
  position: relative;
  min-height: 90px;
  min-width: 80px;
`;

const SvgWrapper = styled.div`
  margin-inline-start: auto;
  position: relative;

  svg {
    fill: #edb600;
    position: absolute;
    scale: 0.9;
  }
`;
