'use client';

import { useParams } from 'next/navigation';
import EnRecevieCode from './EnRecevieCode';
import EnVerification from './EnVerification';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {};

const EnPayment = ({}: Props) => {
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
    if (query === 'recivecode') return <EnRecevieCode />;
    if (query === 'verificationcode') return <EnVerification />;
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return renderElement(query?.slug);
};

export default EnPayment;

/**
 * styled-component
 * _______________________________________________________________________________
 */
