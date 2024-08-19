'use client';

import { Answer, hintCard } from '@/types/questions';
import { styled } from 'styled-components';
import SelectItem from './SelectItem';
import { useState } from 'react';
import { handleItemSelection } from '@/utils/question/handleMultiSelectedCard';
import { useQuestionContext } from '@/providers';
import { Button, Typography } from '@/primitives';
import HintCardSelect from './HintCardSelect';
import { getCookies } from '@/utils/insdex';
import { isAnyValueNotEmpty } from '@/utils/question/isAnyValueNotEmpty';
import { THISPROJECT } from '@/constants/projects';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  questionType: string;
  answers: Answer[];
  hasborderImage: boolean | string;
};

const SelectQuestion = ({ questionType, answers, hasborderImage }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */
  const [multiSelectedItems, setMultiSelectedItems] = useState([]);
  const [singleSelect, setSingleSelect] = useState('');
  const [hintCard, setHintCard] = useState<hintCard>({
    description: '',
    icon: '',
    title: '',
  });
  const { dispatch } = useQuestionContext();
  const { type } = getCookies();
  const isShowHintCArd = isAnyValueNotEmpty(hintCard as any);

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */

  const handleSelectItem = (item: Answer, isShowHintCArd: boolean) => {
    setSingleSelect(item.aid);
    if (isShowHintCArd && questionType == 'singleSelect') return null;

    if (questionType !== 'singleSelect') {
      handleItemSelection(item.aid, setMultiSelectedItems, multiSelectedItems);
    } else {
      setSingleSelect(item.aid);
      setTimeout(() => {
        dispatch({ type: 'UPDATE_QUESTIONS', payload: { aid: item.aid, type: type } });
      }, 0);
    }
  };

  const handleMultiSelectItem = () => {
    const lastIndexAnswwers = answers.length - 1;
    const lastItem = answers[lastIndexAnswwers];

    if (multiSelectedItems.length < 1) {
      dispatch({ type: 'UPDATE_QUESTIONS', payload: { aid: lastItem.aid, type: type } });
    } else {
      dispatch({ type: 'UPDATE_QUESTIONS', payload: { aid: multiSelectedItems, type: type } });
    }
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <>
      <Root hasborderimage={hasborderImage} locale={THISPROJECT.DEFAULT_LOCALE}>
        {answers.map((item, index, array) => {
          return (
            <SelectItem
              onClick={() => {
                handleSelectItem(item, isAnyValueNotEmpty(item.hint as any)), setHintCard(item.hint);
              }}
              key={index}
              answer={item}
              selectedItem={singleSelect}
              currentIndex={item.aid}
              questionType={questionType}
              multiSelectedItems={multiSelectedItems}
            />
          );
        })}

        {isShowHintCArd && hintCard && (
          <HintCardSelect icon={hintCard.icon} title={hintCard.title} description={hintCard.description} />
        )}
      </Root>
      {isShowHintCArd ? (
        <Button
          variant='question'
          onClick={() => {
            if (isShowHintCArd) {
              dispatch({ type: 'UPDATE_QUESTIONS', payload: { aid: singleSelect, type: type } });
            }
          }}
          position='fixed'
        >
          <Typography fontWeight={700}>بعدی</Typography>
        </Button>
      ) : (
        questionType !== 'singleSelect' && (
          <Button variant='question' onClick={handleMultiSelectItem} position='fixed'>
            <Typography fontWeight={700}>بعدی</Typography>
          </Button>
        )
      )}
    </>
  );
};

export default SelectQuestion;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section<{ hasborderimage: string | boolean; locale: string }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 1;
  align-self: ${({ locale }) => (locale === 'fa_IR' ? 'start' : 'end')};
  width: ${({ hasborderimage }) => (hasborderimage === 'true' ? '70%' : '100%')};
`;
