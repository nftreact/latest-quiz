'use client';

import { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle<{ locale: 'en_US' | 'fa_IR' }>`
  ${({ locale }) =>
    locale === 'fa_IR'
      ? css`
          input {
            font-family: inherit;
          }
        `
      : css`
          input {
            font-family: auto;
          }

          span,
          text,
          p {
            font-family: system-ui;
          }
        `};
`;

export default GlobalStyle;
