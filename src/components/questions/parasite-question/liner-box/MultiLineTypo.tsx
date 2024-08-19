'use client';

import { AppFlex, Typography } from '@/primitives';
import { memo } from 'react';
import styled from 'styled-components';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  color: string;
  text: string;
  animationStyle: string;
};

const MultiLineTypo = ({ color, text, animationStyle }: Props) => {
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
    <Root style={{ paddingInline: '20px' }} className={animationStyle}>
      <Typography textcolor={color} tag='p' className={animationStyle}>
        {text}
      </Typography>
    </Root>
  );
};

export default memo(MultiLineTypo);

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(AppFlex)`
  span {
    opacity: 0;
  }
`;
