import { getNewCheckout } from '@/components/checkout/checkout.services';
import { getPreCheckout } from '@/components/pre-checkout/preCheckout.services';
import { PreCheckoutResult } from '@/types/pre-checkout';
import { redirect } from 'next/navigation';

type getPrecheckoutMainType = {
  Authorization?: string;
  code?: string;
  userIpAddress?: string;
  type?: string;
};

export const getPrecheckoutMain = async ({
  Authorization,
  code,
  type,
  userIpAddress,
}: getPrecheckoutMainType): Promise<PreCheckoutResult | any> => {
  if (type !== 'fastfit') {
    const data = (await getPreCheckout({
      Authorization,
      code,
      userIpAddress,
    })) as PreCheckoutResult;

    if (data.summery?.items?.length < 1 || data.summery === undefined) {
      redirect(`/error`);
    }
    return data;
  }
};

type getFastfitPreCheckoutType = {
  Authorization?: string;
  code?: string;
  userIpAddress?: string;
  type?: string;
};

export const getFastfitPreCheckout = async ({
  Authorization,
  code,
  type,
  userIpAddress,
}: getFastfitPreCheckoutType) => {
  if (type == 'fastfit') {
    const fastfitCheckout = await getNewCheckout({ code: code, token: Authorization });

    return fastfitCheckout;
  } else return;
};
