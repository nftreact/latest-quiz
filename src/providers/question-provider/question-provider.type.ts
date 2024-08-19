import { Dispatch, ReactNode } from 'react';

export interface Questions {
  aid: string | string[];
  height_ft: string;
  height_in: string;
  weight_current_kg: string;
  weight_current_lbs: string;
  weight_goal_lbs: string;
  weight_goal_kg: string;
  type: string;
  height_cm: string;
  calendar: string;
  email: string;
  allQuestions: string | number;
  currentQuestion: string | number;
}

// Define the actions that can be dispatched
export type QuestionAction = { type: 'UPDATE_QUESTIONS'; payload: Partial<Questions> };

// Define the context type
export interface QuestionContextProps {
  questions: Questions;
  dispatch: Dispatch<QuestionAction>;
}

export type QuestionProviderProps = {
  children: ReactNode;
  bgColor?: string;
  questions: any;
};
