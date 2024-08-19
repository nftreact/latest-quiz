import React from 'react';
import { cookies } from 'next/headers';
import { getPrecheckoutMain } from '@/utils/getCheckout';
import { DecodeBase64 } from '@/utils/insdex';
import { getPreCheckout } from './preCheckout.services';
import { PreCheckoutResult } from '@/types/pre-checkout';
import { redirect } from 'next/navigation';
import PreCheckoutHeader from './PreCheckoutHeader';
import PreCheckoutBanner from './PreCheckoutBanner';
import ResultBox from './result-box/ResultBox';
import PercentageBox from './PercentageBox';
import PreCheckoutButton from './PreCheckoutButton';

type Props = {
  Authorization?: string;
  code?: string;
  type?: string;
  project?: string;
};

const PreCheckoutMain = async ({ Authorization, code, type, project }: Props) => {
  const cookieStore = cookies();
  const AuthorizationStore = project === 'chatfit' ? Authorization : cookieStore.get('Authorization')?.value;
  const codeStore = project === 'chatfit' ? code : cookieStore.get('code')?.value;
  const userIpAddress = cookieStore.get('user-ip-address')?.value;

  const { header, summery, highlight, button } = (await getPreCheckout({
    Authorization,
    code,
    userIpAddress,
  })) as PreCheckoutResult;

  if (summery?.items?.length < 1 || summery === undefined) {
    redirect(`/error`);
  }

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

export default PreCheckoutMain;
