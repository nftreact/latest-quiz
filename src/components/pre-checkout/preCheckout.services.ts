import { THISPROJECT, thisLanguage } from '@/constants/projects';
import { PreCheckoutResult } from '@/types/pre-checkout';
import { ApiManager } from '@/utils/axios.config';

type PreCheckout = {
  data: PreCheckoutResult;
  message: string;
  result: PreCheckoutResult;
  success: string;
};

type getPreCheckoutProps = {
  Authorization: string | undefined;
  code: string | undefined;
  userIpAddress?: string | any;
};

export const getPreCheckout = async ({ Authorization, code, userIpAddress }: getPreCheckoutProps) => {
  try {
    const res = await ApiManager.get<PreCheckout>('/main/preCheckout.php', {
      params: {
        Authorization: Authorization,
        code: code,
        language: 'fa',
        userIpAddress: userIpAddress,
      },
    });
    if (res['data']['success'] === 'false') return { error: res['data']['message'] };
    const response = res.data.data;

    return response;
  } catch (error) {
    error: THISPROJECT.GLOBAL_ERROR;
  }
};
