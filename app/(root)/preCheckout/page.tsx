import React from 'react';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import PreCheckoutMain from '@/components/pre-checkout/PreCheckoutMain';
import FastfitPreCheckout from '@/components/pre-checkout/FastfitPreCheckout';

async function POST(request: NextRequest) {
  const response = NextResponse.json({ status: 200 });
  // Then set a cookie
  response.cookies.set({
    name: 'jwt',
    value: 'token',
    httpOnly: true,
    maxAge: 60 * 60,
  });

  return response;
}

const preCheckoutPage = async ({
  searchParams,
}: {
  searchParams: {
    discount: string;
    offer: string;
    show: string;
    token: string;
    type: string;
    code: string;
    project: string;
  };
}) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const cookieStore = cookies();
  const Authorization: any =
    searchParams.project === 'chatfit' ? searchParams.token : cookieStore.get('Authorization')?.value;
  const code = searchParams.project === 'chatfit' ? searchParams.code : cookieStore.get('code')?.value;
  const type = searchParams.project === 'chatfit' ? searchParams.type : cookieStore.get('type')?.value;
  const project = searchParams.project;

  // services

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <>
      {type === 'fastfit' ? (
        <FastfitPreCheckout
          discount={searchParams.discount}
          offer={searchParams.offer}
          show={searchParams.show}
          Authorization={Authorization}
          code={code}
          type={type}
          project={project}
        />
      ) : (
        <PreCheckoutMain Authorization={Authorization} code={code} type={type} project={searchParams.project} />
      )}
    </>
  );
};

export default preCheckoutPage;
