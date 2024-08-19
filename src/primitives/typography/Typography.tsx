'use client';

import React, { forwardRef, HTMLAttributes, Ref } from 'react';
import styled from 'styled-components';

// Define props for Typography component
interface TypographyProps extends HTMLAttributes<HTMLHeadingElement> {
  $variant?: keyof typeof typographyVariant;
  $textcolor?: string;
  fontWeight?: number | string;
  fontSize?: number;
  lineHeight?: number | string;
  $textalign?: 'left' | 'right' | 'center' | 'justify';
  letterSpacing?: string;
  $tag?: keyof JSX.IntrinsicElements;
}

interface StyledTypographyProps extends HTMLAttributes<HTMLHeadingElement> {
  variant?: keyof typeof typographyVariant;
  textcolor?: string;
  fontWeight?: number | string;
  fontSize?: number;
  lineHeight?: number | string;
  textalign?: 'left' | 'right' | 'center' | 'justify';
  letterSpacing?: string;
  tag?: keyof JSX.IntrinsicElements;
}

// Typography variants
const typographyVariant = {
  h1: {
    fontWeight: 700,
    fontSize: 32,
    lineHeight: '1.5',
    margin: '10px 0',
  },
  h2: {
    fontWeight: 700,
    fontSize: 24,
    lineHeight: '1.5',
    margin: '10px 0',
  },
  h3: {
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '1.5',
    margin: '10px 0',
  },
  h4: {
    fontWeight: 600,
    fontSize: 20,
    lineHeight: '1.5',
    margin: '10px 0',
  },
  h5: {
    fontWeight: 500,
    fontSize: 18,
    lineHeight: '1.5',
    margin: '10px 0',
  },
  h6: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '1.5',
    margin: '10px 0',
  },
  body1: {
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 1.6,
    margin: '10px 0',
  },
  body2: {
    fontWeight: 300,
    fontSize: 18,
    lineHeight: 1.6,
    margin: '10px 0',
  },
  subtitle1: {
    fontWeight: 300,
    fontSize: 16,
    lineHeight: 1.6,
    margin: '10px 0',
  },
  subtitle2: {
    fontWeight: 300,
    fontSize: 14,
    lineHeight: 1.6,
    margin: '10px 0',
  },
};

// Styled component for Typography
const StyledTypography = styled.span<TypographyProps>`
  font-weight: ${(props) => props.fontWeight ?? typographyVariant[props.$variant || 'body1'].fontWeight};
  font-size: ${(props) => props.fontSize ?? typographyVariant[props.$variant || 'body1'].fontSize}px;
  line-height: ${(props) => props.lineHeight ?? typographyVariant[props.$variant || 'body1'].lineHeight};
  color: ${(props) => props.$textcolor};
  text-align: ${(props) => props.$textalign};
  letter-spacing: ${(props) => props.letterSpacing};
`;

// Forwarding ref to Typography component
const Typography = forwardRef((props: StyledTypographyProps, ref: Ref<HTMLHeadingElement>): JSX.Element => {
  const { children, variant, textcolor, textalign, tag, ...rest } = props;
  return (
    <StyledTypography ref={ref} $variant={variant} $tag={tag} $textcolor={textcolor} $textalign={textalign} {...rest}>
      {children}
    </StyledTypography>
  );
});

export default Typography;

Typography.displayName = 'Typography';
