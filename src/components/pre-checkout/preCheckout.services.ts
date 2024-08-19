import { PreCheckoutResult } from '@/types/pre-checkout';
import { ApiManager } from '@/utils/axios.config';
import { redirect } from 'next/navigation';

type PreCheckout = {
  data: PreCheckoutResult;
  message: string;
  result: PreCheckoutResult;
  success: string;
};

type getPreCheckoutProps = {
  Authorization: string | undefined;
  code: string | undefined;
};

export const getPreCheckout = async ({ Authorization, code }: getPreCheckoutProps) => {
  try {
    const res = await ApiManager.get<PreCheckout>('/main/preCheckout.php', {
      params: {
        Authorization: Authorization,
        code: code,
      },
    });
    if (res['data']['success'] === 'false') return { error: res['data']['message'] };
    const response = res.data.data;

    if (res?.data?.data === undefined || res?.data?.data == null) {
      redirect('/error?with-problem=true');
    }

    return response;
  } catch (error) {
    redirect('/error?with-problem=true');
  }
};
