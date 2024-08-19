import * as yup from 'yup';

export const faIRValidationSchema = yup.object().shape({
  weight_current_kg: yup.string(),
  // .matches(/^([1-9][0-9]*|[0])$/, 'لطفاً یک عدد معتبر وارد کنید')
  // .test({
  //   name: 'numeric-range',
  //   message: 'وزن باید بین 40 و 180 باشد',
  //   test: (value) => {
  //     const numericValue = Number(value);
  //     return numericValue >= 40 && numericValue <= 180;
  //   },
  // })
  // .required('لطفاً وزن خود را وارد کنید'),

  weight_current_lbs: yup.string(),
  // .matches(/^([1-9][0-9]*|[0])$/, 'لطفاً یک عدد معتبر وارد کنید')
  // .test({
  //   name: 'numeric-range',
  //   message: 'وزن باید بین 40 و 180 باشد',
  //   test: (value) => {
  //     const numericValue = Number(value);
  //     return numericValue >= 40 && numericValue <= 180;
  //   },
  // })
  // .required('لطفاً وزن خود را وارد کنید'),

  weight_goal_kg: yup.string(),
  // .matches(/^([1-9][0-9]*|[0])$/, 'لطفاً یک عدد معتبر وارد کنید')
  // .test({
  //   name: 'numeric-range',
  //   message: 'وزن باید بین 40 و 180 باشد',
  //   test: (value) => {
  //     const numericValue = Number(value);
  //     return numericValue >= 40 && numericValue <= 180;
  //   },
  // })
  // .required('لطفاً وزن خود را وارد کنید'),

  weight_goal_lbs: yup.string(),
  // .matches(/^([1-9][0-9]*|[0])$/, 'لطفاً یک عدد معتبر وارد کنید')
  // .test({
  //   name: 'numeric-range',
  //   message: 'وزن باید بین 40 و 180 باشد',
  //   test: (value) => {
  //     const numericValue = Number(value);
  //     return numericValue >= 40 && numericValue <= 180;
  //   },
  // })
  // .required('لطفاً وزن خود را وارد کنید'),

  height_cm: yup.string(),
  // .matches(/^([1-9][0-9]*|[0])$/, 'لطفاً یک عدد معتبر وارد کنید')
  // // .required('لطفاً وزن خود را وارد کنید')
  // .test({
  //   name: 'numeric-range',
  //   message: 'قد باید بین ۹۰ و ۲۴۰ باشد',
  //   test: (value) => {
  //     const numericValue = Number(value);
  //     return numericValue >= 90 && numericValue <= 245;
  //   },
  // }),

  height_ft: yup.string().required('لطفاً یک عدد معتبر وارد کنید'),
  // .matches(/^[1-9]$/, 'عدد بایستی بین ۱ تا ۹ باشد')
  // .test({
  //   name: 'numeric-range',
  //   message: 'قد باید بین ۱ و ۹ باشد',
  //   test: (value) => {
  //     const numericValue = Number(value);
  //     return numericValue >= 1 && numericValue <= 9;
  //   },
  // })
  // .required('لطفاً قد خود را وارد کنید'),

  height_in: yup.string().required('لطفاً یک عدد معتبر وارد کنید'),
  // .matches(/^([1-9][0-9]*|[0])$/, 'لطفاً یک عدد معتبر وارد کنید')
  // .test({
  //   name: 'numeric-range',
  //   message: 'عدد باید بین ۱۰ و ۹۹ باشد',
  //   test: (value) => {
  //     const numericValue = Number(value);
  //     return numericValue >= 10 && numericValue <= 99;
  //   },
  // })
  // .required('لطفاً قد خود را وارد کنید'),
});

export const enUSValidationSchema = yup.object().shape({
  weight_current_kg: yup.string(),
  // .matches(/^([1-9][0-9]*|[0])$/, 'Enter only a valid number')
  // .test({
  //   name: 'numeric-range',
  //   message: 'Weight should be between 40 and 180',
  //   test: (value) => {
  //     const numericValue = Number(value);
  //     return numericValue >= 40 && numericValue <= 180;
  //   },
  // })
  // .required('Please enter your weight'),

  weight_current_lbs: yup.string(),
  // .matches(/^([1-9][0-9]*|[0])$/, 'Enter only a valid number')
  // .test({
  //   name: 'numeric-range',
  //   message: 'Weight should be between 40 and 180',
  //   test: (value) => {
  //     const numericValue = Number(value);
  //     return numericValue >= 40 && numericValue <= 180;
  //   },
  // })
  // .required('Please enter your weight'),

  weight_goal_kg: yup.string(),
  // .matches(/^([1-9][0-9]*|[0])$/, 'Enter only a valid number')
  // .test({
  //   name: 'numeric-range',
  //   message: 'Weight should be between 40 and 180',
  //   test: (value) => {
  //     const numericValue = Number(value);
  //     return numericValue >= 40 && numericValue <= 180;
  //   },
  // })
  // .required('Please enter your weight'),

  weight_goal_lbs: yup.string(),
  // .matches(/^([1-9][0-9]*|[0])$/, 'Enter only a valid number')
  // .test({
  //   name: 'numeric-range',
  //   message: 'Weight should be between 40 and 180',
  //   test: (value) => {
  //     const numericValue = Number(value);
  //     return numericValue >= 40 && numericValue <= 180;
  //   },
  // })
  // .required('Please enter your weight'),

  height_cm: yup.string(),
  // .matches(/^([1-9][0-9]*|[0])$/, 'Enter only a valid number')
  // .test({
  //   name: 'numeric-range',
  //   message: 'The height should be between 90 and 240',
  //   test: (value) => {
  //     const numericValue = Number(value);
  //     return numericValue >= 90 && numericValue <= 245;
  //   },
  // })
  // .required('Please enter your height'),

  height_ft: yup.string(),
  // .matches(/^[1-9]$/, 'The number must be between 1 and 9')
  // .test({
  //   name: 'numeric-range',
  //   message: 'The number must be between 1 and 9',
  //   test: (value) => {
  //     const numericValue = Number(value);
  //     return numericValue >= 1 && numericValue <= 9;
  //   },
  // })
  // .required('Please enter your height'),

  height_in: yup.string(),
  // .matches(/^([1-9][0-9]*|[0])$/, 'Enter only a valid number')
  // .test({
  //   name: 'numeric-range',
  //   message: 'The number must be between 10 and 99',
  //   test: (value) => {
  //     const numericValue = Number(value);
  //     return numericValue >= 10 && numericValue <= 99;
  //   },
  // })
  // .required('Please enter your height'),
});

export type inputRegistertype =
  | 'height_cm'
  | 'height_ft'
  | 'weight_goal_kg'
  | 'weight_goal_lbs'
  | 'weight_current_kg'
  | 'weight_current_lbs';

export const renderElement = (value: inputRegistertype) => {
  switch (value) {
    case 'height_cm':
      return 'height_cm';

    case 'height_ft':
      return 'height_ft';

    case 'weight_goal_kg':
      return 'weight_goal_kg';

    case 'weight_goal_lbs':
      return 'weight_goal_lbs';

    case 'weight_current_kg':
      return 'weight_current_kg';

    case 'weight_current_lbs':
      return 'weight_current_lbs';

    default:
      return null;
  }
};
