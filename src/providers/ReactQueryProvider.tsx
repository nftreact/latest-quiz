'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  children: ReactNode;
};

const ReactQueryProvider = ({ children }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const queryClient = new QueryClient();

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
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;

/**
 * styled-component
 * _______________________________________________________________________________
 */
