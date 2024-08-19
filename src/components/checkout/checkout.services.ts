import { THISPROJECT } from '@/constants/projects';
import { CheckoutResult } from '@/types/checkout';
import { ApiManager } from '@/utils/axios.config';
import { redirect } from 'next/navigation';

type Checkout = {
  data: CheckoutResult;
  message: string;
  result: CheckoutResult;
  success: string;
};

type getCheckoutProps = {
  Authorization: string | undefined;
  code: string | undefined;
};

export const getCheckout = async ({ Authorization, code }: getCheckoutProps) => {
  try {
    const res = await ApiManager.get<Checkout>('/main/checkout.php', {
      params: {
        Authorization: Authorization,
        code: code,
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
};

export const confirmFetcher = async ({ code, plan, Authorization, discount }: confirmFetcherProps) => {
  try {
    const res = await ApiManager.get('/login/request.php', {
      params: {
        code: code,
        plan: plan,
        Authorization: Authorization,
        phoneNumber: 'direct',
        discount: discount,
      },
    });

    if (res.data.data === undefined || res.data.data == null) {
      redirect('/error?with-problem=true');
    }

    return res['data']['data'];
  } catch (error) {
    redirect('/error?with-problem=true');
  }
};
