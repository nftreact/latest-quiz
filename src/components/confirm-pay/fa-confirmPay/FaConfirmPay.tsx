'use client';

import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

const Verification = dynamic(() => import('./Verification'), {
  ssr: false,
});

const ReceiveCode = dynamic(() => import('./ReceiveCode'), {
  ssr: false,
});

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {};

const FaPyment = ({}: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const query = useParams();

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const renderElement = (query: string | string[]) => {
    if (query === 'recivecode' || query === 'reciveCode') return <ReceiveCode />;
    if (query === 'verificationcode') return <Verification />;
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return renderElement(query?.slug);
};

export default FaPyment;

/**
 * styled-component
 * _______________________________________________________________________________
 */
