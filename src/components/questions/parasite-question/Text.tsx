'use client';

import Typography from '@/primitives/typography/Typography';
import { DescriptionElementInputs, TitleElementInputs } from '@/types/questions';
import { stylesSeryalizer } from '@/utils/stylesSeryalizer';
import React, { HTMLAttributes, forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';

type Props = {
  inputs: TitleElementInputs | DescriptionElementInputs;
  component: 'h1' | 'p';
  variant: 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'subtitle1' | 'subtitle2';
  textColor: string;
  fontSize?: number;
  isCenter?: boolean;
  questionType?: string;
} & HTMLAttributes<HTMLHeadingElement>;

const Text = forwardRef((props: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const { component, inputs, variant, textColor, isCenter, fontSize, questionType, ...rest } = props;
  const [opacity, setOpacity] = useState(0);
  const [translate, setTranslate] = useState('40px');

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
      setTranslate('0');
    }, 2);
  }, []);

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <Root
      {...rest}
      iscenter={String(isCenter)}
      opacity={opacity}
      translate={translate}
      dangerouslySetInnerHTML={{ __html: inputs.text }}
      variant={variant}
      textcolor={textColor}
      fontSize={fontSize}
      style={{ ...(stylesSeryalizer(inputs) as any) }}
      questiontype={questionType}
    />
  );
});

export default Text;

Text.displayName = 'text';

const Root = styled(Typography)<{
  opacity: number;
  translate: string;
  questiontype: any;
  iscenter?: boolean | string;
}>`
  opacity: ${(props) => props.opacity};
  transform: translateY(${(props) => props.translate});
  transition: opacity 1s, transform 1s;
  line-height: 27px;
  text-align: ${({ questiontype, iscenter }) => (questiontype == 'Calendar' || iscenter === 'true' ? 'center' : '')};
`;
