'use client';

import { Answer } from '@/types/questions';
import styled, { css } from 'styled-components';
import TabInput from './TabInput';
import { inputUnits } from '@/constants';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { THISPROJECT, thisLocale } from '@/constants/projects';
import { inputRegistertype, renderElement, faIRValidationSchema, enUSValidationSchema } from './validationSchema';
import { AppFlex, Button, Typography } from '@/primitives';
import { useQuestionContext } from '@/providers';
import { Encode, getCookies } from '@/utils/insdex';
import { digitsFaToEn } from '@persian-tools/persian-tools';
import { convertFootToCm } from '@/utils/question/convertFootToCm';
import { getBmi } from '@/utils/question/getBmi';
import Image from 'next/image';

/**
 * props
 * _______________________________________________________________________________
 */
type Props = {
  questionType: 'height' | 'weightCurrent' | 'weightGoal' | 'phoneNumber';
  answer: Answer;
};

const InputQuestion = ({ answer, questionType }: Props) => {
  /**
   * const and variables
   * _______________________________________________________________________________
   */

  const [textError, setTextError] = useState('');
  const [FTƒtextError, setFttextError] = useState('');
  const [FIntextError, setFINtextError] = useState('');

  const { dispatch } = useQuestionContext();
  const units = inputUnits.filter((item) => item.questionType === questionType)[0];
  const [unit, setUnit] = useState<string>(units?.units[1]);
  const [bmi, setBmi] = useState<any>();
  const lable = units?.lable?.filter((item) => item.locale === THISPROJECT.DEFAULT_LOCALE)[0]?.lable;
  const inputRegister = units?.inputRegistery?.filter((item) => item.key === unit)[0]?.value as inputRegistertype;
  const validationSchema = THISPROJECT.DEFAULT_LOCALE === 'fa_IR' ? faIRValidationSchema : enUSValidationSchema;
  const locale = thisLocale;
  const { type } = getCookies();
  const {
    register,
    reset,

    setValue,
    watch,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const errorMessage = Object.entries(errors)[0];
  const errorText = errorMessage ? errorMessage[1].message : '';

  /**
   * useEffect
   * _______________________________________________________________________________
   */

  useEffect(() => {
    setBmi('');
  }, [questionType, unit]);

  useEffect(() => {
    reset();
  }, [questionType, unit]);

  useEffect(() => {
    setFocus('height_cm');
  }, [setFocus]);

  /**
   * hooks and methods
   * _______________________________________________________________________________
   */
  const handleUnitSelect = (value: string) => {
    setUnit(value);
  };

  const handleFtInputValidation = () => {
    let validation = '';

    if (Number(watch('height_ft')) < 1 || Number(watch('height_ft')) > 99) {
      if (locale !== 'fa_IR') {
        return (
          setFttextError('The number must be between 10 and 99.'),
          (validation = 'The number must be between 10 and 99.')
        );
      } else {
        return setFttextError('عدد باید بین ۱۰ و ۹۹ باشد'), (validation = 'عدد باید بین ۱۰ و ۹۹ باشد');
      }
    } else {
      return setFttextError(''), (validation = '');
    }
  };

  const handleFINInputValidation = () => {
    let validation = '';

    if (Number(watch('height_in')) < 1 || Number(watch('height_in')) > 99) {
      if (locale !== 'fa_IR') {
        return (
          setFINtextError('The number must be between 10 and 99.'),
          (validation = 'The number must be between 10 and 99.')
        );
      } else {
        return setFINtextError('عدد باید بین ۱۰ و ۹۹ باشد'), (validation = 'عدد باید بین ۱۰ و ۹۹ باشد');
      }
    } else {
      return setFINtextError(''), (validation = '');
    }
  };

  const handleValidation = (value: any, type: string) => {
    let validation = '';

    // height_cm
    if (type === 'height_cm') {
      if (Number(value) < 90 || Number(value) > 245) {
        if (locale !== 'fa_IR') {
          return (
            setTextError('The height should be between 90 and 240'),
            (validation = 'The height should be between 90 and 240')
          );
        } else {
          return setTextError('قد باید بین ۹۰ و ۲۴۰ باشد'), (validation = 'قد باید بین ۹۰ و ۲۴۰ باشد');
        }
      } else {
        return setTextError(''), (validation = '');
      }
    }

    // weight_current_lbs;
    if (
      type === 'weight_current_lbs' ||
      type === 'weight_goal_kg' ||
      type === 'weight_current_kg' ||
      type === 'weight_goal_lbs'
    ) {
      if (Number(value) < 40 || Number(value) > 240) {
        // return (
        //   setTextError('Weight should be between 40 and 180'), (validation = 'Weight should be between 40 and 180')
        // );
        if (locale !== 'fa_IR') {
          return (
            setTextError('Weight should be between 40 and 180'), (validation = 'Weight should be between 40 and 180')
          );
        } else {
          return setTextError('وزن باید بین ۴۰ و ۲۴۰ باشد'), (validation = 'وزن باید بین ۴۰ و ۲۴۰ باشد');
        }
      } else {
        return setTextError(''), (validation = '');
      }
    }
  };

  const handleClick = () => {
    if (units.questionType === 'height' && unit !== 'CM') {
      localStorage.setItem('defaultUnit', 'en');
      const heightCm = convertFootToCm(watch('height_ft') as string, watch('height_in') as string);
      localStorage.setItem('height', String(heightCm));
    }
    if (units.questionType === 'height' && unit.includes('CM')) {
      localStorage.setItem('defaultUnit', 'fa');
      localStorage.setItem('height', watch('height_cm') as string);
    }

    if (units.questionType === 'weightCurrent' && unit !== 'KG') {
      localStorage.setItem('defaultUnit', 'en');
    }
    if (units.questionType === 'weightCurrent' && unit.includes('KG')) {
      localStorage.setItem('defaultUnit', 'fa');
    }
    handleValidation(
      watch(renderElement(inputRegister) as inputRegistertype),
      renderElement(inputRegister) as inputRegistertype,
    );
    handleFtInputValidation();
    handleFINInputValidation();

    if (renderElement(inputRegister) === 'height_ft') {
      if (handleFtInputValidation() === '' && handleFINInputValidation() === '') {
        dispatch({
          type: 'UPDATE_QUESTIONS',
          payload: {
            type: type,
            aid: answer.aid,
            height_cm: watch().height_cm && Encode(watch().height_cm),
            height_ft: watch().height_ft && Encode(watch().height_ft),
            height_in: watch().height_in && Encode(watch().height_in),
            weight_current_kg: watch().weight_current_kg && Encode(watch().weight_current_kg),
            weight_current_lbs: watch().weight_current_lbs && Encode(watch().weight_current_lbs),
            weight_goal_kg: watch().weight_goal_kg && Encode(watch().weight_goal_kg),
            weight_goal_lbs: watch().weight_goal_lbs && Encode(watch().weight_goal_lbs),
          },
        });
      }
    }

    if (
      handleValidation(
        watch(renderElement(inputRegister) as inputRegistertype),
        renderElement(inputRegister) as inputRegistertype,
      ) == ''
    ) {
      dispatch({
        type: 'UPDATE_QUESTIONS',
        payload: {
          type: type,
          aid: answer.aid,
          height_cm: watch().height_cm && Encode(watch().height_cm),
          height_ft: watch().height_ft && Encode(watch().height_ft),
          height_in: watch().height_in && Encode(watch().height_in),
          weight_current_kg: watch().weight_current_kg && Encode(watch().weight_current_kg),
          weight_current_lbs: watch().weight_current_lbs && Encode(watch().weight_current_lbs),
          weight_goal_kg: watch().weight_goal_kg && Encode(watch().weight_goal_kg),
          weight_goal_lbs: watch().weight_goal_lbs && Encode(watch().weight_goal_lbs),
        },
      });
    }
  };

  const handleNumericInput = (event: any) => {
    const input = event.target;
    const numericValue = input.value.replace(/[^\d]/g, ''); // Remove non-numeric characters
    input.value = numericValue; // Update the input value
  };

  /**
   * template
   * _______________________________________________________________________________
   */
  return (
    <>
      <Root locale={THISPROJECT.DEFAULT_LOCALE} errortext={errorText}>
        {locale === 'en_US' && <TabInput units={units?.units} unitSelected={unit} onUnitSelect={handleUnitSelect} />}
        {unit === 'فوت (FT)' ? (
          <AppFlex style={{ paddingTop: '20px' }} gap='20px'>
            <div style={{ position: 'relative', width: '50%' }}>
              {/* <Lable
                locale={THISPROJECT.DEFAULT_LOCALE}
                style={{ top: '-25px', color: FTƒtextError ? 'red' : '#000' }}
              >{`${lable} ( ${'FT'} )`}</Lable> */}
              <InputContainer errortext={FTƒtextError}>
                <p>FT</p>
                <input
                  {...register('height_ft', {
                    onChange(event) {
                      setValue('height_ft', digitsFaToEn(event.target.value.slice(0, 2)));
                      handleNumericInput(event);
                      setFttextError('');
                    },
                  })}
                />
                {textError && <IoMdInformationCircleOutline />}
              </InputContainer>
              <TextError
                locale={THISPROJECT.DEFAULT_LOCALE}
                style={{ bottom: THISPROJECT.DEFAULT_LOCALE === 'fa_IR' ? '-20px' : '-20px' }}
              >
                {FTƒtextError}
              </TextError>
            </div>
            <div style={{ position: 'relative', width: '50%' }}>
              {/* <Lable
                locale={THISPROJECT.DEFAULT_LOCALE}
                style={{ top: '-25px', color: FIntextError ? 'red' : '#000' }}
              >{`${lable} ( ${'IN'} )`}</Lable> */}
              <InputContainer errortext={FIntextError}>
                <p>IN</p>
                <input
                  {...register('height_in', {
                    onChange(event) {
                      setValue('height_in', digitsFaToEn(event.target.value.slice(0, 2)));
                      handleNumericInput(event);
                      setFINtextError('');
                    },
                  })}
                />
                {textError && <IoMdInformationCircleOutline />}
              </InputContainer>
              <TextError
                locale={THISPROJECT.DEFAULT_LOCALE}
                style={{ bottom: THISPROJECT.DEFAULT_LOCALE === 'fa_IR' ? '-20px' : '-20px' }}
              >
                {FIntextError}
              </TextError>
            </div>
          </AppFlex>
        ) : (
          <>
            {/* <Lable
              style={{ color: textError ? 'red' : '' }}
              locale={THISPROJECT.DEFAULT_LOCALE}
            >{`${lable} ( ${unit} )`}</Lable> */}
            <InputContainer errortext={textError} className='InputContainer' id='input-container'>
              <p style={{ textWrap: 'nowrap', minWidth: '90px' }}>{unit}</p>
              <input
                {...register(renderElement(inputRegister) as inputRegistertype, {
                  onChange(event) {
                    if (renderElement(inputRegister) === ('height_ft' as inputRegistertype)) {
                      setValue(
                        renderElement(inputRegister) as inputRegistertype,
                        digitsFaToEn(event.target.value.slice(0, 3)),
                      );
                    } else {
                      const bmiValue = getBmi(
                        unit,
                        watch(renderElement(inputRegister) as inputRegistertype),
                        localStorage.getItem('height'),
                      );
                      setBmi(bmiValue);
                      setValue(
                        renderElement(inputRegister) as inputRegistertype,
                        digitsFaToEn(event.target.value.slice(0, 3)),
                      );
                    }
                    handleNumericInput(event);
                    setTextError('');
                  },
                })}
              />
              {textError && <IoMdInformationCircleOutline />}
            </InputContainer>
            <TextError locale={THISPROJECT.DEFAULT_LOCALE}>{textError}</TextError>
          </>
        )}
      </Root>
      {Boolean(answer.hint?.description) && (
        <section
          style={{
            backgroundColor: '#EBF5FF',
            padding: '15px 10px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Image alt='' width={30} height={30} src={answer.hint?.icon as string} />
            <p style={{ color: '#757575', fontWeight: 600 }}>{answer.hint?.title}</p>
          </div>
          <p style={{ color: '#757575', fontSize: '12px' }}>{answer.hint?.description}</p>
        </section>
      )}
      {questionType === 'weightCurrent' && Boolean(bmi) && (
        <section
          style={{
            backgroundColor: '#EBF5FF',
            padding: '15px 10px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Image alt='' width={30} height={30} src={bmi.icon as string} />
            <p style={{ color: '#757575', fontWeight: 600 }}>{bmi.title}</p>
          </div>
          <p style={{ color: '#757575', fontSize: '12px' }}>{bmi.description}</p>
        </section>
      )}
      <Button
        onClick={handleClick}
        variant='question'
        disabled={!Boolean(watch(renderElement(inputRegister) as any))}
        style={{ marginBlock: '15px' }}
      >
        <Typography fontWeight={700}>{answer.text}</Typography>
      </Button>
    </>
  );
};

export default InputQuestion;

/**
 * styled-component
 * _______________________________________________________________________________
 */

const Root = styled.section<{ errortext: string | undefined; locale: string }>`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  margin: auto;
  position: relative;
  padding-bottom: 10px;

  & .InputContainer:focus-within {
    border: ${({ errortext }) => (errortext ? `1.5px solid red` : '2px solid #02857a')};

    input {
      font-family: ${({ locale }) => (locale == 'en_US' ? `revert` : 'unset')};
    }
  }

  label {
    color: ${({ errortext }) => (errortext ? `red` : '#000')};
  }
`;

const InputContainer = styled.div<{ errortext: string | undefined }>`
  display: flex;
  align-items: center;
  gap: 5px;
  border: ${({ errortext }) => (errortext ? `1.5px solid red` : '2px solid #02857A')};
  height: 50px;
  border-radius: 4px;
  padding-inline: 8px;
  cursor: pointer;

  input {
    outline: none;
    height: 100%;
    border: none;
    font-size: 14px;
    color: ${({ errortext }) => (errortext ? `red` : '#000')};
    width: -webkit-fill-available;
  }

  p {
    color: ${({ errortext }) => (errortext ? `red` : '#000')};
    font-size: 14px;
  }

  svg {
    scale: 1.4;
    fill: red;
  }
`;

const TextError = styled.p<{ locale: string }>`
  position: absolute;
  bottom: -12px;
  font-size: 12px;
  color: red;

  ${({ locale }) =>
    locale === 'en_US'
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `};
`;

const Lable = styled.label<{ locale: string }>`
  user-select: none;
  position: absolute;
  top: 60px;
  font-size: 14px;

  ${({ locale }) =>
    locale === 'en_US'
      ? css`
          left: 5px;
        `
      : css`
          right: 5px;
        `};
`;
