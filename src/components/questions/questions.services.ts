import { thisLanguage } from '@/constants/projects';
import { QUESTION } from '@/types/questions';
import { ApiManager } from '@/utils/axios.config';
import { Decode, DecodeBase64, DecodePertionDate, parseQueryParams } from '@/utils/insdex';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { redirect } from 'next/navigation';

type question = {
  data: QUESTION;
  message: string;
  result: QUESTION;
  success: string;
};

type getQuestionProps = {
  params: string;
  Authorization: RequestCookie | undefined;
  userCode: RequestCookie | undefined;
  type: RequestCookie | undefined;
  ip: string;
};

export const getQuestion = async ({ params, Authorization, type, userCode, ip }: getQuestionProps) => {
  const basePath = thisLanguage;
  const queryParams = parseQueryParams(Decode(params));

  const data: Record<string, string | undefined> = {
    type: queryParams.type ? queryParams.type : type?.value,
    Authorization: Authorization?.value,
    code: userCode?.value,
    aid: queryParams?.aid,
    height_cm: DecodeBase64(queryParams?.height_cm),
    height_ft: DecodeBase64(queryParams?.height_ft),
    height_in: DecodeBase64(queryParams?.height_in),
    weight_current_kg: DecodeBase64(queryParams?.weight_current_kg),
    weight_current_lbs: DecodeBase64(queryParams?.weight_current_lbs),
    weight_goal_lbs: DecodeBase64(queryParams?.weight_goal_lbs),
    weight_goal_kg: DecodeBase64(queryParams?.weight_goal_kg),
    redirect: queryParams?.redirect,
    calendar: DecodePertionDate(queryParams?.calendar),
    email: DecodeBase64(queryParams.email),
  };

  const finalParams = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined && v !== '' && v !== 'undefined'),
  );

  try {
    const response = await ApiManager.get<question>('/main/question.php', {
      params: {
        ...finalParams,
        version: 'v3',
        language: "fa",
        ip: ip,
      },
    });

    if (response.data.data === undefined || response.data.data == null) {
      // redirect(`/error`);
    }

    if (response['data']['success'] === 'true') {
      return response.data.data;
    }

    if (response['data']['success'] === 'false') alert(response['data']['message']);
  } catch (error) {
    redirect(`/error`);
  }
};
