export type hintCard =
  | {
      icon: string;
      description: string;
      title: string;
    }
  | null
  | undefined;

export interface Answer {
  aid: string;
  text: string;
  image: string;
  description: string;
  hint?: hintCard;
}

export type ELEMENT = {
  id: string;
  inputs: any;
};

export interface LoadingElementInputs {
  type: string;
  color: string;
  time: string;
  maxValue: string;
  text: string;
  texts: string | string[];
  hasButton: 'false' | 'true';
  delay: string;
}

export interface IconElementInputs {
  link: string;
  textAlign: string;
}
export interface TitleElementInputs {
  text: string;
  textAlign?: string;
  textSize?: string;
}

export interface DescriptionElementInputs {
  text: string;
  textAlign?: string;
  textSize?: string;
}

export interface QUESTION {
  consent: string;
  token: string;
  answers: Answer[];
  code: string;
  type: string;
  aid: string;
  height: string;
  weight: string;
  height_cm: string;
  height_ft: string;
  height_in: string;
  weight_current_lbs: string;
  weight_current_kg: string;
  weight_goal_lbs: string;
  weight_goal_kg: string;
  calendar: string;
  inputQuestion?: any;
  plan: string;
  discount: string;
  phoneNumber: string;
  textBox: string;
  verification: string;
  questionType: string;
  hint: any;
  video: string;
  image: string;
  nextPage: string;
  isResult: 'true' | 'false';
  borderImage: string;
  description?: string;
  text?: string;
  allQuestions: number;
  currentQuestion: string;
  preAid: string;
  parasite: {
    aid: string;
    bgColor: string;
    elements: ELEMENT[];
    id: string;
    textColor: string;
  };
}

export interface TitleFadeElementInputs {
  texts?: string[];
}
export interface TitleFadeBoxProps {
  inputs: TitleFadeElementInputs;
  thisAid: string;
  isResult: 'true' | 'false';
  nextPage: string;
}
