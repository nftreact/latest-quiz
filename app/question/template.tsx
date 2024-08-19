import QuestionHeader from '@/components/questions/question-header/QuestionHeader';
import { headers } from 'next/headers';

const QuestionLayot = ({ children }: { children: React.ReactNode }) => {
  const header = headers();
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  return (
    <>
      <QuestionHeader ip={ip} />
      {children}
    </>
  );
};

export default QuestionLayot;
