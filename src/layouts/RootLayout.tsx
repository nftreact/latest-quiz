'use client';

import { ReactNode } from 'react';
import { Main } from './layout.styled';
import { CustomToast } from '@/shared';
import { AuthProvider } from '@/providers/AuthProvider';

/**
 * props
 * _______________________________________________________________________________
 */

const RootLayout = ({ children }: { children: ReactNode }) => {
  /**
   * template
   * _______________________________________________________________________________
   */

  return (
    <>
      <CustomToast />
      <Main>{children}</Main>
    </>
  );
};

export default RootLayout;

/**
 * styled-component
 * _______________________________________________________________________________
 */
