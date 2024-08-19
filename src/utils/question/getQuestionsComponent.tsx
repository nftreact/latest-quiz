import { QuestionTitle } from '@/components/questions';
import { QUESTION } from '@/types/questions';
import { Text } from '../../../src/components/questions/index';
import dynamic from 'next/dynamic';

export type CookieValue = {
  Authorization: string;
  userCode: string;
  type: string;
};

/**
 * dynamic-import
 * _______________________________________________________________________________
 */
const NormalQuestionRootComponent = dynamic(
  () => import('../../components/questions/normal-question/NormalQuestionRootComponent'),
);
const ParasiteQuestionRootComponent = dynamic(
  () => import('../../components/questions/parasite-question/ParasiteQuestionRootComponent'),
);
const Hint = dynamic(() => import('../../components/questions/hint-question/Hint'));
const BorderImage = dynamic(() => import('../../components/questions/border-image-question/BorderImage'));

//  getborderImage **********
export const getborderImage = (question: QUESTION | undefined) => {
  if (question?.borderImage) {
    return <BorderImage question={question} />;
  }
};

//  getHintSection **********
export const getHintSection = (question: QUESTION | undefined) => {
  if (question?.hint?.title || question?.hint?.caption) {
    return <Hint question={question} />;
  }
};

//  getComponentBaseOnQuestionType **********
export const getComponentBaseOnQuestionType = (question: QUESTION | undefined) => {
  if (question?.questionType === 'parasite') {
    return <ParasiteQuestionRootComponent question={question} />;
  } else {
    return <NormalQuestionRootComponent question={question} />;
  }
};

// getQuestionTitle; **********
export const getQuestionTitle = (questionType?: string, text?: string) => {
  if (questionType !== 'parasite') {
    return <QuestionTitle title={text} />;
  }
};

// getDescription **********
export const getDescription = (description?: string) => {
  if (description) {
    return (
      <Text
        isCenter={true}
        style={{ textAlign: 'center' }}
        inputs={{ text: description }}
        component='p'
        variant='subtitle2'
        textColor={''}
      />
    );
  }
};
