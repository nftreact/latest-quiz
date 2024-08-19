'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'universal-cookie';

const getStatus = (discount: boolean | undefined, offer: boolean | undefined) => {
  if (discount === true && !offer) {
    return 'dicounted';
  }

  if (discount === false && !offer) {
    return 'regular';
  }

  if (discount === false && offer === false) {
    return 'regular';
  }

  if (discount === true && offer === true) {
    return 'offer';
  }
};

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  children: ReactNode;
  discount: string | undefined;
  offer: string | undefined;
};

const CheckoutProvider = ({ children }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const cookie = new Cookies();
  const discount = cookie.get('discount');
  const offer = cookie.get('offer');
  const status = getStatus(discount, offer);
  const { replace } = useRouter();
  const pathName = usePathname();

  /**
   * useEffect
   * _______________________________________________________________________________
   */
  // useEffect(() => {
  //   if (status === 'offer') {
  //     return replace(`/checkout/?discount=dHJ1ZQ==&offer=dHJ1ZQ==`);
  //   }
  //   if (status === 'dicounted') {
  //     return replace(`/checkout/?discount=dHJ1ZQ==`);
  //   }

  //   if (status === 'regular') {
  //     return replace(`/checkout/?discount=ZmFsc2U%3D&offer=ZmFsc2U%3D`);
  //   }
  // }, []);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  /**
   * template
   * _______________________________________________________________________________
   */
  return <>{children}</>;
};

export default CheckoutProvider;

/**
 * styled-component
 * _______________________________________________________________________________
 */
