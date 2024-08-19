'use client';

import { AppFlex, Typography } from '@/primitives';
import styled from 'styled-components';
import { string } from 'yup';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  svgIcon: string;
  title: string;
  description: string;
};

const HintBmi = ({ description, svgIcon, title }: Props) => {
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
    <Root gap='5px'>
      <Typography>{svgIcon}</Typography>
      <AppFlex direction='column'>
        <Typography fontSize={16} fontWeight={600}>
          {title}
        </Typography>
        <Typography fontSize={12} fontWeight={300}>
          {description}
        </Typography>
      </AppFlex>
    </Root>
  );
};

export default HintBmi;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled(AppFlex)`
  background-color: #fdf4f5;
  padding: 8px 16px;
  border-radius: 12px;
`;
