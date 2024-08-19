'use client';

import React, { forwardRef, HTMLAttributes, Ref } from 'react';
import styled from 'styled-components';

// Define props for Flex component
interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column' | 'row-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
  gap?: string;
}

// Extract known props and rest props
type StyledFlexProps = Omit<FlexProps, 'direction' | 'justify' | 'align' | 'gap'> & {
  $direction?: 'row' | 'column' | 'row-reverse';
  $justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  $align?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
  $gap?: string;
};

// Styled component for Flex
const StyledFlex = styled.div<StyledFlexProps>`
  display: flex;
  flex-direction: ${(props) => props.$direction || 'row'};
  justify-content: ${(props) => props.$justify || 'flex-start'};
  align-items: ${(props) => props.$align || 'stretch'};
  gap: ${(props) => props.$gap || '0px'};
`;

// Forwarding ref to Flex component
const AppFlex = forwardRef(
  ({ children, direction, justify, align, gap, ...rest }: FlexProps, ref: Ref<HTMLDivElement>): JSX.Element => {
    return (
      <StyledFlex
        ref={ref}
        $direction={direction}
        $justify={justify}
        $align={align}
        $gap={gap}
        {...rest} // Pass down any other props to the underlying div
      >
        {children}
      </StyledFlex>
    );
  },
);

export default AppFlex;

AppFlex.displayName = 'AppFlex';
