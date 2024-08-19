import React from 'react';
import { getPreCheckout } from '../../src/components/pre-checkout/preCheckout.services';
import { cookies } from 'next/headers';
import {
  PercentageBox,
  PreCheckoutBanner,
  PreCheckoutButton,
  PreCheckoutHeader,
  ResultBox,
} from '@/components/pre-checkout';
import { PreCheckoutResult } from '@/types/pre-checkout';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

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

const preCheckoutPage = async () => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization')?.value;
  const code = cookieStore.get('code')?.value;
  const { summery, highlight, button, header } = (await getPreCheckout({ Authorization, code })) as PreCheckoutResult;

  if (summery?.items?.length < 1 || summery === undefined) {
    redirect('/error');
  }

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <>
      <PreCheckoutHeader />
      <section style={{ paddingTop: '45px' }}>
        <PreCheckoutBanner bgColor={header?.bgColor} text={header?.text} image={header?.image} />
        <section
          style={{
            gap: '10px',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '600px',
            margin: 'auto',
            paddingInline: '16px',
          }}
        >
          <ResultBox
            title={summery?.title}
            scaleList={summery?.lineBar?.scaleList}
            thisValue={Number(summery?.lineBar?.value)}
            warningTitle={summery?.lineBar?.warningTitle}
            warningDescription={summery?.lineBar?.warningDescription}
            isSummary={true}
            items={summery?.items}
            borderImage={summery?.borderImage}
            showBox={true}
            showContent={true}
            lineBarLabel={summery?.lineBar.label}
            video={summery?.video}
          />

          <ResultBox
            title={highlight?.title}
            scaleList={highlight?.lineBar.scaleList}
            thisValue={Number(highlight?.lineBar.value)}
            items={highlight?.items}
            borderImage={highlight?.borderImage}
            showBox={true}
            showContent={true}
            lineBarLabel={highlight?.lineBar.label}
          />
          <PercentageBox
            thisValue={Number(highlight?.percentage?.value)}
            description={highlight?.percentage?.description}
            showBox={true}
            afterText={highlight?.percentage?.afterText}
          />
        </section>
        <PreCheckoutButton inputs={button} />
      </section>
    </>
  );
};

export default preCheckoutPage;
