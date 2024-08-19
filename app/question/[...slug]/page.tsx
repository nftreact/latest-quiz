import { getQuestion } from '@/components/questions/questions.services';
import { QuestionProvider } from '@/providers';
import { cookies, headers } from 'next/headers';
import QuestionProgress from '@/components/questions/QuestionProgress';

import {
  getborderImage,
  getComponentBaseOnQuestionType,
  getDescription,
  getHintSection,
  getQuestionTitle,
} from '@/utils/insdex';

const Questions = async ({ params }: { params: { slug: string } }) => {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');
  const userCode = cookieStore.get('code');
  const type = cookieStore.get('type');
  const quesryString = params?.slug[0];
  const header = headers();
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

  const question = await getQuestion({
    params: quesryString,
    Authorization: Authorization,
    userCode: userCode,
    type: type,
    ip,
  });

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <>
      <QuestionProvider bgColor={question?.parasite.bgColor} questions={question}>
        {getQuestionTitle(question?.questionType, question?.text)}
        {getDescription(question?.description)}
        {getComponentBaseOnQuestionType(question)}
        {getHintSection(question)}
        {getborderImage(question)}
      </QuestionProvider>
    </>
  );
};

export default Questions;
