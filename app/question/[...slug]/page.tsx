import { getQuestion } from '@/components/questions/questions.services';
import { QuestionProvider } from '@/providers';
import { cookies } from 'next/headers';

import {
  getborderImage,
  getComponentBaseOnQuestionType,
  getDescription,
  getHintSection,
  getQuestionTitle,
} from '@/utils/insdex';
import Header from '@/layouts/header/Header';
import { QUESTION } from '@/types/questions';
import { AuthProvider } from '@/providers/AuthProvider';

const Questions = async ({ params }: { params: { slug: string } }) => {
  const cookieStore = cookies();
  const Authorization = cookieStore.get('Authorization');
  const userCode = cookieStore.get('code');
  const type = cookieStore.get('type');
  const quesryString = params?.slug[0];

  const question = await getQuestion({
    params: quesryString,
    Authorization: Authorization,
    userCode: userCode,
    type: type,
  });

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <>
      <Header question={question as QUESTION} />
      <AuthProvider isShowConsent={question?.consent}>
        <QuestionProvider bgColor={question?.parasite.bgColor}>
          {getQuestionTitle(question?.questionType, question?.text)}
          {getDescription(question?.description)}
          {getComponentBaseOnQuestionType(question)}
          {getHintSection(question)}
          {getborderImage(question)}
        </QuestionProvider>
      </AuthProvider>
    </>
  );
};

export default Questions;
