import { THISPROJECT, thisLanguage } from '@/constants/projects';
import axios from 'axios';

const axiosBase = axios.create({ baseURL: THISPROJECT.PRE_CONNECT_SERVER_URL });

export const confirmPayPalFetcher: any = async (code: string) => {
  const res = await axiosBase.get('/process/payment/confirmpay.php', {
    params: {
      code: code,
      language: thisLanguage,
    },
  });
  return res['data'];
};
