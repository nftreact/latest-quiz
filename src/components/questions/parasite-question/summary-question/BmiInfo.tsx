'use client';

import Slider from 'rc-slider';
import styled from 'styled-components';
import 'rc-slider/assets/index.css';
import { AppFlex, Typography } from '@/primitives';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  value: number;
  list: string[];
  min: number;
  max: number;
};

const BmiInfo = ({ value, list, max, min }: Props) => {
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
    <Root direction='column' gap='5px'>
      <Slider min={0} max={100} value={value} />
      <AppFlex justify='space-between' direction='row-reverse'>
        {list.map((item) => {
          return (
            <Typography fontWeight={500} fontSize={12} variant='subtitle2' key={item}>
              {item}
            </Typography>
          );
        })}
      </AppFlex>
    </Root>
  );
};

export default BmiInfo;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(AppFlex)`
  margin-top: 15px;

  .rc-slider-track {
    margin-top: -10px;
    height: 10px;
    background-color: inherit !important;
  }

  & .rc-slider-rail {
    border-radius: 8px;
    margin-top: -3px;
    height: 10px;
    background-color: red;
    background: linear-gradient(-80deg, #ed3f19, #f6ca44 40.77%, #eed148 60.15%, #95cf53);
    opacity: 1;
    transition: opacity 1s ease-in-out !important;
  }

  & .rc-slider-handle {
    border-radius: 50%;
    background-color: #f1d148;
    border: 1px solid #f1d148;
    z-index: 10;
    width: 20px;
    height: 20px;
    opacity: 1 !important;
    margin-top: -10px;
    box-shadow: 0 2px 6px rgb(36 36 36 / 45%), 0 12px 24px rgb(36 36 36 / 20%);
    transition: all 2s ease-in !important;
  }
`;
