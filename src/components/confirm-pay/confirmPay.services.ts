import { ApiManager } from '@/utils/axios.config';

export const sendPhoneNumber = async (phoneNumber: number, href: string, token: string) => {
  const res = await ApiManager.get('/login/setPhone.php', {
    params: {
      phoneNumber: phoneNumber,
      href: href,
      token: token,
    },
  });
  return res.data;
};

export const sendVerificationCode = async (
  phoneNumber: number | string,
  verificationCode: string,
  code: string,
  href: string,
) => {
  const res = await ApiManager.get('/login/verifyPhone.php', {
    params: {
      phoneNumber: `${phoneNumber}`,
      verification: verificationCode,
      code: code,
      href: href,
    },
  });
  return res.data;
};
