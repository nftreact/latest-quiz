'use client';

import styled, { css } from 'styled-components';
import SideTriangle from '../../../../public/icon/SideTriangle';
import { THISPROJECT } from '@/constants/projects';

const BackgroundTriangles = () => {
  const numbers = [1, 2, 3, 4];

  return (
    <Root locale={THISPROJECT.DEFAULT_LOCALE} style={{}}>
      {numbers.map((item) => {
        return <SideTriangle key={item} thisClassName={`backgroundTriangle${item}`} />;
      })}
    </Root>
  );
};

export default BackgroundTriangles;

const Root = styled.section<{ locale: string }>`
  position: absolute;
  top: -45px;

  height: 100%;

  ${({ locale }) =>
    locale === 'fa_IR'
      ? css`
          right: 10px;
        `
      : css`
          left: 10px;
        `};
`;
