export const inputUnits = [
  {
    questionType: 'height',
    units: ['فوت (FT)', 'سانتی‌متر (CM)'],
    lable: [
      {
        locale: 'fa_IR',
        lable: 'قد',
      },
      {
        locale: 'en_US',
        lable: 'height',
      },
    ],

    inputRegistery: [
      {
        key: 'سانتی‌متر (CM)',
        value: 'height_cm',
      },
      {
        key: 'فوت (FT)',
        value: 'height_ft',
      },
    ],
  },

  {
    questionType: 'weightGoal',
    units: ['(LBS) پوند', '(KG) کیلوگرم'],
    lable: [
      {
        locale: 'fa_IR',
        lable: 'وزن',
      },
      {
        locale: 'en_US',
        lable: 'weigh',
      },
    ],

    inputRegistery: [
      {
        key: '(KG) کیلوگرم',
        value: 'weight_goal_kg',
      },
      {
        key: '(LBS) پوند',
        value: 'weight_goal_lbs',
      },
    ],
  },

  {
    questionType: 'weightCurrent',
    units: ['(LBS) پوند', '(KG) کیلوگرم'],
    lable: [
      {
        locale: 'fa_IR',
        lable: 'وزن',
      },
      {
        locale: 'en_US',
        lable: 'weigh',
      },
    ],

    inputRegistery: [
      {
        key: '(KG) کیلوگرم',
        value: 'weight_current_kg',
      },
      {
        key: '(LBS) پوند',
        value: 'weight_current_lbs',
      },
    ],
  },
];
