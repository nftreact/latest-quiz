import { THISPROJECT, thisLanguage, thisLocale } from '@/constants/projects';
import { CheckoutResult } from '@/types/checkout';
import { ApiManager } from '@/utils/axios.config';

type Checkout = {
  data: CheckoutResult;
  message: string;
  result: CheckoutResult;
  success: string;
};

type getCheckoutProps = {
  Authorization: string | undefined;
  code: string | undefined;
  userIpAddress?: string;
};

export const getCheckout = async ({ Authorization, code, userIpAddress }: getCheckoutProps) => {
  try {
    const res = await ApiManager.get<Checkout>('/main/checkout.php', {
      params: {
        Authorization: Authorization,
        code: code,
        language: thisLanguage,
        userIpAddress,
      },
    });
    if (res['data']['success'] === 'false') return { error: res['data']['message'] };

    const response = res.data.data;

    return response;
  } catch (error) {
    error: THISPROJECT.GLOBAL_ERROR;
  }
};

type confirmFetcherProps = {
  plan: any;
  code: string;
  Authorization: string;
  discount: string;
  currency?: string;
  userIpAddress?: string;
};

export const confirmFetcher = async ({
  code,
  plan,
  Authorization,
  discount,
  currency,
  userIpAddress,
}: confirmFetcherProps) => {
  try {
    const res = await ApiManager.get('/login/request.php', {
      params: {
        code: code,
        plan: plan,
        Authorization: Authorization,
        phoneNumber: 'direct',
        discount: discount,
        currency: currency,
        userIpAddress,
      },
    });

    return res['data']['data'];
  } catch (error) {
    return { error: THISPROJECT.GLOBAL_ERROR };
  }
};

type params = {
  code?: string;
  token?: string;
};

export const getNewCheckout = async ({ token, code }: params) => {
  const language = thisLocale;
  try {
    const res = await ApiManager.get('/main/checkoutV2.php', {
      params: {
        Authorization: token,
        code: code,
        language: 'fa',
      },
    });

    return res.data.data;
  } catch (error) {}
};
